import { Module } from '@nestjs/common';
import { InterviewsController } from './interviews.controller';
import { InterviewsService } from './interviews.service';
import { InterviewEntity } from './interview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InterviewRecordEntity } from './interview-record.entity';
import { InterviewRecordsService } from './interviews.records.service';
import { InterviewRecordsController } from './interviews.records.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InterviewEntity, InterviewRecordEntity])],
  controllers: [InterviewsController, InterviewRecordsController],
  providers: [InterviewsService, InterviewRecordsService],
  exports: [InterviewsService, InterviewRecordsService],
})
export class InterviewsModule {}
