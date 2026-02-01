export const MOCK_GROUPS = [
  {
    id: "lam-sang",
    value: "LAM_SANG",
    name: "lâm sàng",
    icon: "medical-clinic"
  },
  {
    id: "can-lam-sang",
    value: "CAN_LAM_SANG",
    name: "cận lâm sàng",
    icon: "laboratory"
  },
  {
    id: "phong-chuc-nang",
    value: "PHONG_CHUC_NANG",
    name: "phòng chức năng",
    icon: "building-corporate"
  }
];

export const MOCK_DEPARTMENTS = [
  // Lâm sàng
  {
    id: "noi",
    groupId: "lam-sang",
    value: "INTERNAL_MEDICINE",
    name: "Khoa Nội",
    icon: "internal-medicine"
  },
  {
    id: "ngoai",
    groupId: "lam-sang",
    value: "SURGERY",
    name: "Khoa Ngoại",
    icon: "surgery"
  },
  {
    id: "san",
    groupId: "lam-sang",
    value: "OBSTETRICS_GYNECOLOGY",
    name: "Khoa CSSKSS & Phụ Sản",
    icon: "obstetrics"
  },
  {
    id: "kham-benh",
    groupId: "lam-sang",
    value: "OUTPATIENT",
    name: "Khoa Khám Bệnh",
    icon: "outpatient"
  },
  {
    id: "cap-cuu",
    groupId: "lam-sang",
    value: "EMERGENCY_ICU",
    name: "Khoa Cấp cứu - Hồi sức tích cực",
    icon: "emergency"
  },
  {
    id: "gmhs",
    groupId: "lam-sang",
    value: "ANESTHESIOLOGY",
    name: "Khoa Phẫu thuật - Gây mê hồi sức",
    icon: "anesthesia"
  },
  {
    id: "nhi",
    groupId: "lam-sang",
    value: "PEDIATRICS",
    name: "Khoa Nhi",
    icon: "pediatrics"
  },
  {
    id: "truyen-nhiem",
    groupId: "lam-sang",
    value: "INFECTIOUS_DISEASES",
    name: "Khoa Truyền Nhiễm",
    icon: "infectious"
  },
  {
    id: "yhct-phcn",
    groupId: "lam-sang",
    value: "TRADITIONAL_REHABILITATION",
    name: "Khoa YHCT và PHCN",
    icon: "traditional"
  },
  {
    id: "rhm-m-tmh",
    groupId: "lam-sang",
    value: "DENTAL_ENT_OPHTHALMOLOGY",
    name: "Khoa RHM - M - TMH",
    icon: "dental-ent"
  },
  // Cận lâm sàng
  {
    id: "cdha",
    groupId: "can-lam-sang",
    value: "DIAGNOSTIC_IMAGING",
    name: "Khoa Chẩn đoán hình ảnh",
    icon: "imaging"
  },
  {
    id: "xet-nghiem",
    groupId: "can-lam-sang",
    value: "LABORATORY",
    name: "Khoa Xét nghiệm",
    icon: "lab-test"
  },
  {
    id: "ksnk",
    groupId: "can-lam-sang",
    value: "INFECTION_CONTROL",
    name: "Khoa Kiểm soát nhiễm khuẩn",
    icon: "infection-control"
  },
  {
    id: "duoc",
    groupId: "can-lam-sang",
    value: "PHARMACY",
    name: "Khoa Dược - VT, TBYT",
    icon: "pharmacy"
  },
  // Phòng chức năng
  {
    id: "ke-hoach-nghiep-vu",
    groupId: "phong-chuc-nang",
    value: "PLANNING_PROFESSIONAL",
    name: "Phòng Kế hoạch - Nghiệp vụ",
    icon: "planning"
  },
  {
    id: "to-chuc-hanh-chinh",
    groupId: "phong-chuc-nang",
    value: "ORGANIZATION_ADMIN",
    name: "Phòng Tổ chức - Hành chính",
    icon: "admin"
  },
  {
    id: "tai-chinh-ke-toan",
    groupId: "phong-chuc-nang",
    value: "FINANCE_ACCOUNTING",
    name: "Phòng Tài chính kế toán",
    icon: "finance"
  },
  {
    id: "dieu-duong",
    groupId: "phong-chuc-nang",
    value: "NURSING_DEPARTMENT",
    name: "Phòng Điều dưỡng",
    icon: "nursing"
  }
];

export const MOCK_SPECIALTIES = [
  // Khoa Nội
  {
    id: "noi-tong-quat",
    departmentId: "noi",
    value: "GENERAL_INTERNAL_MEDICINE",
    name: "Nội khoa"
  },
  {
    id: "noi-tim-mach",
    departmentId: "noi",
    value: "CARDIOLOGY",
    name: "Nội Tim mạch"
  },
  {
    id: "noi-tieu-hoa",
    departmentId: "noi",
    value: "GASTROENTEROLOGY",
    name: "Nội Tiêu hóa"
  },
  {
    id: "noi-than-kinh",
    departmentId: "noi",
    value: "NEUROLOGY",
    name: "Nội Thần kinh"
  },
  {
    id: "noi-co-xuong-khop",
    departmentId: "noi",
    value: "RHEUMATOLOGY",
    name: "Nội Cơ xương khớp"
  },
  // Khoa Ngoại
  {
    id: "ngoai-tong-quat",
    departmentId: "ngoai",
    value: "GENERAL_SURGERY",
    name: "Ngoại khoa"
  },
  {
    id: "chan-thuong-chinh-hinh",
    departmentId: "ngoai",
    value: "ORTHOPEDIC_SURGERY",
    name: "Chấn thương chỉnh hình"
  },
  // Khoa Sản
  {
    id: "san-khoa",
    departmentId: "san",
    value: "OBSTETRICS",
    name: "Sản khoa"
  },
  {
    id: "phu-khoa",
    departmentId: "san",
    value: "GYNECOLOGY",
    name: "Phụ khoa"
  },
  // Khoa Khám Bệnh
  {
    id: "da-lieu",
    departmentId: "kham-benh",
    value: "DERMATOLOGY",
    name: "Da liễu"
  },
  {
    id: "kham-tong-quat",
    departmentId: "kham-benh",
    value: "GENERAL_PRACTICE",
    name: "Khám tổng quát"
  },
  // Khoa Cấp cứu
  {
    id: "cap-cuu",
    departmentId: "cap-cuu",
    value: "EMERGENCY_MEDICINE",
    name: "Cấp cứu"
  },
  {
    id: "hoi-suc",
    departmentId: "cap-cuu",
    value: "CRITICAL_CARE",
    name: "Hồi sức cấp cứu"
  },
  // Khoa Gây mê hồi sức
  {
    id: "gay-me",
    departmentId: "gmhs",
    value: "ANESTHESIA",
    name: "Gây mê hồi sức"
  },
  // Khoa Nhi
  {
    id: "nhi-tong-quat",
    departmentId: "nhi",
    value: "GENERAL_PEDIATRICS",
    name: "Nhi khoa"
  },
  // Khoa Truyền Nhiễm
  {
    id: "truyen-nhiem",
    departmentId: "truyen-nhiem",
    value: "INFECTIOUS_MEDICINE",
    name: "Truyền nhiễm"
  },
  // Khoa YHCT và PHCN
  {
    id: "yhct",
    departmentId: "yhct-phcn",
    value: "TRADITIONAL_MEDICINE",
    name: "Y học cổ truyền"
  },
  {
    id: "phcn",
    departmentId: "yhct-phcn",
    value: "REHABILITATION",
    name: "Phục hồi chức năng"
  },
  // Khoa RHM - M - TMH
  {
    id: "rang-ham-mat",
    departmentId: "rhm-m-tmh",
    value: "DENTISTRY",
    name: "Răng Hàm Mặt"
  },
  {
    id: "mat",
    departmentId: "rhm-m-tmh",
    value: "OPHTHALMOLOGY",
    name: "Mắt"
  },
  {
    id: "tai-mui-hong",
    departmentId: "rhm-m-tmh",
    value: "OTORHINOLARYNGOLOGY",
    name: "Tai Mũi Họng"
  },
  // Khoa Chẩn đoán hình ảnh
  {
    id: "cdha",
    departmentId: "cdha",
    value: "RADIOLOGY",
    name: "Chẩn đoán hình ảnh"
  },
  // Khoa Xét nghiệm
  {
    id: "xet-nghiem",
    departmentId: "xet-nghiem",
    value: "CLINICAL_LABORATORY",
    name: "Xét nghiệm"
  }
];
