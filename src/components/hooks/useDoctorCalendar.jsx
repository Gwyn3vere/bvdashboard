import { useState } from "react";
import { scheduleStore } from "../../store/scheduleStore";

export default function useDoctorCalendar() {
  const { addDoctorToDate, getSchedulesByDate } = scheduleStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedDoctorId, setDraggedDoctorId] = useState(null);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDragStart = (doctorId) => {
    setDraggedDoctorId(doctorId);
  };

  const handleDrop = (dateStr, isCurrentMonth) => {
    if (!draggedDoctorId || !isCurrentMonth) return;
    addDoctorToDate(dateStr, draggedDoctorId);
    setDraggedDoctorId(null);
  };

  return {
    currentDate,
    draggedDoctorId,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    handleDragStart,
    handleDrop
  };
}
