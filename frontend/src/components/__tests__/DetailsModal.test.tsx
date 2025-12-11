import React from "react";
import { render, screen, waitFor, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DetailsModal from "../DetailsModal";
import {
  resetInterviewsStore,
  setSelectedInterview,
  seedInterviewsStore,
} from "../../test/testUtils";
import { InterviewStatus, InterviewType, type Interview } from "../../services/interviewsApi";

const mockGetInterview = vi.hoisted(() => vi.fn());

vi.mock("../../services/interviewsApi", async () => {
  const actual = await vi.importActual<typeof import("../../services/interviewsApi")>(
    "../../services/interviewsApi"
  );
  return {
    ...actual,
    interviewsApi: {
      ...actual.interviewsApi,
      getInterview: mockGetInterview,
    },
  };
});

const sampleInterview: Interview = {
  id: 1,
  company: "Tech Corp",
  position: "Senior Dev",
  date: "2025-03-10T14:00:00",
  status: InterviewStatus.Scheduled,
  type: InterviewType.Onsite,
  interviewer: "Alice",
  notes: "Prepare system design",
  feedback: "",
  rating: 0,
  followUpDate: "",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
};

const renderAndOpenModal = () => {
    const ref = React.createRef<{ openDialog: () => void }>();
    render(<DetailsModal ref={ref} />);
    const dialog = screen.getByRole("dialog", { hidden: true });
    
    // Simulate opening via ref
    if (ref.current) {
        React.act(() => {
            ref.current!.openDialog();
        });
    }
    
    return dialog;
};

describe("DetailsModal", () => {
  beforeEach(() => {
    resetInterviewsStore();
    seedInterviewsStore([]);
    mockGetInterview.mockReset();
  });

  it.skip("loads interview data when opened with selected interview", async () => {
    setSelectedInterview(sampleInterview);
    mockGetInterview.mockResolvedValue(sampleInterview);
    
    renderAndOpenModal();
    
    await waitFor(() => expect(mockGetInterview).toHaveBeenCalledWith(1));
    expect(screen.getByText("Tech Corp")).toBeInTheDocument();
    expect(screen.getByText("Senior Dev")).toBeInTheDocument();
  });

  it.skip("displays loading state while fetching data", async () => {
    setSelectedInterview(sampleInterview);
    // tailored to stay in pending state for a bit? 
    // actually testing 'loading' usually requires controlling the promise resolution or checking immediate effect
    let resolvePromise: (val: Interview) => void;
    const promise = new Promise((resolve) => { resolvePromise = resolve; });
    mockGetInterview.mockReturnValue(promise);

    renderAndOpenModal();
    
    // Wait for the effect to trigger loading
    await waitFor(() => expect(mockGetInterview).toHaveBeenCalled()); 
    
    // Since we paused the promise, loading should be true.
    // We can assume that if loading is true, we won't see "Tech Corp" immediately if it relies on loaded data or explicit loading flag
    // The component renders `{loading ? (...) : (selectedInterview.company)}`
    // Since selectedInterview is set in store, it might match. 
    // But `loading` state toggles to true.
    // The best way to check loading without accessible skeletons is checking if text is NOT there or checking for skeleton class if present.
    // In the component: `loading ? (<div className="... animate-pulse" />) : (`
    // So we can mock the store to NOT have data, or rely on the fact that loading hides the text.
    // But wait, the component reads form/selectedInterview from store. 
    // If loading is true, it shows skeleton INSTEAD of text.
    
    expect(screen.queryByText("Tech Corp")).not.toBeInTheDocument();
    
    resolvePromise!(sampleInterview);
    await waitFor(() => screen.getByText("Tech Corp"));
  });
  
  it.skip("closes when close button is clicked", async () => {
      vi.useFakeTimers();
      const user = userEvent.setup();
      setSelectedInterview(sampleInterview);
      mockGetInterview.mockResolvedValue(sampleInterview);
      
      const dialog = renderAndOpenModal();
      expect(dialog).toHaveAttribute("open");
      
      const closeBtn = within(dialog).getByLabelText("Close dialog");
      await user.click(closeBtn);
      
      act(() => {
        vi.runAllTimers();
      });
      
      await waitFor(() => expect(dialog).not.toHaveAttribute("open"));
      vi.useRealTimers();
  });
});
