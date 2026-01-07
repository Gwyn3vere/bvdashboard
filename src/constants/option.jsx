export const STAFF_ROLE_OPTIONS = [
  { value: "ADMIN", text: "Quản trị viên" },
  { value: "MEMBER", text: "Thành viên" }
];

export const STAFF_STATUS_OPTIONS = [
  { value: "ACTIVE", text: "Hoạt động" },
  { value: "INACTIVE", text: "Không hoạt động" }
];

export const APPOINTMENT_YEAR_OPTIONS = [
  { value: "2024", text: "2024" },
  { value: "2023", text: "2023" },
  { value: "2022", text: "2022" }
];

export const PATIENT_GENDER_OPTIONS = [
  { value: "MALE", text: "Nam" },
  { value: "FEMALE", text: "Nữ" },
  { value: "OTHER", text: "KHÁC" }
];

export const SESSION_PRESETS = {
  morning: { label: "Buổi sáng", start: "08:00", end: "11:00" },
  afternoon: { label: "Buổi chiều", start: "13:00", end: "17:00" },
  allday: { label: "Cả ngày", start: "08:00", end: "17:00" },
  custom: { label: "Tùy chỉnh", start: "08:00", end: "11:00" }
};

export const WEEK_DAYS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export const COLOR_PALETTE = [
  {
    bg: "var(--color-primary-500)",
    text: "var(--color-primary-900)"
  },
  {
    bg: "var(--color-secondary-500)",
    text: "var(--color-secondary-900)"
  },
  {
    bg: "var(--color-error-500)",
    text: "var(--color-error-900)"
  },
  {
    bg: "var(--color-warning-500)",
    text: "var(--color-warning-900)"
  },
  {
    bg: "var(--color-cyan-500)",
    text: "var(--color-cyan-900)"
  },
  {
    bg: "var(--color-purple-500)",
    text: "var(--color-purple-900)"
  }
];
