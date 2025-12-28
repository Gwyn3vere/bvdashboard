import { color } from "motion";

export const DOCTOR_STATUS = {
  ON_SHIFT: {
    label: "Đang làm việc",
    color: "bg-[var(--color-secondary)]"
  },
  OFF_SHIFT: {
    label: "Hết ca",
    color: "bg-[var(--color-unavailable)]"
  },
  ON_LEAVE: {
    label: "Nghỉ phép",
    color: "bg-[var(--color-warning)]"
  },
  TERMINATED: {
    label: "Ngưng làm việc",
    color: "bg-[var(--color-error)]"
  }
};

export const STAFF_STATUS = {
  ACTIVE: {
    label: "Hoạt động",
    color: "bg-[var(--color-secondary)]"
  },
  INACTIVE: {
    label: "Không hoạt động",
    color: "bg-[var(--color-error)]"
  }
};

export const APPOINTMENT_STATUS = {
  SCHEDULED: {
    label: "Đã lên lịch",
    color: "var(--color-secondary)"
  },
  COMPLETED: {
    label: "Đã hoàn thành",
    color: "var(--color-primary)"
  },
  CANCELLED: {
    label: "Đã hủy",
    color: "var(--color-error)"
  },
  NO_SHOW: {
    label: "Không đến",
    color: "var(--color-warning)"
  }
};

export const PATIENT_STATUS = {
  NEW_PATIENT: {
    label: "Bệnh nhân mới",
    color: "var(--color-secondary)"
  },
  RECOVERED: {
    label: "Đã hồi phục",
    color: "var(--color-primary)"
  },
  IN_TREATMENT: {
    label: "Đang điều trị",
    color: "var(--color-warning)"
  }
};
