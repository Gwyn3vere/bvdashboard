// ============================================================
//  MOCK_ACTIVITY_LOG
//  Hoạt động gần đây của admin — hiển thị trên Dashboard.
//  Sau này có backend: xóa file này, thay bằng API call trong
//  activityStore.fetchActivities().
// ============================================================

import { LuCalendar, LuCheck, LuCheckCheck, LuPen, LuPlus, LuUserPlus, LuX } from "react-icons/lu";

// ── Action types ─────────────────────────────────────────────
export const ACTION_TYPES = {
  // Lịch hẹn
  APPOINTMENT_CONFIRMED: "APPOINTMENT_CONFIRMED",
  APPOINTMENT_CANCELLED: "APPOINTMENT_CANCELLED",
  APPOINTMENT_DONE: "APPOINTMENT_DONE",
  APPOINTMENT_RESCHEDULED: "APPOINTMENT_RESCHEDULED",
  APPOINTMENT_CREATED: "APPOINTMENT_CREATED",
  // Bài viết
  NEWS_PUBLISHED: "NEWS_PUBLISHED",
  NEWS_REJECTED: "NEWS_REJECTED",
  NEWS_DRAFT: "NEWS_DRAFT",
  // Bác sĩ
  DOCTOR_CREATED: "DOCTOR_CREATED",
  DOCTOR_UPDATED: "DOCTOR_UPDATED",
  // Ca làm việc
  SHIFT_CREATED: "SHIFT_CREATED",
  SHIFT_UPDATED: "SHIFT_UPDATED",
  // Nhân sự
  STAFF_CREATED: "STAFF_CREATED",
  SHIFT_UPDATED: "SHIFT_UPDATED",
  SHIFT_DELETED: "SHIFT__DELETED",
  // Banner
  BANNER_CREATED: "BANNER_CREATED",
  BANNER_UPDATED: "BANNER_UPDATED",
  BANNER_DELETED: "BANNER_DELETED",
  // Chuyên môn
  EXPERTISE_CREATED: "EXPERTISE_CREATED",
  EXPERTISE_UPDATED: "EXPERTISE_UPDATE",
  EXPERTISE_DELETED: "EXPERTISE_DELETED",
};

// ── Label + icon config cho từng action ──────────────────────
export const ACTION_CONFIG = {
  APPOINTMENT_CONFIRMED: {
    label: "Xác nhận lịch hẹn",
    light: "var(--color-primary-100)",
    color: "var(--color-primary)",
    icon: <LuCheck />,
    renderMeta: (meta) => `${meta?.doctorName || ""} • ${meta?.slotStart || ""}`,
  },

  APPOINTMENT_CANCELLED: {
    label: "Huỷ lịch hẹn",
    light: "var(--color-error-100)",
    color: "var(--color-error)",
    icon: <LuX />,
    renderMeta: (meta) => `${meta?.doctorName || ""} • ${meta?.reason || ""}`,
  },

  APPOINTMENT_DONE: {
    label: "Hoàn thành khám",
    light: "var(--color-secondary-100)",
    color: "var(--color-secondary)",
    icon: <LuCheckCheck />,
    renderMeta: (meta) => `${meta?.doctorName || ""} • ${meta?.patientName || ""}`,
  },

  APPOINTMENT_RESCHEDULED: {
    label: "Dời lịch hẹn",
    light: "var(--color-warning-100)",
    color: "var(--color-warning)",
    icon: <LuCalendar />,
    renderMeta: (meta) => `${meta?.doctorName || ""} • ${meta?.newDate || ""} ${meta?.newSlot || ""}`,
  },

  APPOINTMENT_CREATED: {
    label: "Đặt lịch mới",
    light: "var(--color-primary-100)",
    color: "var(--color-primary)",
    icon: <LuPlus />,
    renderMeta: (meta) => `${meta?.doctorName || ""} • ${meta?.slotStart || ""}`,
  },

  NEWS_PUBLISHED: {
    label: "Duyệt bài viết",
    light: "var(--color-primary-100)",
    color: "var(--color-primary)",
    icon: <LuCheck />,
    renderMeta: (meta) => meta?.newsTitle || "",
  },

  NEWS_REJECTED: {
    label: "Từ chối bài viết",
    light: "var(--color-error-100)",
    color: "var(--color-error)",
    icon: <LuX />,
    renderMeta: (meta) => `${meta?.newsTitle || ""} • ${meta?.rejectReason || ""}`,
  },

  NEWS_DRAFT: {
    label: "Lưu nháp bài viết",
    light: "var(--color-secondary-100)",
    color: "var(--color-secondary)",
    icon: <LuPen />,
    renderMeta: (meta) => meta?.newsTitle || "",
  },

  DOCTOR_CREATED: {
    label: "Thêm bác sĩ mới",
    light: "var(--color-primary-100)",
    color: "var(--color-primary)",
    icon: <LuUserPlus />,
    renderMeta: (meta) => `${meta?.doctorName || ""} • ${meta?.specialty || ""}`,
  },

  DOCTOR_UPDATED: {
    label: "Cập nhật bác sĩ",
    light: "var(--color-warning-100)",
    color: "var(--color-warning)",
    icon: <LuPen />,
    renderMeta: (meta) => `${meta?.doctorName || ""} • ${meta?.field || ""}`,
  },

  SHIFT_CREATED: {
    label: "Tạo ca làm việc",
    light: "var(--color-primary-100)",
    color: "var(--color-primary)",
    icon: <LuCalendar />,
    renderMeta: (meta) => `${meta?.doctorName || ""} • ${meta?.session || ""} (${meta?.totalSlots || 0} slots)`,
  },

  SHIFT_UPDATED: {
    label: "Cập nhật ca làm việc",
    light: "var(--color-warning-100)",
    color: "var(--color-warning)",
    icon: <LuCalendar />,
    renderMeta: (meta) => `${meta?.doctorName || ""} • ${meta?.session || ""} (${meta?.totalSlots || 0} slots)`,
  },
};

// ── Mock actors (admin users) ─────────────────────────────────
const ACTORS = [
  { id: "admin-1", name: "Trần Văn Admin", avatar: null },
  { id: "admin-2", name: "Nguyễn Thị Hoa", avatar: null },
  { id: "admin-3", name: "Lê Minh Tuấn", avatar: null },
];

// ── Helper tạo timestamp gần đây ────────────────────────────
function minsAgo(mins) {
  return new Date(Date.now() - mins * 60 * 1000).toISOString();
}
function hoursAgo(hours) {
  return minsAgo(hours * 60);
}
function daysAgo(days) {
  return hoursAgo(days * 24);
}

// ── MOCK_ACTIVITY_LOG ────────────────────────────────────────
export const MOCK_ACTIVITY_LOG = [
  {
    id: "act-001",
    action: ACTION_TYPES.APPOINTMENT_CONFIRMED,
    actor: ACTORS[0],
    target: "Lịch hẹn của Nguyễn Minh Tuấn",
    targetId: "appt-001",
    targetType: "APPOINTMENT",
    meta: {
      doctorName: "Nguyễn Văn A",
      patientName: "Nguyễn Minh Tuấn",
      slotStart: "08:00",
    },
    createdAt: minsAgo(5),
  },
  {
    id: "act-002",
    action: ACTION_TYPES.APPOINTMENT_CREATED,
    actor: ACTORS[1],
    target: "Lịch hẹn của Lê Thị Phương",
    targetId: "appt-013",
    targetType: "APPOINTMENT",
    meta: {
      doctorName: "Trần Thị B",
      patientName: "Lê Thị Phương",
      slotStart: "09:00",
    },
    createdAt: minsAgo(18),
  },
  {
    id: "act-003",
    action: ACTION_TYPES.NEWS_PUBLISHED,
    actor: ACTORS[0],
    target: "Phòng chống cúm mùa 2026",
    targetId: "news-003",
    targetType: "NEWS",
    meta: {
      newsTitle: "Phòng chống cúm mùa 2026",
    },
    createdAt: minsAgo(42),
  },
  {
    id: "act-004",
    action: ACTION_TYPES.APPOINTMENT_CANCELLED,
    actor: ACTORS[2],
    target: "Lịch hẹn của Hoàng Văn Bình",
    targetId: "appt-006",
    targetType: "APPOINTMENT",
    meta: {
      doctorName: "Nguyễn Thị H",
      patientName: "Hoàng Văn Bình",
      reason: "Bệnh nhân bận đột xuất.",
    },
    createdAt: hoursAgo(1),
  },
  {
    id: "act-005",
    action: ACTION_TYPES.SHIFT_CREATED,
    actor: ACTORS[0],
    target: "Ca sáng Thứ Tư của BS. Lê Văn C",
    targetId: "shift-3-2026-03-11-morning",
    targetType: "SHIFT",
    meta: {
      doctorName: "Lê Văn C",
      session: "Buổi sáng",
      totalSlots: 6,
    },
    createdAt: hoursAgo(2),
  },
  {
    id: "act-006",
    action: ACTION_TYPES.APPOINTMENT_CONFIRMED,
    actor: ACTORS[1],
    target: "Lịch hẹn của Bùi Quang Huy",
    targetId: "appt-007",
    targetType: "APPOINTMENT",
    meta: {
      doctorName: "Võ Văn N",
      patientName: "Bùi Quang Huy",
      slotStart: "08:00",
    },
    createdAt: hoursAgo(3),
  },
  {
    id: "act-007",
    action: ACTION_TYPES.DOCTOR_UPDATED,
    actor: ACTORS[0],
    target: "BS. Nguyễn Thị H",
    targetId: "8",
    targetType: "DOCTOR",
    meta: {
      doctorName: "Nguyễn Thị H",
      field: "Chuyên môn",
    },
    createdAt: hoursAgo(4),
  },
  {
    id: "act-008",
    action: ACTION_TYPES.NEWS_REJECTED,
    actor: ACTORS[2],
    target: "Hướng dẫn chăm sóc sau phẫu thuật",
    targetId: "news-005",
    targetType: "NEWS",
    meta: {
      newsTitle: "Hướng dẫn chăm sóc sau phẫu thuật",
      rejectReason: "Nội dung chưa đầy đủ thông tin.",
    },
    createdAt: hoursAgo(5),
  },
  {
    id: "act-009",
    action: ACTION_TYPES.APPOINTMENT_RESCHEDULED,
    actor: ACTORS[1],
    target: "Lịch hẹn của Đinh Văn Tùng",
    targetId: "appt-011",
    targetType: "APPOINTMENT",
    meta: {
      doctorName: "Phạm Văn S",
      patientName: "Đinh Văn Tùng",
      newDate: "2026-03-15",
      newSlot: "09:00",
    },
    createdAt: hoursAgo(6),
  },
  {
    id: "act-010",
    action: ACTION_TYPES.DOCTOR_CREATED,
    actor: ACTORS[0],
    target: "BS. Đào Thị Túy Duyên",
    targetId: "16",
    targetType: "DOCTOR",
    meta: {
      doctorName: "Đào Thị Túy Duyên",
      specialty: "Nhi khoa",
    },
    createdAt: daysAgo(1),
  },
  {
    id: "act-011",
    action: ACTION_TYPES.APPOINTMENT_DONE,
    actor: ACTORS[2],
    target: "Lịch hẹn của Nguyễn Thị Hồng Vân",
    targetId: "appt-023",
    targetType: "APPOINTMENT",
    meta: {
      doctorName: "Lê Văn P",
      patientName: "Nguyễn Thị Hồng Vân",
    },
    createdAt: daysAgo(1),
  },
  {
    id: "act-012",
    action: ACTION_TYPES.NEWS_PUBLISHED,
    actor: ACTORS[1],
    target: "Lịch tiêm chủng mở rộng tháng 3",
    targetId: "news-007",
    targetType: "NEWS",
    meta: {
      newsTitle: "Lịch tiêm chủng mở rộng tháng 3",
    },
    createdAt: daysAgo(1),
  },
  {
    id: "act-013",
    action: ACTION_TYPES.SHIFT_UPDATED,
    actor: ACTORS[0],
    target: "Ca sáng Thứ Năm của BS. Phạm Thị D",
    targetId: "shift-4-2026-03-12-morning",
    targetType: "SHIFT",
    meta: {
      doctorName: "Phạm Thị D",
      session: "Buổi sáng",
      totalSlots: 5,
    },
    createdAt: daysAgo(2),
  },
  {
    id: "act-014",
    action: ACTION_TYPES.APPOINTMENT_CONFIRMED,
    actor: ACTORS[2],
    target: "Lịch hẹn của Lưu Thị Kim Chi",
    targetId: "appt-021",
    targetType: "APPOINTMENT",
    meta: {
      doctorName: "Đặng Văn G",
      patientName: "Lưu Thị Kim Chi",
      slotStart: "08:00",
    },
    createdAt: daysAgo(2),
  },
  {
    id: "act-015",
    action: ACTION_TYPES.APPOINTMENT_CANCELLED,
    actor: ACTORS[0],
    target: "Lịch hẹn của Đinh Quang Minh",
    targetId: "appt-029",
    targetType: "APPOINTMENT",
    meta: {
      doctorName: "Phạm Văn S",
      patientName: "Đinh Quang Minh",
      reason: "Bệnh nhân bị tai nạn.",
    },
    createdAt: daysAgo(2),
  },
];
