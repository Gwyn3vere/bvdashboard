import { useState, useMemo } from "react";

function useCalendar(appointments) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Format date - sử dụng local date để tránh lỗi timezone
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add previous month's days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonthDays = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

    for (let i = prevMonthDays; i > 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i + 1),
        isCurrentMonth: false
      });
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }

    return days;
  };

  // Get appointments for a specific date
  const getAppointmentsForDate = (date) => {
    const dateStr = formatDate(date);
    return appointments.filter((apt) => apt.date === dateStr).sort((a, b) => a.timeStart.localeCompare(b.timeStart));
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return formatDate(date) === formatDate(today);
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const daysInMonth = useMemo(() => getDaysInMonth(currentDate), [currentDate]);

  return {
    currentDate,
    daysInMonth,
    formatDate,
    getAppointmentsForDate,
    isToday,
    goToPreviousMonth,
    goToNextMonth,
    goToToday
  };
}

export default useCalendar;
