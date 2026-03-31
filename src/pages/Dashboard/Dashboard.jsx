import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { CardStatistic, QuickAction, Appointment } from "./index";
import AppointmentDensity from "./Appointment/AppointmentDensity";
import Banner from "./Banner";
import Activity from "./Activity";
import Expertise from "./Expertise";

const cx = classNames.bind(style);

function Dashboard() {
  return (
    <main className={cx(TWCSS.container, "flex flex-col gap-5.5 mb-10")}>
      <CardStatistic />
      <QuickAction />
      <Appointment />
      <AppointmentDensity />
      <div className={cx("grid grid-cols-[1fr_380px] gap-5")}>
        <Banner />
        <div className={cx("flex flex-col gap-5")}>
          <Activity />
          <Expertise />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
