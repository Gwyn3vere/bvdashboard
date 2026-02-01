import { create } from "zustand";
import { MOCK_GROUPS } from "../mock/expertise";

export const useGroupStore = create((set, get) => ({
  /* =======================
     STATE
  ======================= */
  groups: MOCK_GROUPS,
  editingGroupId: null,
  loading: false,

  /* =======================
     GETTERS (selectors)
  ======================= */
  getGroupById: (id) => {
    return get().groups.find((s) => s.id === id);
  },

  /* =======================
     ACTIONS
  ======================= */

  // dùng cho List
  setGroups: (groups) => set({ groups }),

  // mở modal edit
  setEditingGroupId: (id) => set({ editingGroupId: id }),

  // update group (MOCK)
  updateGroup: (updatedGroup) =>
    set((state) => ({
      groups: state.groups.map((s) => (s.id === updatedGroup.id ? { ...s, ...updatedGroup } : s))
    })),

  // delete group (MOCK)
  deleteGroup: (id) =>
    set((state) => ({
      groups: state.groups.filter((s) => s.id !== id)
    })),

  /* =======================
     API PLACEHOLDER
     (sau này chỉ đổi phần này)
  ======================= */

  fetchGroups: async () => {
    set({ loading: true });

    // TODO: thay bằng API thật
    // const res = await api.get("/groups");

    set({
      groups: MOCK_GROUPS,
      loading: false
    });
  }
}));
