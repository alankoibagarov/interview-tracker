import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  Min,
  Max,
  IsDateString,
} from 'class-validator';

export enum InterviewStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

export enum InterviewType {
  PHONE = 'phone',
  VIDEO = 'video',
  ONSITE = 'onsite',
  TECHNICAL = 'technical',
  BEHAVIORAL = 'behavioral',
}

export interface Interview {
  id?: number;
  company: string;
  position: string;
  date: string;
  status: InterviewStatus;
  type: InterviewType;
  interviewer?: string;
  location?: string;
  callLink?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export class CreateInterviewDto {
  @IsString()
  company: string;

  @IsString()
  position: string;

  @IsDateString()
  date: string;

  @IsEnum(InterviewStatus)
  status: InterviewStatus;

  @IsEnum(InterviewType)
  type: InterviewType;

  @IsOptional()
  @IsString()
  interviewer?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  callLink?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  feedback?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsDateString()
  followUpDate?: string;
}

export class UpdateInterviewDto {
  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsEnum(InterviewStatus)
  status?: InterviewStatus;

  @IsOptional()
  @IsEnum(InterviewType)
  type?: InterviewType;

  @IsOptional()
  @IsString()
  interviewer?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  callLink?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  feedback?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsDateString()
  followUpDate?: string;
}

export interface InterviewStats {
  total: number;
  completed: number;
  scheduled: number;
  pending: number;
  cancelled: number;
  successRate: number;
}

@Entity()
export class InterviewEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  date: string;

  @Column()
  status: InterviewStatus;

  @Column()
  type: InterviewType;

  @Column({ nullable: true })
  interviewer: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  callLink: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  feedback: string;

  @Column({ nullable: true })
  rating: number;

  @Column({ nullable: true })
  followUpDate: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
