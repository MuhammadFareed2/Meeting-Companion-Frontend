import { create } from "zustand";

type SignupState = {
  username: string;
  email: string;
  password: string;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
};

export const useSignupStore = create<SignupState>((set) => ({
  username: "",
  email: "",
  password: "",

  setUsername: (value) => set({ username: value }),
  setEmail: (value) => set({ email: value }),
  setPassword: (value) => set({ password: value }),
}));
