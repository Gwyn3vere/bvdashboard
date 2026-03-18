import { create } from "zustand";
import { MOCK_APPOINTMENTS } from "../mock/appointments";

// ── Normalize ────────────────────────────────────────────────
// Đảm bảo mọi appointment đều có đủ các trường flat để filter/sort dễ dàng
const normalizeAppointment = (item) => ({
  ...item,
  doctorId: item.doctorId || "",
  departmentId: item.departmentId || "",
  specialtyId: item.specialtyId || "",
  serviceId: item.serviceId || "",
  patientName: item.patient?.fullName || "",
  patientPhone: item.patient?.phone || "",
  confirmedAt: item.confirmedAt ?? null,
  cancelledAt: item.cancelledAt ?? null,
  doneAt: item.doneAt ?? null,
  cancelReason: item.cancelReason ?? null,
});

export const useAppointmentStore = create((set, get) => ({
  // ── State ──────────────────────────────────────────────────
  appointments: MOCK_APPOINTMENTS.map(normalizeAppointment),
  selectedAppointmentId: null,
  loading: false,

  // ── Selectors ──────────────────────────────────────────────
  getAppointmentById: (id) => get().appointments.find((a) => a.id === id),

  /** Lọc theo ngày (YYYY-MM-DD) và tuỳ chọn doctorId / departmentId / status */
  getAppointmentsByDate: (date, { doctorId, departmentId, specialtyId, status } = {}) =>
    get().appointments.filter((a) => {
      if (a.appointmentDate !== date) return false;
      if (doctorId && a.doctorId !== doctorId) return false;
      if (departmentId && a.departmentId !== departmentId) return false;
      if (specialtyId && a.specialtyId !== specialtyId) return false;
      if (status && a.status !== status) return false;
      return true;
    }),

  /** Lọc tất cả pending trong một khoảng ngày (dùng cho urgent list view tuần) */
  getPendingByDateRange: (startDate, endDate) =>
    get().appointments.filter(
      (a) => a.status === "pending" && a.appointmentDate >= startDate && a.appointmentDate <= endDate,
    ),

  /** Thống kê theo ngày: { total, pending, confirmed, done, cancelled } */
  getStatsByDate: (date, doctorId) => {
    const list = get().appointments.filter(
      (a) => a.appointmentDate === date && (doctorId ? a.doctorId === doctorId : true),
    );
    return {
      total: list.length,
      pending: list.filter((a) => a.status === "pending").length,
      confirmed: list.filter((a) => a.status === "confirmed").length,
      done: list.filter((a) => a.status === "done").length,
      cancelled: list.filter((a) => a.status === "cancelled").length,
    };
  },

  // ── Setters cơ bản ─────────────────────────────────────────
  setAppointments: (appointments) => set({ appointments: appointments.map(normalizeAppointment) }),

  setSelectedAppointmentId: (id) => set({ selectedAppointmentId: id }),

  // ── CRUD ───────────────────────────────────────────────────
  createAppointment: (newAppointment) => {
    const id = crypto.randomUUID();
    const created = normalizeAppointment({
      ...newAppointment,
      id,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      confirmedAt: null,
      cancelledAt: null,
      doneAt: null,
      cancelReason: null,
    });

    set((state) => ({
      appointments: [created, ...state.appointments],
    }));

    return created;
  },

  updateAppointment: (updatedAppointment) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === updatedAppointment.id
          ? normalizeAppointment({
              ...a,
              ...updatedAppointment,
              updatedAt: new Date().toISOString(),
            })
          : a,
      ),
    })),

  deleteAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.id !== id),
    })),

  // ── Chuyển trạng thái ──────────────────────────────────────
  confirmAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "confirmed",
              confirmedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : a,
      ),
    })),

  cancelAppointment: (id, reason = "") =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "cancelled",
              cancelledAt: new Date().toISOString(),
              cancelReason: reason,
              updatedAt: new Date().toISOString(),
            }
          : a,
      ),
    })),

  markAsDone: (id) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "done",
              doneAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : a,
      ),
    })),

  /** Xác nhận tất cả pending trong một danh sách id */
  confirmAll: (ids) =>
    set((state) => {
      const now = new Date().toISOString();
      return {
        appointments: state.appointments.map((a) =>
          ids.includes(a.id) && a.status === "pending"
            ? { ...a, status: "confirmed", confirmedAt: now, updatedAt: now }
            : a,
        ),
      };
    }),

  /** Dời lịch: cập nhật ngày + giờ mới, reset về pending để xác nhận lại */
  rescheduleAppointment: (id, { appointmentDate, slotStart, slotEnd }) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id
          ? {
              ...a,
              appointmentDate,
              slotStart,
              slotEnd,
              status: "pending",
              confirmedAt: null,
              updatedAt: new Date().toISOString(),
            }
          : a,
      ),
    })),

  // ── Fetch (thay bằng API call thật khi có backend) ─────────
  fetchAppointments: async () => {
    set({ loading: true });

    const data = MOCK_APPOINTMENTS;

    set({
      appointments: data.map(normalizeAppointment),
      loading: false,
    });
  },

  fetchAppointmentsByDate: async (date) => {
    set({ loading: true });

    const data = MOCK_APPOINTMENTS.filter((a) => a.appointmentDate === date);

    set((state) => {
      // Merge: giữ nguyên các ngày khác, cập nhật ngày được fetch
      const others = state.appointments.filter((a) => a.appointmentDate !== date);
      return {
        appointments: [...others, ...data.map(normalizeAppointment)],
        loading: false,
      };
    });
  },
}));
