import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";

const cx = classNames.bind(style);

function Dashboard() {
  return (
    <div
      className={`${cx("wrapper")}
      rounded-[8px] h-[1000px] bg-blue-200`}
    >
      Dashboard Page
    </div>
  );
}

export default Dashboard;
