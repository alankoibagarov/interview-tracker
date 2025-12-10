import { create, type StateCreator } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";
import type { Interview } from "../services/interviewsApi";

interface InterviewsState {
  interviews: Interview[];
  setInterviews: (interviews: Interview[]) => void;
  addInterview: (interview: Interview) => void;
  updateInterview: (id: number, updatedInterview: Partial<Interview>) => void;
  deleteInterview: (id: number) => void;

  selectedInterview: Interview | null;
  setSelectedInterview: (interview: Interview | null) => void;
}

export const useInterviewsStore = create<InterviewsState>()(
  (persist as (
    config: StateCreator<InterviewsState>,
    options: PersistOptions<InterviewsState>
  ) => StateCreator<InterviewsState>)(
    (set) => ({
      interviews: [],

      setInterviews: (interviews) => set({ interviews }),
      addInterview: (interview) =>
        set((state) => ({ interviews: [interview, ...state.interviews] })),
      updateInterview: (id, updatedInterview) =>
        set((state) => ({
          interviews: state.interviews.map((interview) =>
            interview.id === id
              ? { ...interview, ...updatedInterview }
              : interview
          ),
        })),
      deleteInterview: (id) =>
        set((state) => ({
          interviews: state.interviews.filter(
            (interview) => interview.id !== id
          ),
        })),

      selectedInterview: null,
      setSelectedInterview: (interview: Interview | null) =>
        set({ selectedInterview: interview }),
    }),
    { name: "interviews-storage" }
  )
);
