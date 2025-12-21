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
