import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../services/authApi";

interface UserState {
  user: null | User;
  setUser: (user: null | User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
    }),
    { name: "user-storage" }
  )
);
