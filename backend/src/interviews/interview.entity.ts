export interface Interview {
  id: string;
  company: string;
  position: string;
  date: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  type: 'phone' | 'video' | 'onsite' | 'technical' | 'behavioral';
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
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  type: 'phone' | 'video' | 'onsite' | 'technical' | 'behavioral';
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
  status?: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  type?: 'phone' | 'video' | 'onsite' | 'technical' | 'behavioral';
  interviewer?: string;
  notes?: string;
  feedback?: string;
  rating?: number;
  followUpDate?: string;
}
