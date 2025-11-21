import React from "react";
import { render, screen, act, within } from "@testing-library/react";
import DetailsModal from "../DetailsModal";
import {
  resetInterviewsStore,
  setSelectedInterview,
} from "../../test/testUtils";
import {
  InterviewStatus,
  InterviewType,
  type Interview,
} from "../../services/interviewsApi";

const sampleInterview: Interview = {
  id: 1,
  company: "ACME",
  position: "Frontend",
  date: "2025-01-01T10:00",
  status: InterviewStatus.Scheduled,
  type: InterviewType.Behavioral,
  interviewer: "Sam",
  notes: "",
  feedback: "",
  rating: 4,
  followUpDate: "2025-01-05T09:00",
  createdAt: "",
  updatedAt: "",
};

describe("DetailsModal", () => {
  beforeEach(() => {
    resetInterviewsStore();
    setSelectedInterview(sampleInterview);
  });

  it("exposes an imperative API to open the dialog", () => {
    const ref = React.createRef<{ openDialog: () => void }>();
    render(<DetailsModal ref={ref} />);

    act(() => {
      ref.current?.openDialog();
    });

    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).toHaveAttribute("open");
  });

  it("closes when pressing the cancel button after opening", () => {
    vi.useFakeTimers();
    const ref = React.createRef<{ openDialog: () => void }>();
    render(<DetailsModal ref={ref} />);

    act(() => {
      ref.current?.openDialog();
    });

    const dialog = screen.getByRole("dialog", { hidden: true });
    dialog.removeAttribute("aria-hidden");
    expect(dialog).toHaveAttribute("open");

    act(() => {
      within(dialog).getByRole("button", { name: "Cancel" }).click();
    });

    act(() => {
      vi.runAllTimers();
    });

    expect(dialog).not.toHaveAttribute("open");
    vi.useRealTimers();
  });
});

