import { describe, it, expect, vi, beforeEach } from "vitest";
import { interviewsApi, InterviewStatus, InterviewType } from "../interviewsApi";
import * as api from "../api";

vi.mock("../api", () => ({
  request: vi.fn(),
  requestBlob: vi.fn(),
}));

describe("interviewsApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("getInterviews calls request with correct endpoint", async () => {
    const mockInterviews = [{ id: 1, company: "ACME" }];
    vi.mocked(api.request).mockResolvedValue(mockInterviews);

    const result = await interviewsApi.getInterviews();

    expect(api.request).toHaveBeenCalledWith("/interviews");
    expect(result).toEqual(mockInterviews);
  });

  it("getInterview calls request with correct endpoint", async () => {
    const mockInterview = { id: 1, company: "ACME" };
    vi.mocked(api.request).mockResolvedValue(mockInterview);

    const result = await interviewsApi.getInterview(1);

    expect(api.request).toHaveBeenCalledWith("/interviews/1");
    expect(result).toEqual(mockInterview);
  });

  it("createInterview calls request with correct method and body", async () => {
    const newInterview = {
      company: "Globex",
      position: "Dev",
      date: "2025-01-01",
      status: InterviewStatus.Scheduled,
      type: InterviewType.Video,
    };
    const createdInterview = { id: 2, ...newInterview };
    vi.mocked(api.request).mockResolvedValue(createdInterview);

    const result = await interviewsApi.createInterview(newInterview);

    expect(api.request).toHaveBeenCalledWith("/interviews", {
      method: "POST",
      body: JSON.stringify(newInterview),
    });
    expect(result).toEqual(createdInterview);
  });

  it("updateInterview calls request with correct method and body", async () => {
    const updateData = { company: "Globex Inc" };
    const updatedInterview = { id: 1, company: "Globex Inc" };
    vi.mocked(api.request).mockResolvedValue(updatedInterview);

    const result = await interviewsApi.updateInterview(1, updateData);

    expect(api.request).toHaveBeenCalledWith("/interviews/1", {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
    expect(result).toEqual(updatedInterview);
  });

  it("deleteInterview calls request with correct method", async () => {
    vi.mocked(api.request).mockResolvedValue({ message: "ok" });

    const result = await interviewsApi.deleteInterview(1);

    expect(api.request).toHaveBeenCalledWith("/interviews/1", {
      method: "DELETE",
    });
    expect(result).toEqual({ message: "ok" });
  });

  it("getInterviewStats calls request with correct endpoint", async () => {
    const mockStats = { total: 10, completed: 5 };
    vi.mocked(api.request).mockResolvedValue(mockStats);

    const result = await interviewsApi.getInterviewStats();

    expect(api.request).toHaveBeenCalledWith("/interviews/stats");
    expect(result).toEqual(mockStats);
  });

  it("getRecentActivity calls request with correct endpoint", async () => {
    const mockActivity = [{ id: 1, company: "ACME" }];
    vi.mocked(api.request).mockResolvedValue(mockActivity);

    const result = await interviewsApi.getRecentActivity();

    expect(api.request).toHaveBeenCalledWith("/interviews/recent");
    expect(result).toEqual(mockActivity);
  });

  it("exportInterviewsCsv calls requestBlob with correct headers", async () => {
    const mockBlob = new Blob(["csv data"], { type: "text/csv" });
    vi.mocked(api.requestBlob).mockResolvedValue(mockBlob);

    const result = await interviewsApi.exportInterviewsCsv();

    expect(api.requestBlob).toHaveBeenCalledWith("/interviews/export", {
      headers: {
        Accept: "text/csv",
      },
    });
    expect(result).toEqual(mockBlob);
  });
});
