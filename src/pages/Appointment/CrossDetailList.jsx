import React, { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { useNavigate, useParams } from "react-router-dom";
import { useDoctorStore } from "../../store/doctorStore";
import { LuChevronLeft, LuClock, LuFile, LuPhone, LuX } from "react-icons/lu";
import { Avatar, Button, Item } from "../../components/ui";
import { useAppointmentStore } from "../../store/appointmentStore";
import { APPOINTMENT_STATUS } from "../../constants/status";

const cx = classNames.bind(styles);

function CrossDetailList() {
  const { date, id } = useParams();
  const navigate = useNavigate();
  const { getDoctorById, fetchDoctors, doctors } = useDoctorStore();
  const getAppointmentsByDate = useAppointmentStore((a) => a.getAppointmentsByDate);
  const setSelectedAppointmentId = useAppointmentStore((a) => a.setSelectedAppointmentId);
  const selectedAppointmentId = useAppointmentStore((a) => a.selectedAppointmentId);
  const getAppointmentById = useAppointmentStore((a) => a.getAppointmentById);
  const appointmentDetail = getAppointmentById(selectedAppointmentId);
  useAppointmentStore((s) => s.appointments);

  const appointments = getAppointmentsByDate(date, { doctorId: id });
  const doctor = appointments[0] ?? null;

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
            onClick={() => navigate(`/quan-ly-lich-hen/${date}`)}
          />
          <div className={cx("flex items-center gap-2")}>
            <Avatar width={34} height={34} name={doctor.doctorName} className={cx("rounded-full")} />
            <div className={cx("flex flex-col gap-1 leading-none")}>
              <Item children={doctor.doctorName} itemClassName={cx("text-[14px] font-black")} />
              <Item
                children={`${doctor.specialtyName} - ${doctor.slotDurationMinutes}p/slot`}
                itemClassName={cx("text-[11.5px] font-medium text-[var(--color-unavailable-700)]")}
              />
            </div>
          </div>
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
        {appointmentDetail && (
          <div className="shrink-0 pr-2 pb-2">
            <CardDetail appt={appointmentDetail} onClose={setSelectedAppointmentId} />
          </div>
        )}
      </div>
    </section>
  );
}

export default React.memo(CrossDetailList);

const CardDetail = React.memo(function CardDetail({ appt, onClose }) {
  return (
    <div
      className={cx("w-[380px] bg-white rounded-xl overflow-hidden", "border border-transparent")}
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div className={cx("py-4 px-5")}>
        <div className={cx("flex items-center justify-between mb-[10px]")}>
          <Item children={"Chi tiết lịch hẹn"} itemClassName={cx("text-[13px] font-black")} />
          <Button
            width={28}
            height={28}
            icon={<LuX />}
            iconClassName={cx("text-[14px] text-[var(--color-unavailable-700)]")}
            className={cx("rounded-lg bg-[var(--color-unavailable-300)]/50")}
            onClick={() => onClose(null)}
          />
        </div>
      </div>
    </div>
  );
});
