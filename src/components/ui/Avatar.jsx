import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { getDoctorGradient } from "../../utils/color";

const cx = classNames.bind(style);

function Avatar({ name = "", children, src, width = 40, height = 40, className = "", style = {}, ...props }) {
  const initials = name
    .trim()
    .split(" ")
    .slice(-2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const gradient = getDoctorGradient(name);
  return (
    <div className="flex items-center gap-2 cursor-pointer" {...props}>
      {src ? (
        <img src={src} alt="avatar img" style={{ width, height, ...style }} className={cx("avatar", className)} />
      ) : (
        <div
          style={{
            width,
            height,
            background: gradient,
            boxShadow: "rgba(0, 0, 0, 0.12) 0px 2px 8px",
            ...style,
          }}
          className={cx(
            "avatar",
            "flex items-center justify-center text-white font-black",
            "text-[12.16px] leading-[-0.5px]",
            className,
          )}
        >
          {initials}
        </div>
      )}
      {children}
    </div>
  );
}

export default Avatar;
