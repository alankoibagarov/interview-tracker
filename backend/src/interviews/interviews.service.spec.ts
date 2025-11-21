import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  InterviewEntity,
  CreateInterviewDto,
  UpdateInterviewDto,
} from './interview.entity';
import { InterviewsService } from './interviews.service';
import { Repository, SelectQueryBuilder } from 'typeorm';

describe('InterviewsService', () => {
  let service: InterviewsService;
  let interviewRepo: jest.Mocked<Repository<InterviewEntity>>;

  const createRepoMock = () =>
    ({
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
      findBy: jest.fn(),
      createQueryBuilder: jest.fn(),
    }) as jest.Mocked<Repository<InterviewEntity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewsService,
        {
          provide: getRepositoryToken(InterviewEntity),
          useValue: createRepoMock(),
        },
      ],
    }).compile();

    service = module.get(InterviewsService);
    interviewRepo = module.get<jest.Mocked<Repository<InterviewEntity>>>(
      getRepositoryToken(InterviewEntity),
    );
    jest.clearAllMocks();
  });

  const sampleInterview = (overrides: Partial<InterviewEntity> = {}): InterviewEntity => ({
    id: 1,
    userId: 10,
    company: 'Acme',
    position: 'Engineer',
    date: '2024-01-01',
    status: 'scheduled',
    type: 'phone',
    interviewer: 'Jordan',
    notes: 'Bring portfolio',
    feedback: 'Great',
    rating: 4,
    followUpDate: '2024-01-02',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    ...overrides,
  });

  it('findAll returns interviews filtered by user', async () => {
    const interviews = [sampleInterview()];
    interviewRepo.find.mockResolvedValue(interviews);

    const result = await service.findAll(5);

    expect(result).toBe(interviews);
    expect(interviewRepo.find).toHaveBeenCalledWith({ where: { userId: 5 } });
  });

  it('findOne returns interview or null', async () => {
    const interview = sampleInterview({ id: 3 });
    interviewRepo.findOne.mockResolvedValueOnce(interview);

    await expect(service.findOne(3)).resolves.toBe(interview);
    expect(interviewRepo.findOne).toHaveBeenCalledWith({ where: { id: 3 } });
  });

  it('create persists interview with timestamps and user id', async () => {
    const dto: CreateInterviewDto = {
      company: 'Globex',
      position: 'Manager',
      date: '2024-05-01',
      status: 'scheduled',
      type: 'onsite',
      notes: 'Important',
    };
    const created = sampleInterview(dto as unknown as Partial<InterviewEntity>);
    interviewRepo.create.mockReturnValue(created);
    interviewRepo.save.mockResolvedValue(created);

    const result = await service.create(dto, 42);

    expect(interviewRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...dto,
        userId: 42,
        followUpDate: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
    expect(interviewRepo.save).toHaveBeenCalledWith(created);
    expect(result).toBe(created);
  });

  it('update returns null when interview not found', async () => {
    interviewRepo.findOne.mockResolvedValue(null);

    const result = await service.update(99, { status: 'completed' });

    expect(result).toBeNull();
    expect(interviewRepo.findOne).toHaveBeenCalledWith({ where: { id: 99 } });
    expect(interviewRepo.save).not.toHaveBeenCalled();
  });

  it('update merges payload and refreshes updatedAt when entity exists', async () => {
    const existing = sampleInterview();
    interviewRepo.findOne.mockResolvedValue(existing);
    const saved = sampleInterview({ status: 'completed' });
    interviewRepo.save.mockResolvedValue(saved);

    const updateDto: UpdateInterviewDto = { status: 'completed', notes: 'Updated' };
    const result = await service.update(existing.id, updateDto);

    expect(interviewRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        ...existing,
        ...updateDto,
        updatedAt: expect.any(Date),
      }),
    );
    expect(result).toBe(saved);
  });

  it('remove returns true when delete affects a row', async () => {
    interviewRepo.delete.mockResolvedValue({ affected: 1 } as never);

    await expect(service.remove(7)).resolves.toBe(true);
    expect(interviewRepo.delete).toHaveBeenCalledWith(7);
  });

  it('remove returns false when delete does not affect rows', async () => {
    interviewRepo.delete.mockResolvedValue({ affected: 0 } as never);

    await expect(service.remove(8)).resolves.toBe(false);
  });

  it('getStats converts raw counts and success rate', async () => {
    const qb: Partial<SelectQueryBuilder<InterviewEntity>> = {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getRawOne: jest.fn().mockResolvedValue({
        total: '4',
        completed: '2',
        scheduled: '1',
        pending: '1',
        cancelled: '0',
      }),
    };
    interviewRepo.createQueryBuilder.mockReturnValue(qb as SelectQueryBuilder<InterviewEntity>);

    const stats = await service.getStats(12);

    expect(qb.where).toHaveBeenCalledWith('interview.userId = :userId', { userId: 12 });
    expect(stats).toEqual({
      total: 4,
      completed: 2,
      scheduled: 1,
      pending: 1,
      cancelled: 0,
      successRate: 50,
    });
  });

  it('getRecentActivity returns ordered list limited to five rows', async () => {
    const rows = [sampleInterview({ id: 1 })];
    interviewRepo.find.mockResolvedValue(rows);

    const result = await service.getRecentActivity(77);

    expect(result).toBe(rows);
    expect(interviewRepo.find).toHaveBeenCalledWith({
      order: { updatedAt: 'DESC' },
      take: 5,
      where: { userId: 77 },
    });
  });

  it('exportToCsv builds CSV with escaped values', async () => {
    const interviews = [
      sampleInterview({
        id: 1,
        company: 'Acme, Inc.',
        notes: 'Line\nbreak',
        feedback: 'Said "great"',
      }),
    ];
    interviewRepo.find.mockResolvedValue(interviews);

    const csv = await service.exportToCsv(13);

    const lines = csv.split('\n');
    const header = lines[0];
    const body = lines.slice(1).join('\n');
    expect(header.split(',')).toContain('Company');
    expect(body).toContain('"Acme, Inc."');
    expect(body).toContain('"Line\nbreak"');
    expect(body).toContain('"Said ""great"""');
    expect(interviewRepo.find).toHaveBeenCalledWith({
      where: { userId: 13 },
      order: { date: 'DESC' },
    });
  });
});

