import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/index";

interface AuthState {
  token: string | null;
  userName: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  login: (token: string, userOrName: User | string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userName: null,
      user: null,
      setAuth: (token, user) =>
        set({ token, userName: user.name, user }),
      login: (token, userOrName) => {
        if (typeof userOrName === "string") {
          set({ token, userName: userOrName, user: null });
        } else {
          set({ token, userName: userOrName.name, user: userOrName });
        }
      },
      logout: () => set({ token: null, userName: null, user: null }),
    }),
    {
      name: "rsvp-auth", // unique name for localStorage
      partialize: (state) => ({
        token: state.token,
        userName: state.userName,
        user: state.user,
      }),
    }
  )
);

export default useAuthStore;

