import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/components.module.css";
import { Avatar, Item } from "../../components/ui";
import { LuCalendar } from "react-icons/lu";
import { useAppointmentStore } from "../../store/appointmentStore";
import { APPOINTMENT_STATUS } from "../../constants/status";

const cx = classNames.bind(styles);

function CrossTimeLine({ date }) {
  const getAppointmentsByDate = useAppointmentStore((a) => a.getAppointmentsByDate);
  const allAppts = getAppointmentsByDate(date);

  const timelineGroups = allAppts
    .filter((a) => a.status !== "CANCELLED")
    .sort((a, b) => a.slotStart.localeCompare(b.slotStart))
    .reduce((map, a) => {
      if (!map[a.slotStart]) map[a.slotStart] = [];
      map[a.slotStart].push(a);
      return map;
    }, {});

  return (
    <section className={cx("overflow-hidden bg-white rounded-2xl")} style={{ boxShadow: "var(--shadow)" }}>
      {/* Header */}
      <div
        className={cx(
          "flex flex-col md:flex-row items-center justify-between py-[13px] px-4 gap-2",
          "border-b border-[var(--color-unavailable-100)]",
          "sticky top-0 shrink-0",
        )}
      >
        <div className={cx("flex items-center gap-2")}>
          <Item
            icon={<LuCalendar />}
            iconClassName={cx("text-[15px] text-white")}
            className={cx(
              "w-[30px] h-[30px] bg-linear-[var(--color-ln-primary)]",
              "flex items-center justify-center rounded-lg",
            )}
          />
          <div>
            <Item children={"Lịch hẹn trong ngày"} itemClassName={cx("text-[13px] font-bold")} />
            {/* <Item children={label} itemClassName={cx("text-[11px] text-[var(--color-warning-900)] leading-none")} /> */}
          </div>
        </div>
      </div>
      {/* Timeline */}
      <div className={cx("py-4")}>
        {Object.entries(timelineGroups).map(([time, appts]) => {
          return (
            <div key={time} className={cx("flex items-stretch gap-0 px-4")}>
              {/* Cột giờ */}
              <Item
                children={time}
                itemClassName={cx("text-right text-[11px] font-bold text-[var(--color-unavailable-700)]")}
                className={cx("w-14 shrink-0 pt-[10px] pr-3")}
              />

              {/* Line + dot */}
              <div className="relative w-px bg-[var(--color-unavailable)] shrink-0 mx-3">
                <div
                  className="absolute top-[15px] left-1/2 -translate-x-1/2
                      w-2 h-2 rounded-full bg-[var(--color-primary)] 
                      border-2 border-white ring-1 ring-[var(--color-primary-300)]"
                />
              </div>

              {/* Cards */}
              <div className={cx("flex-1 flex flex-col gap-1 pb-2")}>
                {appts.map((a) => {
                  const ApptConfig = APPOINTMENT_STATUS[a.status];

                  return (
                    <div
                      key={a.id}
                      className={cx("py-2 px-3 flex items-center justify-between gap-2 rounded-lg")}
                      style={{
                        background: `color-mix(in srgb, ${ApptConfig.color} 5%, white)`,
                        border: `1px solid ${ApptConfig.color}`,
                      }}
                    >
                      <div className={cx("flex items-center gap-2")}>
                        <div className={cx("w-2 h-2 rounded-full")} style={{ background: ApptConfig.color }} />
                        {/* Doctor */}
                        <Avatar width={22} height={22} name={a.doctorName} className={cx("rounded-full text-[9px]")} />
                        <Item
                          as="span"
                          children={`Bs. ${a.doctorName}`}
                          itemClassName={cx("text-[11.5px] font-bold text-[var(--color-unavailable-700)]")}
                          className={cx("min-w-35")}
                        />
                        <div className={cx("h-4 w-[1px]")} style={{ background: ApptConfig.color }} />
                        {/* Patient */}
                        <Item
                          as="span"
                          children={a.patientName}
                          itemClassName={cx("text-[11.5px] font-bold")}
                          className={cx("min-w-35")}
                          style={{ color: ApptConfig.color }}
                        />
                        <Item
                          children={a.symptoms}
                          itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]")}
                          className={cx("flex-1 w-full truncate")}
                        />
                      </div>

                      <div className={cx("flex items-center gap-2")}>
                        <Item
                          children={a.slotEnd}
                          itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]")}
                          className={cx("flex-1 w-full truncate")}
                        />
                        <Item
                          children={ApptConfig.label}
                          itemClassName={cx("text-[11px] font-bold")}
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
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default React.memo(CrossTimeLine);
