import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { WeekSelector } from "./index";

const cx = classNames.bind(styles);

function Appointment() {
  return (
    <div className={cx(TWCSS.container)}>
      <WeekSelector />
    </div>
  );
}

export default Appointment;
