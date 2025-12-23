import { Injectable } from '@nestjs/common';
import {
  CreateInterviewDto,
  InterviewEntity,
  InterviewStats,
  UpdateInterviewDto,
} from './interview.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(InterviewEntity)
    private readonly interviewRepo: Repository<InterviewEntity>,
  ) {}

  async findAll(userId: number): Promise<InterviewEntity[]> {
    return this.interviewRepo.find({ where: { userId } });
  }

  async findOne(id: number): Promise<InterviewEntity | null> {
    return this.interviewRepo.findOne({ where: { id } });
  }

  async create(
    createInterviewDto: CreateInterviewDto,
    userId: number,
  ): Promise<InterviewEntity> {
    const newInterview = this.interviewRepo.create({
      ...createInterviewDto,
      userId,
      followUpDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return this.interviewRepo.save(newInterview);
  }

  async update(
    id: number,
    updateInterviewDto: UpdateInterviewDto,
  ): Promise<InterviewEntity | null> {
    const interview = await this.interviewRepo.findOne({ where: { id } });
    if (!interview) {
      return null;
    }
    Object.assign(interview, updateInterviewDto, { updatedAt: new Date() });
    return this.interviewRepo.save(interview);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.interviewRepo.delete(id);
    return result.affected !== 0;
  }

  async getStats(userId: number): Promise<InterviewStats> {
    const result: InterviewStats | undefined = await this.interviewRepo
      .createQueryBuilder('interview')
      .select('COUNT(*)', 'total')
      .addSelect(
        `COUNT(*) FILTER (WHERE interview.status = 'completed')`,
        'completed',
      )
      .addSelect(
        `COUNT(*) FILTER (WHERE interview.status = 'scheduled')`,
        'scheduled',
      )
      .addSelect(
        `COUNT(*) FILTER (WHERE interview.status = 'pending')`,
        'pending',
      )
      .addSelect(
        `COUNT(*) FILTER (WHERE interview.status = 'cancelled')`,
        'cancelled',
      )
      .where('interview.userId = :userId', { userId })
      .getRawOne();

    const total = Number(result?.total);
    const completed = Number(result?.completed);
    const scheduled = Number(result?.scheduled);
    const pending = Number(result?.pending);
    const cancelled = Number(result?.cancelled);

    const successRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      scheduled,
      pending,
      cancelled,
      successRate,
    };
  }

  async getRecentActivity(userId: number): Promise<InterviewEntity[]> {
    return await this.interviewRepo.find({
      order: { updatedAt: 'DESC' },
      take: 5,
      where: { userId },
    });
  }

  async exportToCsv(userId: number): Promise<string> {
    const interviews = await this.interviewRepo.find({
      where: { userId },
      order: { date: 'DESC' },
    });

    const headers = [
      'ID',
      'Company',
      'Position',
      'Date',
      'Type',
      'Status',
      'Interviewer',
      'Rating',
      'Follow Up Date',
      'Notes',
      'Feedback',
      'Created At',
      'Updated At',
    ];

    const escapeCsvValue = (value: unknown): string => {
      if (value === null || value === undefined) {
        return '';
      }

      const stringValue = typeof value === 'string' ? value : String(value);

      if (
        stringValue.includes('"') ||
        stringValue.includes(',') ||
        stringValue.includes('\n') ||
        stringValue.includes('\r')
      ) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }

      return stringValue;
    };

    const rows = interviews.map((interview) => [
      interview.id,
      interview.company,
      interview.position,
      interview.date,
      interview.type,
      interview.status,
      interview.interviewer ?? '',
      interview.rating ?? '',
      interview.followUpDate ?? '',
      interview.notes ?? '',
      interview.feedback ?? '',
      interview.createdAt,
      interview.updatedAt,
    ]);

    return [
      headers.join(','),
      ...rows.map((row) => row.map(escapeCsvValue).join(',')),
    ].join('\n');
  }
}
