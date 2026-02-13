import {
  LuUser,
  LuSettings,
  LuLogOut,
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
} from "react-icons/lu";

export const NAV_MENU = [
  { id: "account", icon: <LuUser />, value: "ACCOUNT", name: "Tài khoản" },
  { id: "setting", icon: <LuSettings />, value: "SETTING", name: "Cài đặt" },
];

export const NEWS_STATUS_PUBLISH = [
  {
    id: "draft",
    value: "DRAFT",
    name: "Lưu nháp",
    title: "Chỉ bạn có thể xem",
  },
  {
    id: "publish",
    value: "PUBLISHED",
    name: "Xuất bản",
    title: "Công khai cho mọi người",
  },
  {
    id: "waiting",
    value: "WAITING",
    name: "Chờ duyệt",
    title: "Gửi yêu cầu kiểm tra và xét duyệt",
  },
  {
    id: "archived",
    value: "ARCHIVED",
    name: "Lưu trữ",
    title: "Lưu trữ trong hệ thống",
  },
];

export const NEWS_CATEGORIES = [
  { id: "ttsk", name: "Tin tức sức khoẻ", totalNews: 42 },
  { id: "pcd", name: "Phòng chống dịch", totalNews: 28 },
  { id: "cssk", name: "Chăm sóc sức khoẻ", totalNews: 35 },
  { id: "ytcd", name: "Y tế cộng đồng", totalNews: 19 },
  { id: "dd", name: "Dinh dưỡng", totalNews: 24 },
];

export const RICH_TEXT_HIGHLIGHT_COLORS = [
  "#fde68a",
  "#fecaca",
  "#bfdbfe",
  "#bbf7d0",
  "#e9d5ff",
];

export const RICH_TEXT_HEADINGS = [
  { level: 1, icon: <LuHeading1 />, title: "Heading 1" },
  { level: 2, icon: <LuHeading2 />, title: "Heading 2" },
  { level: 3, icon: <LuHeading3 />, title: "Heading 3" },
  { level: 4, icon: <LuHeading4 />, title: "Heading 4" },
];

export const RICH_TEXT_COLORS = [
  "#000000",
  "#374151",
  "#EF4444",
  "#F97316",
  "#F59E0B",
  "#EAB308",
  "#84CC16",
  "#22C55E",
  "#10B981",
  "#14B8A6",
  "#06B6D4",
  "#0EA5E9",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#D946EF",
  "#EC4899",
  "#F43F5E",
];
