import { create } from "zustand";
import { APPOINTMENTS } from "../mock/appointments";

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
  appointments: APPOINTMENTS.map(normalizeAppointment),
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

  /**
   * Trả về toàn bộ dữ liệu cần thiết cho WeekView — 7 day cards + urgent panel.
   *
   * @param {number} weekOffset   0 = tuần hiện tại | -1 = tuần trước | +1 = tuần tới
   * @param {string} [baseDate]   Override ngày gốc (YYYY-MM-DD). Mặc định = hôm nay.
   *
   * @returns {{
   *   weekOffset:  number,
   *   startDate:   string,         // "YYYY-MM-DD" thứ Hai
   *   endDate:     string,         // "YYYY-MM-DD" Chủ Nhật
   *   label:       string,         // "Tuần này · 09/03 – 15/03/2026"
   *   days: Array<{
   *     date:           string,    // "YYYY-MM-DD"
   *     dayIndex:       number,    // 0=T2 … 6=CN
   *     label:          string,    // "T2" … "CN"
   *     fullLabel:      string,    // "Thứ Hai" … "Chủ Nhật"
   *     dateDisplay:    string,    // "09/03"
   *     isToday:        boolean,
   *     isWeekend:      boolean,
   *     hasAppointments: boolean,
   *     stats: {
   *       total: number, pending: number,
   *       confirmed: number, done: number, cancelled: number,
   *     },
   *     doctors: Array<{           // bác sĩ có lịch — render avatar dots
   *       doctorId: string, doctorName: string,
   *       doctorTitle: string, count: number,
   *     }>,
   *   }>,
   *   pendingList:  Array<Appointment>,  // tất cả pending cả tuần — urgent panel
   *   weekStats: {                       // tổng hợp toàn tuần
   *     total: number, pending: number,
   *     confirmed: number, done: number, cancelled: number,
   *   },
   * }}
   */
  getWeekStats: (weekOffset = 0, baseDate) => {
    // ── helpers ─────────────────────────────────────────────
    const pad = (n) => String(n).padStart(2, "0");
    const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const toDM = (d) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;

    // thứ Hai của tuần chứa refDate
    const getMonday = (refDate) => {
      const d = new Date(refDate);
      d.setHours(0, 0, 0, 0);
      const diff = (d.getDay() + 6) % 7; // Sun=0 → diff=6, Mon=1 → diff=0
      d.setDate(d.getDate() - diff);
      return d;
    };

    // ── tính thứ Hai của tuần cần lấy ───────────────────────
    const ref = baseDate ? new Date(baseDate) : new Date();
    const monday = getMonday(ref);
    monday.setDate(monday.getDate() + weekOffset * 7);

    // ── 7 ngày trong tuần ───────────────────────────────────
    const DAY_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
    const DAY_FULL = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"];

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(d.getDate() + i);
      return d;
    });

    const startDate = toYMD(weekDates[0]);
    const endDate = toYMD(weekDates[6]);
    const todayStr = toYMD(new Date());

    // ── lấy appointments cả tuần 1 lần ──────────────────────
    const allInWeek = get().appointments.filter((a) => a.appointmentDate >= startDate && a.appointmentDate <= endDate);

    // ── build từng day card ──────────────────────────────────
    const days = weekDates.map((d, i) => {
      const dateStr = toYMD(d);
      const dayAppts = allInWeek.filter((a) => a.appointmentDate === dateStr);

      const stats = {
        total: dayAppts.length,
        pending: dayAppts.filter((a) => a.status === "pending").length,
        confirmed: dayAppts.filter((a) => a.status === "confirmed").length,
        done: dayAppts.filter((a) => a.status === "done").length,
        cancelled: dayAppts.filter((a) => a.status === "cancelled").length,
      };

      // group bác sĩ có lịch trong ngày → avatar dots
      const doctorMap = {};
      dayAppts.forEach((a) => {
        if (!doctorMap[a.doctorId]) {
          doctorMap[a.doctorId] = {
            doctorId: a.doctorId,
            doctorName: a.doctorName,
            doctorTitle: a.doctorTitle,
            count: 0,
          };
        }
        doctorMap[a.doctorId].count++;
      });

      return {
        date: dateStr,
        dayIndex: i,
        label: DAY_LABELS[i],
        fullLabel: DAY_FULL[i],
        dateDisplay: toDM(d),
        isToday: dateStr === todayStr,
        isWeekend: i >= 5,
        hasAppointments: dayAppts.length > 0,
        stats,
        doctors: Object.values(doctorMap),
      };
    });

    // ── pending list cả tuần — urgent panel ─────────────────
    const pendingList = allInWeek
      .filter((a) => a.status === "pending")
      .sort((a, b) => a.appointmentDate.localeCompare(b.appointmentDate) || a.slotStart.localeCompare(b.slotStart));

    // ── tổng hợp toàn tuần ──────────────────────────────────
    const weekStats = {
      total: allInWeek.length,
      pending: allInWeek.filter((a) => a.status === "pending").length,
      confirmed: allInWeek.filter((a) => a.status === "confirmed").length,
      done: allInWeek.filter((a) => a.status === "done").length,
      cancelled: allInWeek.filter((a) => a.status === "cancelled").length,
    };

    // ── label tuần ──────────────────────────────────────────
    const year = weekDates[6].getFullYear();
    const startDisp = toDM(weekDates[0]);
    const endDisp = `${toDM(weekDates[6])}/${year}`;
    const label =
      weekOffset === 0
        ? `Tuần này · ${startDisp} – ${endDisp}`
        : weekOffset === -1
          ? `Tuần trước · ${startDisp} – ${endDisp}`
          : weekOffset === 1
            ? `Tuần tới · ${startDisp} – ${endDisp}`
            : `Tuần ${weekOffset > 0 ? "+" : ""}${weekOffset} · ${startDisp} – ${endDisp}`;

    return { weekOffset, startDate, endDate, label, days, pendingList, weekStats };
  },

  // ── Setters cơ bản ─────────────────────────────────────────
  setAppointments: (appointments) => set({ appointments: appointments.map(normalizeAppointment) }),

  setSelectedAppointmentId: (id) => set({ selectedAppointmentId: id }),

  /**
   * Trả về danh sách bác sĩ có lịch trong ngày — dùng cho DoctorListView.
   *
   * @param {string} date  "YYYY-MM-DD"
   *
   * @returns {Array<{
   *   doctorId: string, doctorName: string, doctorTitle: string,
   *   departmentId: string, departmentName: string,
   *   specialtyId: string, specialtyName: string,
   *   stats: { total, pending, confirmed, done, cancelled },
   *   fillRate: number,           // % active slot (không tính cancelled), dùng cho progress bar
   *   upcomingConfirmed: Array<{  // tối đa 2 lịch confirmed sắp tới — section "Sắp tới"
   *     id, patientName, slotStart, slotEnd,
   *   }>,
   *   pendingAppointments: Array<Appointment>, // pending trong ngày — quick action list
   * }>}
   */
  getDoctorsByDate: (date) => {
    const dayAppts = get().appointments.filter((a) => a.appointmentDate === date);

    // Group by doctorId
    const doctorMap = {};
    dayAppts.forEach((a) => {
      if (!doctorMap[a.doctorId]) {
        doctorMap[a.doctorId] = {
          doctorId: a.doctorId,
          doctorName: a.doctorName,
          doctorTitle: a.doctorTitle,
          departmentId: a.departmentId,
          departmentName: a.departmentName,
          specialtyId: a.specialtyId,
          specialtyName: a.specialtyName,
          appointments: [],
        };
      }
      doctorMap[a.doctorId].appointments.push(a);
    });

    return Object.values(doctorMap).map((doc) => {
      const appts = doc.appointments;

      const stats = {
        total: appts.length,
        pending: appts.filter((a) => a.status === "pending").length,
        confirmed: appts.filter((a) => a.status === "confirmed").length,
        done: appts.filter((a) => a.status === "done").length,
        cancelled: appts.filter((a) => a.status === "cancelled").length,
      };

      // Upcoming: confirmed sort theo giờ, lấy 2 cái đầu
      const upcomingConfirmed = appts
        .filter((a) => a.status === "confirmed")
        .sort((a, b) => a.slotStart.localeCompare(b.slotStart))
        .slice(0, 2)
        .map((a) => ({
          id: a.id,
          patientName: a.patientName,
          slotStart: a.slotStart,
          slotEnd: a.slotEnd,
        }));

      const pendingAppointments = appts.filter((a) => a.status === "pending");

      // fillRate = active (không tính cancelled) / total * 100
      const activeTotal = stats.total - stats.cancelled;
      const fillRate = stats.total > 0 ? Math.round((activeTotal / stats.total) * 100) : 0;

      return {
        doctorId: doc.doctorId,
        doctorName: doc.doctorName,
        doctorTitle: doc.doctorTitle,
        departmentId: doc.departmentId,
        departmentName: doc.departmentName,
        specialtyId: doc.specialtyId,
        specialtyName: doc.specialtyName,
        stats,
        fillRate,
        upcomingConfirmed,
        pendingAppointments,
      };
    });
  },

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

    const data = APPOINTMENTS.filter((a) => a.appointmentDate === date);

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
