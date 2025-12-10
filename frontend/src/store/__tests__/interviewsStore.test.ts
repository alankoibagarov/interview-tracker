import { describe, it, expect, beforeEach } from "vitest";
import { useInterviewsStore } from "../interviewsStore";
import { InterviewStatus, InterviewType, type Interview } from "../../services/interviewsApi";

const sampleInterview: Interview = {
  id: 1,
  company: "ACME",
  position: "Frontend",
  date: "2025-01-01T10:00",
  status: InterviewStatus.Scheduled,
  type: InterviewType.Onsite,
  interviewer: "Jane",
  notes: "Bring portfolio",
  feedback: "Good",
  rating: 3,
  followUpDate: "2025-01-10T09:00",
  createdAt: "2024-12-01",
  updatedAt: "2024-12-01",
};

describe("interviewsStore", () => {
  beforeEach(() => {
    useInterviewsStore.setState({
      interviews: [],
      selectedInterview: null,
    });
  });

  it("sets interviews", () => {
    useInterviewsStore.getState().setInterviews([sampleInterview]);
    expect(useInterviewsStore.getState().interviews).toEqual([sampleInterview]);
  });

  it("adds an interview to the beginning of the list", () => {
    const existingInterview = { ...sampleInterview, id: 2, company: "Old" };
    useInterviewsStore.getState().setInterviews([existingInterview]);

    useInterviewsStore.getState().addInterview(sampleInterview);

    const state = useInterviewsStore.getState();
    expect(state.interviews).toHaveLength(2);
    expect(state.interviews[0]).toEqual(sampleInterview);
    expect(state.interviews[1]).toEqual(existingInterview);
  });

  it("updates an interview", () => {
    useInterviewsStore.getState().setInterviews([sampleInterview]);

    useInterviewsStore.getState().updateInterview(1, { company: "ACME Updated" });

    const state = useInterviewsStore.getState();
    expect(state.interviews[0].company).toBe("ACME Updated");
    expect(state.interviews[0].position).toBe("Frontend"); // Unchanged
  });

  it("deletes an interview", () => {
    useInterviewsStore.getState().setInterviews([sampleInterview]);

    useInterviewsStore.getState().deleteInterview(1);

    expect(useInterviewsStore.getState().interviews).toHaveLength(0);
  });

  it("sets selected interview", () => {
    useInterviewsStore.getState().setSelectedInterview(sampleInterview);
    expect(useInterviewsStore.getState().selectedInterview).toEqual(sampleInterview);

    useInterviewsStore.getState().setSelectedInterview(null);
    expect(useInterviewsStore.getState().selectedInterview).toBeNull();
  });
});
