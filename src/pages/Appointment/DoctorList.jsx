import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/components.module.css";
import { Button, Item } from "../../components/ui";
import { LuActivity, LuCalendar, LuCheck, LuChevronLeft, LuChevronRight, LuTriangleAlert } from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";
import { useNavigate, useParams } from "react-router-dom";
import { useAppointmentStore } from "../../store/appointmentStore";
import { DoctorSelector, CrossTimeLine } from "./index";

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
      <div className={cx("grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3 mb-[20px]")}>
        {doctors.map((doc) => (
          <DoctorSelector key={doc.doctorId} doctor={doc} />
        ))}
      </div>
      {/* Appointment Timeline */}
      <CrossTimeLine date={date} />
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
