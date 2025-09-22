import { Injectable } from '@nestjs/common';
import {
  // Interview,
  CreateInterviewDto,
  // UpdateInterviewDto,
  InterviewEntity,
  InterviewStats,
} from './interview.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InterviewsService {
  constructor(
    @InjectRepository(InterviewEntity)
    private readonly interviewRepo: Repository<InterviewEntity>,
  ) {}

  async findAll(): Promise<InterviewEntity[]> {
    return await this.interviewRepo.find();
  }

  async findOne(id: number): Promise<InterviewEntity | null> {
    return await this.interviewRepo.findOne({ where: { id } });
  }

  async create(
    createInterviewDto: CreateInterviewDto,
  ): Promise<InterviewEntity> {
    const newInterview = this.interviewRepo.create({
      ...createInterviewDto,
      followUpDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await this.interviewRepo.save(newInterview);
  }

  // update(
  //   id: string,
  //   updateInterviewDto: UpdateInterviewDto,
  // ): Interview | undefined {
  //   const index = this.interviews.findIndex((interview) => interview.id === id);
  //   if (index === -1) {
  //     return undefined;
  //   }

  //   this.interviews[index] = {
  //     ...this.interviews[index],
  //     ...updateInterviewDto,
  //     updatedAt: new Date().toISOString(),
  //   };

  //   return this.interviews[index];
  // }

  async remove(id: number): Promise<boolean> {
    const result = await this.interviewRepo.delete(id);
    return result.affected !== 0;
  }

  async getStats(): Promise<InterviewStats> {
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

  async getRecentActivity(): Promise<InterviewEntity[]> {
    return await this.interviewRepo.find({
      order: { updatedAt: 'DESC' },
      take: 5,
    });
  }
}
