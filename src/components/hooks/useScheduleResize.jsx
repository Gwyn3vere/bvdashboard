import { useState } from "react";
import { scheduleStore } from "../../store/scheduleStore";
import { formatDate } from "../../utils/format";

export default function useScheduleResize() {
  const { getSchedulesByDate } = scheduleStore();
  const [isResizing, setIsResizing] = useState(false);
  const [resizingSchedule, setResizingSchedule] = useState(null);

  const handleResizeStart = (schedule, dateStr) => {
    setIsResizing(true);
    setResizingSchedule({
      scheduleId: schedule.scheduleId,
      startDate: dateStr,
      currentEndDate: dateStr
    });
  };

  const handleResizeMove = (dateStr) => {
    if (!isResizing || !resizingSchedule) return;

    const startDate = new Date(resizingSchedule.startDate);
    const currentDate = new Date(dateStr);

    if (currentDate >= startDate) {
      setResizingSchedule((prev) => (prev ? { ...prev, currentEndDate: dateStr } : null));
    }
  };

  const handleResizeEnd = () => {
    if (!isResizing || !resizingSchedule) return;

    const { scheduleId, startDate, currentEndDate } = resizingSchedule;

    const originalSchedule = getSchedulesByDate(startDate)?.find((s) => s.scheduleId === scheduleId);

    if (originalSchedule && startDate !== currentEndDate) {
      const start = new Date(startDate);
      const end = new Date(currentEndDate);

      const current = new Date(start);
      current.setDate(current.getDate() + 1);

      while (current <= end) {
        const dateStr = formatDate(current);

        const newSchedule = {
          ...originalSchedule,
          scheduleId: `schedule_${originalSchedule.doctorId}_${Date.now()}_${Math.random()}`,
          date: dateStr
        };

        const existingSchedules = getSchedulesByDate(dateStr);
        const hasSameDoctor = existingSchedules.some((s) => s.doctorId === originalSchedule.doctorId);

        if (!hasSameDoctor) {
          scheduleStore.setState((state) => ({
            workSchedules: {
              ...state.workSchedules,
              [dateStr]: [...(state.workSchedules[dateStr] || []), newSchedule]
            }
          }));
        }

        current.setDate(current.getDate() + 1);
      }
    }

    setIsResizing(false);
    setResizingSchedule(null);
  };

  const isDateInResizeRange = (dateStr) => {
    if (!isResizing || !resizingSchedule) return false;
    return (
      new Date(dateStr) >= new Date(resizingSchedule.startDate) &&
      new Date(dateStr) <= new Date(resizingSchedule.currentEndDate)
    );
  };

  return {
    isResizing,
    resizingSchedule,
    handleResizeStart,
    handleResizeMove,
    handleResizeEnd,
    isDateInResizeRange
  };
}
