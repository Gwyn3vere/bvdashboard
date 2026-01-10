import { useState, useEffect } from "react";
import { scheduleStore } from "../../store/scheduleStore";
import { generateTimeSlots } from "../../utils/format";
import { SESSION_PRESETS } from "../../constants/option";

export default function useShiftConfig(schedule, date) {
  const { updateScheduleConfig, copyScheduleToOtherDays } = scheduleStore();
  const [toast, setToast] = useState(null);
  const [sessionType, setSessionType] = useState(schedule.sessionType || "morning");
  const [slotDuration, setSlotDuration] = useState(schedule.slotDuration || 30);
  const [startTime, setStartTimeState] = useState(schedule.startTime || "08:00");
  const [endTime, setEndTimeState] = useState(schedule.endTime || "11:00");
  const [generatedSlots, setGeneratedSlots] = useState(schedule.generatedSlots || []);
  const [selectedSlotIndices, setSelectedSlotIndices] = useState(schedule.selectedSlotIndices || []);
  const [isDirtyConfig, setIsDirtyConfig] = useState(false);

  useEffect(() => {
    setIsDirtyConfig(false);
  }, [schedule.scheduleId]);

  const handleSessionChange = (newSession) => {
    setSessionType(newSession);
    const preset = SESSION_PRESETS[newSession];
    setStartTimeState(preset.start);
    setEndTimeState(preset.end);
    setGeneratedSlots([]);
    setSelectedSlotIndices([]);
    setIsDirtyConfig(true);
  };

  const toggleSlot = (index) => {
    if (selectedSlotIndices.includes(index)) {
      setSelectedSlotIndices(selectedSlotIndices.filter((i) => i !== index));
    } else {
      setSelectedSlotIndices([...selectedSlotIndices, index].sort((a, b) => a - b));
    }
  };

  const selectAllSlots = () => {
    setSelectedSlotIndices(generatedSlots.map((_, idx) => idx));
  };

  const deselectAllSlots = () => {
    setSelectedSlotIndices([]);
  };

  const getSelectedSlots = () => {
    return selectedSlotIndices.map((idx) => generatedSlots[idx]);
  };

  const saveConfig = () => {
    const selectedSlots = getSelectedSlots();
    const config = {
      sessionType,
      slotDuration,
      startTime,
      endTime,
      slots: selectedSlots,
      generatedSlots,
      selectedSlotIndices
    };
    updateScheduleConfig(date, schedule.scheduleId, config);
  };

  const copyToOtherDays = (targetDates) => {
    const selectedSlots = getSelectedSlots();
    const config = {
      sessionType,
      slotDuration,
      startTime,
      endTime,
      slots: selectedSlots,
      generatedSlots,
      selectedSlotIndices,
      configured: true
    };

    updateScheduleConfig(date, schedule.scheduleId, config);
    copyScheduleToOtherDays(date, schedule.scheduleId, targetDates);
  };

  const getTimeConstraints = () => {
    const constraints = {
      morning: { min: "08:00", max: "11:00" },
      afternoon: { min: "13:00", max: "17:00" },
      custom: { min: "08:00", max: "17:00" },
      allday: { min: null, max: null }
    };
    return constraints[sessionType] || constraints.custom;
  };

  const setStartTime = (time) => {
    setStartTimeState(time);
    setIsDirtyConfig(true);
  };

  const setEndTime = (time) => {
    setEndTimeState(time);
    setIsDirtyConfig(true);
  };

  const setSlotDurationValue = (value) => {
    setSlotDuration(value);
    setIsDirtyConfig(true);
  };

  const generateSlots = () => {
    // Validate business logic
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;

    if (!Number.isInteger(slotDuration) || slotDuration < 10) {
      setToast({
        type: "INFO",
        message: "Thời lượng mỗi ca khám phải lớn hơn hoặc bằng 10 phút."
      });
      return;
    }

    if (slotDuration > 240) {
      setToast({
        type: "INFO",
        message: "Thời lượng mỗi ca khám không hợp lệ."
      });
      return;
    }

    // Kiểm tra constraints
    const constraints = getTimeConstraints();
    if (constraints.min) {
      const [minH, minM] = constraints.min.split(":").map(Number);
      const minMinutes = minH * 60 + minM;
      if (startMinutes < minMinutes) {
        setToast({
          type: "INFO",
          message: `Giờ bắt đầu phải từ ${constraints.min} trở đi`
        });
        return;
      }
    }

    if (constraints.max) {
      const [maxH, maxM] = constraints.max.split(":").map(Number);
      const maxMinutes = maxH * 60 + maxM;
      if (endMinutes > maxMinutes) {
        setToast({
          type: "INFO",
          message: `Giờ kết thúc không được vượt quá ${constraints.max}`
        });
        return;
      }
    }

    if (startMinutes >= endMinutes) {
      setToast({
        type: "INFO",
        message: "Giờ bắt đầu phải thấp hơn giờ kết thúc!."
      });
      return;
    }

    // Generate slots
    let slots = [];
    if (sessionType === "allday") {
      const morningSlots = generateTimeSlots("08:00", "11:00", slotDuration);
      const afternoonSlots = generateTimeSlots("13:00", "17:00", slotDuration);
      slots = [...morningSlots, ...afternoonSlots];
    } else {
      slots = generateTimeSlots(startTime, endTime, slotDuration);
    }

    setGeneratedSlots(slots);
    setSelectedSlotIndices(slots.map((_, idx) => idx).sort((a, b) => a - b));
    setIsDirtyConfig(false);
  };

  return {
    toast,
    setToast,
    sessionType,
    slotDuration,
    startTime,
    endTime,
    generatedSlots,
    selectedSlotIndices,
    isDirtyConfig,
    setSlotDuration,
    setSlotDurationValue,
    setStartTime,
    setEndTime,
    handleSessionChange,
    generateSlots,
    toggleSlot,
    selectAllSlots,
    deselectAllSlots,
    getSelectedSlots,
    saveConfig,
    copyToOtherDays,
    getTimeConstraints
  };
}
