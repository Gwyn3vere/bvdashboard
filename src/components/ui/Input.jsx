// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import React from "react";

const cx = classNames.bind(style);

function Input({
  children,
  width = "100%",
  height = "50px",
  type = "text",
  placeholder = "Typing here...",
  label,
  labelClassName = "",
  icon,
  className,
  inputClassName = "",
  error,
  style = {},
  ...props
}) {
  return (
    <div className={className}>
      {label && <label className={cx("font-medium", labelClassName)}>{label}</label>}
      <div className={cx(TWCSS.input, error && TWCSS.inputError, inputClassName)}>
        <span>{icon}</span>
        <input
          type={type}
          className={cx("outline-none px-2")}
          placeholder={placeholder}
          style={{ width, height, ...style }}
          {...props}
        />
      </div>
    </div>
  );
}

export default React.memo(Input);
