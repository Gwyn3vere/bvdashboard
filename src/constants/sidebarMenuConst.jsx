import {
  HiMiniUserGroup,
  HiMiniSquares2X2,
  HiMiniUser,
  HiCalendar,
  HiUsers,
  HiViewColumns,
  HiStop,
  HiNewspaper
} from "react-icons/hi2";

export const SIDEBAR_MENU = [
  {
    group: "Menu chính",
    items: [
      { title: "Tổng quan", to: "/bang-dieu-khien", icon: <HiMiniSquares2X2 /> },
      { title: "Bệnh nhân", to: "/patients", icon: <HiMiniUserGroup /> },
      { title: "Lịch hẹn", to: "/appointments", icon: <HiCalendar /> }
    ]
  },
  {
    group: "Quản lý",
    items: [
      { title: "Nhân sự", to: "/quan-ly-nhan-su", icon: <HiUsers /> },
      { title: "Bác sĩ", to: "/quan-ly-bac-si", icon: <HiMiniUser /> },
      { title: "Banner", to: "/quan-ly-banner", icon: <HiViewColumns /> },
      { title: "Tin tức", to: "/quan-ly-tin-tuc", icon: <HiNewspaper /> },
      { title: "Logo", to: "/logo", icon: <HiStop /> }
    ]
  }
];
