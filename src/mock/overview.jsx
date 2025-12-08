import { color } from "motion";
import { HiUserGroup, HiUserPlus, HiCalendarDays, HiCheckCircle } from "react-icons/hi2";

export const mockOverviewStats = [
  { id: 1, title: "Tổng bác sĩ", value: 35, icon: <HiUserGroup />, color: "#42a5f5" },
  { id: 2, title: "Bệnh nhân mới", value: 300, icon: <HiUserPlus />, color: "#64b5f6" },
  { id: 3, title: "Lịch hẹn", value: 120, icon: <HiCalendarDays />, color: "#90caf9" },
  { id: 4, title: "Ca khám hoàn thành", value: 115, icon: <HiCheckCircle />, color: "#bbdefb" }
];
