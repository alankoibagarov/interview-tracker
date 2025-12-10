import React from "react";
import {
  act,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InterviewsModal from "../InterviewsModal";
import {
  InterviewStatus,
  InterviewType,
  type Interview,
} from "../../services/interviewsApi";
import {
  resetInterviewsStore,
  setSelectedInterview,
  seedInterviewsStore,
} from "../../test/testUtils";

const mockCreate = vi.hoisted(() => vi.fn().mockResolvedValue(null));
const mockUpdate = vi.hoisted(() => vi.fn().mockResolvedValue(null));
const mockGet = vi.hoisted(() => vi.fn().mockResolvedValue([]));

vi.mock("../../services/interviewsApi", async () => {
  const actual = await vi.importActual<
    typeof import("../../services/interviewsApi")
  >("../../services/interviewsApi");
  return {
    ...actual,
    interviewsApi: {
      createInterview: mockCreate,
      updateInterview: mockUpdate,
      getInterviews: mockGet,
    },
  };
});

const getInputByLabel = (label: string) => {
  const labelNode = screen.getByText(label);
  const container = labelNode.parentElement;
  const input = container?.querySelector(
    "input, textarea, select"
  ) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
  if (!input) {
    throw new Error(`Input for ${label} not found`);
  }
  return input;
};

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

const renderAndOpenModal = () => {
  const ref = React.createRef<{ openDialog: () => void }>();
  render(<InterviewsModal ref={ref} />);
  act(() => {
    ref.current?.openDialog();
  });
  const dialog = screen.getByRole("dialog", { hidden: true });
  dialog.removeAttribute("aria-hidden");
  return dialog;
};

describe("InterviewsModal", () => {
  beforeEach(() => {
    resetInterviewsStore();
    seedInterviewsStore([]);
    mockCreate.mockClear();
    mockUpdate.mockClear();
    mockGet.mockClear();
  });

  it("prefills form when an interview is selected", () => {
    setSelectedInterview(sampleInterview);
    render(<InterviewsModal />);

    expect(screen.getByDisplayValue("ACME")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Frontend")).toBeInTheDocument();
  });

  it("creates a new interview when submitting in add mode", { timeout: 15000 }, async () => {
    const user = userEvent.setup();
    setSelectedInterview(null);
    const dialog = renderAndOpenModal();

    await user.type(screen.getByPlaceholderText("Company"), "Globex");
    await user.type(screen.getByPlaceholderText("Position"), "Developer");
    await user.type(getInputByLabel("Date & Time"), "2025-11-20T10:30");
    await user.type(
      screen.getByPlaceholderText("Interviewer"),
      "Alex Recruiter"
    );
    await user.type(getInputByLabel("Follow Up Date"), "2025-12-01T09:00");
    await user.click(screen.getByLabelText("4"));

    await user.click(
      within(dialog).getByRole("button", { name: "Confirm" })
    );

    await waitFor(() => expect(mockCreate).toHaveBeenCalled());
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalled();
  });

  it("updates an existing interview when editing", async () => {
    const user = userEvent.setup();
    setSelectedInterview(sampleInterview);
    const dialog = renderAndOpenModal();

    const companyInput = screen.getByPlaceholderText("Company");
    await user.clear(companyInput);
    await user.type(companyInput, "ACME Updated");

    await user.click(
      within(dialog).getByRole("button", { name: "Confirm" })
    );

    await waitFor(() =>
      expect(mockUpdate).toHaveBeenCalledWith(1, expect.objectContaining({
        company: "ACME Updated",
      }))
    );
    expect(mockCreate).not.toHaveBeenCalled();
  });
});

