import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { InterviewEntity } from './interview.entity';

export type RecordType =
  | 'note'
  | 'status_change'
  | 'field_change'
  | 'created'
  | 'email'
  | 'call'
  | 'other';

@Entity()
export class InterviewRecordEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  interviewId: number;

  @ManyToOne(() => InterviewEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'interviewId' })
  interview: InterviewEntity;

  @Column({ nullable: true })
  userId: number;

  @Column()
  type: RecordType;

  @Column({ nullable: true, type: 'text' })
  message: string;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, unknown> | null;

  @Column()
  createdAt: string;
}
