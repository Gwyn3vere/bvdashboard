import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockDoctors } from "../mock/manage";
import { getColorByIndex } from "../utils/color";

export const scheduleStore = create(
  (set, get) => ({
    doctors: mockDoctors,
    workSchedules: {},

    addDoctorToDate: (date, doctorId) => {
      const doctorIndex = get().doctors.findIndex((d) => d.id === doctorId);
      const color = getColorByIndex(doctorIndex);

      const scheduleId = `schedule_${Date.now()}_${Math.random()}`;
      set((state) => ({
        workSchedules: {
          ...state.workSchedules,
          [date]: [
            ...(state.workSchedules[date] || []),
            {
              scheduleId,
              doctorId,
              colorName: color.name,
              date,
              shifts: [],
              configured: false
            }
          ]
        }
      }));
      return scheduleId;
    },

    removeSchedule: (date, scheduleId) => {
      set((state) => ({
        workSchedules: {
          ...state.workSchedules,
          [date]: (state.workSchedules[date] || []).filter((s) => s.scheduleId !== scheduleId)
        }
      }));
    },

    updateScheduleConfig: (date, scheduleId, config) => {
      set((state) => ({
        workSchedules: {
          ...state.workSchedules,
          [date]: (state.workSchedules[date] || []).map((schedule) =>
            schedule.scheduleId === scheduleId ? { ...schedule, ...config, configured: true } : schedule
          )
        }
      }));
    },

    copyScheduleToOtherDays: (sourceDate, sourceScheduleId, targetDates) => {
      const sourceSchedule = get().workSchedules[sourceDate]?.find((s) => s.scheduleId === sourceScheduleId);
      if (!sourceSchedule) return;

      const config = {
        sessionType: sourceSchedule.sessionType,
        slotDuration: sourceSchedule.slotDuration,
        startTime: sourceSchedule.startTime,
        endTime: sourceSchedule.endTime,
        slots: sourceSchedule.slots,
        generatedSlots: sourceSchedule.generatedSlots,
        selectedSlotIndices: sourceSchedule.selectedSlotIndices,
        configured: true
      };

      targetDates.forEach((targetDate) => {
        const existingSchedules = get().workSchedules[targetDate] || [];
        const hasSameDoctor = existingSchedules.some((s) => s.doctorId === sourceSchedule.doctorId);

        if (!hasSameDoctor) {
          const scheduleId = get().addDoctorToDate(targetDate, sourceSchedule.doctorId);
          get().updateScheduleConfig(targetDate, scheduleId, config);
        }
      });
    },

    getDoctorById: (doctorId) => {
      return get().doctors.find((d) => d.id === doctorId);
    },

    getSchedulesByDate: (date) => {
      return get().workSchedules[date] || [];
    },

    isDoctorScheduledOnDate: (date, doctorId) => {
      const schedules = get().workSchedules[date] || [];
      return schedules.some((s) => s.doctorId === doctorId);
    },
    clearAllSchedules: () => {
      set({ workSchedules: {} });
    }
  }),
  {
    name: "doctor-schedule-store",
    partialize: (state) => ({
      workSchedules: state.workSchedules
    })
  }
);
