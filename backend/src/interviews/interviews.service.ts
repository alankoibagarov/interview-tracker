import { Injectable } from '@nestjs/common';
import {
  // Interview,
  // CreateInterviewDto,
  // UpdateInterviewDto,
  InterviewEntity,
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

  // create(createInterviewDto: CreateInterviewDto): Interview {
  //   const newInterview: Interview = {
  //     id: (this.interviews.length + 1).toString(),
  //     ...createInterviewDto,
  //     createdAt: new Date().toISOString(),
  //     updatedAt: new Date().toISOString(),
  //   };

  //   this.interviews.push(newInterview);
  //   return newInterview;
  // }

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

  // remove(id: string): boolean {
  //   const index = this.interviews.findIndex((interview) => interview.id === id);
  //   if (index === -1) {
  //     return false;
  //   }

  //   this.interviews.splice(index, 1);
  //   return true;
  // }

  // getStats() {
  //   const total = this.interviews.length;
  //   const completed = this.interviews.filter(
  //     (i) => i.status === 'completed',
  //   ).length;
  //   const scheduled = this.interviews.filter(
  //     (i) => i.status === 'scheduled',
  //   ).length;
  //   const pending = this.interviews.filter(
  //     (i) => i.status === 'pending',
  //   ).length;
  //   const cancelled = this.interviews.filter(
  //     (i) => i.status === 'cancelled',
  //   ).length;

  //   const successRate =
  //     completed > 0 ? Math.round((completed / total) * 100) : 0;

  //   return {
  //     total,
  //     completed,
  //     scheduled,
  //     pending,
  //     cancelled,
  //     successRate,
  //   };
  // }

  // getRecentActivity() {
  //   return this.interviews
  //     .sort(
  //       (a, b) =>
  //         new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  //     )
  //     .slice(0, 5);
  // }
}
