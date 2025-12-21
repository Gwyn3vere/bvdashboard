// Libraries - Hooks
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { LuChevronDown } from "react-icons/lu";

const cx = classNames.bind(style);

function Select({
  data = [],
  value,
  onChange,
  active,
  width = "100%",
  height = "50px",
  label,
  labelClassName = "",
  className,
  inputClassName = "",
  style = {},
  ...props
}) {
  const ref = useRef(null);

  const selected = value != null && value !== "" ? data.find((item) => String(item.value) === String(value)) : null;

  const displayText = selected?.text ?? "Lựa chọn...";

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) {
        active?.deactivate?.();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [active]);

  return (
    <div ref={ref} className={cx("relative", className)}>
      {label && <label className={cx(labelClassName)}>{label}</label>}
      <div
        className={cx(
          "flex items-center justify-between bg-[var(--color-bg-light-primary-300)] px-3",
          "border-2 border-transparent",
          "focus-within:border-2 focus-within:border-[var(--color-primary)]",
          inputClassName
        )}
        style={{ width, height, ...style }}
        onClick={active?.toggleActive}
      >
        <span>{displayText}</span>
        <LuChevronDown
          className={cx("text-[14px]", active.isActive ? "rotate-180 transition-transform" : "transition-transform")}
        />
      </div>
      {active.isActive && (
        <div
          className={cx(
            "absolute bg-[var(--color-bg-light-primary-300)]",
            "top-full left-0 mt-2 rounded-[8px] z-10",
            "border-2 border-transparent w-full h-auto"
          )}
        >
          {data.map((item) => (
            <div
              key={item.value}
              onClick={(e) => {
                e.stopPropagation();
                onChange?.(item.value);
                active?.deactivate?.();
              }}
              className={cx(
                "flex items-center px-3 py-2 rounded-[8px] cursor-pointer",
                "hover:bg-[var(--color-primary)] hover:text-white font-medium"
              )}
            >
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;
