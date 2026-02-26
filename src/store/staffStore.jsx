import { create } from "zustand";
import { MOCK_STAFF_LIST } from "../mock/staffs";
import { fetchUsersService } from "../services/staff";

// const result = await fetchUsersService();

export const useStaffStore = create((set, get) => ({
  /* =======================
     STATE
  ======================= */
  staffs: [],
  editingStaffId: null,
  loading: false,

  /* =======================
     GETTERS (selectors)
  ======================= */
  getStaffById: (id) => {
    return get().staffs.find((s) => s.id === id);
  },

  /* =======================
     ACTIONS
  ======================= */

  // dùng cho List
  setStaffs: (staffs) => set({ staffs }),

  // mở modal edit
  setEditingStaffId: (id) => set({ editingStaffId: id }),

  // update staff (MOCK)
  updateStaff: (updatedStaff) =>
    set((state) => ({
      staffs: state.staffs.map((s) => (s.id === updatedStaff.id ? { ...s, ...updatedStaff } : s)),
    })),

  // delete staff (MOCK)
  deleteStaff: (id) =>
    set((state) => ({
      staffs: state.staffs.filter((s) => s.id !== id),
    })),

  /* =======================
     API PLACEHOLDER
     (sau này chỉ đổi phần này)
  ======================= */

  fetchStaffs: async () => {
    set({ loading: true });

    const res = MOCK_STAFF_LIST;

    set({
      staffs: res,
      loading: false,
    });
  },
}));
