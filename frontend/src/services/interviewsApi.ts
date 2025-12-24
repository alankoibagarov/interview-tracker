import { request, requestBlob } from "./api";

export enum InterviewStatus {
  Scheduled = "scheduled",
  Completed = "completed",
  Cancelled = "cancelled",
  Pending = "pending",
}

export enum InterviewType {
  Phone = "phone",
  Video = "video",
  Onsite = "onsite",
  Technical = "technical",
  Behavioral = "behavioral",
}

export interface Interview {
  id: number;
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
  records: InterviewRecordEntity[];
}

export interface CreateInterviewDto {
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
}

export interface UpdateInterviewDto {
  company?: string;
  position?: string;
  date?: string;
  status?: InterviewStatus;
  type?: InterviewType;
  interviewer?: string;
  location?: string;
  callLink?: string;
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

export interface InterviewRecordEntity {
  id: number;
  interviewId: number;
  userId: number;
  message: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  type: RecordType;
}

export type RecordType =
  | 'note'
  | 'status_change'
  | 'field_change'
  | 'created'
  | 'email'
  | 'call'
  | 'other';

class InterviewsService {
  // Interviews
  async getInterviews(): Promise<Interview[] | null> {
    return request<Interview[] | null>("/interviews");
  }

  async getInterview(id: number): Promise<Interview | null> {
    return request<Interview | null>(`/interviews/${id}`);
  }

  async createInterview(data: CreateInterviewDto): Promise<Interview | null> {
    return request<Interview | null>("/interviews", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateInterview(
    id: number,
    data: UpdateInterviewDto
  ): Promise<Interview | null> {
    return request<Interview | null>(`/interviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteInterview(id: number): Promise<{ message: string } | null> {
    return request<{ message: string } | null>(`/interviews/${id}`, {
      method: "DELETE",
    });
  }

  async getInterviewStats(): Promise<InterviewStats | null> {
    return request<InterviewStats | null>("/interviews/stats");
  }

  async getRecentActivity(): Promise<Interview[] | null> {
    return request<Interview[] | null>("/interviews/recent");
  }

  async exportInterviewsCsv(): Promise<Blob | null> {
    return requestBlob("/interviews/export", {
      headers: {
        Accept: "text/csv",
      },
    });
  }
}

export const interviewsApi = new InterviewsService();
