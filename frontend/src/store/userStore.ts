import { create } from "zustand";
import type { User } from "../services/authApi";

interface UserState {
  user: null | User;
  setUser: (user: null | User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
