import { Injectable } from '@nestjs/common';
import {
  Interview,
  CreateInterviewDto,
  UpdateInterviewDto,
} from './interview.entity';

@Injectable()
export class InterviewsService {
  private interviews: Interview[] = [
    {
      id: '1',
      company: 'Google',
      position: 'Software Engineer',
      date: '2024-01-15T10:00:00Z',
      status: 'completed',
      type: 'technical',
      interviewer: 'John Smith',
      notes: 'Strong technical skills, good problem-solving approach',
      feedback: 'Positive feedback, moving to next round',
      rating: 4,
      followUpDate: '2024-01-20T10:00:00Z',
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-15T12:00:00Z',
    },
    {
      id: '2',
      company: 'Microsoft',
      position: 'Frontend Developer',
      date: '2024-01-20T14:00:00Z',
      status: 'scheduled',
      type: 'video',
      interviewer: 'Sarah Johnson',
      notes: 'Focus on React and TypeScript experience',
      createdAt: '2024-01-12T11:00:00Z',
      updatedAt: '2024-01-12T11:00:00Z',
    },
    {
      id: '3',
      company: 'Amazon',
      position: 'Full Stack Developer',
      date: '2024-01-18T16:00:00Z',
      status: 'completed',
      type: 'onsite',
      interviewer: 'Mike Davis',
      notes: 'System design questions were challenging',
      feedback: 'Need to improve system design skills',
      rating: 3,
      createdAt: '2024-01-08T10:00:00Z',
      updatedAt: '2024-01-18T18:00:00Z',
    },
    {
      id: '4',
      company: 'Apple',
      position: 'iOS Developer',
      date: '2024-01-25T11:00:00Z',
      status: 'pending',
      type: 'phone',
      interviewer: 'Lisa Chen',
      notes: 'Initial screening call',
      createdAt: '2024-01-15T14:00:00Z',
      updatedAt: '2024-01-15T14:00:00Z',
    },
    {
      id: '5',
      company: 'Netflix',
      position: 'Backend Engineer',
      date: '2024-01-22T13:00:00Z',
      status: 'cancelled',
      type: 'technical',
      interviewer: 'David Wilson',
      notes: 'Rescheduled due to interviewer availability',
      createdAt: '2024-01-10T16:00:00Z',
      updatedAt: '2024-01-19T09:00:00Z',
    },
    {
      id: '6',
      company: 'Meta',
      position: 'React Developer',
      date: '2024-01-30T15:00:00Z',
      status: 'scheduled',
      type: 'video',
      interviewer: 'Alex Brown',
      notes: 'Prepare for React hooks and state management',
      createdAt: '2024-01-16T12:00:00Z',
      updatedAt: '2024-01-16T12:00:00Z',
    },
    {
      id: '7',
      company: 'Twitter',
      position: 'Software Engineer',
      date: '2024-01-17T10:00:00Z',
      status: 'completed',
      type: 'behavioral',
      interviewer: 'Emma Taylor',
      notes: 'Good communication skills, strong team player',
      feedback: 'Excellent cultural fit, proceeding to technical round',
      rating: 5,
      createdAt: '2024-01-05T08:00:00Z',
      updatedAt: '2024-01-17T11:00:00Z',
    },
    {
      id: '8',
      company: 'Uber',
      position: 'Mobile Developer',
      date: '2024-02-01T14:00:00Z',
      status: 'scheduled',
      type: 'onsite',
      interviewer: 'Chris Lee',
      notes: 'Focus on mobile development and API integration',
      createdAt: '2024-01-18T15:00:00Z',
      updatedAt: '2024-01-18T15:00:00Z',
    },
  ];

  findAll(): Interview[] {
    return this.interviews;
  }

  findOne(id: string): Interview | undefined {
    return this.interviews.find((interview) => interview.id === id);
  }

  create(createInterviewDto: CreateInterviewDto): Interview {
    const newInterview: Interview = {
      id: (this.interviews.length + 1).toString(),
      ...createInterviewDto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.interviews.push(newInterview);
    return newInterview;
  }

  update(
    id: string,
    updateInterviewDto: UpdateInterviewDto,
  ): Interview | undefined {
    const index = this.interviews.findIndex((interview) => interview.id === id);
    if (index === -1) {
      return undefined;
    }

    this.interviews[index] = {
      ...this.interviews[index],
      ...updateInterviewDto,
      updatedAt: new Date().toISOString(),
    };

    return this.interviews[index];
  }

  remove(id: string): boolean {
    const index = this.interviews.findIndex((interview) => interview.id === id);
    if (index === -1) {
      return false;
    }

    this.interviews.splice(index, 1);
    return true;
  }

  getStats() {
    const total = this.interviews.length;
    const completed = this.interviews.filter(
      (i) => i.status === 'completed',
    ).length;
    const scheduled = this.interviews.filter(
      (i) => i.status === 'scheduled',
    ).length;
    const pending = this.interviews.filter(
      (i) => i.status === 'pending',
    ).length;
    const cancelled = this.interviews.filter(
      (i) => i.status === 'cancelled',
    ).length;

    const successRate =
      completed > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      scheduled,
      pending,
      cancelled,
      successRate,
    };
  }

  getRecentActivity() {
    return this.interviews
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      .slice(0, 5);
  }
}
