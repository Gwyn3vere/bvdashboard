import React, { useMemo } from "react";
import classNames from "classnames/bind";
import style from "../../../styles/components.module.css";
import { Item, Tooltip } from "../../../components/ui";
import { useAppointmentStore } from "../../../store/appointmentStore";

const cx = classNames.bind(style);

const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const legendColors = [
  "var(--color-primary-100)",
  "var(--color-primary-300)",
  "var(--color-primary-500)",
  "var(--color-primary-700)",
];

function AppointmentDensity() {
  const getWeekStats = useAppointmentStore((a) => a.getWeekStats);
  const appointments = useAppointmentStore((s) => s.appointments);
  const { days, startDate, endDate } = getWeekStats(0);
  const weekAppointments = useMemo(
    () =>
      appointments.filter(
        (a) => a.appointmentDate >= startDate && a.appointmentDate <= endDate && a.status !== "CANCELLED",
      ),
    [appointments, startDate, endDate],
  );
  const heatmap = useMemo(
    () =>
      HOURS.map((hour) =>
        days.map(
          (day) =>
            weekAppointments.filter((a) => {
              const h = parseInt(a.slotStart.split(":")[0]);
              return a.appointmentDate === day.date && h === hour;
            }).length,
        ),
      ),
    [weekAppointments, days],
  );
  const max = Math.max(...heatmap.flat(), 1);
  const cellColor = (v) => {
    if (v === 0) return "var(--color-unavailable-100)";
    const pct = v / max;
    if (pct < 0.25) return "var(--color-primary-100)";
    if (pct < 0.5) return "var(--color-primary-300)";
    if (pct < 0.75) return "var(--color-primary-500)";
    return "var(--color-primary-700)";
  };

  const currentHour = new Date().getHours();

  const hourTotals = HOURS.map((hour, hi) => heatmap[hi].reduce((sum, v) => sum + v, 0));
  const peakHourIndex = hourTotals.indexOf(Math.max(...hourTotals));
  const peakHour = HOURS[peakHourIndex];
  const peakHourEnd = HOURS[peakHourIndex + 1] ?? peakHour + 1;

  return (
    <div className={cx("bg-white rounded-2xl px-6 py-5.5")} style={{ boxShadow: "var(--shadow)" }}>
      {/* Header */}
      <div className={cx(" flex items-center justify-between mb-[16px]")}>
        <div>
          <Item as="h2" children={"Mật độ lịch hẹn theo giờ"} itemClassName={cx("text-[15px] font-black leading-5")} />
          <Item
            children={"Tuần này • giờ cao điểm được tô đậm"}
            itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]/70 font-medium")}
            className={cx("mt-[2px] leading-3")}
          />
        </div>
        <div className={cx("flex items-center gap-1.5")}>
          <Item children={"Ít"} itemClassName={cx("text-[10px] text-[var(--color-unavailable-700)]/70")} />
          {legendColors.map((c, i) => (
            <div key={i} className="w-[14px] h-[14px] rounded-sm" style={{ background: c }} />
          ))}
          <Item children={"Nhiều"} itemClassName={cx("text-[10px] text-[var(--color-unavailable-700)]/70")} />
        </div>
      </div>

      {/* Density Grid */}
      <div className={cx("grid grid-cols-[44px_repeat(7,1fr)] gap-[5px] min-w-[380px]")}>
        {/* Header */}
        <div />
        {days.map((day, i) => (
          <Item
            key={i}
            children={day.label}
            itemClassName={cx("text-center text-[11px] font-bold text-[var(--color-unavailable-700)]")}
          />
        ))}

        {/* Rows */}
        {HOURS.map((hour, hi) => (
          <React.Fragment key={`row-${hi}`}>
            <Item
              children={`${hour}h`}
              itemClassName={cx("text-right text-[10.5px]")}
              className={cx(
                "pr-2 flex items-center justify-end",
                hour === currentHour ? "text-[var(--color-primary)] font-bold" : "text-[var(--color-unavailable)]",
              )}
            />

            {days.map((day, di) => {
              const v = heatmap[hi][di];
              return (
                <Tooltip content={`${day.label} ${hour}h — ${v} lịch`} key={`${hi}-${di}`} position="top">
                  <div
                    className={cx(
                      "h-7 rounded-md transition-colors duration-300 cursor-pointer",
                      "transition-transform duration-300",
                      "hover:scale-110 hover:shadow",
                    )}
                    style={{ background: cellColor(v) }}
                  />
                </Tooltip>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Peak Hour */}
      <div className={cx("mt-3 flex items-center gap-2 text-[11px] text-[var(--color-unavailable-700)]")}>
        <div
          className={cx(
            "w-3 h-3 rounded-[3px] border-2 border-[var(--color-primary)]",
            "bg-[var(--color-primary-100)]",
          )}
        />
        <Item as="span" children={`Khung giờ hiện tại (${String(currentHour).padStart(2, "0")}:00)`} />
        <span className="text-[var(--color-unavailable-300)]">·</span>
        <span>
          Giờ cao điểm:{" "}
          <strong className="text-[var(--color-primary)]">
            {peakHour}h–{peakHourEnd}h
          </strong>
        </span>
      </div>
    </div>
  );
}

export default React.memo(AppointmentDensity);
