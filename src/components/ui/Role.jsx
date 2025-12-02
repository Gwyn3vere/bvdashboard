// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Role({ children, className = "" }) {
  return <div className={cx("role", className)}>{children}</div>;
}

export default Role;
