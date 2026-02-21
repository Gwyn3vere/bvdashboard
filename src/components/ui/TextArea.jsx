import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import React from "react";

const cx = classNames.bind(style);

function TextArea({
  children,
  width = "100%",
  minHeight = 100,
  maxHeight = 500,
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
      {label && (
        <label className={cx("font-medium", labelClassName)}>{label}</label>
      )}
      <div
        className={cx(
          TWCSS.textarea,
          error && TWCSS.inputError,
          inputClassName,
        )}
      >
        <span>{icon}</span>
        <textarea
          type={type}
          className={cx("outline-none p-2")}
          placeholder={placeholder}
          style={{ width, minHeight, maxHeight, ...style }}
          {...props}
        />
      </div>
    </div>
  );
}

export default React.memo(TextArea);
