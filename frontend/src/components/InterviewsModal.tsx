import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
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

type InterviewsModalProps = {};

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

const InterviewsModal = forwardRef<
  { openDialog: () => void },
  InterviewsModalProps
>((props, ref) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [form, setForm] = useState(initialForm);

  const interviewsStore = useInterviewsStore();
  const { setInterviews, selectedInterview } = interviewsStore;

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    const interviewsModal = document.getElementById(
      "interviewsModal"
    ) as HTMLDialogElement;
    interviewsModal.close();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedInterview) {
      await interviewsApi.updateInterview(selectedInterview.id, form);
    } else {
      await interviewsApi.createInterview(form);
    }
    const data = await interviewsApi.getInterviews();
    setInterviews(data);
    closeDialog();
  };

  useImperativeHandle(ref, () => ({
    openDialog,
  }));

  useEffect(() => {
    const handleOpen = () => {
      if (selectedInterview) {
        const selected: Interview = selectedInterview;
        setForm({
          company: selected.company,
          position: selected.position,
          date: selected.date,
          status: selected.status,
          type: selected.type,
          interviewer: selected.interviewer || "",
          notes: selected.notes || "",
          feedback: selected.feedback || "",
          rating: selected.rating || 0,
          followUpDate: selected.followUpDate || "",
        });
      } else {
        setForm(initialForm);
      }
    };

    handleOpen();
  }, [selectedInterview]);

  return (
    <dialog
      ref={dialogRef}
      id="interviewsModal"
      className="w-full backdrop:bg-slate-950/50 max-w-full xl:max-w-7xl max-h-fit h-screen mx-auto hidden open:flex flex-col items-center justify-center self-center rounded"
    >
      <header className="modal-header flex justify-between items-center w-full mb-4 py-4 border-b border-slate-400 px-8">
        <h2 className="text-lg">Add Interview</h2>
        <button
          className="close-modal-btn cursor-pointer text-lg focus-visible:outline-none"
          onClick={closeDialog}
        >
          ×
        </button>
      </header>
      <div className="modal-body w-full px-8 pb-8 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-col xl:flex-row gap-3">
            <div className="flex flex-col gap-4 xl:w-1/2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  className="border px-3 py-2 rounded"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  name="position"
                  placeholder="Position"
                  className="border px-3 py-2 rounded"
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="position">Position</label>
                <input
                  type="datetime-local"
                  name="date"
                  className="border px-3 py-2 rounded"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="position">Position</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as InterviewStatus,
                    })
                  }
                  className="border px-3 py-2 rounded"
                  required
                >
                  {Object.values(InterviewStatus).map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="position">Position</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={(e) =>
                    setForm({ ...form, type: e.target.value as InterviewType })
                  }
                  className="border px-3 py-2 rounded"
                  required
                >
                  {Object.values(InterviewType).map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-4 xl:w-1/2">
              <div className="flex flex-col gap-2">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  name="interviewer"
                  placeholder="Interviewer"
                  className="border px-3 py-2 rounded"
                  value={form.interviewer}
                  onChange={(e) =>
                    setForm({ ...form, interviewer: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  name="notes"
                  placeholder="Notes"
                  className="border px-3 py-2 rounded"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="position">Position</label>
                <input
                  type="text"
                  name="feedback"
                  placeholder="Feedback"
                  className="border px-3 py-2 rounded"
                  value={form.feedback}
                  onChange={(e) =>
                    setForm({ ...form, feedback: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Rating</label>
                <div className="flex gap-4 h-[38px]">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label key={num} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="rating"
                        value={num}
                        checked={form.rating === num}
                        onChange={() => setForm({ ...form, rating: num })}
                        className="accent-blue-500"
                        required
                      />
                      {num}
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium">Rating</label>
                <input
                  type="datetime-local"
                  name="followUpDate"
                  placeholder="Follow Up Date"
                  className="border px-3 py-2 rounded h-[38px]"
                  value={form.followUpDate}
                  onChange={(e) =>
                    setForm({ ...form, followUpDate: e.target.value })
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className="modal-footer flex justify-end gap-2 mt-4">
            <button
              type="submit"
              className="confirm-button px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
            >
              Confirm
            </button>

            <button
              onClick={closeDialog}
              className="close-button px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
});

export default InterviewsModal;
