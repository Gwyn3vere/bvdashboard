import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/components.module.css";
import { Avatar, Button, Item } from "../../components/ui";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useAppointmentStore } from "../../store/appointmentStore";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function WeekSelector() {
  const [weekOffset, setWeekOffset] = useState(0);
  useAppointmentStore((a) => a.appointments);
  const getWeekStats = useAppointmentStore((a) => a.getWeekStats);
  const { label, days } = getWeekStats(weekOffset);

  return (
    <section className={cx("mb-[20px]")}>
      {/* Navbar */}
      <div
        className={cx(
          "flex items-center justify-between py-4 mb-4",
          "border-b border-[var(--color-unavailable-300)]/50",
        )}
      >
        <div className={cx("flex items-center gap-2")}>
          <Button
            width={32}
            height={32}
            icon={<LuChevronLeft />}
            iconClassName={cx("text-[14px] text-[var(--color-unavailable-700)]")}
            className={cx("rounded-xl bg-white", "border border-transparent hover:border-[var(--color-unavailable)]")}
            style={{ boxShadow: "var(--shadow)" }}
            onClick={() => setWeekOffset((prev) => prev - 1)}
          />
          <Item as="span" children={label} itemClassName={cx("text-[14px] font-black")} />
          {weekOffset !== 0 && (
            <Button
              width={"auto"}
              height={"auto"}
              children={"Về tuần hiện tại"}
              btnClassName={cx("text-[11.5px] font-bold text-[var(--color-primary-700)]")}
              className={cx(
                "py-[3px] px-[10px] bg-[var(--color-primary-100)] rounded-full",
                "border border-[var(--color-primary)]",
              )}
              onClick={() => setWeekOffset(0)}
            />
          )}
        </div>
        <Button
          width={32}
          height={32}
          icon={<LuChevronRight />}
          iconClassName={cx("text-[14px] text-[var(--color-unavailable-700)]")}
          className={cx("rounded-xl bg-white", "border border-transparent hover:border-[var(--color-unavailable)]")}
          style={{ boxShadow: "var(--shadow)" }}
          onClick={() => setWeekOffset((prev) => prev + 1)}
        />
      </div>
      {/* Card Selector */}
      <div key={weekOffset} className={cx("grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-2.5")}>
        {days.map((appt) => {
          return (
            <Item key={appt.dayIndex} as={Link} to={`/quan-ly-lich-hen/${appt.date}`}>
              <CardSelector appt={appt} style={{ animationDelay: `${Math.min(appt.dayIndex * 80, 400)}ms` }} />
            </Item>
          );
        })}
      </div>
    </section>
  );
}

export default React.memo(WeekSelector);

const CardSelector = React.memo(function CardSelector({ appt, style = {} }) {
  const total = appt?.stats?.total ?? 0;
  const activeTotal = total - (appt?.stats?.cancelled ?? 0);

  const pendingPct = activeTotal > 0 ? (appt.stats.pending / activeTotal) * 100 : 0;
  const confirmedPct = activeTotal > 0 ? (appt.stats.confirmed / activeTotal) * 100 : 0;
  const donePct = activeTotal > 0 ? (appt.stats.done / activeTotal) * 100 : 0;

  return (
    <div
      className={cx(
        "py-[14px] px-[12px] rounded-xl border transition-all",
        appt?.isToday
          ? "border-[var(--color-primary)] bg-[var(--color-primary-100)]/10"
          : "bg-white border-transparent",
        "fadeUp",
        "hover:border-[var(--color-primary-300)]",
      )}
      style={{ boxShadow: "var(--shadow)", ...style }}
    >
      {/* Date */}
      <div className={cx("flex items-end justify-between mb-[10px]")}>
        <Item
          as="span"
          icon={appt.label}
          children={appt.dateDisplay}
          iconClassName={cx("text-[14px] font-black")}
          itemClassName={cx("text-[11px] font-bold text-[var(--color-unavailable)]")}
          className={cx("flex items-center gap-1.5 leading-none")}
        />
        {appt?.isToday && (
          <Item
            children={appt?.isToday && "Hôm nay"}
            itemClassName={cx("text-[9px] uppercase font-black text-white leading-3")}
            className={cx("py-[2px] px-[7px] bg-linear-[var(--color-ln-primary)] rounded-full")}
          />
        )}
      </div>
      {/* Total appointment */}
      <div className={cx("mb-[12px]")}>
        <Item children={activeTotal} itemClassName={cx("text-[30px] font-black leading-none mb-[2px]")} />
        <Item children={"Lịch hẹn"} itemClassName={cx("text-[10.5px] text-[var(--color-unavailable-700)]")} />
      </div>
      {/* Progress bar */}
      <div className={cx("flex flex-col gap-1 mb-4")}>
        {/* Pending */}
        <div className={cx("grid grid-cols-[3px_auto_14px] items-center gap-1")}>
          <div className={cx("h-[10px] w-[3px] bg-linear-[var(--color-ln-warning)] rounded-full")} />
          <div className={cx("h-[4px] bg-[var(--color-unavailable)] rounded-full")} style={{ width: `100%` }}>
            <div
              className={cx("h-[4px] bg-linear-[var(--color-ln-warning)] rounded-full")}
              style={{ width: `${pendingPct}%` }}
            />
          </div>
          <Item
            as="span"
            children={appt?.stats?.pending}
            itemClassName={cx(
              "text-[10.5px] font-black whitespace-nowrap",
              "bg-gradient-to-r from-[var(--color-warning)] to-[#d97706] bg-clip-text text-transparent",
            )}
            className={cx("h-[14px] text-right")}
          />
        </div>
        {/* Confirmed */}
        <div className={cx("grid grid-cols-[3px_auto_14px] items-center gap-1")}>
          <div className={cx("h-[10px] w-[3px] bg-linear-[var(--color-ln-primary)] rounded-full")} />
          <div className={cx("h-[4px] bg-[var(--color-unavailable)] rounded-full")} style={{ width: `100%` }}>
            <div
              className={cx("h-[4px] bg-linear-[var(--color-ln-primary)] rounded-full")}
              style={{ width: `${confirmedPct}%` }}
            />
          </div>
          <Item
            as="span"
            children={appt?.stats?.confirmed}
            itemClassName={cx(
              "text-[10.5px] font-black text-[var(--color-primary)] whitespace-nowrap",
              "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-700)] bg-clip-text text-transparent",
            )}
            className={cx("h-[14px] text-right")}
          />
        </div>
        {/* Done */}
        <div className={cx("grid grid-cols-[3px_auto_14px] items-center gap-1")}>
          <div className={cx("h-[10px] w-[3px] bg-linear-[var(--color-ln-unavailable)] rounded-full")} />
          <div className={cx("h-[4px] bg-[var(--color-unavailable)] rounded-full")} style={{ width: `100%` }}>
            <div
              className={cx("h-[4px] bg-linear-[var(--color-ln-unavailable)] rounded-full")}
              style={{ width: `${donePct}%` }}
            />
          </div>
          <Item
            as="span"
            children={appt?.stats?.done}
            itemClassName={cx("text-[10.5px] font-black text-[var(--color-unavailable-700)] whitespace-nowrap")}
            className={cx("h-[14px] text-right")}
          />
        </div>
      </div>
      {/* Doctor list avatar */}
      <div className="flex items-center gap-1 flex-wrap">
        {appt?.doctors.slice(0, 8).map((doc, idx) => (
          <Avatar key={idx} width={18} height={18} name={doc.doctorName} className={cx("rounded-full text-[7px]")} />
        ))}
      </div>
    </div>
  );
});
