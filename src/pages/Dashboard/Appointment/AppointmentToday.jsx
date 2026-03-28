import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import style from "../../../styles/pages.module.css";
import { Button, Item } from "../../../components/ui";
import { useAppointmentStore } from "../../../store/appointmentStore";
import { Link } from "react-router-dom";
import { TWCSS } from "../../../styles/defineTailwindcss";
import { APPOINTMENT_STATUS } from "../../../constants/status";

const cx = classNames.bind(style);

function AppointmentToday() {
  const getWeekStats = useAppointmentStore((a) => a.getWeekStats);
  const getAppointmentsByDate = useAppointmentStore((a) => a.getAppointmentsByDate);

  const { days } = getWeekStats(0);
  const today = days.find((d) => d.isToday);
  const appointmentsToday = getAppointmentsByDate(today.date);

  const dateNow = new Date(today.date).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  //Filter tab
  const [activeTab, setActiveTab] = useState("ALL");

  const tabbedAppt = useMemo(() => {
    if (activeTab === "ALL") return appointmentsToday;
    if (activeTab === "CONFIRMED") return appointmentsToday.filter((a) => a.status === "CONFIRMED");
    if (activeTab === "PENDING") return appointmentsToday.filter((a) => a.status === "PENDING");
    if (activeTab === "CANCELLED") return appointmentsToday.filter((a) => a.status === "CANCELLED");
    return appointmentsToday;
  }, [appointmentsToday, activeTab]);

  const tabMenu = [
    { id: 1, tab: "Tất cả", status: "ALL", onclick: () => setActiveTab("ALL"), grd: "var(--color-grd-primary)" },
    {
      id: 2,
      tab: "Xác nhận",
      status: "CONFIRMED",
      onclick: () => setActiveTab("CONFIRMED"),
      grd: "var(--color-grd-secondary)",
    },
    {
      id: 3,
      tab: "Chờ duyệt",
      status: "PENDING",
      onclick: () => setActiveTab("PENDING"),
      grd: "var(--color-grd-warning)",
    },
    { id: 4, tab: "Huỷ", status: "CANCELLED", onclick: () => setActiveTab("CANCELLED"), grd: "var(--color-grd-error)" },
  ];

  return (
    <div className={cx("bg-white rounded-2xl")} style={{ boxShadow: "var(--shadow)" }}>
      {/* Header */}
      <div className={cx("px-6 pt-5.5 flex items-center justify-between mb-[16px]")}>
        <div>
          <Item as="h2" children={"Lịch hẹn hôm nay"} itemClassName={cx("text-[15px] font-black leading-5")} />
          <Item
            children={`${dateNow} • ${appointmentsToday.length ?? 0} lịch tổng cộng`}
            itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]/70 font-medium")}
            className={cx("mt-[2px] leading-3")}
          />
        </div>
        <Item
          as={Link}
          to={`/quan-ly-lich-hen/${today.date}`}
          children={"Xem tất cả"}
          itemClassName={cx("whitespace-nowrap")}
          className={cx(
            "text-[11px] text-[var(--color-primary)] font-bold",
            "flex items-center gap-1 rounded-full leading-4",
            "py-[4px] px-[10px] bg-[var(--color-primary-100)]/50",
            "border border-[var(--color-primary-300)]",
          )}
        />
      </div>
      <div className={cx("flex items-center gap-1.5 flex-wrap px-6")}>
        {tabMenu.map((btn) => {
          return (
            <Button
              width={"auto"}
              height={"auto"}
              key={btn.id}
              children={btn.tab}
              btnClassName={cx("text-[11px] font-bold")}
              className={cx("py-[5px] px-[13px] rounded-full text-nowrap flex-1 md:flex-0")}
              style={{
                background: activeTab === btn.status && btn.grd,
                color: activeTab === btn.status ? "#ffffff" : "var(--color-unavailable-700)",
                border: activeTab === btn.status ? "1px solid transparent" : "1px solid var(--color-unavailable-700)",
              }}
              onClick={btn.onclick}
            />
          );
        })}
      </div>
      {/* List */}
      <div className={cx("max-h-[320px] overflow-hidden flex flex-col pb-4")}>
        <div className={cx("overflow-auto flex-1 px-6", TWCSS.scrollbarY)}>
          {tabbedAppt.length > 0 ? (
            tabbedAppt.map((item, idx) => {
              const ApptConfig = APPOINTMENT_STATUS[item.status];
              return (
                <div
                  key={item.id}
                  className={cx(
                    "fadeUp",
                    "py-3 flex items-center gap-3.5",
                    "border-b border-[var(--color-unavailable-100)]",
                  )}
                  style={{ animationDelay: `${Math.min(idx * 80, 800)}ms` }}
                >
                  <Button
                    width={44}
                    height={44}
                    children={item.slotStart}
                    btnClassName={cx("text-[11px] font-bold text-[var(--color-primary-700)]")}
                    className={cx("bg-[var(--color-unavailable-300)]/50 rounded-xl")}
                  />

                  <div className={cx("whitespace-nowrap flex-1")}>
                    <Item children={item.patientName} itemClassName={cx("text-[13px] font-bold")} />
                    <Item
                      children={`Bs. ${item.doctorName} • ${item.specialtyName}`}
                      itemClassName={cx("text-[11px] font-medium text-[var(--color-unavailable-700)]")}
                    />
                  </div>

                  <Item
                    icon={<div className={cx("w-1.5 h-1.5 rounded-full")} style={{ background: ApptConfig.color }} />}
                    children={ApptConfig.label}
                    itemClassName={cx("text-[10.5px] font-bold")}
                    className={cx("flex items-center gap-1 py-[4px] px-[11px] rounded-full")}
                    style={{
                      color: ApptConfig.color,
                      background: `color-mix(in srgb, ${ApptConfig.color} 15%, white)`,
                    }}
                  />
                </div>
              );
            })
          ) : (
            <Item children={"Không có lịch nào"} itemClassName={cx("text-[13px] font-bold")} className={cx("py-3")} />
          )}
        </div>
      </div>
    </div>
  );
}

export default React.memo(AppointmentToday);
