import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (value: boolean | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null,
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
}));
