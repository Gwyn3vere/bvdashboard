// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Avatar({ children, width = 40, height = 40, className = "", style = {}, ...props }) {
  return (
    <div className="flex gap-2 cursor-pointer" {...props}>
      <img
        src={`https://i.pravatar.cc/${width}`}
        alt="avatar img"
        style={{ width, height, ...style }}
        className={cx("avatar", className)}
      />
      {children}
    </div>
  );
}

export default Avatar;
