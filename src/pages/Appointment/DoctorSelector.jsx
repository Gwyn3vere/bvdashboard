import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/components.module.css";
import { Avatar, Item } from "../../components/ui";
import { LuChevronRight, LuClock } from "react-icons/lu";

import { getDoctorColor } from "../../utils/color";

const cx = classNames.bind(styles);

function DoctorSelector({ doctor }) {
  const colorHex = getDoctorColor(doctor?.doctorName || "");

  return (
    <div
      className={cx(
        "bg-white p-[14px] rounded-2xl",
        "flex flex-col justify-between",
        "border border-t-3 border-transparent",
        "hover:border-[var(--hover-color)]",
        "transition-all cursor-pointer",
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
              children={`${doctor.stats.cancelled} huỷ`}
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
}

export default React.memo(DoctorSelector);
