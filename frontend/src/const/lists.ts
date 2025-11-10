import { InterviewStatus, InterviewType } from "../services/interviewsApi";

export const interviewStatuses = Object.values(InterviewStatus).map(
  (status) => status.charAt(0).toUpperCase() + status.slice(1)
);

export const interviewTypes = Object.values(InterviewType).map(
  (type) => type.charAt(0).toUpperCase() + type.slice(1)
);
