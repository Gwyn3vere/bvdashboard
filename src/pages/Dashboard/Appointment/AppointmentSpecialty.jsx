import React, { useMemo } from "react";
import classNames from "classnames/bind";
import style from "../../../styles/components.module.css";
import { Item } from "../../../components/ui";
import { useAppointmentStore } from "../../../store/appointmentStore";
import DonutChart from "./DonutChart";

const cx = classNames.bind(style);

const COLORS = ["#22c55e", "#38bdf8", "#a78bfa", "#f59e0b", "#ec4899", "#14b8a6", "#f43f5e"];

function AppointmentSpecialty() {
  const getWeekStats = useAppointmentStore((a) => a.getWeekStats);
  const getAppointmentsByDate = useAppointmentStore((a) => a.getAppointmentsByDate);

  const { days } = getWeekStats(0);
  const today = days.find((d) => d.isToday);

  const appointmentsToday = getAppointmentsByDate(today?.date) || [];

  const chartData = useMemo(() => {
    if (!appointmentsToday.length) return [];

    // 1. group theo chuyên khoa
    const map = appointmentsToday.reduce((acc, cur) => {
      const key = cur.specialtyName || "Khác";

      if (acc[key]) {
        acc[key].value += 1;
      } else {
        acc[key] = {
          label: key,
          value: 1,
        };
      }

      return acc;
    }, {});

    // 2. convert từ array + thêm màu
    const arr = Object.values(map).map((item, index) => ({
      ...item,
      color: COLORS[index % COLORS.length],
    }));

    // 3. sort desc
    const sorted = arr.sort((a, b) => b.value - a.value);

    // 4. top 4 + rest
    const top4 = sorted.slice(0, 4);
    const rest = sorted.slice(4);

    const restTotal = rest.reduce((sum, item) => sum + item.value, 0);

    if (restTotal > 0) {
      top4.push({
        label: "Khác",
        value: restTotal,
        color: "#e5e7eb",
      });
    }

    return top4;
  }, [appointmentsToday]);

  const total = appointmentsToday.length;

  return (
    <div className={cx("bg-white rounded-2xl px-6 py-5.5")} style={{ boxShadow: "var(--shadow)" }}>
      <div className={cx("mb-3.5")}>
        <Item as="h2" children={"Lịch theo chuyên khoa"} itemClassName={cx("text-[15px] font-black")} />
        <Item
          children={"Phân bổ hôm nay"}
          itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]/70 font-semibold")}
        />
      </div>

      <div className={cx("flex flex-col md:flex-row items-center gap-5")}>
        {/* Donut */}
        <div className="relative w-[118px] h-[118px]">
          <DonutChart data={chartData} size={118} strokeWidth={11} />

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Item children={total} itemClassName={cx("text-[18px] font-bold")} />
            <Item children={"lịch hôm nay"} itemClassName={cx("text-[10px] text-[var(--color-unavailable-700)]")} />
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 flex flex-col gap-1.5 w-full">
          {chartData.map((item, idx) => {
            const statsPct = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  <span className="text-[11.5px] text-[var(--color-unavailable-900)] font-medium">{item.label}</span>
                </div>
                <div className="flex items-center flex-1 sm:flex-2">
                  <span className="text-[11px] font-bold min-w-5">{item.value}</span>
                  <div className={cx("h-[4px] bg-[var(--color-unavailable)] rounded-full")} style={{ width: `100%` }}>
                    <div
                      className={cx("h-[4px] rounded-full")}
                      style={{ width: `${statsPct}%`, background: item.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default React.memo(AppointmentSpecialty);
