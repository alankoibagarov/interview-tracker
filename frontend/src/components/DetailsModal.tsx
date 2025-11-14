import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  InterviewStatus,
  InterviewType,
  type CreateInterviewDto,
  type Interview,
} from "../services/interviewsApi";
import { interviewsApi } from "../services/interviewsApi";
import { useInterviewsStore } from "../store/interviewsStore";
import Timeline from "./Timeline";

type InterviewsModalProps = {
  closeOnBackdrop?: boolean;
};

const initialForm: CreateInterviewDto = {
  company: "",
  position: "",
  date: "",
  status: InterviewStatus.Scheduled,
  type: InterviewType.Onsite,
  interviewer: "",
  notes: "",
  feedback: "",
  rating: 0,
  followUpDate: "",
};

const TRANSITION_MS = 250; // keep in sync with Tailwind duration

const DetailsModal = forwardRef<
  { openDialog: () => void },
  InterviewsModalProps
>(({ closeOnBackdrop = true }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState(initialForm);
  const [isClosing, setIsClosing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { setInterviews, selectedInterview } = useInterviewsStore();

  // Imperative API
  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!dialog.open) {
      dialog.showModal();
      // Let it paint once before adding the "open" class (for transitions)
      requestAnimationFrame(() => dialog.classList.add("is-open"));
    }
  };

  const startClose = () => {
    const dialog = dialogRef.current;
    if (!dialog || !dialog.open || isClosing) return;
    setIsClosing(true);
    dialog.classList.remove("is-open"); // triggers reverse transition

    // Close after the animation finishes
    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.target !== dialog) return; // ensure it's the dialog transition
      dialog.removeEventListener("transitionend", onTransitionEnd);
      dialog.close();
      setIsClosing(false);
    };
    dialog.addEventListener("transitionend", onTransitionEnd);

    // Safety timeout (in case transitionend doesn’t fire)
    setTimeout(() => {
      if (dialog.open) dialog.close();
      setIsClosing(false);
    }, TRANSITION_MS + 50);
  };

  useImperativeHandle(ref, () => ({ openDialog }), []);

  // ESC key → animated close
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e: Event) => {
      e.preventDefault(); // prevent instant close
      startClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, []);

  useEffect(() => {
    if (selectedInterview) {
      const s: Interview = selectedInterview;
      setForm({
        company: s.company,
        position: s.position,
        date: s.date,
        status: s.status,
        type: s.type,
        interviewer: s.interviewer || "",
        notes: s.notes || "",
        feedback: s.feedback || "",
        rating: s.rating || 0,
        followUpDate: s.followUpDate || "",
      });
    } else {
      setForm(initialForm);
    }
  }, [selectedInterview]);

  // Backdrop click → animated close
  const handleBackdropMouseDown = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (!closeOnBackdrop) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const rect = dialog.getBoundingClientRect();
    const insidePanel =
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom;
    if (!insidePanel) startClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      if (selectedInterview) {
        await interviewsApi.updateInterview(selectedInterview.id, form);
      } else {
        await interviewsApi.createInterview(form);
      }
      const data = await interviewsApi.getInterviews();
      setInterviews(data);
      startClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="interviewsModal"
      aria-modal="true"
      aria-hidden="true"
      onMouseDown={handleBackdropMouseDown}
      // Base hidden state + transitions. "is-open" class toggled imperatively.
      className="
          w-full max-w-full xl:max-w-7xl mx-auto
          open:flex open:flex-col items-center justify-center
          rounded-lg border border-slate-200 shadow-xl
          py-2 px-0
          transition-all duration-250 ease-out
          opacity-0 scale-95
          backdrop:transition-opacity backdrop:duration-250
          [&::backdrop]:bg-slate-950/50 [&::backdrop]:opacity-0
          z-50 self-center
          is-open:opacity-100 is-open:scale-100
          is-open:[&::backdrop]:opacity-100
        "
    >
      <div
        // Panel wrapper to constrain height & scroll inside
        className="bg-white w-[clamp(20rem,95vw,100%)] max-h-[min(90vh,800px)] rounded-lg overflow-hidden"
      >
        <header className="flex justify-between items-center w-full py-4 border-b border-slate-200 px-6">
          <h2 id="interviewsModalTitle" className="text-lg font-semibold">
            Details
          </h2>
          <button
            type="button"
            onClick={startClose}
            className="cursor-pointer text-xl leading-none rounded p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring"
            aria-label="Close dialog"
          >
            ×
          </button>
        </header>

        <div className="px-6 py-5 overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col xl:flex-row gap-4">
              <div className="flex flex-col gap-4 xl:w-1/2">1</div>
              <div className="flex flex-col gap-4 xl:w-1/2">
                <Timeline
                  items={[
                    { content: 123 },
                    { content: 123 },
                    { content: 123 },
                    { content: 123 },
                    { content: 123 },
                  ]}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="submit"
                disabled={submitting}
                className="
                    px-4 py-2 rounded-lg text-sm
                    bg-green-600 text-white hover:bg-green-700
                    disabled:opacity-60 disabled:cursor-not-allowed
                    focus:outline-none focus-visible:ring
                  "
              >
                {submitting ? "Saving..." : "Confirm"}
              </button>

              <button
                type="button"
                onClick={startClose}
                disabled={submitting}
                className="
                    px-4 py-2 rounded-lg text-sm
                    bg-red-500 text-white hover:bg-red-600
                    disabled:opacity-60 disabled:cursor-not-allowed
                    focus:outline-none focus-visible:ring
                  "
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
});

export default DetailsModal;
