import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { useNavigate, useParams } from "react-router-dom";
import { useDoctorStore } from "../../store/doctorStore";
import { LuCalendar, LuChevronLeft, LuClock, LuFile, LuPhone } from "react-icons/lu";
import { Avatar, Button, Item } from "../../components/ui";
import { useAppointmentStore } from "../../store/appointmentStore";
import { APPOINTMENT_STATUS } from "../../constants/status";
import { CardDetail } from "./index";

const cx = classNames.bind(styles);

function CrossDetailList() {
  const { date, id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { getDoctorById, fetchDoctors, doctors } = useDoctorStore();
  const getAppointmentsByDate = useAppointmentStore((a) => a.getAppointmentsByDate);
  const setSelectedAppointmentId = useAppointmentStore((a) => a.setSelectedAppointmentId);
  const selectedAppointmentId = useAppointmentStore((a) => a.selectedAppointmentId);
  const getAppointmentById = useAppointmentStore((a) => a.getAppointmentById);
  const appointmentDetail = getAppointmentById(selectedAppointmentId);
  useAppointmentStore((s) => s.appointments);

  const appointments = getAppointmentsByDate(date, { doctorId: id });
  const doctor = appointments[0] ?? null;

  const apptDate = new Date(doctor.appointmentDate).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const isToday = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();

    return d.getDate() === now.getDate() && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  };

  const isSameDay = isToday(doctor.appointmentDate);

  const timelineGroups = appointments
    .sort((a, b) => a.slotStart.localeCompare(b.slotStart))
    .reduce((map, a) => {
      if (!map[a.slotStart]) map[a.slotStart] = [];
      map[a.slotStart].push(a);
      return map;
    }, {});

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (appointmentDetail) {
      setIsOpen(true);
    }
  }, [appointmentDetail]);

  useEffect(() => {
    return () => {
      setSelectedAppointmentId(null);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      setSelectedAppointmentId(null);
    }, 300);
  };

  return (
    <section className={cx(TWCSS.container, "flex flex-col h-full")}>
      {/* Header */}
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
            children={"Bác sĩ"}
            iconClassName={cx("text-[14px]")}
            btnClassName={cx("text-[12.5px] font-bold")}
            className={cx(
              "rounded-xl bg-white px-3 py-1",
              "border border-transparent hover:border-[var(--color-unavailable)]",
              "text-[var(--color-unavailable-700)]",
            )}
            style={{ boxShadow: "var(--shadow)" }}
            onClick={() => {
              navigate(`/quan-ly-lich-hen/${date}`);
              setSelectedAppointmentId(null);
            }}
          />
          <div className={cx("flex items-center gap-2")}>
            <Avatar width={34} height={34} name={doctor?.doctorName ?? ""} className={cx("rounded-full text-[11px]")} />
            <div className={cx("flex flex-col gap-1 leading-none")}>
              <Item children={doctor.doctorName} itemClassName={cx("text-[14px] font-black")} />
              <Item
                children={`${doctor.specialtyName} - ${doctor.slotDurationMinutes}p/slot`}
                itemClassName={cx("text-[11.5px] font-medium text-[var(--color-unavailable-700)]")}
              />
            </div>
          </div>
          <div className={cx("w-[1px] h-[20px] bg-[var(--color-unavailable)]")} />
          <Item
            icon={<LuCalendar />}
            children={apptDate}
            iconClassName={cx("text-[var(--color-unavailable)]")}
            itemClassName={cx("font-medium")}
            className={cx("flex items-center gap-2", "text-[12.5px]")}
          />
          {isSameDay && (
            <Item
              children={"Hôm nay"}
              itemClassName={cx("text-[9.5px] uppercase font-black text-white")}
              className={cx("py-[2px] px-[7px] bg-linear-[var(--color-ln-primary)] rounded-full")}
            />
          )}
        </div>
      </div>
      <div className={cx("flex flex-1 min-h-0")}>
        {/* Cross Timeline */}
        <div className={cx("flex-1 overflow-auto min-h-0 hidden-scrollbar")}>
          {Object.entries(timelineGroups).map(([time, appts]) => {
            return (
              <div key={time} className={cx("flex items-stretch gap-0 px-4 pb-2")}>
                {/* Cột giờ */}
                <Item
                  children={time}
                  itemClassName={cx("text-right text-[11.5px] font-bold text-[var(--color-unavailable-700)]")}
                  className={cx("w-14 shrink-0 pt-[10px] pr-3")}
                />

                {/* Line + dot */}
                <div className="relative w-px bg-[var(--color-unavailable)] shrink-0 mx-4" />

                {/* Cards */}
                <div className={cx("flex-1 flex flex-col gap-1")}>
                  {appts.map((a) => {
                    const ApptConfig = APPOINTMENT_STATUS[a.status];

                    return (
                      <Button
                        key={a.id}
                        width={"100%"}
                        height={"auto"}
                        className={cx("block text-left")}
                        sematicBtn={cx("none")}
                        onClick={() => setSelectedAppointmentId(a.id)}
                      >
                        <div
                          className={cx(
                            "py-[11px] px-[14px] flex justify-between gap-2 rounded-xl",
                            "border border-l-3 border-[var(--hover-color)]",
                            selectedAppointmentId == a.id && "shadow-[var(--shadow-focus)]",
                          )}
                          style={{
                            background: `color-mix(in srgb, ${ApptConfig.color} 5%, white)`,
                            "--hover-color": ApptConfig.color,
                          }}
                        >
                          <div className={cx("flex flex-col gap-1")}>
                            {/* Patient */}
                            <Item
                              as="span"
                              children={a.patientName}
                              itemClassName={cx("text-[13.5px] font-bold")}
                              style={{ color: ApptConfig.color }}
                            />
                            <div className={cx("flex items-center gap-2")}>
                              <Item
                                icon={<LuPhone />}
                                children={a.patient.phone}
                                className={cx(
                                  "flex items-center gap-1 font-medium",
                                  "text-[11.5px] text-[var(--color-unavailable-700)]",
                                )}
                              />
                              <Item
                                icon={<LuClock />}
                                children={a.slotStart + "-" + a.slotEnd}
                                className={cx(
                                  "flex items-center gap-1 font-medium",
                                  "text-[11.5px] text-[var(--color-unavailable-700)]",
                                )}
                              />
                            </div>
                            <Item
                              icon={<LuFile />}
                              children={a.symptoms}
                              iconClassName={cx("text-[11px]")}
                              itemClassName={cx("text-[12px]")}
                              className={cx(
                                "flex-1 flex items-center gap-1 w-full truncate leading-none",
                                "text-[var(--color-unavailable-700)]",
                              )}
                            />
                          </div>

                          <div className={cx("inline-block")}>
                            <Item
                              children={ApptConfig.label}
                              itemClassName={cx("text-[10.5px] font-black")}
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
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        {/* Card detail */}
        <div
          onTransitionEnd={() => {
            if (!isOpen) setSelectedAppointmentId(null);
          }}
          className={cx(
            "shrink-0 pr-2 pb-2",
            "transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "transform",
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none",
          )}
        >
          <CardDetail appt={appointmentDetail} apptDate={apptDate} onClose={handleClose} />
        </div>
      </div>
    </section>
  );
}

export default React.memo(CrossDetailList);
