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

export const POSITION_OPTIONS = [
  {
    id: "ke-hoach-chuyen-vien",
    value: "PLANNING_STAFF",
    name: "Chuyên viên Kế hoạch",
    department: "Phòng Kế hoạch - Nghiệp vụ",
    level: "STAFF"
  },
  {
    id: "ke-hoach-truong-phong",
    value: "PLANNING_MANAGER",
    name: "Trưởng phòng Kế hoạch",
    department: "Phòng Kế hoạch - Nghiệp vụ",
    level: "MANAGER"
  },
  {
    id: "hcns-nhan-vien",
    value: "HR_STAFF",
    name: "Nhân viên Hành chính - Nhân sự",
    department: "Phòng Tổ chức - Hành chính",
    level: "STAFF"
  },
  {
    id: "hcns-truong-phong",
    value: "HR_MANAGER",
    name: "Trưởng phòng Hành chính - Nhân sự",
    department: "Phòng Tổ chức - Hành chính",
    level: "MANAGER"
  },
  {
    id: "ke-toan-nhan-vien",
    value: "ACCOUNTANT",
    name: "Kế toán",
    department: "Phòng Tài chính - Kế toán",
    level: "STAFF"
  },
  {
    id: "ke-toan-truong-phong",
    value: "CHIEF_ACCOUNTANT",
    name: "Kế toán trưởng",
    department: "Phòng Tài chính - Kế toán",
    level: "MANAGER"
  },
  {
    id: "dieu-duong-vien",
    value: "NURSE",
    name: "Điều dưỡng viên",
    department: "Phòng Điều dưỡng",
    level: "STAFF"
  },
  {
    id: "dieu-duong-truong-phong",
    value: "HEAD_NURSE",
    name: "Trưởng phòng Điều dưỡng",
    department: "Phòng Điều dưỡng",
    level: "MANAGER"
  }
];

export const ROLE_OPTIONS = [
  { id: 1, value: "MEMBER", name: "Thành viên" },
  { id: 2, value: "ADMIN", name: "Quản trị viên" }
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

export const DOCTOR_TITLES_OPTIONS = [
  {
    id: "title_bs",
    code: "bs",
    name: "BS",
    value: "BS",
    group: "Nghề nghiệp",
    order: 1
  },
  {
    id: "title_ths_bs",
    code: "ths_bs",
    name: "ThS.BS",
    value: "THS.BS",
    group: "Học vị",
    order: 2
  },
  {
    id: "title_ts_bs",
    code: "ts_bs",
    name: "TS.BS",
    value: "TS.BS",
    group: "Học vị",
    order: 3
  },
  {
    id: "title_bs_cki",
    code: "bs_cki",
    name: "BS.CKI",
    value: "BS.CKI",
    group: "Chuyên khoa",
    order: 4
  },
  {
    id: "title_bs_ckii",
    code: "bs_ckii",
    name: "BS.CKII",
    value: "BS.CKII",
    group: "Chuyên khoa",
    order: 5
  },
  {
    id: "title_bs_ck_noi",
    code: "bs_ck_noi",
    name: "BS.CK Nội",
    value: "BS.CK_NOI",
    group: "Chuyên khoa",
    order: 6
  },
  {
    id: "title_bs_ck_nhi",
    code: "bs_ck_nhi",
    name: "BS.CK Nhi",
    value: "BS.CK_NHI",
    group: "Chuyên khoa",
    order: 7
  },
  {
    id: "title_bs_ck_san",
    code: "bs_ck_san",
    name: "BS.CK Sản",
    value: "BS.CK_SAN",
    group: "Chuyên khoa",
    order: 8
  }
];

export const LANGUAGE_OPTIONS = [
  {
    id: 1,
    value: "VIETNAMESE",
    name: "Tiếng Việt"
  },
  {
    id: 2,
    value: "ENGLISH",
    name: "Tiếng Anh"
  },
  {
    id: 3,
    value: "FRENCH",
    name: "Tiếng Pháp"
  },
  {
    id: 4,
    value: "CHINESE",
    name: "Tiếng Trung"
  }
];

export const TAGS_DOCTOR_OPTIONS = [
  { id: 1, value: "CARDIOLOGY", name: "Tim mạch" },
  { id: 2, value: "GERIATRICS", name: "Lão khoa" },
  { id: 3, value: "GENERAL_INTERNAL_MEDICINE", name: "Nội tổng quát" },

  { id: 4, value: "PREGNANCY_MONITORING", name: "Theo dõi thai kỳ" },
  { id: 5, value: "GYNECOLOGY", name: "Phụ khoa" },
  { id: 6, value: "INFERTILITY_TREATMENT", name: "Hiếm muộn" },

  { id: 7, value: "ENDOSCOPIC_SURGERY", name: "Phẫu thuật nội soi" },
  { id: 8, value: "ORTHOPEDIC_SURGERY", name: "Chấn thương chỉnh hình" },

  { id: 9, value: "PEDIATRIC_RESPIRATORY", name: "Hô hấp nhi" },
  { id: 10, value: "PEDIATRIC_GASTROENTEROLOGY", name: "Tiêu hóa nhi" },
  { id: 11, value: "PEDIATRIC_NUTRITION", name: "Dinh dưỡng" },

  { id: 12, value: "ENT_ENDOSCOPY", name: "Nội soi TMH" },
  { id: 13, value: "NECK_SURGERY", name: "Phẫu thuật vùng cổ" },

  { id: 14, value: "COSMETIC_DENTISTRY", name: "Nha khoa thẩm mỹ" },
  { id: 15, value: "IMPLANT_DENTISTRY", name: "Cấy ghép Implant" },

  { id: 16, value: "ACUPUNCTURE", name: "Châm cứu" },
  { id: 17, value: "PHYSIOTHERAPY", name: "Vật lý trị liệu" },

  { id: 18, value: "INTERVENTIONAL_CARDIOLOGY", name: "Tim mạch can thiệp" },
  { id: 19, value: "ECHOCARDIOGRAPHY", name: "Siêu âm tim" },

  { id: 20, value: "CT_SCAN", name: "CT" },
  { id: 21, value: "MRI", name: "MRI" },
  { id: 22, value: "ULTRASOUND", name: "Siêu âm" },

  { id: 23, value: "COSMETIC_DERMATOLOGY", name: "Da liễu thẩm mỹ" },
  { id: 24, value: "LASER_CO2", name: "Laser CO2" },

  { id: 25, value: "EMERGENCY_MEDICINE", name: "Cấp cứu" },
  { id: 26, value: "CRITICAL_CARE", name: "Hồi sức tích cực" },

  { id: 27, value: "PHACO_SURGERY", name: "Phẫu thuật Phaco" },
  { id: 28, value: "REFRACTIVE_ERRORS", name: "Tật khúc xạ" },

  { id: 29, value: "GASTROSCOPY", name: "Nội soi tiêu hóa" },
  { id: 30, value: "HEPATOLOGY", name: "Gan mật" },

  { id: 31, value: "NEUROLOGY", name: "Thần kinh" },
  { id: 32, value: "STROKE", name: "Đột quỵ" },

  { id: 33, value: "HEMATOLOGY", name: "Huyết học" },
  { id: 34, value: "BIOCHEMISTRY", name: "Hóa sinh" },

  { id: 35, value: "CHILD_CARE", name: "Chăm sóc trẻ em" },

  { id: 36, value: "ANESTHESIA", name: "Gây mê" },
  { id: 37, value: "POSTOPERATIVE_ANALGESIA", name: "Giảm đau sau mổ" },

  { id: 38, value: "RHEUMATOLOGY", name: "Cơ xương khớp" },
  { id: 39, value: "JOINT_INJECTION", name: "Tiêm khớp" }
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
