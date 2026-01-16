export const STAFF_ROLE_OPTIONS = [
  { value: "ADMIN", name: "Quản trị viên" },
  { value: "MEMBER", name: "Thành viên" }
];

export const STAFF_STATUS_OPTIONS = [
  { value: "ACTIVE", name: "Hoạt động" },
  { value: "INACTIVE", name: "Không hoạt động" }
];

export const APPOINTMENT_YEAR_OPTIONS = [
  { value: "2024", name: "2024" },
  { value: "2023", name: "2023" },
  { value: "2022", name: "2022" }
];

export const PATIENT_GENDER_OPTIONS = [
  { value: "MALE", name: "Nam" },
  { value: "FEMALE", name: "Nữ" },
  { value: "OTHER", name: "KHÁC" }
];

export const DEPARTMENTS_OPTIONS = [
  // Khối Lâm sàng
  { id: "noi", value: "INTERNAL_MEDICINE", name: "Khoa Nội", block: "LAM_SANG" },
  { id: "ngoai", value: "SURGERY", name: "Khoa Ngoại", block: "LAM_SANG" },
  { id: "san", value: "OBSTETRICS_GYNECOLOGY", name: "Khoa CSSKSS & Phụ Sản", block: "LAM_SANG" },
  { id: "kham-benh", value: "OUTPATIENT", name: "Khoa Khám Bệnh", block: "LAM_SANG" },
  { id: "cap-cuu", value: "EMERGENCY_ICU", name: "Khoa Cấp cứu - Hồi sức tích cực", block: "LAM_SANG" },
  { id: "gmhs", value: "ANESTHESIOLOGY", name: "Khoa Phẫu thuật - Gây mê hồi sức", block: "LAM_SANG" },
  { id: "nhi", value: "PEDIATRICS", name: "Khoa Nhi", block: "LAM_SANG" },
  { id: "truyen-nhiem", value: "INFECTIOUS_DISEASES", name: "Khoa Truyền Nhiễm", block: "LAM_SANG" },
  { id: "yhct-phcn", value: "TRADITIONAL_REHABILITATION", name: "Khoa YHCT và PHCN", block: "LAM_SANG" },
  { id: "rhm-m-tmh", value: "DENTAL_ENT_OPHTHALMOLOGY", name: "Khoa RHM - M - TMH", block: "LAM_SANG" },

  // Khối Cận lâm sàng
  { id: "cdha", value: "DIAGNOSTIC_IMAGING", name: "Khoa Chẩn đoán hình ảnh", block: "CAN_LAM_SANG" },
  { id: "xet-nghiem", value: "LABORATORY", name: "Khoa Xét nghiệm", block: "CAN_LAM_SANG" },
  { id: "ksnk", value: "INFECTION_CONTROL", name: "Khoa Kiểm soát nhiễm khuẩn", block: "CAN_LAM_SANG" },
  { id: "duoc", value: "PHARMACY", name: "Khoa Dược - VT, TBYT", block: "CAN_LAM_SANG" }
];

export const SPECIALTIES_OPTIONS = [
  // Khoa Nội
  { id: "noi-tong-quat", value: "GENERAL_INTERNAL_MEDICINE", name: "Nội khoa", departmentId: "noi" },
  { id: "noi-tim-mach", value: "CARDIOLOGY", name: "Nội Tim mạch", departmentId: "noi" },
  { id: "noi-tieu-hoa", value: "GASTROENTEROLOGY", name: "Nội Tiêu hóa", departmentId: "noi" },
  { id: "noi-than-kinh", value: "NEUROLOGY", name: "Nội Thần kinh", departmentId: "noi" },
  { id: "noi-co-xuong-khop", value: "RHEUMATOLOGY", name: "Nội Cơ xương khớp", departmentId: "noi" },

  // Khoa Ngoại
  { id: "ngoai-tong-quat", value: "GENERAL_SURGERY", name: "Ngoại khoa", departmentId: "ngoai" },
  { id: "chan-thuong-chinh-hinh", value: "ORTHOPEDIC_SURGERY", name: "Chấn thương chỉnh hình", departmentId: "ngoai" },

  // Khoa CSSKSS & Phụ Sản
  { id: "san-khoa", value: "OBSTETRICS", name: "Sản khoa", departmentId: "san" },
  { id: "phu-khoa", value: "GYNECOLOGY", name: "Phụ khoa", departmentId: "san" },

  // Khoa Khám Bệnh
  { id: "da-lieu", value: "DERMATOLOGY", name: "Da liễu", departmentId: "kham-benh" },
  { id: "kham-tong-quat", value: "GENERAL_PRACTICE", name: "Khám tổng quát", departmentId: "kham-benh" },

  // Khoa Cấp cứu
  { id: "cap-cuu", value: "EMERGENCY_MEDICINE", name: "Cấp cứu", departmentId: "cap-cuu" },
  { id: "hoi-suc", value: "CRITICAL_CARE", name: "Hồi sức cấp cứu", departmentId: "cap-cuu" },

  // Khoa GMHS
  { id: "gay-me", value: "ANESTHESIA", name: "Gây mê hồi sức", departmentId: "gmhs" },

  // Khoa Nhi
  { id: "nhi-tong-quat", value: "GENERAL_PEDIATRICS", name: "Nhi khoa", departmentId: "nhi" },

  // Khoa Truyền nhiễm
  { id: "truyen-nhiem", value: "INFECTIOUS_MEDICINE", name: "Truyền nhiễm", departmentId: "truyen-nhiem" },

  // Khoa YHCT & PHCN
  { id: "yhct", value: "TRADITIONAL_MEDICINE", name: "Y học cổ truyền", departmentId: "yhct-phcn" },
  { id: "phcn", value: "REHABILITATION", name: "Phục hồi chức năng", departmentId: "yhct-phcn" },

  // Khoa RHM - M - TMH
  { id: "rang-ham-mat", value: "DENTISTRY", name: "Răng Hàm Mặt", departmentId: "rhm-m-tmh" },
  { id: "mat", value: "OPHTHALMOLOGY", name: "Mắt", departmentId: "rhm-m-tmh" },
  { id: "tai-mui-hong", value: "OTORHINOLARYNGOLOGY", name: "Tai Mũi Họng", departmentId: "rhm-m-tmh" },

  // Cận lâm sàng
  { id: "cdha", value: "RADIOLOGY", name: "Chẩn đoán hình ảnh", departmentId: "cdha" },
  { id: "xet-nghiem", value: "CLINICAL_LABORATORY", name: "Xét nghiệm", departmentId: "xet-nghiem" }
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
