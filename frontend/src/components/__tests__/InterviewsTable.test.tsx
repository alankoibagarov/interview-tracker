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

  it("sorts interviews by company", async () => {
    render(<InterviewsTable openDialog={vi.fn()} openDetailsDialog={vi.fn()} />);
    await screen.findByText("ACME");

    const sortBtn = screen.getByText("Company");
    await userEvent.click(sortBtn); // Ascending

    const rows = screen.getAllByRole("row");
    // Row 0 is header. Row 1 should be ACME (first), Row 2 Globex
    // Wait, by default loading -> interviews. Sort field is date desc.
    // ACME date: 2025-01-01. Globex date: 2025-02-01.
    // Desc: Globex, ACME. 
    // If I click Company: "ACME", "Globex". Ascending.
    // ACME < Globex. Row 1 ACME.
    expect(rows[1]).toHaveTextContent("ACME");
    expect(rows[2]).toHaveTextContent("Globex");

    await userEvent.click(sortBtn); // Descending
    const rowsDesc = screen.getAllByRole("row");
    expect(rowsDesc[1]).toHaveTextContent("Globex");
    expect(rowsDesc[2]).toHaveTextContent("ACME");
  });

  it("filters interviews by status", async () => {
    const user = userEvent.setup();
    render(<InterviewsTable openDialog={vi.fn()} openDetailsDialog={vi.fn()} />);
    await screen.findByText("ACME"); 
    await screen.findByText("Globex");

    const filterSelect = screen.getByTestId("filter-status");
    await user.selectOptions(filterSelect, InterviewStatus.Completed);

    expect(screen.getByText("ACME")).toBeInTheDocument();
    expect(screen.queryByText("Globex")).not.toBeInTheDocument();
  });

  it("displays empty state when no interviews match filter", async () => {
    const user = userEvent.setup();
    render(<InterviewsTable openDialog={vi.fn()} openDetailsDialog={vi.fn()} />);
    await screen.findByText("ACME");

    const filterSelect = screen.getByTestId("filter-status");
    await user.selectOptions(filterSelect, InterviewStatus.Pending);

    expect(screen.getByText('No interviews with status "pending"')).toBeInTheDocument();
  });

  it("displays error message when API fails", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockGet.mockRejectedValueOnce(new Error("API Error"));
    render(<InterviewsTable openDialog={vi.fn()} openDetailsDialog={vi.fn()} />);

    await waitFor(() => expect(screen.getByText("Failed to load interviews")).toBeInTheDocument());
    consoleSpy.mockRestore();
  });
});

