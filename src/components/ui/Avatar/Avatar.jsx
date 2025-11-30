// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../../styles/components.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { Username, Role } from "./index";

const cx = classNames.bind(style);

function Avatar({ width = 40, height = 40, className = "", style = {}, active = false, ...props }) {
  return (
    <div className="flex gap-2 cursor-pointer" {...props}>
      <img
        src={`https://i.pravatar.cc/${width}`}
        alt="avatar img"
        style={{ width, height, ...style }}
        className={cx("avatar", className)}
      />

      <div style={{ height }}>
        <Username children="John Doe" className="font-medium text-[14px]" />
        <Role children="Administrator" className="text-small text-[14px]" />
      </div>
      <IoIosArrowDown
        className={cx("text-[14px]", active ? "rotate-180 transition-transform" : "transition-transform")}
      />
    </div>
  );
}

export default Avatar;
