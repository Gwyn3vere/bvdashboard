export const DOCTOR_STATUS = {
  ON_SHIFT: {
    label: "Đang làm việc",
    color: "bg-[var(--color-secondary)]",
  },
  OFF_SHIFT: {
    label: "Hết ca",
    color: "bg-[var(--color-unavailable)]",
  },
  ON_LEAVE: {
    label: "Nghỉ phép",
    color: "bg-[var(--color-warning)]",
  },
  TERMINATED: {
    label: "Ngưng làm việc",
    color: "bg-[var(--color-error)]",
  },
};

export const STAFF_STATUS = {
  ALL: {
    label: "Tất cả",
    color: "bg-[var(--color-grd-primary)]",
  },
  TRUE: {
    label: "Đang làm việc",
    color: "bg-[var(--color-secondary)]",
  },
  FALSE: {
    label: "Tạm nghỉ",
    color: "bg-[var(--color-error)]",
  },
  ADMIN: {
    label: "Quản trị viên",
    color: "bg-[var(--color-primary)]",
  },
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: {
    label: "Đã đặt lịch",
    color: "var(--color-secondary)",
  },
  RESCHEDULED: {
    label: "Đã dời lịch",
    color: "var(--color-purple)",
  },
  CONFIRMED: {
    label: "Đã xác nhận",
    color: "var(--color-cyan)",
  },
  COMPLETED: {
    label: "Đã hoàn thành",
    color: "var(--color-primary)",
  },
  CANCELLED: {
    label: "Đã hủy",
    color: "var(--color-error)",
  },
  NO_SHOW: {
    label: "Không đến",
    color: "var(--color-warning)",
  },
};

export const PATIENT_STATUS = {
  NEW_PATIENT: {
    label: "Bệnh nhân mới",
    color: "var(--color-secondary)",
  },
  RECOVERED: {
    label: "Đã hồi phục",
    color: "var(--color-primary)",
  },
  IN_TREATMENT: {
    label: "Đang điều trị",
    color: "var(--color-warning)",
  },
};

export const SYNC_ENUM = Object.freeze({
  DIRTY: "dirty",
  SYNCING: "syncing",
  SYNCED: "synced",
  ERROR: "error",
});

export const SYNC_STATUS_META = {
  [SYNC_ENUM.DIRTY]: {
    label: "Bản nháp",
    color: "var(--color-secondary)",
  },
  [SYNC_ENUM.SYNCING]: {
    label: "Đang tiến hành đồng bộ với hệ thống",
    color: "var(--color-primary)",
  },
  [SYNC_ENUM.SYNCED]: {
    label: "Đã đồng bộ với hệ thống",
    color: "var(--color-primary)",
  },
  [SYNC_ENUM.ERROR]: {
    label: "Lỗi hệ thống",
    color: "var(--color-error)",
  },
};

export const NEWS_STATUS = {
  PUBLISHED: {
    label: "Đã xuất bản",
    color: "var(--color-primary)",
  },
  DRAFT: {
    label: "Bản nháp",
    color: "var(--color-secondary)",
  },
  WAITING: {
    label: "Chờ duyệt",
    color: "var(--color-purple)",
  },
  ARCHIVED: {
    label: "Lưu trữ",
    color: "var(--color-unavailable)",
  },
  REJECTED: {
    label: "Từ chối",
    color: "var(--color-error)",
  },
};
