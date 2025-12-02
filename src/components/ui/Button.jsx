// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Button({ boolean, height = 40, width = 100, className = "", style = {}, children, icon, ...props }) {
  return (
    <button
      className={`rounded-[8px] outline-none flex items-center justify-center cursor-pointer ${className}`}
      style={{ height, width, ...style }}
      {...props}
    >
      <span>{icon}</span>
      {children}
    </button>
  );
}

export default Button;
