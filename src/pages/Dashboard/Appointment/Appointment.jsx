import React from "react";
import classNames from "classnames/bind";
import style from "../../../styles/pages.module.css";
import AppointmentToday from "./AppointmentToday";
import AppointmentWeek from "./AppointmentWeek";
import AppointmentSpecialty from "./AppointmentSpecialty";

const cx = classNames.bind(style);

function Appointment() {
  return (
    <section className={cx("grid grid-rows lg:grid-cols-[1.55fr_1fr] gap-5")}>
      <AppointmentToday />
      <div className={cx("flex flex-col gap-5")}>
        <AppointmentWeek />
        <AppointmentSpecialty />
      </div>
    </section>
  );
}

export default React.memo(Appointment);
