import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { CardStatistic, QuickAction } from "./index";

const cx = classNames.bind(style);

function Dashboard() {
  return (
    <main className={cx(TWCSS.container, "flex flex-col gap-5.5")}>
      <CardStatistic />
      <QuickAction />
    </main>
  );
}

export default Dashboard;
