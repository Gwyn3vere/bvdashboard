export const formatDateVN = (isoDate) => {
  if (!isoDate) return "—";

  const [yyyy, mm, dd] = isoDate.split("-");
  return `${dd}-${mm}-${yyyy}`;
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatPercent = (value, { decimals = 0, rounding = "round" } = {}) => {
  if (value == null || Number.isNaN(value)) return "0%";

  const factor = 10 ** decimals;

  const rounded =
    rounding === "ceil"
      ? Math.ceil(value * factor) / factor
      : rounding === "floor"
      ? Math.floor(value * factor) / factor
      : Math.round(value * factor) / factor;

  return rounded;
};

export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const generateTimeSlots = (startTime, endTime, slotDuration) => {
  const slots = [];
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  let currentTime = startHour * 60 + startMin;
  const endTimeInMin = endHour * 60 + endMin;

  while (currentTime + slotDuration <= endTimeInMin) {
    const startH = Math.floor(currentTime / 60);
    const startM = currentTime % 60;
    const endT = currentTime + slotDuration;
    const endH = Math.floor(endT / 60);
    const endM = endT % 60;

    slots.push({
      start: `${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")}`,
      end: `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`
    });

    currentTime += slotDuration;
  }

  return slots;
};

export const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const days = [];

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const prevMonthDays = startingDayOfWeek === 0 ? 6 : startingDayOfWeek - 1;

  for (let i = prevMonthDays; i > 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i + 1),
      isCurrentMonth: false
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }

  return days;
};
