import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InterviewRecordEntity, RecordType } from './interview-record.entity';
import { InterviewEntity } from './interview.entity';

export interface CreateInterviewRecordDto {
  type: RecordType;
  message?: string;
  metadata?: Record<string, unknown> | null;
}

@Injectable()
export class InterviewRecordsService {
  constructor(
    @InjectRepository(InterviewRecordEntity)
    private readonly recordRepo: Repository<InterviewRecordEntity>,

    @InjectRepository(InterviewEntity)
    private readonly interviewRepo: Repository<InterviewEntity>,
  ) {}

  private async ensureInterviewOwnership(
    interviewId: number,
    userId: number,
  ): Promise<InterviewEntity> {
    const interview = await this.interviewRepo.findOne({
      where: { id: interviewId },
    });
    if (!interview) {
      throw new NotFoundException('Interview not found');
    }
    if (interview.userId !== userId) {
      throw new ForbiddenException();
    }
    return interview;
  }

  async create(
    interviewId: number,
    userId: number,
    dto: CreateInterviewRecordDto,
  ): Promise<InterviewRecordEntity> {
    await this.ensureInterviewOwnership(interviewId, userId);

    const record = this.recordRepo.create({
      interviewId,
      userId,
      createdAt: new Date().toISOString(),
      type: dto.type,
      message: dto.message,
      metadata: dto.metadata ?? null,
    });

    return await this.recordRepo.save(record);
  }

  async findByInterview(
    interviewId: number,
    userId: number,
  ): Promise<InterviewRecordEntity[]> {
    await this.ensureInterviewOwnership(interviewId, userId);
    return await this.recordRepo.find({
      where: { interviewId },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<InterviewRecordEntity | null> {
    return await this.recordRepo.findOne({ where: { id } });
  }

  async remove(id: number, userId: number): Promise<boolean> {
    const record = await this.recordRepo.findOne({ where: { id } });
    if (!record) {
      return false;
    }

    // ensure the requesting user owns the underlying interview
    const interview = await this.interviewRepo.findOne({
      where: { id: record.interviewId },
    });
    if (!interview) {
      return false;
    }
    if (interview.userId !== userId) {
      throw new ForbiddenException();
    }

    const res = await this.recordRepo.delete(id);
    return res.affected !== 0;
  }
}
