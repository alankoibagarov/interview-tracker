import { type ReactElement } from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";
import type { Interview } from "../services/interviewsApi";
import type { User } from "../services/authApi";
import { useInterviewsStore } from "../store/interviewsStore";
import { useUserStore } from "../store/userStore";

import { ConfirmProvider } from "../components/ConfirmModal";

type RouterOptions = {
  routerProps?: MemoryRouterProps;
};

export const renderWithProviders = (ui: ReactElement) => {
  return render(<ConfirmProvider>{ui}</ConfirmProvider>);
};

export const renderWithRouter = (
  ui: ReactElement,
  { routerProps }: RouterOptions = {}
) => {
  return render(
    <ConfirmProvider>
      <MemoryRouter {...routerProps}>{ui}</MemoryRouter>
    </ConfirmProvider>
  );
};

export const resetInterviewsStore = () => {
  useInterviewsStore.setState({
    interviews: [],
    selectedInterview: null,
  });
  localStorage.removeItem("interviews-storage");
};

export const seedInterviewsStore = (interviews: Interview[]) => {
  useInterviewsStore.setState({
    interviews,
  });
};

export const setSelectedInterview = (interview: Interview | null) => {
  useInterviewsStore.setState({
    selectedInterview: interview,
  });
};

export const resetUserStore = () => {
  useUserStore.setState({
    user: null,
  });
  localStorage.removeItem("user-storage");
};

export const seedUserStore = (user: User) => {
  useUserStore.setState({ user });
};

