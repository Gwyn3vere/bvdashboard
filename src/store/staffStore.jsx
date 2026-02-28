import { create } from "zustand";
import { MOCK_STAFF_LIST } from "../mock/staffs";
import { fetchUsersService } from "../services/staff";

// const result = await fetchUsersService();

export const useStaffStore = create((set, get) => ({
  staffs: [],
  editingStaffId: null,
  loading: false,

  getStaffById: (id) => {
    return get().staffs.find((s) => s.id === id);
  },

  setStaffs: (staffs) => set({ staffs }),

  setEditingStaffId: (id) => set({ editingStaffId: id }),

  updateStaff: (updatedStaff) =>
    set((state) => ({
      staffs: state.staffs.map((s) => (s.id === updatedStaff.id ? { ...s, ...updatedStaff } : s)),
    })),

  deleteStaff: (id) =>
    set((state) => ({
      staffs: state.staffs.filter((s) => s.id !== id),
    })),

  fetchStaffs: async () => {
    set({ loading: true });

    const res = MOCK_STAFF_LIST;

    set({
      staffs: res,
      loading: false,
    });
  },
}));
