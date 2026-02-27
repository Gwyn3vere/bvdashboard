import React, { useState, useRef, useEffect } from "react";
import { LuClock } from "react-icons/lu";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";

const cx = classNames.bind(style);

function Time({ value, onChange, min, max, placeholder = "Chọn giờ", inputClassName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState("09");
  const [minutes, setMinutes] = useState("00");
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(":");
      setHours(h);
      setMinutes(m);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHourChange = (h) => {
    setHours(h);
    onChange(`${h}:${minutes}`);
  };

  const handleMinuteChange = (m) => {
    setMinutes(m);
    onChange(`${hours}:${m}`);
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minuteOptions = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={cx(TWCSS.input, inputClassName, isOpen && TWCSS.select, "px-3.5 py-2.5 text-[13px] justify-between")}
      >
        <span className={cx(value ? "text-gray-900" : "text-gray-400")}>{value || placeholder}</span>
        <LuClock className="w-5 h-5 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg p-4 w-full">
          <div className="flex gap-2 items-center justify-center">
            <div className="flex-1">
              <label className="block text-[12px] text-gray-600 mb-2 text-center">Giờ</label>
              <div className={cx("max-h-48 overflow-y-auto border border-gray-200 rounded-xl", TWCSS.scrollbarY)}>
                {hourOptions.map((h) => (
                  <div
                    key={h}
                    onClick={() => handleHourChange(h)}
                    className={`p-2 cursor-pointer text-center text-[12px] ${
                      hours === h
                        ? "bg-linear-[var(--color-ln-primary)] rounded-xl text-white hover:bg-[var(--color-primary-700)]"
                        : "hover:bg-green-50"
                    }`}
                  >
                    {h}
                  </div>
                ))}
              </div>
            </div>

            <span className="text-2xl font-bold text-gray-400 mt-6">:</span>

            <div className="flex-1">
              <label className="block text-[12px] text-gray-600 mb-2 text-center">Phút</label>
              <div className={cx("max-h-48 overflow-y-auto border border-gray-200 rounded-xl", TWCSS.scrollbarY)}>
                {minuteOptions.map((m) => (
                  <div
                    key={m}
                    onClick={() => handleMinuteChange(m)}
                    className={`p-2 cursor-pointer text-center text-[12px] ${
                      minutes === m
                        ? "bg-linear-[var(--color-ln-primary)] rounded-xl text-white hover:bg-[var(--color-primary-700)]"
                        : "hover:bg-green-50"
                    }`}
                  >
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-3 text-[13px] py-2 bg-linear-[var(--color-ln-primary)] text-white rounded-xl font-bold"
          >
            Xác nhận
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Time);
