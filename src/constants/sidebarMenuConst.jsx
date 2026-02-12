import {
  LuLayoutDashboard,
  LuClipboardList,
  LuUsers,
  LuStethoscope,
  LuImages,
  LuNewspaper,
  LuLayers3,
} from "react-icons/lu";

export const SIDEBAR_MENU = [
  {
    group: "Menu chính",
    items: [
      {
        title: "Tổng quan",
        to: "/bang-dieu-khien",
        icon: <LuLayoutDashboard />,
      },
      { title: "Lịch hẹn", to: "/quan-ly-lich-hen", icon: <LuClipboardList /> },
    ],
  },
  {
    group: "Quản lý",
    items: [
      { title: "Nhân sự", to: "/quan-ly-nhan-su", icon: <LuUsers /> },
      { title: "Bác sĩ", to: "/quan-ly-bac-si", icon: <LuStethoscope /> },
      { title: "Banner", to: "/quan-ly-banner", icon: <LuImages /> },
      { title: "Tin tức", to: "/quan-ly-tin-tuc", icon: <LuNewspaper /> },
      { title: "Chuyên môn", to: "/quan-ly-chuyen-mon", icon: <LuLayers3 /> },
    ],
  },
];
