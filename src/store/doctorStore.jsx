import { create } from "zustand";
import { MOCK_DOCTOR_LIST, MOCK_DOCTOR_DETAILS } from "../mock/doctors";

export const useDoctorStore = create((set, get) => ({
  doctors: [],
  pagination: {},
  weekRange: {},
  editingDoctorId: null,
  loading: false,

  getDoctorById: (id) => {
    return get().doctors.find((d) => d.id === id);
  },

  createDoctor: (newDoctor) =>
    set((state) => ({
      doctors: [...state.doctors, newDoctor],
    })),

  setDoctors: (doctors) => set({ doctors }),

  setEditingDoctorId: (id) => set({ editingDoctorId: id }),

  updateDoctor: (updatedDoctor) =>
    set((state) => ({
      doctors: state.doctors.map((d) => (d.id === updatedDoctor.id ? { ...d, ...updatedDoctor } : d)),
    })),

  deleteDoctor: (id) =>
    set((state) => ({
      doctors: state.doctors.filter((d) => d.id !== id),
    })),

  fetchDoctors: async () => {
    set({ loading: true });

    const res = MOCK_DOCTOR_LIST;

    const mockDoctor = res.map((doctor) => ({
      ...doctor,
      ...(MOCK_DOCTOR_DETAILS[doctor.slug] || {}),
    }));

    set({
      doctors: mockDoctor,
      loading: false,
    });
  },
}));
