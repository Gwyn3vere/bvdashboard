import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_DOCTOR_LIST } from "../mock/doctors";
import { SYNC_ENUM } from "../constants/status";

export const scheduleStore = create(
  persist(
    (set, get) => ({
      doctors: MOCK_DOCTOR_LIST,
      workSchedules: {},

      addDoctorToDate: (date, doctorId) => {
        const scheduleId = `schedule_${Date.now()}_${Math.random()}`;
        set((state) => ({
          workSchedules: {
            ...state.workSchedules,
            [date]: [
              ...(state.workSchedules[date] || []),
              {
                scheduleId,
                doctorId,
                date,
                configured: false,
                syncStatus: SYNC_ENUM.DIRTY,
              },
            ],
          },
        }));
        return scheduleId;
      },

      removeSchedule: (date, scheduleId) => {
        set((state) => {
          const schedules = state.workSchedules[date] || [];
          const nextSchedules = schedules.filter((s) => s.scheduleId !== scheduleId);

          // Nếu còn schedule → cập nhật như bình thường
          if (nextSchedules.length > 0) {
            return {
              workSchedules: {
                ...state.workSchedules,
                [date]: nextSchedules,
              },
            };
          }

          // Nếu KHÔNG còn schedule → xoá luôn ngày
          const { [date]: _, ...rest } = state.workSchedules;
          return {
            workSchedules: rest,
          };
        });
      },

      updateScheduleConfig: (date, scheduleId, config) => {
        set((state) => ({
          workSchedules: {
            ...state.workSchedules,
            [date]: (state.workSchedules[date] || []).map((schedule) =>
              schedule.scheduleId === scheduleId
                ? { ...schedule, ...config, configured: true, syncStatus: SYNC_ENUM.DIRTY }
                : schedule,
            ),
          },
        }));
      },

      markScheduleSyncing: (date, scheduleId) => {
        set((state) => {
          const schedules = state.workSchedules[date];
          if (!schedules) return state;

          return {
            workSchedules: {
              ...state.workSchedules,
              [date]: schedules.map((s) => (s.scheduleId === scheduleId ? { ...s, syncStatus: SYNC_ENUM.SYNCING } : s)),
            },
          };
        });
      },

      markScheduleSynced: (date, scheduleId) => {
        set((state) => {
          const schedules = state.workSchedules[date];
          if (!schedules) return state;

          return {
            workSchedules: {
              ...state.workSchedules,
              [date]: state.workSchedules[date].map((schedule) =>
                schedule.scheduleId === scheduleId ? { ...schedule, syncStatus: SYNC_ENUM.SYNCED } : schedule,
              ),
            },
          };
        });
      },

      markScheduleSyncError: (date, scheduleId, errorMessage) => {
        set((state) => {
          const schedules = state.workSchedules[date];
          if (!schedules) return state;
          return {
            workSchedules: {
              ...state.workSchedules,
              [date]: state.workSchedules[date].map((schedule) =>
                schedule.scheduleId === scheduleId
                  ? {
                      ...schedule,
                      syncStatus: SYNC_ENUM.ERROR,
                      syncError: errorMessage,
                    }
                  : schedule,
              ),
            },
          };
        });
      },

      getDirtySchedules: () => {
        const { workSchedules } = get();
        return Object.values(workSchedules)
          .flat()
          .filter((schedule) => schedule.syncStatus === SYNC_ENUM.DIRTY);
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
          configured: true,
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
      },
    }),
    {
      name: "doctor-schedule-store",
      partialize: (state) => ({
        workSchedules: state.workSchedules,
      }),
    },
  ),
);
