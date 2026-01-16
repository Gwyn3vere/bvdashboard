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
  width = "100%",
  height = "50px",
  label,
  labelClassName = "",
  className,
  placeholder = "Lựa chọn...",
  inputClassName = "",
  style = {},
  ...props
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = value != null && value !== "" ? data.find((item) => String(item.value) === String(value)) : null;

  const displayText = selected?.name ?? placeholder;

  return (
    <div ref={dropdownRef} className={cx("relative", className)}>
      {label && <label className={cx(labelClassName)}>{label}</label>}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cx(
          "w-full px-4 py-3 border-2 rounded-[8px]",
          "border-[var(--color-bg-light-primary-400)] hover:border-[var(--color-bg-light-primary-500)]",
          "focus:border-[var(--color-primary-500)] focus:outline-none cursor-pointer",
          "flex items-center justify-between bg-white hover:border-gray-300 transition-colors"
        )}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>{displayText}</span>
        <LuChevronDown
          className={cx("w-5 h-5 text-gray-400", isOpen ? "rotate-180 transition-transform" : "transition-transform")}
        />
      </div>

      {isOpen && (
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

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border-2 border-gray-200 rounded-lg p-4 w-full">
          <div className="flex flex-col gap-2 items-center justify-center">
            {data.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => onChange?.(item.value)}
                  className={cx(
                    "px-3 py-2 cursor-pointer text-center w-full",
                    selected?.name === item.name
                      ? "bg-[var(--color-primary)] rounded-[8px] text-white hover:bg-[var(--color-primary-700)]"
                      : "hover:bg-green-50"
                  )}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
