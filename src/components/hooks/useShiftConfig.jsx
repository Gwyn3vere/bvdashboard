import { useState } from "react";
import { scheduleStore } from "../../store/scheduleStore";
import { generateTimeSlots } from "../../utils/format";
import { SESSION_PRESETS } from "../../constants/option";

export default function useShiftConfig(schedule, date) {
  const { updateScheduleConfig, copyScheduleToOtherDays } = scheduleStore();

  const [sessionType, setSessionType] = useState(schedule.sessionType || "morning");
  const [slotDuration, setSlotDuration] = useState(schedule.slotDuration || 30);
  const [startTime, setStartTime] = useState(schedule.startTime || "08:00");
  const [endTime, setEndTime] = useState(schedule.endTime || "12:00");
  const [generatedSlots, setGeneratedSlots] = useState(schedule.slots || []);
  const [selectedSlotIndices, setSelectedSlotIndices] = useState(schedule.selectedSlotIndices || []);

  const handleSessionChange = (newSession) => {
    setSessionType(newSession);
    const preset = SESSION_PRESETS[newSession];
    setStartTime(preset.start);
    setEndTime(preset.end);
    setGeneratedSlots([]);
    setSelectedSlotIndices([]);
  };

  const generateSlots = () => {
    let slots = [];

    if (sessionType === "allday") {
      const morningSlots = generateTimeSlots("08:00", "12:00", slotDuration);
      const afternoonSlots = generateTimeSlots("14:00", "18:00", slotDuration);
      slots = [...morningSlots, ...afternoonSlots];
    } else {
      slots = generateTimeSlots(startTime, endTime, slotDuration);
    }

    setGeneratedSlots(slots);
    setSelectedSlotIndices(slots.map((_, idx) => idx).sort((a, b) => a - b));
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

  return {
    sessionType,
    slotDuration,
    startTime,
    endTime,
    generatedSlots,
    selectedSlotIndices,
    setSlotDuration,
    setStartTime,
    setEndTime,
    handleSessionChange,
    generateSlots,
    toggleSlot,
    selectAllSlots,
    deselectAllSlots,
    getSelectedSlots,
    saveConfig,
    copyToOtherDays
  };
}
