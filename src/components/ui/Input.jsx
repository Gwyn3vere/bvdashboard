import { useState } from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { LuEyeClosed, LuEye } from "react-icons/lu";
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
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState();
  return (
    <div className={className}>
      {label && (
        <label className={cx("font-medium", labelClassName)}>{label}</label>
      )}
      <div
        className={cx(TWCSS.input, error && TWCSS.inputError, inputClassName)}
      >
        <span>{icon}</span>
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          className={cx("outline-none px-2 ")}
          placeholder={placeholder}
          style={{ width, height, ...style }}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="px-2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <LuEye /> : <LuEyeClosed />}
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(Input);
