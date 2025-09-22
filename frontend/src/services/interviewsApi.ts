import { request } from "./api";

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

export interface InterviewStats {
  total: number;
  completed: number;
  scheduled: number;
  pending: number;
  cancelled: number;
  successRate: number;
}

class InterviewsService {
  // Interviews
  async getInterviews(): Promise<Interview[]> {
    return request<Interview[]>("/interviews", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  }

  async getInterview(id: string): Promise<Interview> {
    return request<Interview>(`/interviews/${id}`);
  }

  async createInterview(data: CreateInterviewDto): Promise<Interview> {
    return request<Interview>("/interviews", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateInterview(
    id: number,
    data: UpdateInterviewDto
  ): Promise<Interview> {
    return request<Interview>(`/interviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteInterview(id: number): Promise<{ message: string }> {
    return request<{ message: string }>(`/interviews/${id}`, {
      method: "DELETE",
    });
  }

  async getInterviewStats(): Promise<InterviewStats> {
    return request<InterviewStats>("/interviews/stats");
  }

  async getRecentActivity(): Promise<Interview[]> {
    return request<Interview[]>("/interviews/recent");
  }
}

export const interviewsApi = new InterviewsService();
