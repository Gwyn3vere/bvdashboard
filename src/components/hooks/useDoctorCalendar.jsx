import { useState } from "react";
import { scheduleStore } from "../../store/scheduleStore";
import { formatDate } from "../../utils/format";

export default function useDoctorCalendar() {
  const { addDoctorToDate, getSchedulesByDate, isDoctorScheduledOnDate } = scheduleStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedDoctorId, setDraggedDoctorId] = useState(null);
  const [toast, setToast] = useState(null);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday = (date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  const handleDragStart = (doctorId) => {
    setDraggedDoctorId(doctorId);
  };

  const handleDrop = (dateStr, isCurrentMonth) => {
    if (!draggedDoctorId || !isCurrentMonth) return;

    const [year, month, day] = dateStr.split("-").map(Number);
    const selectedDate = new Date(year, month - 1, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setToast({
        type: "INFO",
        message: "Bạn không thể tạo lịch trong quá khứ"
      });
      setDraggedDoctorId(null);
      return;
    }

    if (isDoctorScheduledOnDate(dateStr, draggedDoctorId)) {
      setToast({
        type: "INFO",
        message: "Bác sĩ này đã có lịch làm việc trong ngày này rồi"
      });
      setDraggedDoctorId(null);
      return;
    }

    addDoctorToDate(dateStr, draggedDoctorId);
    setDraggedDoctorId(null);
  };

  return {
    toast,
    setToast,
    currentDate,
    draggedDoctorId,
    isToday,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    handleDragStart,
    handleDrop
  };
}
