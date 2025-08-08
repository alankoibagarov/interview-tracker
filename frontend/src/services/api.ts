const API_BASE_URL = "http://localhost:3000";

export interface Interview {
  id: string;
  company: string;
  position: string;
  date: string;
  status: "scheduled" | "completed" | "cancelled" | "pending";
  type: "phone" | "video" | "onsite" | "technical" | "behavioral";
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
  status: "scheduled" | "completed" | "cancelled" | "pending";
  type: "phone" | "video" | "onsite" | "technical" | "behavioral";
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
  status?: "scheduled" | "completed" | "cancelled" | "pending";
  type?: "phone" | "video" | "onsite" | "technical" | "behavioral";
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

class ApiService {
  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Interviews
  async getInterviews(): Promise<Interview[]> {
    return this.request<Interview[]>("/interviews");
  }

  async getInterview(id: string): Promise<Interview> {
    return this.request<Interview>(`/interviews/${id}`);
  }

  async createInterview(data: CreateInterviewDto): Promise<Interview> {
    return this.request<Interview>("/interviews", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateInterview(
    id: string,
    data: UpdateInterviewDto
  ): Promise<Interview> {
    return this.request<Interview>(`/interviews/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteInterview(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/interviews/${id}`, {
      method: "DELETE",
    });
  }

  async getInterviewStats(): Promise<InterviewStats> {
    return this.request<InterviewStats>("/interviews/stats");
  }

  async getRecentActivity(): Promise<Interview[]> {
    return this.request<Interview[]>("/interviews/recent");
  }
}

export const apiService = new ApiService();
