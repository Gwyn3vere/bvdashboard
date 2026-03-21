import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { WeekSelector, UrgentList } from "./index";

const cx = classNames.bind(styles);

function Appointment() {
  return (
    <div className={cx(TWCSS.container, "flex flex-col md:h-full")}>
      <WeekSelector />
      <UrgentList />
    </div>
  );
}

export default Appointment;
