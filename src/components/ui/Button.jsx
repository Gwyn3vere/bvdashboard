// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Button({ height = 40, width = 100, className = "", style = {}, children, icon, ...props }) {
  return (
    <button
      className={cx("rounded-[8px] outline-none cursor-pointer flex items-center justify-center", className)}
      style={{ height, width, ...style }}
      {...props}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
}

export default Button;
