import { create } from "zustand";
import { mockStaff } from "../mock/manage";
import { MOCK_STAFF_LIST } from "../mock/staffs";

export const useStaffStore = create((set, get) => ({
  /* =======================
     STATE
  ======================= */
  staffs: MOCK_STAFF_LIST,
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
      staffs: state.staffs.map((s) => (s.id === updatedStaff.id ? { ...s, ...updatedStaff } : s))
    })),

  // delete staff (MOCK)
  deleteStaff: (id) =>
    set((state) => ({
      staffs: state.staffs.filter((s) => s.id !== id)
    })),

  /* =======================
     API PLACEHOLDER
     (sau này chỉ đổi phần này)
  ======================= */

  fetchStaffs: async () => {
    set({ loading: true });

    // TODO: thay bằng API thật
    // const res = await api.get("/staff");

    set({
      staffs: mockStaff,
      loading: false
    });
  }
}));
