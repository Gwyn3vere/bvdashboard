import React, { useState, useMemo, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/components.module.css";
import { Avatar, Button, Item } from "../../components/ui";
import { LuCheck, LuClock, LuTriangleAlert, LuX } from "react-icons/lu";
import { useAppointmentStore } from "../../store/appointmentStore";
import { TWCSS } from "../../styles/defineTailwindcss";

const cx = classNames.bind(styles);

function UrgentList() {
  const [weekOffset, setWeekOffset] = useState(0);
  useAppointmentStore((a) => a.appointments);
  const getWeekStats = useAppointmentStore((a) => a.getWeekStats);
  const confirmAppointment = useAppointmentStore((a) => a.confirmAppointment);
  const cancelAppointment = useAppointmentStore((a) => a.cancelAppointment);
  const confirmAll = useAppointmentStore((a) => a.confirmAll);
  const { label, pendingList, weekStats } = getWeekStats(weekOffset);

  const todayStr = useMemo(() => new Date().toLocaleDateString("en-CA").slice(0, 10), []);

  return (
    pendingList.length > 0 && (
      <section
        className={cx("flex-1 flex flex-col bg-white rounded-2xl overflow-hidden")}
        style={{ boxShadow: "var(--shadow)" }}
      >
        {/* Header */}
        <div
          className={cx(
            "flex items-center justify-between py-[13px] px-4",
            "bg-[var(--color-warning-100)]/50 border-b border-[var(--color-warning-300)]",
            "sticky top-0 shrink-0",
          )}
        >
          <div className={cx("flex items-center gap-2")}>
            <Item
              icon={<LuTriangleAlert />}
              iconClassName={cx("text-[15px] text-white")}
              className={cx(
                "w-[30px] h-[30px] bg-linear-[var(--color-ln-warning)]",
                "flex items-center justify-center rounded-lg",
              )}
            />
            <div>
              <Item
                children={`Cần xử lý ngay — ${weekStats.pending} lịch chờ xác nhận`}
                itemClassName={cx("text-[13px] font-bold text-[var(--color-warning-900)] ")}
              />
              <Item children={label} itemClassName={cx("text-[11px] text-[var(--color-warning-900)] leading-none")} />
            </div>
          </div>

          <Button
            type="button"
            width={"auto"}
            height={30}
            icon={<LuCheck />}
            children={"Xác nhận tất cả"}
            iconClassName={cx("text-[13px]")}
            btnClassName={cx("text-[12px] font-bold")}
            className={cx("text-white bg-linear-[var(--color-ln-primary)]", "rounded-lg px-[16px] gap-2")}
            onClick={() => confirmAll(pendingList.map((p) => p.id))}
          />
        </div>
        {/* List */}
        <div className={cx("flex-1 overflow-auto", TWCSS.scrollbarY)}>
          {pendingList.map((pend, idx) => {
            const d = new Date(pend.appointmentDate);
            const DAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

            const label = DAY_LABELS[d.getDay()];
            const date = d.getDate();
            const isToday = pend.appointmentDate === todayStr;

            return (
              <div
                key={pend.id}
                className={cx(
                  "fadeUp",
                  "py-[10px] px-4 border-b last:border-b-0",
                  "border-[var(--color-unavailable-100)]",
                  "hover:bg-[var(--color-warning-100)]/10",
                )}
                style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
              >
                <div className={cx("flex items-center gap-[10px]")}>
                  <Item
                    as="span"
                    icon={label}
                    children={date}
                    iconClassName={cx(
                      "text-[9px] font-bold ",
                      isToday ? "text-white" : "text-[var(--color-unavailable-700)]",
                    )}
                    itemClassName={cx("text-[12px] font-black")}
                    className={cx(
                      "flex flex-col items-center justify-center gap-1 leading-none",
                      "w-[38px] h-[38px] rounded-xl",
                      isToday ? "bg-linear-[var(--color-ln-primary)] text-white" : "bg-[var(--color-unavailable-100)]",
                    )}
                  />
                  {/* Slot */}
                  <Item
                    icon={<LuClock />}
                    children={`${pend.slotStart}-${pend.slotEnd}`}
                    iconClassName={cx("text-[var(--color-unavailable)]")}
                    itemClassName={cx("font-bold leading-none pt-[0.5px]")}
                    className={cx("grid grid-cols-[12px_100px] gap-1 text-[12px]")}
                  />
                  {/* Doctor */}
                  <div className={cx("flex items-center gap-2 shrink-0 min-w-[160px]")}>
                    <Avatar width={20} height={20} name={pend.doctorName} className="rounded-full text-[9px]" />
                    <Item
                      children={pend.doctorName}
                      itemClassName={cx("text-[12px] font-bold text-[var(--color-unavailable-900)]")}
                    />
                  </div>

                  <div className={cx("w-[1px] h-[20px] bg-[var(--color-unavailable-300)]")} />

                  {/* Patient */}
                  <div className={cx("flex-1 flex items-center justify-between")}>
                    <Item
                      icon={pend.patientName}
                      children={pend.symptoms}
                      iconClassName={cx("text-[12.5px] font-bold")}
                      itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]")}
                      className={cx("flex-1 w-full")}
                    />
                    <div className={cx("flex items-center gap-[10px]")}>
                      <Button
                        type="button"
                        width={"auto"}
                        height={"auto"}
                        icon={<LuCheck />}
                        children={"Xác nhận"}
                        className={cx(
                          "text-[12px] font-bold text-[var(--color-primary-700)] gap-2",
                          "py-[4px] px-[10px] bg-[var(--color-primary-100)]/50 rounded-lg",
                          "border border-[var(--color-primary-300)]",
                        )}
                        onClick={() => confirmAppointment(pend.id)}
                      />
                      <Button
                        type="button"
                        width={"auto"}
                        height={"auto"}
                        icon={<LuX />}
                        children={"Từ chối"}
                        className={cx(
                          "text-[12px] font-bold text-[var(--color-error-700)] gap-2",
                          "py-[4px] px-[10px] bg-[var(--color-error-100)]/50 rounded-lg",
                          "border border-[var(--color-error-300)]",
                        )}
                        onClick={() => cancelAppointment(pend.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    )
  );
}

export default React.memo(UrgentList);
