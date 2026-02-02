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
     GETTERS
  ======================= */
  getGroupById: (id) => get().groups.find((g) => g.id === id),

  /* =======================
     ACTIONS
  ======================= */

  // CREATE
  createGroup: (newGroup) =>
    set((state) => ({
      groups: [...state.groups, newGroup]
    })),

  // READ (list)
  setGroups: (groups) => set({ groups }),

  // EDIT MODE
  setEditingGroupId: (id) => set({ editingGroupId: id }),

  // UPDATE
  updateGroup: (updatedGroup) =>
    set((state) => ({
      groups: state.groups.map((g) => (g.id === updatedGroup.id ? { ...g, ...updatedGroup } : g))
    })),

  // DELETE
  deleteGroup: (id) =>
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== id)
    })),

  /* =======================
     API PLACEHOLDER
  ======================= */
  fetchGroups: async () => {
    set({ loading: true });

    // const res = await api.get("/groups");

    set({
      groups: MOCK_GROUPS,
      loading: false
    });
  }
}));
