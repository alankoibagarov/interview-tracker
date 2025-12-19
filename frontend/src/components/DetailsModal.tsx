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
import Timeline from "./Timeline";
import { formatDate } from "../helpers/date";
import { useUserStore } from "../store/userStore";
import DOMPurify from "dompurify";
import { StarIcon } from "@heroicons/react/16/solid";

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

type SafeHtml = {
  __html: string;
};

const renderSafeHtml = (
  html: string,
  loading: boolean = false
): React.ReactNode => {
  if (loading) {
    return <div className="mt-1 h-4 w-32 rounded bg-slate-200 animate-pulse" />;
  }

  if (!html) {
    return <div className="text-slate-500">-</div>;
  }

  const cleanHtml: SafeHtml = {
    __html: DOMPurify.sanitize(html),
  };

  return <div dangerouslySetInnerHTML={cleanHtml} />;
};

const DetailsModalFormField = ({
  children,
  label = "",
  value = "",
}: {
  children?: React.ReactNode;
  label: string;
  value: string;
}) => {
  return (
    <div>
      {label && (
        <div className="text-xs uppercase text-slate-500 tracking-wide">
          {label}
        </div>
      )}
      {children}
      {renderSafeHtml(value)}
    </div>
  );
};

const DetailsModal = forwardRef<
  { openDialog: () => void },
  InterviewsModalProps
>(({ closeOnBackdrop = true }, ref) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState(initialForm);
  const [isClosing, setIsClosing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { setInterviews, selectedInterview } = useInterviewsStore();
  const userData = useUserStore((state) => state.user);

  const loadInterviewData = useCallback(async () => {
    try {
      if (!selectedInterview) return;
      setLoading(true);
      const interviewData = await interviewsApi.getInterview(
        selectedInterview.id
      );
      console.log("Loaded interview data:", interviewData);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedInterview]);

  useEffect(() => {
    if (dialogRef.current?.open) {
      loadInterviewData();
    }
  }, [dialogRef.current?.open, loadInterviewData]);

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
      id="detailsModal"
      aria-modal="true"
      aria-hidden="true"
      onMouseDown={handleBackdropMouseDown}
      // Base hidden state + transitions. "is-open" class toggled imperatively.
      className="
          w-full max-w-full xl:max-w-7xl mx-auto
          open:flex open:flex-col items-center justify-center
          rounded-lg border border-slate-200 shadow-xl
          p-0
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div className="flex flex-col xl:flex-row gap-4">
            <div className="flex flex-col gap-4 xl:w-1/2 max-h-[600px] overflow-y-auto">
              <div className="flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                {loading ? (
                  <div className="h-10 w-10 rounded-full bg-slate-100 animate-pulse"></div>
                ) : (
                  <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center text-slate-900 dark:text-white font-semibold">
                    {userData?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
                <div className="flex flex-col flex-1 items-start">
                  {userData?.username && (
                    <DetailsModalFormField
                      label=""
                      value={userData?.username || ""}
                    />
                  )}
                  {userData?.email && (
                    <DetailsModalFormField
                      label=""
                      value={userData?.email || ""}
                    />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="grid gap-4">
                  <DetailsModalFormField
                    label="Company"
                    value={selectedInterview?.company || ""}
                  />
                  <DetailsModalFormField
                    label="Created At"
                    value={formatDate(selectedInterview?.date || "")}
                  />
                </div>
                <div className="grid gap-4">
                  <DetailsModalFormField
                    label="Position"
                    value={selectedInterview?.position || ""}
                  />
                  <DetailsModalFormField
                    label="Follow Up Date"
                    value={formatDate(selectedInterview?.followUpDate || "")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-white p-4">
                <div className="grid gap-4">
                  <DetailsModalFormField
                    label="Status"
                    value={selectedInterview?.status || ""}
                  />

                  <DetailsModalFormField
                    label="Type"
                    value={selectedInterview?.type || ""}
                  />
                </div>
                <div className="grid gap-4">
                  <DetailsModalFormField
                    label="Interviewer"
                    value={selectedInterview?.interviewer || ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 rounded-lg border border-slate-200 bg-white p-4">
                <div className="grid gap-4">
                  <DetailsModalFormField
                    label="Location"
                    value={selectedInterview?.location || ""}
                  />

                  <DetailsModalFormField
                    label="Call Link"
                    value={selectedInterview?.callLink || ""}
                  />

                  <DetailsModalFormField
                    label="Notes"
                    value={selectedInterview?.notes || ""}
                  />
                </div>
                <div className="grid gap-4">
                  <DetailsModalFormField
                    label="Feedback"
                    value={selectedInterview?.feedback || ""}
                  />

                  <DetailsModalFormField
                    label="Rating"
                    value=""
                    children={
                      <div className="relative flex left-[-3px]">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Number(selectedInterview?.rating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            <StarIcon className="h-4 w-4" />
                          </span>
                        ))}
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 xl:w-1/2 max-h-[600px] overflow-y-auto">
              {selectedInterview?.records?.length ? (
                <Timeline items={selectedInterview?.records} />
              ) : (
                <div className="flex flex-1 justify-center items-center">
                  No timeline data is available
                </div>
              )}
            </div>
          </div>
        </form>
        <div className="flex justify-end gap-2 p-6 border-b border-slate-200">
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
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default DetailsModal;
