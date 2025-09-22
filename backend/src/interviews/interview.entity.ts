import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type InterviewStatus =
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'pending';

export type InterviewType =
  | 'phone'
  | 'video'
  | 'onsite'
  | 'technical'
  | 'behavioral';

export type InterviewRating = 1 | 2 | 3 | 4 | 5;

export interface Interview {
  id?: number;
  company: string;
  position: string;
  date: string;
  status: InterviewStatus;
  type: InterviewType;
  interviewer?: string;
  notes?: string;
  feedback?: string;
  rating?: InterviewRating;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateInterviewDto {
  company: string;
  position: string;
  date: string;
  status: InterviewStatus;
  type: InterviewType;
  interviewer?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
  followUpDate?: string;
}
export interface UpdateInterviewDto {
  company?: string;
  position?: string;
  date?: string;
  status?: InterviewStatus;
  type?: InterviewType;
  interviewer?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
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
