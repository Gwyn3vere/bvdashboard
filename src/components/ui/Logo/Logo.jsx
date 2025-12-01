import classNames from "classnames/bind";
// Styles - UI
import style from "../../../styles/ui.module.css";

const cx = classNames.bind(style);

function Logo({ boolean, width, height, className = "", src, style = {}, ...props }) {
  return src ? (
    <img src={src} alt="logo" className={className} style={{ width, height, ...style }} {...props} />
  ) : (
    <div className="rounded-[8px] bg-blue-500" style={{ width, height, ...style }} {...props}></div>
  );
}

export default Logo;
