export const MOCK_GROUPS_LIST = [
  {
    id: "lam-sang",
    value: "LAM_SANG",
    name: "Khối lâm sàng",
    icon: "medical-clinic",
    departments: [
      {
        id: "noi",
        value: "INTERNAL_MEDICINE",
        name: "Khoa Nội",
        block: "LAM_SANG",
        icon: "internal-medicine",
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
        icon: "surgery",
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
        icon: "obstetrics",
        specialties: [
          {
            id: "san-khoa",
            value: "OBSTETRICS",
            name: "Sản khoa"
          },
          {
            id: "phu-khoa",
            value: "GYNECOLOGY",
            name: "Phụ khoa"
          }
        ]
      },
      {
        id: "kham-benh",
        value: "OUTPATIENT",
        name: "Khoa Khám Bệnh",
        block: "LAM_SANG",
        icon: "outpatient",
        specialties: [
          {
            id: "da-lieu",
            value: "DERMATOLOGY",
            name: "Da liễu"
          },
          {
            id: "kham-tong-quat",
            value: "GENERAL_PRACTICE",
            name: "Khám tổng quát"
          }
        ]
      },
      {
        id: "cap-cuu",
        value: "EMERGENCY_ICU",
        name: "Khoa Cấp cứu - Hồi sức tích cực",
        block: "LAM_SANG",
        icon: "emergency",
        specialties: [
          {
            id: "cap-cuu",
            value: "EMERGENCY_MEDICINE",
            name: "Cấp cứu"
          },
          {
            id: "hoi-suc",
            value: "CRITICAL_CARE",
            name: "Hồi sức cấp cứu"
          }
        ]
      },
      {
        id: "gmhs",
        value: "ANESTHESIOLOGY",
        name: "Khoa Phẫu thuật - Gây mê hồi sức",
        block: "LAM_SANG",
        icon: "anesthesia",
        specialties: [
          {
            id: "gay-me",
            value: "ANESTHESIA",
            name: "Gây mê hồi sức"
          }
        ]
      },
      {
        id: "nhi",
        value: "PEDIATRICS",
        name: "Khoa Nhi",
        block: "LAM_SANG",
        icon: "pediatrics",
        specialties: [
          {
            id: "nhi-tong-quat",
            value: "GENERAL_PEDIATRICS",
            name: "Nhi khoa"
          }
        ]
      },
      {
        id: "truyen-nhiem",
        value: "INFECTIOUS_DISEASES",
        name: "Khoa Truyền Nhiễm",
        block: "LAM_SANG",
        icon: "infectious",
        specialties: [
          {
            id: "truyen-nhiem",
            value: "INFECTIOUS_MEDICINE",
            name: "Truyền nhiễm"
          }
        ]
      },
      {
        id: "yhct-phcn",
        value: "TRADITIONAL_REHABILITATION",
        name: "Khoa YHCT và PHCN",
        block: "LAM_SANG",
        icon: "traditional",
        specialties: [
          {
            id: "yhct",
            value: "TRADITIONAL_MEDICINE",
            name: "Y học cổ truyền"
          },
          {
            id: "phcn",
            value: "REHABILITATION",
            name: "Phục hồi chức năng"
          }
        ]
      },
      {
        id: "rhm-m-tmh",
        value: "DENTAL_ENT_OPHTHALMOLOGY",
        name: "Khoa RHM - M - TMH",
        block: "LAM_SANG",
        icon: "dental-ent",
        specialties: [
          {
            id: "rang-ham-mat",
            value: "DENTISTRY",
            name: "Răng Hàm Mặt"
          },
          {
            id: "mat",
            value: "OPHTHALMOLOGY",
            name: "Mắt"
          },
          {
            id: "tai-mui-hong",
            value: "OTORHINOLARYNGOLOGY",
            name: "Tai Mũi Họng"
          }
        ]
      }
    ]
  },
  {
    id: "can-lam-sang",
    value: "CAN_LAM_SANG",
    name: "Khối cận lâm sàng",
    icon: "laboratory",
    departments: [
      {
        id: "cdha",
        value: "DIAGNOSTIC_IMAGING",
        name: "Khoa Chẩn đoán hình ảnh",
        block: "CAN_LAM_SANG",
        icon: "imaging",
        specialties: [
          {
            id: "cdha",
            value: "RADIOLOGY",
            name: "Chẩn đoán hình ảnh"
          }
        ]
      },
      {
        id: "xet-nghiem",
        value: "LABORATORY",
        name: "Khoa Xét nghiệm",
        block: "CAN_LAM_SANG",
        icon: "lab-test",
        specialties: [
          {
            id: "xet-nghiem",
            value: "CLINICAL_LABORATORY",
            name: "Xét nghiệm"
          }
        ]
      },
      {
        id: "ksnk",
        value: "INFECTION_CONTROL",
        name: "Khoa Kiểm soát nhiễm khuẩn",
        block: "CAN_LAM_SANG",
        icon: "infection-control",
        specialties: []
      },
      {
        id: "duoc",
        value: "PHARMACY",
        name: "Khoa Dược - VT, TBYT",
        block: "CAN_LAM_SANG",
        icon: "pharmacy",
        specialties: []
      }
    ]
  },
  {
    id: "phong-chuc-nang",
    value: "PHONG_CHUC_NANG",
    name: "Khối phòng chức năng",
    icon: "building-corporate",
    departments: [
      {
        id: "ke-hoach-nghiep-vu",
        value: "PLANNING_PROFESSIONAL",
        name: "Phòng Kế hoạch - Nghiệp vụ",
        block: "PHONG_CHUC_NANG",
        icon: "planning",
        specialties: []
      },
      {
        id: "to-chuc-hanh-chinh",
        value: "ORGANIZATION_ADMIN",
        name: "Phòng Tổ chức - Hành chính",
        block: "PHONG_CHUC_NANG",
        icon: "admin",
        specialties: []
      },
      {
        id: "tai-chinh-ke-toan",
        value: "FINANCE_ACCOUNTING",
        name: "Phòng Tài chính kế toán",
        block: "PHONG_CHUC_NANG",
        icon: "finance",
        specialties: []
      },
      {
        id: "dieu-duong",
        value: "NURSING_DEPARTMENT",
        name: "Phòng Điều dưỡng",
        block: "PHONG_CHUC_NANG",
        icon: "nursing",
        specialties: []
      }
    ]
  }
];
