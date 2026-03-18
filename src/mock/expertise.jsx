export const MOCK_GROUPS = [
  {
    id: "lam-sang",
    value: "LAM_SANG",
    name: "lâm sàng",
    icon: "medical-clinic",
  },
  {
    id: "can-lam-sang",
    value: "CAN_LAM_SANG",
    name: "cận lâm sàng",
    icon: "laboratory",
  },
  {
    id: "phong-chuc-nang",
    value: "PHONG_CHUC_NANG",
    name: "phòng chức năng",
    icon: "building-corporate",
  },
];

export const MOCK_DEPARTMENTS = [
  // Lâm sàng
  {
    id: "noi",
    groupId: "lam-sang",
    value: "INTERNAL_MEDICINE",
    name: "Khoa Nội",
    icon: "internal-medicine",
  },
  {
    id: "ngoai",
    groupId: "lam-sang",
    value: "SURGERY",
    name: "Khoa Ngoại",
    icon: "surgery",
  },
  {
    id: "san",
    groupId: "lam-sang",
    value: "OBSTETRICS_GYNECOLOGY",
    name: "Khoa CSSKSS & Phụ Sản",
    icon: "obstetrics",
  },
  {
    id: "kham-benh",
    groupId: "lam-sang",
    value: "OUTPATIENT",
    name: "Khoa Khám Bệnh",
    icon: "outpatient",
  },
  {
    id: "cap-cuu",
    groupId: "lam-sang",
    value: "EMERGENCY_ICU",
    name: "Khoa Cấp cứu - Hồi sức tích cực",
    icon: "emergency",
  },
  {
    id: "gmhs",
    groupId: "lam-sang",
    value: "ANESTHESIOLOGY",
    name: "Khoa Phẫu thuật - Gây mê hồi sức",
    icon: "anesthesia",
  },
  {
    id: "nhi",
    groupId: "lam-sang",
    value: "PEDIATRICS",
    name: "Khoa Nhi",
    icon: "pediatrics",
  },
  {
    id: "truyen-nhiem",
    groupId: "lam-sang",
    value: "INFECTIOUS_DISEASES",
    name: "Khoa Truyền Nhiễm",
    icon: "infectious",
  },
  {
    id: "yhct-phcn",
    groupId: "lam-sang",
    value: "TRADITIONAL_REHABILITATION",
    name: "Khoa YHCT và PHCN",
    icon: "traditional",
  },
  {
    id: "rhm-m-tmh",
    groupId: "lam-sang",
    value: "DENTAL_ENT_OPHTHALMOLOGY",
    name: "Khoa RHM - M - TMH",
    icon: "dental-ent",
  },
  // Cận lâm sàng
  {
    id: "cdha",
    groupId: "can-lam-sang",
    value: "DIAGNOSTIC_IMAGING",
    name: "Khoa Chẩn đoán hình ảnh",
    icon: "imaging",
  },
  {
    id: "xet-nghiem",
    groupId: "can-lam-sang",
    value: "LABORATORY",
    name: "Khoa Xét nghiệm",
    icon: "lab-test",
  },
  {
    id: "ksnk",
    groupId: "can-lam-sang",
    value: "INFECTION_CONTROL",
    name: "Khoa Kiểm soát nhiễm khuẩn",
    icon: "infection-control",
  },
  {
    id: "duoc",
    groupId: "can-lam-sang",
    value: "PHARMACY",
    name: "Khoa Dược - VT, TBYT",
    icon: "pharmacy",
  },
  // Phòng chức năng
  {
    id: "ke-hoach-nghiep-vu",
    groupId: "phong-chuc-nang",
    value: "PLANNING_PROFESSIONAL",
    name: "Phòng Kế hoạch - Nghiệp vụ",
    icon: "planning",
  },
  {
    id: "to-chuc-hanh-chinh",
    groupId: "phong-chuc-nang",
    value: "ORGANIZATION_ADMIN",
    name: "Phòng Tổ chức - Hành chính",
    icon: "admin",
  },
  {
    id: "tai-chinh-ke-toan",
    groupId: "phong-chuc-nang",
    value: "FINANCE_ACCOUNTING",
    name: "Phòng Tài chính kế toán",
    icon: "finance",
  },
  {
    id: "dieu-duong",
    groupId: "phong-chuc-nang",
    value: "NURSING_DEPARTMENT",
    name: "Phòng Điều dưỡng",
    icon: "nursing",
  },
];

export const MOCK_SPECIALTIES = [
  // Khoa Nội
  {
    id: "noi-tong-quat",
    departmentId: "noi",
    value: "GENERAL_INTERNAL_MEDICINE",
    name: "Nội khoa",
  },
  {
    id: "noi-tim-mach",
    departmentId: "noi",
    value: "CARDIOLOGY",
    name: "Nội Tim mạch",
  },
  {
    id: "noi-tieu-hoa",
    departmentId: "noi",
    value: "GASTROENTEROLOGY",
    name: "Nội Tiêu hóa",
  },
  {
    id: "noi-than-kinh",
    departmentId: "noi",
    value: "NEUROLOGY",
    name: "Nội Thần kinh",
  },
  {
    id: "noi-co-xuong-khop",
    departmentId: "noi",
    value: "RHEUMATOLOGY",
    name: "Nội Cơ xương khớp",
  },
  // Khoa Ngoại
  {
    id: "ngoai-tong-quat",
    departmentId: "ngoai",
    value: "GENERAL_SURGERY",
    name: "Ngoại khoa",
  },
  {
    id: "chan-thuong-chinh-hinh",
    departmentId: "ngoai",
    value: "ORTHOPEDIC_SURGERY",
    name: "Chấn thương chỉnh hình",
  },
  // Khoa Sản
  {
    id: "san-khoa",
    departmentId: "san",
    value: "OBSTETRICS",
    name: "Sản khoa",
  },
  {
    id: "phu-khoa",
    departmentId: "san",
    value: "GYNECOLOGY",
    name: "Phụ khoa",
  },
  // Khoa Khám Bệnh
  {
    id: "da-lieu",
    departmentId: "kham-benh",
    value: "DERMATOLOGY",
    name: "Da liễu",
  },
  {
    id: "kham-tong-quat",
    departmentId: "kham-benh",
    value: "GENERAL_PRACTICE",
    name: "Khám tổng quát",
  },
  // Khoa Cấp cứu
  {
    id: "cap-cuu",
    departmentId: "cap-cuu",
    value: "EMERGENCY_MEDICINE",
    name: "Cấp cứu",
  },
  {
    id: "hoi-suc",
    departmentId: "cap-cuu",
    value: "CRITICAL_CARE",
    name: "Hồi sức cấp cứu",
  },
  // Khoa Gây mê hồi sức
  {
    id: "gay-me",
    departmentId: "gmhs",
    value: "ANESTHESIA",
    name: "Gây mê hồi sức",
  },
  // Khoa Nhi
  {
    id: "nhi-tong-quat",
    departmentId: "nhi",
    value: "GENERAL_PEDIATRICS",
    name: "Nhi khoa",
  },
  // Khoa Truyền Nhiễm
  {
    id: "truyen-nhiem",
    departmentId: "truyen-nhiem",
    value: "INFECTIOUS_MEDICINE",
    name: "Truyền nhiễm",
  },
  // Khoa YHCT và PHCN
  {
    id: "yhct",
    departmentId: "yhct-phcn",
    value: "TRADITIONAL_MEDICINE",
    name: "Y học cổ truyền",
  },
  {
    id: "phcn",
    departmentId: "yhct-phcn",
    value: "REHABILITATION",
    name: "Phục hồi chức năng",
  },
  // Khoa RHM - M - TMH
  {
    id: "rang-ham-mat",
    departmentId: "rhm-m-tmh",
    value: "DENTISTRY",
    name: "Răng Hàm Mặt",
  },
  {
    id: "mat",
    departmentId: "rhm-m-tmh",
    value: "OPHTHALMOLOGY",
    name: "Mắt",
  },
  {
    id: "tai-mui-hong",
    departmentId: "rhm-m-tmh",
    value: "OTORHINOLARYNGOLOGY",
    name: "Tai Mũi Họng",
  },
  // Khoa Chẩn đoán hình ảnh
  {
    id: "cdha",
    departmentId: "cdha",
    value: "RADIOLOGY",
    name: "Chẩn đoán hình ảnh",
  },
  // Khoa Xét nghiệm
  {
    id: "xet-nghiem",
    departmentId: "xet-nghiem",
    value: "CLINICAL_LABORATORY",
    name: "Xét nghiệm",
  },
];

export const MOCK_SERVICES = [
  // ── Nội khoa (specialtyId: "noi-tong-quat") ──
  { id: "sv-001", specialtyId: "noi-tong-quat", name: "Khám nội khoa tổng quát", price: 150000 },
  { id: "sv-002", specialtyId: "noi-tong-quat", name: "Tư vấn bệnh mãn tính", price: 100000 },
  { id: "sv-003", specialtyId: "noi-tong-quat", name: "Tái khám nội khoa", price: 80000 },

  // ── Nội Tim mạch (specialtyId: "noi-tim-mach") ──
  { id: "sv-004", specialtyId: "noi-tim-mach", name: "Khám tim mạch tổng quát", price: 180000 },
  { id: "sv-005", specialtyId: "noi-tim-mach", name: "Điện tâm đồ (ECG)", price: 80000 },
  { id: "sv-006", specialtyId: "noi-tim-mach", name: "Siêu âm tim", price: 280000 },
  { id: "sv-007", specialtyId: "noi-tim-mach", name: "Holter điện tim 24h", price: 450000 },
  { id: "sv-008", specialtyId: "noi-tim-mach", name: "Đo huyết áp & tư vấn", price: 50000 },

  // ── Nội Tiêu hóa (specialtyId: "noi-tieu-hoa") ──
  { id: "sv-009", specialtyId: "noi-tieu-hoa", name: "Khám tiêu hóa tổng quát", price: 150000 },
  { id: "sv-010", specialtyId: "noi-tieu-hoa", name: "Nội soi dạ dày", price: 550000 },
  { id: "sv-011", specialtyId: "noi-tieu-hoa", name: "Nội soi đại tràng", price: 650000 },
  { id: "sv-012", specialtyId: "noi-tieu-hoa", name: "Siêu âm ổ bụng", price: 180000 },

  // ── Nội Thần kinh (specialtyId: "noi-than-kinh") ──
  { id: "sv-013", specialtyId: "noi-than-kinh", name: "Khám thần kinh tổng quát", price: 180000 },
  { id: "sv-014", specialtyId: "noi-than-kinh", name: "Tư vấn sức khoẻ tâm thần", price: 200000 },
  { id: "sv-015", specialtyId: "noi-than-kinh", name: "Điện não đồ (EEG)", price: 320000 },
  { id: "sv-016", specialtyId: "noi-than-kinh", name: "Điện cơ (EMG)", price: 280000 },

  // ── Nội Cơ xương khớp (specialtyId: "noi-co-xuong-khop") ──
  { id: "sv-017", specialtyId: "noi-co-xuong-khop", name: "Khám cơ xương khớp", price: 160000 },
  { id: "sv-018", specialtyId: "noi-co-xuong-khop", name: "Tiêm khớp", price: 350000 },
  { id: "sv-019", specialtyId: "noi-co-xuong-khop", name: "Siêu âm khớp", price: 200000 },
  { id: "sv-020", specialtyId: "noi-co-xuong-khop", name: "Đo loãng xương (DXA)", price: 280000 },

  // ── Ngoại khoa (specialtyId: "ngoai-tong-quat") ──
  { id: "sv-021", specialtyId: "ngoai-tong-quat", name: "Khám ngoại khoa tổng quát", price: 150000 },
  { id: "sv-022", specialtyId: "ngoai-tong-quat", name: "Tư vấn phẫu thuật nội soi", price: 200000 },
  { id: "sv-023", specialtyId: "ngoai-tong-quat", name: "Tiểu phẫu", price: 500000 },

  // ── Chấn thương chỉnh hình (specialtyId: "chan-thuong-chinh-hinh") ──
  { id: "sv-024", specialtyId: "chan-thuong-chinh-hinh", name: "Khám chấn thương chỉnh hình", price: 160000 },
  { id: "sv-025", specialtyId: "chan-thuong-chinh-hinh", name: "Bó bột, nẹp cố định", price: 300000 },
  { id: "sv-026", specialtyId: "chan-thuong-chinh-hinh", name: "Tư vấn phẫu thuật xương", price: 250000 },

  // ── Sản khoa (specialtyId: "san-khoa") ──
  { id: "sv-027", specialtyId: "san-khoa", name: "Khám thai định kỳ", price: 150000 },
  { id: "sv-028", specialtyId: "san-khoa", name: "Siêu âm thai", price: 220000 },
  { id: "sv-029", specialtyId: "san-khoa", name: "Siêu âm thai 4D", price: 380000 },
  { id: "sv-030", specialtyId: "san-khoa", name: "Xét nghiệm sàng lọc trước sinh", price: 600000 },

  // ── Phụ khoa (specialtyId: "phu-khoa") ──
  { id: "sv-031", specialtyId: "phu-khoa", name: "Khám phụ khoa tổng quát", price: 150000 },
  { id: "sv-032", specialtyId: "phu-khoa", name: "Xét nghiệm Pap smear", price: 200000 },
  { id: "sv-033", specialtyId: "phu-khoa", name: "Siêu âm phụ khoa", price: 180000 },
  { id: "sv-034", specialtyId: "phu-khoa", name: "Tư vấn kế hoạch hoá gia đình", price: 100000 },

  // ── Da liễu (specialtyId: "da-lieu") ──
  { id: "sv-035", specialtyId: "da-lieu", name: "Khám da liễu tổng quát", price: 140000 },
  { id: "sv-036", specialtyId: "da-lieu", name: "Điều trị mụn trứng cá", price: 220000 },
  { id: "sv-037", specialtyId: "da-lieu", name: "Điều trị dị ứng da", price: 180000 },
  { id: "sv-038", specialtyId: "da-lieu", name: "Laser CO2 điều trị sẹo", price: 800000 },

  // ── Khám tổng quát (specialtyId: "kham-tong-quat") ──
  { id: "sv-039", specialtyId: "kham-tong-quat", name: "Khám sức khoẻ tổng quát", price: 350000 },
  { id: "sv-040", specialtyId: "kham-tong-quat", name: "Khám sức khoẻ định kỳ (gói cơ bản)", price: 550000 },
  { id: "sv-041", specialtyId: "kham-tong-quat", name: "Khám sức khoẻ định kỳ (gói nâng cao)", price: 950000 },

  // ── Cấp cứu (specialtyId: "cap-cuu") ──
  { id: "sv-042", specialtyId: "cap-cuu", name: "Khám cấp cứu", price: 200000 },
  { id: "sv-043", specialtyId: "cap-cuu", name: "Băng bó, xử lý vết thương", price: 150000 },

  // ── Hồi sức cấp cứu (specialtyId: "hoi-suc") ──
  { id: "sv-044", specialtyId: "hoi-suc", name: "Hồi sức tích cực", price: 0 }, // tính theo ngày

  // ── Gây mê hồi sức (specialtyId: "gay-me") ──
  { id: "sv-045", specialtyId: "gay-me", name: "Tư vấn gây mê trước phẫu thuật", price: 150000 },
  { id: "sv-046", specialtyId: "gay-me", name: "Tái khám sau phẫu thuật", price: 100000 },

  // ── Nhi khoa (specialtyId: "nhi-tong-quat") ──
  { id: "sv-047", specialtyId: "nhi-tong-quat", name: "Khám nhi tổng quát", price: 130000 },
  { id: "sv-048", specialtyId: "nhi-tong-quat", name: "Tư vấn dinh dưỡng trẻ em", price: 110000 },
  { id: "sv-049", specialtyId: "nhi-tong-quat", name: "Tiêm chủng dịch vụ", price: 0 }, // giá theo vaccine
  { id: "sv-050", specialtyId: "nhi-tong-quat", name: "Khám phát triển thể chất trẻ", price: 120000 },

  // ── Truyền nhiễm (specialtyId: "truyen-nhiem") ──
  { id: "sv-051", specialtyId: "truyen-nhiem", name: "Khám truyền nhiễm tổng quát", price: 150000 },
  { id: "sv-052", specialtyId: "truyen-nhiem", name: "Tư vấn dự phòng lây nhiễm", price: 100000 },
  { id: "sv-053", specialtyId: "truyen-nhiem", name: "Xét nghiệm HIV, viêm gan B/C", price: 250000 },

  // ── Y học cổ truyền (specialtyId: "yhct") ──
  { id: "sv-054", specialtyId: "yhct", name: "Khám y học cổ truyền", price: 120000 },
  { id: "sv-055", specialtyId: "yhct", name: "Châm cứu", price: 200000 },
  { id: "sv-056", specialtyId: "yhct", name: "Xoa bóp bấm huyệt", price: 180000 },
  { id: "sv-057", specialtyId: "yhct", name: "Cấy chỉ", price: 350000 },

  // ── Phục hồi chức năng (specialtyId: "phcn") ──
  { id: "sv-058", specialtyId: "phcn", name: "Đánh giá phục hồi chức năng", price: 150000 },
  { id: "sv-059", specialtyId: "phcn", name: "Vật lý trị liệu", price: 200000 },
  { id: "sv-060", specialtyId: "phcn", name: "Ngôn ngữ trị liệu", price: 220000 },
  { id: "sv-061", specialtyId: "phcn", name: "Hoạt động trị liệu", price: 200000 },

  // ── Răng Hàm Mặt (specialtyId: "rang-ham-mat") ──
  { id: "sv-062", specialtyId: "rang-ham-mat", name: "Khám răng hàm mặt tổng quát", price: 100000 },
  { id: "sv-063", specialtyId: "rang-ham-mat", name: "Lấy cao răng", price: 200000 },
  { id: "sv-064", specialtyId: "rang-ham-mat", name: "Trám răng", price: 300000 },
  { id: "sv-065", specialtyId: "rang-ham-mat", name: "Nhổ răng", price: 250000 },
  { id: "sv-066", specialtyId: "rang-ham-mat", name: "Bọc răng sứ", price: 2500000 },
  { id: "sv-067", specialtyId: "rang-ham-mat", name: "Cấy ghép Implant (tư vấn)", price: 200000 },

  // ── Mắt (specialtyId: "mat") ──
  { id: "sv-068", specialtyId: "mat", name: "Khám mắt tổng quát", price: 130000 },
  { id: "sv-069", specialtyId: "mat", name: "Đo thị lực & khúc xạ", price: 110000 },
  { id: "sv-070", specialtyId: "mat", name: "Khám đáy mắt", price: 260000 },
  { id: "sv-071", specialtyId: "mat", name: "Tư vấn phẫu thuật Phaco", price: 200000 },

  // ── Tai Mũi Họng (specialtyId: "tai-mui-hong") ──
  { id: "sv-072", specialtyId: "tai-mui-hong", name: "Khám tai mũi họng tổng quát", price: 140000 },
  { id: "sv-073", specialtyId: "tai-mui-hong", name: "Nội soi tai mũi họng", price: 300000 },
  { id: "sv-074", specialtyId: "tai-mui-hong", name: "Đo thính lực", price: 180000 },
  { id: "sv-075", specialtyId: "tai-mui-hong", name: "Phẫu thuật vùng cổ (tư vấn)", price: 200000 },

  // ── Chẩn đoán hình ảnh (specialtyId: "cdha") ──
  { id: "sv-076", specialtyId: "cdha", name: "Siêu âm tổng quát", price: 180000 },
  { id: "sv-077", specialtyId: "cdha", name: "X-quang", price: 120000 },
  { id: "sv-078", specialtyId: "cdha", name: "CT scan", price: 800000 },
  { id: "sv-079", specialtyId: "cdha", name: "MRI", price: 1500000 },

  // ── Xét nghiệm (specialtyId: "xet-nghiem") ──
  { id: "sv-080", specialtyId: "xet-nghiem", name: "Công thức máu toàn phần", price: 80000 },
  { id: "sv-081", specialtyId: "xet-nghiem", name: "Sinh hoá máu (đường, mỡ, gan, thận)", price: 250000 },
  { id: "sv-082", specialtyId: "xet-nghiem", name: "Nước tiểu tổng quát", price: 60000 },
  { id: "sv-083", specialtyId: "xet-nghiem", name: "HbA1c", price: 120000 },
  { id: "sv-084", specialtyId: "xet-nghiem", name: "Xét nghiệm chức năng tuyến giáp", price: 280000 },
];
