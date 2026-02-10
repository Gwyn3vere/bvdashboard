import { create } from "zustand";
import { userService } from "../services/auth.mock";
// import { userService } from "../services/auth";
import { authStorage } from "../utils/mockToken";

const MOCK_DECODE = import.meta.env.VITE_USE_MOCK_DECODE;

export const useAuthStore = create((set) => ({
  user: null,
  initialized: false,

  setUser: (user) => set({ user, initialized: true }),

  init: async () => {
    const res = await userService();

    set({
      user: res.success ? res.user : null,
      initialized: true,
    });
  },

  logout: () => {
    authStorage.clear();
    set({ user: null, initialized: true });
  },
}));
