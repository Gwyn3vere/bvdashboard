// Libraries - Hooks
import classNames from "classnames/bind";
import { useState, useRef, useEffect } from "react";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
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
  itemClassName = "",
  error,
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
        style={{ width, height, ...style }}
        className={cx(
          TWCSS.input,
          inputClassName,
          error && TWCSS.inputError,
          isOpen && TWCSS.select,
          "px-3.5 py-2.5 text-[13px] justify-between",
        )}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>{displayText}</span>
        <LuChevronDown
          className={cx("w-5 h-5 text-gray-400", isOpen ? "rotate-180 transition-transform" : "transition-transform")}
        />
      </div>
      {error && <label className={cx("font-medium text-[11px] text-[var(--color-error)]")}>{error}</label>}

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border-2 border-gray-200 rounded-xl w-full">
          <div className={cx("p-4", "max-h-60 overflow-y-auto", TWCSS.scrollbarY)}>
            {data.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onChange?.(item.value);
                    setIsOpen(!isOpen);
                  }}
                  className={cx(
                    itemClassName,
                    "px-3 py-2 cursor-pointer w-full",
                    selected?.name === item.name
                      ? "bg-linear-[var(--color-ln-primary)] rounded-xl text-white hover:bg-[var(--color-primary-700)]"
                      : "hover:bg-green-50",
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
