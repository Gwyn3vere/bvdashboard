// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../../styles/components.module.css";
import { Username, Role } from "./index";

const cx = classNames.bind(style);

function Avatar({ width = 40, height = 40, className = "", style = {}, ...props }) {
  return (
    <div className="flex gap-2">
      <img
        src={`https://i.pravatar.cc/${width}`}
        alt="avatar img"
        style={{ width, height, ...style }}
        className={cx("avatar", className)}
        {...props}
      />

      <div>
        <Username children="John Doe" className="font-medium text-[14px]" />
        <Role children="Administrator" className="text-small text-[14px]" />
      </div>
    </div>
  );
}

export default Avatar;
