import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";

import { LuCalendar, LuCheck, LuClock, LuMapPin, LuPhone, LuUser, LuX } from "react-icons/lu";
import { Avatar, Button, Item } from "../../components/ui";
import { APPOINTMENT_STATUS } from "../../constants/status";

const cx = classNames.bind(styles);

function CardDetail({ appt, onClose, apptDate }) {
  if (!appt) return null;
  const ApptConfig = APPOINTMENT_STATUS[appt.status];

  const date = new Date(appt.createdAt);
  const time = date.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const day = date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const result = `Đặt khám lúc ${time} - ${day}`;

  return (
    <div
      className={cx("w-full lg:w-[380px] bg-white rounded-xl overflow-hidden", "border border-transparent")}
      style={{ boxShadow: "var(--shadow)" }}
    >
      {/* Heder - Btn */}
      <div className={cx("py-4 px-5 border-b border-[var(--color-unavailable-100)]")}>
        <div className={cx("flex items-center justify-between mb-[10px]")}>
          <div className={cx("flex items-center gap-1")}>
            <Item children={"Chi tiết lịch hẹn"} itemClassName={cx("text-[13px] font-black")} />
            <Item
              children={ApptConfig.label}
              itemClassName={cx("text-[11px] font-black")}
              className={cx(
                "py-[3px] px-[9px] bg-[var(--color-primary-100)]/50 rounded-full",
                "border border-[var(--color-primary)] leading-none",
              )}
              style={{
                background: `color-mix(in srgb, ${ApptConfig.color} 5%, white)`,
                border: `1px solid ${ApptConfig.color}`,
                color: ApptConfig.color,
              }}
            />
          </div>
          <Button
            width={28}
            height={28}
            icon={<LuX />}
            iconClassName={cx("text-[14px] text-[var(--color-unavailable-700)]")}
            className={cx("rounded-lg bg-[var(--color-unavailable-300)]/50")}
            onClick={() => onClose(null)}
          />
        </div>
        {appt.status !== "DONE" && (
          <div className={cx("flex items-center gap-2")}>
            <Button
              width={"auto"}
              height={"auto"}
              icon={<LuCheck />}
              children={appt.status === "CONFIRMED" ? "Đã khám xong" : "Xác nhận"}
              className={cx(
                "text-[12px] font-bold text-white py-[6px] px-[13px]",
                "bg-linear-[var(--color-ln-primary)] rounded-lg gap-1",
              )}
            />
            <Button
              width={"auto"}
              height={"auto"}
              icon={<LuX />}
              children={appt.status === "CONFIRMED" ? "Không đến" : "Từ chối"}
              className={cx(
                "text-[12px] font-bold text-white py-[6px] px-[13px]",
                "bg-linear-[var(--color-ln-error)] rounded-lg gap-1",
              )}
            />
          </div>
        )}
      </div>
      {/* Body - Content */}
      <div className={cx("py-4 px-5")}>
        {/* A. Appointment infomation */}
        <div className={cx("mb-4 pb-4 border-b border-[var(--color-unavailable-100)]")}>
          <Item
            children={"A. Thông tin đặt khám"}
            iconClassName={cx("w-[3px] h-[16px] bg-[var(--color-primary)]")}
            itemClassName={cx("text-[12px] uppercase font-black text-[var(--color-primary-900)]")}
            className={cx("border-l-3 border-[var(--color-primary-900)] pl-2 mb-[12px]")}
          />
          <div className={cx("grid grid-cols-[1fr_1fr] gap-y-[10px] gap-x-[14px]")}>
            <div className={cx("")}>
              <Item
                children={"chuyên khoa"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                icon={<div className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />}
                children={appt.specialtyName}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-1")}
              />
            </div>
            <div className={cx("")}>
              <Item
                children={"Dịch vụ"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                children={appt.serviceName}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-1")}
              />
            </div>
            <div className={cx("col-span-full")}>
              <div>
                <Item
                  children={"Bác sĩ"}
                  itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                  className={cx("mb-[5px]")}
                />
                <div className={cx("flex items-center gap-1")}>
                  <Avatar width={24} height={24} name={appt?.doctorName ?? ""} className="rounded-full text-[9px]" />
                  <Item
                    icon={appt.doctorName}
                    children={appt.specialtyName}
                    iconClassName={cx("text-[13px] font-medium")}
                    itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]")}
                    className={cx("flex items-center gap-2")}
                  />
                </div>
              </div>
            </div>
            <div className={cx("")}>
              <Item
                children={"ngày khám"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                icon={<LuCalendar />}
                children={apptDate}
                iconClassName={cx("text-[13px] text-[var(--color-primary)]")}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-1")}
              />
            </div>
            <div className={cx("")}>
              <Item
                children={"Giờ khám dự kiến"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                icon={<LuClock />}
                children={
                  <div>
                    <span>
                      {appt.slotStart} - {appt.slotEnd}{" "}
                    </span>
                    <span className={cx("text-[11px] text-[var(--color-unavailable-700)]")}>
                      ({appt.slotDurationMinutes}p)
                    </span>
                  </div>
                }
                iconClassName={cx("text-[13px] text-[var(--color-primary)]")}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-1")}
              />
            </div>
          </div>
        </div>
        {/* B. Patient infomation */}
        <div className={cx("mb-4 pb-4 border-b border-[var(--color-unavailable-100)]")}>
          <Item
            children={"B. Thông tin bệnh nhân"}
            iconClassName={cx("w-[3px] h-[16px] bg-[var(--color-primary)]")}
            itemClassName={cx("text-[12px] uppercase font-black text-[var(--color-primary-900)]")}
            className={cx("border-l-3 border-[var(--color-primary-900)] pl-2 mb-[12px]")}
          />
          <div className={cx("grid grid-cols-[1fr_1fr] gap-y-[10px] gap-x-[14px]")}>
            <div className={cx("col-span-full")}>
              <Item
                children={"Họ và tên"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                icon={<LuUser />}
                children={appt.patientName}
                iconClassName={cx("text-[13px] text-[var(--color-primary)]")}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-2")}
              />
            </div>
            <div className={cx("")}>
              <Item
                children={"Năm sinh"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                children={new Date(appt.patient.dateOfBirth).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-1")}
              />
            </div>
            <div className={cx("")}>
              <Item
                children={"Giới tính"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                children={appt.patient.gender === "male" ? "Nam" : "Nữ"}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-1")}
              />
            </div>
            <div className={cx("")}>
              <Item
                children={"Số điện thoại"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                icon={<LuPhone />}
                children={appt.patient.phone}
                iconClassName={cx("text-[13px] text-[var(--color-primary)]")}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-1")}
              />
            </div>
            <div className={cx("")}>
              <Item
                children={"Email"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                children={appt.patient.email}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-1")}
              />
            </div>
            <div className={cx("col-span-full")}>
              <Item
                children={"Họ và tên"}
                itemClassName={cx("text-[11px] font-black text-[var(--color-unavailable)] uppercase")}
                className={cx("mb-[5px]")}
              />
              <Item
                icon={<LuMapPin />}
                children={appt.patient.address}
                iconClassName={cx("text-[13px] text-[var(--color-primary)]")}
                itemClassName={cx("text-[13px] font-medium")}
                className={cx("flex items-center gap-2")}
              />
            </div>
          </div>
        </div>
        {/* C. symptons/note */}
        <div className={cx("pb-4")}>
          <Item
            children={"C. Triệu chứng / Ghi chú"}
            iconClassName={cx("w-[3px] h-[16px] bg-[var(--color-primary)]")}
            itemClassName={cx("text-[12px] uppercase font-black text-[var(--color-primary-900)]")}
            className={cx("border-l-3 border-[var(--color-primary-900)] pl-2 mb-[12px]")}
          />
          <Item
            children={appt.symptoms}
            itemClassName={cx("text-[13px]")}
            className={cx(
              "py-[10px] px-[14px] bg-[var(--color-unavailable-100)]",
              "rounded-lg border border-[var(--color-unavailable-300)]",
            )}
          />
        </div>

        {/* Create at  */}
        <Item
          children={result + " " + "#" + appt.id}
          itemClassName={cx("text-[11px] text-[var(--color-unavailable)]")}
          className={cx("flex justify-end")}
        />
      </div>
    </div>
  );
}

export default React.memo(CardDetail);
