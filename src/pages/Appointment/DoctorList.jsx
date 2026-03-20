import React, { useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/components.module.css";
import { Avatar, Button, Item } from "../../components/ui";
import {
  LuActivity,
  LuCalendar,
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuClock,
  LuTriangleAlert,
} from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointmentStore } from "../../store/appointmentStore";
import { getDoctorColor } from "../../utils/color";

const cx = classNames.bind(styles);

function DoctorList() {
  const navigate = useNavigate();
  const { date } = useParams();

  const d = new Date(date);
  const DAY_LABELS = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

  const fullLabel = DAY_LABELS[d.getDay()];
  const dateDisplay = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  const isToday = date === new Date().toLocaleDateString("en-CA");

  const prevDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    navigate(`/quan-ly-lich-hen/${d.toLocaleDateString("en-CA")}`);
  };

  const nextDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    navigate(`/quan-ly-lich-hen/${d.toLocaleDateString("en-CA")}`);
  };

  useAppointmentStore((s) => s.appointments);
  const getDoctorsByDate = useAppointmentStore((s) => s.getDoctorsByDate);

  const doctors = getDoctorsByDate(date);

  return (
    <section className={cx(TWCSS.container, "mb-[20px]")}>
      <div
        className={cx(
          "flex items-center justify-between py-4 mb-4",
          "border-b border-[var(--color-unavailable-300)]/50",
          "sticky top-0 bg-[var(--color-bg-light-primary-200)]",
        )}
      >
        <div className={cx("flex items-center gap-2")}>
          <Button
            width={"auto"}
            height={32}
            icon={<LuChevronLeft />}
            children={"Tuần"}
            iconClassName={cx("text-[14px]")}
            btnClassName={cx("text-[12.5px] font-bold")}
            className={cx(
              "rounded-xl bg-white px-3 py-1",
              "border border-transparent hover:border-[var(--color-unavailable)]",
              "text-[var(--color-unavailable-700)]",
            )}
            style={{ boxShadow: "var(--shadow)" }}
            onClick={() => navigate("/quan-ly-lich-hen")}
          />
          <Button
            width={32}
            height={32}
            icon={<LuChevronLeft />}
            iconClassName={cx("text-[14px] text-[var(--color-unavailable-700)]")}
            className={cx("rounded-xl bg-white", "border border-transparent hover:border-[var(--color-unavailable)]")}
            style={{ boxShadow: "var(--shadow)" }}
            onClick={prevDay}
          />
          <Item as="span" children={fullLabel} itemClassName={cx("text-[14px] font-black")} />
          <Item
            as="span"
            children={dateDisplay}
            itemClassName={cx("text-[13px] font-bold text-[var(--color-unavailable-700)]")}
          />
          {isToday && (
            <Item
              children={"Hôm nay"}
              itemClassName={cx("text-[11.5px] font-bold text-white")}
              className={cx("py-[3px] px-[10px] bg-linear-[var(--color-ln-primary)] rounded-full")}
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
          onClick={nextDay}
        />
      </div>
      {/* Overview */}
      <Overview data={doctors} />
      {/* Card doctors */}
      <div className={cx("grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3")}>
        {doctors.map((doc) => (
          <CardDoctor key={doc.doctorId} doctor={doc} />
        ))}
      </div>
    </section>
  );
}

export default React.memo(DoctorList);

const Overview = React.memo(function Overview({ data }) {
  const stats = data.map((item) => item.stats);
  const result = stats.reduce(
    (acc, cur) => {
      acc.total += cur.total;
      acc.pending += cur.pending;
      acc.confirmed += cur.confirmed;
      acc.done += cur.done;
      acc.cancelled += cur.cancelled;
      return acc;
    },
    { total: 0, pending: 0, confirmed: 0, done: 0, cancelled: 0 },
  );

  const cardMenu = [
    {
      id: 1,
      icon: <LuCalendar />,
      title: "Tổng lịch hẹn",
      total: result?.total - result.cancelled ?? 0,
      color: "var(--color-grd-secondary)",
    },
    {
      id: 2,
      icon: <LuTriangleAlert />,
      title: "Chờ xác nhận",
      total: result?.pending ?? 0,
      color: "var(--color-grd-warning)",
    },
    {
      id: 3,
      icon: <LuCheck />,
      title: "Đã xác nhận",
      total: result?.confirmed ?? 0,
      color: "var(--color-grd-primary)",
    },
    {
      id: 4,
      icon: <LuActivity />,
      title: "Đã khám xong",
      total: result?.done ?? 0,
      color: "var(--color-grd-unavailable)",
    },
  ];

  return (
    <div className={cx("flex flex-col lg:flex-row gap-3 mb-[20px]")}>
      {cardMenu.map((item) => (
        <div
          key={item.id}
          className={cx("flex-1 flex items-center gap-5 bg-white rounded-2xl py-4 px-5")}
          style={{ boxShadow: "var(--shadow)" }}
        >
          <Item
            icon={item.icon}
            iconClassName={cx("text-[19px] text-white")}
            className={cx("w-[44px] h-[44px] rounded-xl", "flex items-center justify-center")}
            style={{ background: item.color }}
          />
          <div>
            <Item
              children={item.title}
              itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)] font-bold")}
            />
            <Item children={item.total} itemClassName={cx("text-[22px] font-bold")} />
          </div>
        </div>
      ))}
    </div>
  );
});

const CardDoctor = React.memo(function CardDoctor({ doctor }) {
  const colorHex = getDoctorColor(doctor?.doctorName || "");

  return (
    <div
      className={cx(
        "bg-white p-[14px] rounded-2xl",
        "flex flex-col justify-between",
        "border border-t-3 border-transparent",
        "hover:border-[var(--hover-color)]",
        "transition-all",
      )}
      style={{ "--hover-color": colorHex, boxShadow: "var(--shadow)" }}
    >
      <div>
        {/* Doctor name - avatar */}
        <div className={cx("flex items-center justify-between gap-2 mb-[14px]")}>
          <div className={cx("flex items-center gap-2")}>
            <Avatar width={44} height={44} name={doctor.doctorName} className="rounded-full" />
            <div className={cx("")}>
              <Item children={doctor.doctorName} itemClassName={cx("font-black text-[13.5px] leading-none")} />
              <Item
                children={doctor.specialtyName}
                itemClassName={cx("text-[11.5px] text-[var(--color-unavailable)]")}
              />
            </div>
          </div>
          {/* {doctor.pendingAppointments.length > 0 && (
            <Item
              children={`${doctor.pendingAppointments.length} chờ`}
              itemClassName={cx("text-[10px] text-[var(--color-warning-700)] font-black")}
              className={cx(
                "py-[3px] px-[7px] rounded-full bg-[var(--color-warning-100)]/30",
                "border border-[var(--color-warning)] leading-none",
              )}
            />
          )} */}
        </div>
        {/* Slot and progress bar */}
        <div className={cx("mb-[12px]")}>
          <div className={cx("flex items-center justify-between mb-[5px]")}>
            <Item
              as="span"
              icon={<LuClock />}
              children={`${doctor.slotDurationMinutes}p/slot • ${doctor.stats.total}/${doctor.totalSlots} slot`}
              className={cx(
                "text-[11px] text-[var(--color-unavailable)] font-medium",
                "flex items-center gap-1 leading-none",
              )}
            />
            <Item
              as="span"
              children={`${doctor.fillRate}%`}
              itemClassName={cx("font-black text-[11px] leading-none", "text-[var(--color-error)]")}
            />
          </div>
          <div className={cx("h-[6px] bg-[var(--color-unavailable-300)] rounded-full")} style={{ width: `100%` }}>
            <div
              className={cx("h-[6px] bg-linear-[var(--color-ln-warning)] rounded-full")}
              style={{ width: `${doctor.fillRate}%` }}
            />
          </div>
        </div>
        {/* Stats */}
        <div className={cx("flex items-center gap-2 mb-[12px]")}>
          {doctor.stats.confirmed > 0 && (
            <Item
              children={`${doctor.stats.confirmed} xác nhận`}
              itemClassName={cx("text-[11px] font-bold text-[var(--color-primary-700)]")}
              className={cx(
                "py-[3px] px-[9px] bg-[var(--color-primary-100)]/50 rounded-full",
                "border border-[var(--color-primary)] leading-none",
              )}
            />
          )}
          {doctor.stats.pending > 0 && (
            <Item
              children={`${doctor.stats.pending} chờ`}
              itemClassName={cx("text-[11px] font-bold text-[var(--color-warning-700)]")}
              className={cx(
                "py-[3px] px-[9px] bg-[var(--color-warning-100)]/50 rounded-full",
                "border border-[var(--color-warning)] leading-none",
              )}
            />
          )}
          {doctor.stats.done > 0 && (
            <Item
              children={`${doctor.stats.done} xong`}
              itemClassName={cx("text-[11px] font-bold text-[var(--color-unavailable-700)]")}
              className={cx(
                "py-[3px] px-[9px] bg-[var(--color-unavailable-100)]/50 rounded-full",
                "border border-[var(--color-unavailable)] leading-none",
              )}
            />
          )}
          {doctor.stats.cancelled > 0 && (
            <Item
              children={`${doctor.stats.cancelled} xong`}
              itemClassName={cx("text-[11px] font-bold text-[var(--color-error-700)]")}
              className={cx(
                "py-[3px] px-[9px] bg-[var(--color-error-100)]/50 rounded-full",
                "border border-[var(--color-error)] leading-none",
              )}
            />
          )}
        </div>

        <div className={cx("w-full h-[1px] bg-[var(--color-unavailable-100)]")} />

        {/* Upconming appointments */}
        <div className={cx("pt-[10px] mb-[10px]")}>
          <Item
            children={"Sắp tới"}
            itemClassName={cx("text-[10px] font-black text-[var(--color-unavailable)]")}
            className={cx("mb-[6px] uppercase")}
          />
          <div className={cx("flex flex-col justify-between h-8")}>
            {doctor.upcomingConfirmed.length > 0 ? (
              doctor.upcomingConfirmed.slice(0, 2).map((item, idx) => (
                <div key={idx} className={cx("flex items-center gap-5 leading-none")}>
                  <Item
                    as="span"
                    children={item.slotStart}
                    itemClassName={cx("text-[10.5px] font-black")}
                    style={{ color: colorHex }}
                  />
                  <Item
                    as="span"
                    children={item.patientName}
                    itemClassName={cx("text-[12px] font-black text-[var(--color-unavailable-900)]")}
                  />
                </div>
              ))
            ) : (
              <Item
                as="span"
                children={
                  doctor.stats.pending > 0
                    ? "Cần xác nhận lịch khám"
                    : doctor.stats.done
                      ? "Đã hoàn thành lịch khám"
                      : "Lịch bị huỷ"
                }
                itemClassName={cx("text-[12px] font-black text-[var(--color-unavailable-900)] leading-none")}
              />
            )}
          </div>
        </div>
      </div>

      {/* View more */}
      <div className={cx("flex justify-end")}>
        <Item
          icon={"Xem thêm"}
          children={<LuChevronRight />}
          className={cx("flex items-center gap-1", "text-[12px] font-bold leading-none")}
          style={{ color: colorHex }}
        />
      </div>
    </div>
  );
});
