// Libraries
import React from "react";
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Button({
  height = 40,
  width = 100,
  className,
  iconClassName,
  btnClassName,
  iconPosition = "left",
  style = {},
  children,
  icon,
  ...props
}) {
  return (
    <button
      className={cx(
        "rounded-[8px] outline-none cursor-pointer flex items-center justify-center",
        iconPosition === "right" && "flex-row-reverse",
        className
      )}
      style={{ height, width, ...style }}
      {...props}
    >
      <span className={cx(iconClassName)}>{icon}</span>
      <span className={btnClassName}>{children}</span>
    </button>
  );
}

export default React.memo(Button);
