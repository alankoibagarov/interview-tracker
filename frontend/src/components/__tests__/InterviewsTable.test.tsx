import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InterviewsTable from "../InterviewsTable";
import {
  InterviewStatus,
  InterviewType,
  type Interview,
} from "../../services/interviewsApi";
import {
  resetInterviewsStore,
  seedInterviewsStore,
} from "../../test/testUtils";
import { useInterviewsStore } from "../../store/interviewsStore";

const mockGet = vi.hoisted(() => vi.fn());
const mockDelete = vi.hoisted(() =>
  vi.fn().mockResolvedValue({ message: "ok" })
);
const mockExport = vi.hoisted(() => vi.fn().mockResolvedValue(new Blob(["csv"], { type: "text/csv" })));

vi.mock("../../services/interviewsApi", async () => {
  const actual = await vi.importActual<
    typeof import("../../services/interviewsApi")
  >("../../services/interviewsApi");
  return {
    ...actual,
    interviewsApi: {
      getInterviews: mockGet,
      deleteInterview: mockDelete,
      exportInterviewsCsv: mockExport,
    },
  };
});

const interviews: Interview[] = [
  {
    id: 1,
    company: "ACME",
    position: "Frontend",
    date: "2025-01-01T10:00:00.000Z",
    status: InterviewStatus.Completed,
    type: InterviewType.Onsite,
    interviewer: "Sam",
    notes: "",
    feedback: "",
    rating: 4,
    followUpDate: "",
    createdAt: "",
    updatedAt: "",
  },
  {
    id: 2,
    company: "Globex",
    position: "Backend",
    date: "2025-02-01T12:00:00.000Z",
    status: InterviewStatus.Scheduled,
    type: InterviewType.Video,
    interviewer: "Taylor",
    notes: "",
    feedback: "",
    rating: 0,
    followUpDate: "",
    createdAt: "",
    updatedAt: "",
  },
];

describe("InterviewsTable", () => {
  beforeEach(() => {
    resetInterviewsStore();
    seedInterviewsStore([]);
    mockGet.mockReset();
    mockDelete.mockReset();
    mockExport.mockReset();
    mockGet.mockResolvedValue(interviews);

    // Mock global interactions
    global.confirm = vi.fn(() => true);
    global.alert = vi.fn();
    global.URL.createObjectURL = vi.fn(() => "blob:url");
    global.URL.revokeObjectURL = vi.fn();
  });

  it("loads interviews on mount and displays rows", async () => {
    render(
      <InterviewsTable openDialog={vi.fn()} openDetailsDialog={vi.fn()} />
    );

    await waitFor(() => expect(mockGet).toHaveBeenCalled());
    expect(await screen.findByText("ACME")).toBeInTheDocument();
    expect(screen.getByText("Globex")).toBeInTheDocument();
  });

  it("opens edit and details actions with selected interview set", async () => {
    const openDialog = vi.fn();
    const openDetails = vi.fn();
    render(
      <InterviewsTable openDialog={openDialog} openDetailsDialog={openDetails} />
    );

    await screen.findByText("ACME");

    const clickAction = async (company: string, title: string) => {
      const row = screen.getByText(company).closest("tr");
      if (!row) {
        throw new Error("Row not found");
      }
      await userEvent.click(within(row).getByTitle(title));
    };

    await clickAction("ACME", "Edit");
    expect(openDialog).toHaveBeenCalled();
    expect(useInterviewsStore.getState().selectedInterview?.company).toBe(
      "ACME"
    );

    await clickAction("Globex", "Details");
    expect(openDetails).toHaveBeenCalled();
    expect(useInterviewsStore.getState().selectedInterview?.company).toBe(
      "Globex"
    );
  });

  it("does not delete interview when user cancels confirmation", async () => {
    vi.mocked(global.confirm).mockReturnValue(false);
    render(
      <InterviewsTable openDialog={vi.fn()} openDetailsDialog={vi.fn()} />
    );
    await screen.findByText("ACME");

    const row = screen.getByText("ACME").closest("tr")!;
    await userEvent.click(within(row).getByTitle("Delete"));

    expect(global.confirm).toHaveBeenCalled();
    expect(mockDelete).not.toHaveBeenCalled();
  });

  it("exports interviews to CSV when export button is clicked", async () => {
    render(
      <InterviewsTable openDialog={vi.fn()} openDetailsDialog={vi.fn()} />
    );
    await screen.findByText("ACME");

    const exportBtn = screen.getByTitle("Download Excel file");
    await userEvent.click(exportBtn);

    await waitFor(() => expect(mockExport).toHaveBeenCalled());
    expect(global.URL.createObjectURL).toHaveBeenCalled();
  });
});

