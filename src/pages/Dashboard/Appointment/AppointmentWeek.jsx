import React from "react";
import classNames from "classnames/bind";
import style from "../../../styles/components.module.css";
import { Item, Tooltip } from "../../../components/ui";
import { useAppointmentStore } from "../../../store/appointmentStore";
import { LuTrendingDown, LuTrendingUp } from "react-icons/lu";

const cx = classNames.bind(style);

function AppointmentWeek() {
  const getWeekStats = useAppointmentStore((a) => a.getWeekStats);
  const { days, weekStats } = getWeekStats(0);
  const { weekStats: lastWeekStats } = getWeekStats(-1);
  // mock % tăng trưởng so sánh lịch tuần trước và tuần hiện tại
  lastWeekStats.total = 40;
  const growth =
    lastWeekStats.total > 0 ? Math.round(((weekStats.total - lastWeekStats.total) / lastWeekStats.total) * 100) : null;

  const max = Math.max(...days.map((d) => d.stats.total)) || 1;

  return (
    <div className={cx("bg-white rounded-2xl px-6 py-5.5")} style={{ boxShadow: "var(--shadow)" }}>
      {/* Header */}
      <div className={cx("flex items-center justify-between")}>
        <div>
          <Item as="h2" children={"Lịch hẹn tuần này"} itemClassName={cx("text-[15px] font-black leading-5")} />
          <Item
            children={`${weekStats.total ?? 0} lịch tuần này`}
            itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]/70 font-semibold")}
            className={cx("mt-[2px] leading-3")}
          />
        </div>
        {growth !== null && (
          <Item
            icon={growth >= 0 ? <LuTrendingUp /> : <LuTrendingDown />}
            children={`${Math.abs(growth)}%`}
            itemClassName={cx("whitespace-nowrap")}
            className={cx(
              "text-[11px] text-[var(--color-primary)] font-bold",
              "flex items-center gap-1 rounded-full leading-4",
              "py-[4px] px-[10px] bg-[var(--color-primary-100)]/50",
            )}
          />
        )}
      </div>
      <div className={cx("h-30 flex items-end gap-2 mt-2")}>
        {days.map((item) => {
          const heightPercent = (item.stats.total / max) * 100;

          return (
            <Tooltip
              key={item.date}
              content={`${item.stats.total} lịch`}
              position="top"
              className={cx("flex-1 h-full")}
            >
              <div className={cx("flex flex-col justify-end items-center gap-1 h-full")}>
                <Item
                  className={cx(
                    "growUp",
                    "w-full rounded-t-lg hover:bg-linear-[var(--color-ln-primary)]",
                    item.isToday ? "bg-linear-[var(--color-ln-primary)]" : "bg-[var(--color-primary-100)]",
                  )}
                  style={{ height: `${heightPercent}%` }}
                />
                <Item
                  children={item.label}
                  itemClassName={cx(
                    "text-[10.5px] font-bold",
                    item.isToday ? "text-[var(--color-primary)]" : "text-[var(--color-primary-300)]",
                  )}
                />
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(AppointmentWeek);
