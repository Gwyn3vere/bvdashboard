import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";

const cx = classNames.bind(styles);

function Appointment() {
  return (
    <div className={cx("px-4 xl:px-10 pb-5", "flex flex-col h-full overflow-hidden")}>
      <div className="flex-1 overflow-auto p-1 hidden-scrollbar">
        <div className="xl:grid grid-cols-[20%_80%]">{/* <Calendar /> */}</div>
      </div>
    </div>
  );
}

export default Appointment;
