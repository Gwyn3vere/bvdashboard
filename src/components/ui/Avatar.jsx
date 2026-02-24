// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function stringToHue(str = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function generateConsistentGradient(name = "") {
  const hue = stringToHue(name);

  const color1 = `hsl(${hue}, 70%, 60%)`;
  const color2 = `hsl(${hue}, 70%, 40%)`;

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}

function Avatar({
  name = "",
  children,
  src,
  width = 40,
  height = 40,
  className = "",
  style = {},
  ...props
}) {
  const initials = name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  const gradient = generateConsistentGradient(name);
  return (
    <div className="flex items-center gap-2 cursor-pointer" {...props}>
      {src ? (
        <img
          src={src}
          alt="avatar img"
          style={{ width, height, ...style }}
          className={cx("avatar", className)}
        />
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
