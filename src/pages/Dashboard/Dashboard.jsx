import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { CardStatistic, QuickAction, Appointment } from "./index";

const cx = classNames.bind(style);

function Dashboard() {
  return (
    <main className={cx(TWCSS.container, "flex flex-col gap-5.5")}>
      <CardStatistic />
      <QuickAction />
      <Appointment />
    </main>
  );
}

export default Dashboard;
