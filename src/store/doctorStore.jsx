import { create } from "zustand";
import { MOCK_DOCTOR_LIST, MOCK_DOCTOR_DETAILS } from "../mock/doctors";

const mockDoctor = MOCK_DOCTOR_LIST.map((doctor) => ({
  ...doctor,
  ...(MOCK_DOCTOR_DETAILS[doctor.slug] || {})
}));

export const useDoctorStore = create((set, get) => ({
  /* =======================
     STATE
  ======================= */
  doctors: mockDoctor,
  editingDoctorId: null,
  loading: false,

  /* =======================
     GETTERS (selectors)
  ======================= */
  getDoctorById: (id) => {
    return get().doctors.find((d) => d.id === id);
  },

  /* =======================
     ACTIONS
  ======================= */

  // CREATE
  createDoctor: (newDoctor) =>
    set((state) => ({
      doctors: [...state.doctors, newDoctor]
    })),

  // dùng cho List
  setDoctors: (doctors) => set({ doctors }),

  // mở modal edit
  setEditingDoctorId: (id) => set({ editingDoctorId: id }),

  // update doctor (MOCK)
  updateDoctor: (updatedDoctor) =>
    set((state) => ({
      doctors: state.doctors.map((d) => (d.id === updatedDoctor.id ? { ...d, ...updatedDoctor } : d))
    })),

  // delete doctor (MOCK)
  deleteDoctor: (id) =>
    set((state) => ({
      doctors: state.doctors.filter((d) => d.id !== id)
    })),

  /* =======================
     API PLACEHOLDER
     (sau này chỉ đổi phần này)
  ======================= */

  fetchDoctors: async () => {
    set({ loading: true });

    // TODO: thay bằng API thật
    // const res = await api.get("/doctors");

    set({
      doctors: mockDoctor,
      loading: false
    });
  }
}));
