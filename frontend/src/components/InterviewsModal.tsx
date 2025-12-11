import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  InterviewStatus,
  InterviewType,
  type CreateInterviewDto,
  type Interview,
} from "../services/interviewsApi";
import { interviewsApi } from "../services/interviewsApi";
import { useInterviewsStore } from "../store/interviewsStore";
import Input from "./Input";
import Datepicker from "./Datepicker";
import Select from "./Select";
import RadioGroup from "./RadioGroup";
import { interviewStatuses, interviewTypes } from "../const/lists";

import WysiwygEditor from "./WysiwygEditor";

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
  location: "",
  callLink: "",
  notes: "",
  feedback: "",
  rating: 0,
  followUpDate: "",
};

const TRANSITION_MS = 250; // keep in sync with Tailwind duration

const InterviewsModal = forwardRef<
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

  const startClose = useCallback(() => {
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
  }, [isClosing]);

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
  }, [startClose]);

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
        location: s.location || "",
        callLink: s.callLink || "",
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
        className="bg-white w-[clamp(20rem,95vw,100%)] max-h-[min(90vh,800px)] rounded-lg"
      >
        <header className="flex justify-between items-center w-full py-4 border-b border-slate-200 px-6">
          <h2 id="interviewsModalTitle" className="text-lg font-semibold">
            {selectedInterview ? "Edit Interview" : "Add Interview"}
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
              <div className="flex flex-col gap-4 xl:w-1/2">
                <div className="flex flex-col gap-2">
                  <Input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="Company"
                    label="Company"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    id="position"
                    type="text"
                    name="position"
                    placeholder="Position"
                    label="Position"
                    value={form.position}
                    onChange={(e) =>
                      setForm({ ...form, position: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Datepicker
                    id="date"
                    name="date"
                    label="Date & Time"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Select
                    id="status"
                    name="status"
                    label="Status"
                    options={interviewStatuses}
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value as InterviewStatus,
                      })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Select
                    id="type"
                    name="type"
                    label="Type"
                    value={form.type}
                    options={interviewTypes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as InterviewType,
                      })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="Location (URL)"
                    label="Location (Maps URL)"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    id="callLink"
                    type="text"
                    name="callLink"
                    placeholder="Call Link (URL)"
                    label="Call Link"
                    value={form.callLink}
                    onChange={(e) =>
                      setForm({ ...form, callLink: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 xl:w-1/2">
                <div className="flex flex-col gap-2">
                  <Input
                    id="interviewer"
                    type="text"
                    name="interviewer"
                    placeholder="Interviewer"
                    label="Interviewer"
                    value={form.interviewer}
                    onChange={(e) =>
                      setForm({ ...form, interviewer: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Input
                    id="notes"
                    type="text"
                    name="notes"
                    placeholder="Notes"
                    label="Notes"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <RadioGroup
                    name="rating"
                    selectedValue={form.rating}
                    label="Rating"
                    options={[1, 2, 3, 4, 5]}
                    onChange={(e) =>
                      setForm({ ...form, rating: Number(e.target.value) })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Datepicker
                    id="followUpDate"
                    name="followUpDate"
                    label="Follow Up Date"
                    value={form.followUpDate}
                    onChange={(e) =>
                      setForm({ ...form, followUpDate: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <WysiwygEditor
                    placeholder="Feedback"
                    label="Feedback"
                    value={form.feedback}
                    onChange={(value) =>
                      setForm({ ...form, feedback: value })
                    }
                  />
                  {/* <Textarea
                    id="feedback"
                    type="text"
                    name="feedback"
                    placeholder="Feedback"
                    label="Feedback"
                    rows="3"
                    value={form.feedback}
                    onChange={(e) =>
                      setForm({ ...form, feedback: e.target.value })
                    }
                  /> */}
                </div>
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

export default InterviewsModal;
