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

export interface Interview {
  id: string;
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
