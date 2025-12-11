import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterviewRecordsService } from './interviews.records.service';
import { InterviewRecordEntity } from './interview-record.entity';
import { InterviewEntity } from './interview.entity';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

describe('InterviewRecordsService', () => {
  let service: InterviewRecordsService;
  let recordRepo: jest.Mocked<Repository<InterviewRecordEntity>>;
  let interviewRepo: jest.Mocked<Repository<InterviewEntity>>;

  const createRepoMock = <T extends object>() =>
    ({
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    }) as jest.Mocked<Repository<T>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InterviewRecordsService,
        {
          provide: getRepositoryToken(InterviewRecordEntity),
          useValue: createRepoMock<InterviewRecordEntity>(),
        },
        {
          provide: getRepositoryToken(InterviewEntity),
          useValue: createRepoMock<InterviewEntity>(),
        },
      ],
    }).compile();

    service = module.get(InterviewRecordsService);
    recordRepo = module.get<jest.Mocked<Repository<InterviewRecordEntity>>>(
      getRepositoryToken(InterviewRecordEntity),
    );
    interviewRepo = module.get<jest.Mocked<Repository<InterviewEntity>>>(
      getRepositoryToken(InterviewEntity),
    );
    jest.clearAllMocks();
  });

  const interview = (
    overrides: Partial<InterviewEntity> = {},
  ): InterviewEntity => ({
    id: 1,
    userId: 5,
    company: 'Acme',
    position: 'Engineer',
    date: '2024-01-01',
    status: 'scheduled',
    type: 'phone',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    ...overrides,
  });

  const record = (
    overrides: Partial<InterviewRecordEntity> = {},
  ): InterviewRecordEntity => ({
    id: 1,
    interviewId: 1,
    userId: 5,
    type: 'note',
    message: 'hello',
    metadata: null,
    createdAt: '2024-01-01',
    ...overrides,
  });

  it('create saves record when user owns interview', async () => {
    interviewRepo.findOne.mockResolvedValue(interview());
    const created = record();
    recordRepo.create.mockReturnValue(created);
    recordRepo.save.mockResolvedValue(created);

    const dto = {
      type: 'note',
      message: 'Progress',
      metadata: { mood: 'good' },
    };
    const result = await service.create(1, 5, dto);

    expect(recordRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        interviewId: 1,
        userId: 5,
        type: 'note',
        message: 'Progress',
        metadata: { mood: 'good' },
        createdAt: expect.any(String),
      }),
    );
    expect(recordRepo.save).toHaveBeenCalledWith(created);
    expect(result).toBe(created);
  });

  it('create normalizes missing metadata to null', async () => {
    interviewRepo.findOne.mockResolvedValue(interview());
    recordRepo.create.mockReturnValue(record());
    recordRepo.save.mockResolvedValue(record());

    await service.create(1, 5, { type: 'note' });

    expect(recordRepo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: null,
      }),
    );
  });

  it('create throws NotFoundException when interview missing', async () => {
    interviewRepo.findOne.mockResolvedValue(null);

    await expect(service.create(1, 5, { type: 'note' })).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('create throws ForbiddenException when interview owned by different user', async () => {
    interviewRepo.findOne.mockResolvedValue(interview({ userId: 99 }));

    await expect(service.create(1, 5, { type: 'note' })).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('findByInterview returns records when ownership confirmed', async () => {
    interviewRepo.findOne.mockResolvedValue(interview());
    const rows = [record({ id: 2 })];
    recordRepo.find.mockResolvedValue(rows);

    const result = await service.findByInterview(1, 5);

    expect(result).toBe(rows);
    expect(recordRepo.find).toHaveBeenCalledWith({
      where: { interviewId: 1 },
      order: { createdAt: 'DESC' },
    });
  });

  it('findOne returns record or null', async () => {
    const row = record();
    recordRepo.findOne.mockResolvedValue(row);

    await expect(service.findOne(7)).resolves.toBe(row);
    expect(recordRepo.findOne).toHaveBeenCalledWith({ where: { id: 7 } });
  });

  it('remove returns false when record missing', async () => {
    recordRepo.findOne.mockResolvedValue(null);

    await expect(service.remove(10, 5)).resolves.toBe(false);
  });

  it('remove returns false when interview missing', async () => {
    recordRepo.findOne.mockResolvedValue(record());
    interviewRepo.findOne.mockResolvedValue(null);

    await expect(service.remove(10, 5)).resolves.toBe(false);
  });

  it('remove throws ForbiddenException when user mismatches', async () => {
    recordRepo.findOne.mockResolvedValue(record({ interviewId: 2 }));
    interviewRepo.findOne.mockResolvedValue(interview({ id: 2, userId: 99 }));

    await expect(service.remove(10, 5)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
  });

  it('remove deletes record when ownership verified', async () => {
    recordRepo.findOne.mockResolvedValue(record());
    interviewRepo.findOne.mockResolvedValue(interview());
    recordRepo.delete.mockResolvedValue({ affected: 1 } as never);

    await expect(service.remove(10, 5)).resolves.toBe(true);
    expect(recordRepo.delete).toHaveBeenCalledWith(10);
  });
});
