import { create } from "zustand";
import { MOCK_DEPARTMENTS } from "../mock/expertise";

export const useDepartmentStore = create((set, get) => ({
  /* =======================
     STATE
  ======================= */
  departments: MOCK_DEPARTMENTS,
  editingDepartmentId: null,
  loading: false,

  /* =======================
     GETTERS
  ======================= */
  getDepartmentById: (id) => {
    return get().departments.find((d) => d.id === id);
  },

  getDepartmentsByGroupId: (groupId) => {
    return get().departments.filter((d) => d.groupId === groupId);
  },

  /* =======================
     ACTIONS
  ======================= */

  setDepartments: (departments) => set({ departments }),

  setEditingDepartmentId: (id) => set({ editingDepartmentId: id }),

  createDepartment: (department) =>
    set((state) => ({
      departments: [...state.departments, department]
    })),

  updateDepartment: (updatedDepartment) =>
    set((state) => ({
      departments: state.departments.map((d) => (d.id === updatedDepartment.id ? { ...d, ...updatedDepartment } : d))
    })),

  deleteDepartment: (id) =>
    set((state) => ({
      departments: state.departments.filter((d) => d.id !== id)
    })),

  /* =======================
     API PLACEHOLDER
  ======================= */
  fetchDepartments: async () => {
    set({ loading: true });

    // const res = await api.get("/departments");

    set({
      departments: MOCK_DEPARTMENTS,
      loading: false
    });
  }
}));
