// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Username({ children, className = "" }) {
  return <div className={cx("username", className)}>{children}</div>;
}

export default Username;
