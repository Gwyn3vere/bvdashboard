export const STAFF_ROLE = {
  ADMIN: {
    label: "Quản trị viên",
    color: "var(--color-bg-light-primary-100)",
    background: "var(--color-grd-primary)",
  },
  MEMBER: {
    label: "Thành viên",
    color: "var(--color-unavailable-900)",
    background: "var(--color-unavailable-100)",
  },
};

export const NEWS_STATUS_ROLE = {
  ADMIN: ["DRAFT", "PUBLISHED", "ARCHIVED"],
  MEMBER: ["DRAFT", "WAITING"],
};
