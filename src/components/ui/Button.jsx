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
  sematicBtn = "flex items-center justify-center",
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
        "outline-none cursor-pointer",
        iconPosition === "right" && "flex-row-reverse",
        className,
        sematicBtn,
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
