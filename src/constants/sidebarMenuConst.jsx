import {
  HiMiniUserGroup,
  HiMiniSquares2X2,
  HiMiniUser,
  HiCalendar,
  HiUsers,
  HiViewColumns,
  HiStop
} from "react-icons/hi2";

export const SIDEBAR_MENU = [
  {
    group: "Chức năng chính",
    items: [
      { title: "Tổng quan", to: "/", icon: <HiMiniSquares2X2 /> },
      { title: "Bệnh nhân", to: "/patients", icon: <HiMiniUserGroup /> },
      { title: "Lịch hẹn", to: "/appointments", icon: <HiCalendar /> }
    ]
  },
  {
    group: "Quản lý nhân sự",
    items: [
      { title: "Nhân sự", to: "/quan-ly-nhan-su", icon: <HiUsers /> },
      { title: "Bác sĩ", to: "/doctors", icon: <HiMiniUser /> }
    ]
  },
  {
    group: "Quản lý thành phần",
    items: [
      { title: "Banner", to: "/banner", icon: <HiViewColumns /> },
      { title: "Logo", to: "/logo", icon: <HiStop /> }
    ]
  }
];
