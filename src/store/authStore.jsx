import { create } from "zustand";
import { userService } from "../services/auth.mock";
import { authStorage } from "../utils/mockToken";

const MOCK_DECODE = import.meta.env.VITE_USE_MOCK_DECODE;

export const useAuthStore = create((set) => ({
  user: null,
  initialized: false,

  init: async () => {
    const res = await userService();
    console.log(res);

    if (res.success) {
      set({ user: res.user, initialized: true });
    } else {
      set({ user: null, initialized: true });
    }
  },

  logout: () => {
    authStorage.clear();
    set({ user: null });
  },
}));
