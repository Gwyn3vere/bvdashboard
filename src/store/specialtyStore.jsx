import { create } from "zustand";
import { MOCK_SPECIALTIES } from "../mock/expertise";

export const useSpecialtyStore = create((set, get) => ({
  /* =======================
     STATE
  ======================= */
  specialties: MOCK_SPECIALTIES,
  editingSpecialtyId: null,
  loading: false,

  /* =======================
     GETTERS
  ======================= */
  getSpecialtyById: (id) => {
    return get().specialties.find((s) => s.id === id);
  },

  getSpecialtiesByDepartmentId: (departmentId) => {
    return get().specialties.filter((s) => s.departmentId === departmentId);
  },

  /* =======================
     ACTIONS
  ======================= */

  setSpecialties: (specialties) => set({ specialties }),

  setEditingSpecialtyId: (id) => set({ editingSpecialtyId: id }),

  createSpecialty: (specialty) =>
    set((state) => ({
      specialties: [...state.specialties, specialty]
    })),

  updateSpecialty: (updatedSpecialty) =>
    set((state) => ({
      specialties: state.specialties.map((s) => (s.id === updatedSpecialty.id ? { ...s, ...updatedSpecialty } : s))
    })),

  deleteSpecialty: (id) =>
    set((state) => ({
      specialties: state.specialties.filter((s) => s.id !== id)
    })),

  /* =======================
     API PLACEHOLDER
  ======================= */
  fetchSpecialties: async () => {
    set({ loading: true });

    // const res = await api.get("/specialties");

    set({
      specialties: MOCK_SPECIALTIES,
      loading: false
    });
  }
}));
