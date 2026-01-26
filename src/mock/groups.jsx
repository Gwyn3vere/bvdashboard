export const MOCK_GROUPS_LIST = [
  {
    id: "phong-chuc-nang",
    value: "PHONG_CHUC_NANG",
    name: "Khối phòng chức năng",
    departments: [
      {
        id: "ke-hoach-nghiep-vu",
        value: "PLANNING_PROFESSIONAL",
        name: "Phòng Kế hoạch - Nghiệp vụ",
        block: "PHONG_CHUC_NANG",
        specialties: []
      },
      {
        id: "to-chuc-hanh-chinh",
        value: "ORGANIZATION_ADMIN",
        name: "Phòng Tổ chức - Hành chính",
        block: "PHONG_CHUC_NANG",
        specialties: []
      },
      {
        id: "tai-chinh-ke-toan",
        value: "FINANCE_ACCOUNTING",
        name: "Phòng Tài chính kế toán",
        block: "PHONG_CHUC_NANG",
        specialties: []
      },
      {
        id: "dieu-duong",
        value: "NURSING_DEPARTMENT",
        name: "Phòng Điều dưỡng",
        block: "PHONG_CHUC_NANG",
        specialties: []
      }
    ]
  },
  {
    id: "lam-sang",
    value: "LAM_SANG",
    name: "Khối lâm sàng",
    departments: [
      {
        id: "noi",
        value: "INTERNAL_MEDICINE",
        name: "Khoa Nội",
        block: "LAM_SANG",
        specialties: [
          {
            id: "noi-tong-quat",
            value: "GENERAL_INTERNAL_MEDICINE",
            name: "Nội khoa"
          },
          {
            id: "noi-tim-mach",
            value: "CARDIOLOGY",
            name: "Nội Tim mạch"
          },
          {
            id: "noi-tieu-hoa",
            value: "GASTROENTEROLOGY",
            name: "Nội Tiêu hóa"
          },
          {
            id: "noi-than-kinh",
            value: "NEUROLOGY",
            name: "Nội Thần kinh"
          },
          {
            id: "noi-co-xuong-khop",
            value: "RHEUMATOLOGY",
            name: "Nội Cơ xương khớp"
          }
        ]
      },
      {
        id: "ngoai",
        value: "SURGERY",
        name: "Khoa Ngoại",
        block: "LAM_SANG",
        specialties: [
          {
            id: "ngoai-tong-quat",
            value: "GENERAL_SURGERY",
            name: "Ngoại khoa"
          },
          {
            id: "chan-thuong-chinh-hinh",
            value: "ORTHOPEDIC_SURGERY",
            name: "Chấn thương chỉnh hình"
          }
        ]
      },
      {
        id: "san",
        value: "OBSTETRICS_GYNECOLOGY",
        name: "Khoa CSSKSS & Phụ Sản",
        block: "LAM_SANG",
        specialties: [
          {
            id: "san-khoa",
            value: "OBSTETRICS",
            name: "Sản khoa",
            departmentId: "san"
          },
          {
            id: "phu-khoa",
            value: "GYNECOLOGY",
            name: "Phụ khoa",
            departmentId: "san"
          }
        ]
      },
      {
        id: "kham-benh",
        value: "OUTPATIENT",
        name: "Khoa Khám Bệnh",
        block: "LAM_SANG",
        specialties: [
          {
            id: "da-lieu",
            value: "DERMATOLOGY",
            name: "Da liễu",
            departmentId: "kham-benh"
          },
          {
            id: "kham-tong-quat",
            value: "GENERAL_PRACTICE",
            name: "Khám tổng quát",
            departmentId: "kham-benh"
          }
        ]
      },
      {
        id: "cap-cuu",
        value: "EMERGENCY_ICU",
        name: "Khoa Cấp cứu - Hồi sức tích cực",
        block: "LAM_SANG",
        specialties: [
          {
            id: "cap-cuu",
            value: "EMERGENCY_MEDICINE",
            name: "Cấp cứu",
            departmentId: "cap-cuu"
          },
          {
            id: "hoi-suc",
            value: "CRITICAL_CARE",
            name: "Hồi sức cấp cứu",
            departmentId: "cap-cuu"
          }
        ]
      },
      {
        id: "gmhs",
        value: "ANESTHESIOLOGY",
        name: "Khoa Phẫu thuật - Gây mê hồi sức",
        block: "LAM_SANG",
        specialties: [
          {
            id: "gay-me",
            value: "ANESTHESIA",
            name: "Gây mê hồi sức",
            departmentId: "gmhs"
          }
        ]
      },
      {
        id: "nhi",
        value: "PEDIATRICS",
        name: "Khoa Nhi",
        block: "LAM_SANG",
        specialties: [
          {
            id: "nhi-tong-quat",
            value: "GENERAL_PEDIATRICS",
            name: "Nhi khoa",
            departmentId: "nhi"
          }
        ]
      },
      {
        id: "truyen-nhiem",
        value: "INFECTIOUS_DISEASES",
        name: "Khoa Truyền Nhiễm",
        block: "LAM_SANG",
        specialties: [
          {
            id: "truyen-nhiem",
            value: "INFECTIOUS_MEDICINE",
            name: "Truyền nhiễm",
            departmentId: "truyen-nhiem"
          }
        ]
      },
      {
        id: "yhct-phcn",
        value: "TRADITIONAL_REHABILITATION",
        name: "Khoa YHCT và PHCN",
        block: "LAM_SANG",
        specialties: [
          {
            id: "yhct",
            value: "TRADITIONAL_MEDICINE",
            name: "Y học cổ truyền",
            departmentId: "yhct-phcn"
          },
          {
            id: "phcn",
            value: "REHABILITATION",
            name: "Phục hồi chức năng",
            departmentId: "yhct-phcn"
          }
        ]
      },
      {
        id: "rhm-m-tmh",
        value: "DENTAL_ENT_OPHTHALMOLOGY",
        name: "Khoa RHM - M - TMH",
        block: "LAM_SANG",
        specialties: [
          {
            id: "rang-ham-mat",
            value: "DENTISTRY",
            name: "Răng Hàm Mặt",
            departmentId: "rhm-m-tmh"
          },
          {
            id: "mat",
            value: "OPHTHALMOLOGY",
            name: "Mắt",
            departmentId: "rhm-m-tmh"
          },
          {
            id: "tai-mui-hong",
            value: "OTORHINOLARYNGOLOGY",
            name: "Tai Mũi Họng",
            departmentId: "rhm-m-tmh"
          }
        ]
      }
    ]
  },
  {
    id: "can-lam-sang",
    value: "CAN_LAM_SANG",
    name: "Khối cận lâm sàng",
    departments: [
      {
        id: "cdha",
        value: "DIAGNOSTIC_IMAGING",
        name: "Khoa Chẩn đoán hình ảnh",
        block: "CAN_LAM_SANG",
        specialties: [
          {
            id: "cdha",
            value: "RADIOLOGY",
            name: "Chẩn đoán hình ảnh",
            departmentId: "cdha"
          }
        ]
      },
      {
        id: "xet-nghiem",
        value: "LABORATORY",
        name: "Khoa Xét nghiệm",
        block: "CAN_LAM_SANG",
        specialties: [
          {
            id: "xet-nghiem",
            value: "CLINICAL_LABORATORY",
            name: "Xét nghiệm",
            departmentId: "xet-nghiem"
          }
        ]
      },
      {
        id: "ksnk",
        value: "INFECTION_CONTROL",
        name: "Khoa Kiểm soát nhiễm khuẩn",
        block: "CAN_LAM_SANG",
        specialties: []
      },
      {
        id: "duoc",
        value: "PHARMACY",
        name: "Khoa Dược - VT, TBYT",
        block: "CAN_LAM_SANG",
        specialties: []
      }
    ]
  }
];
