import React, { useState, useRef, useEffect } from "react";
import { LuClock } from "react-icons/lu";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Time({ value, onChange, min, max, placeholder = "Chọn giờ" }) {
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
        className={cx(
          "w-full px-4 py-3 border-2 rounded-[8px]",
          "border-[var(--color-bg-light-primary-400)] hover:border-[var(--color-bg-light-primary-500)]",
          "focus:border-[var(--color-primary-500)] focus:outline-none cursor-pointer",
          "flex items-center justify-between bg-white hover:border-gray-300 transition-colors"
        )}
      >
        <span className={value ? "text-gray-900" : "text-gray-400"}>{value || placeholder}</span>
        <LuClock className="w-5 h-5 text-gray-400" />
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-lg p-4 w-full">
          <div className="flex gap-2 items-center justify-center">
            <div className="flex-1">
              <label className="block text-xs text-gray-600 mb-2 text-center">Giờ</label>
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded">
                {hourOptions.map((h) => (
                  <div
                    key={h}
                    onClick={() => handleHourChange(h)}
                    className={`px-3 py-2 cursor-pointer text-center ${
                      hours === h
                        ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-700)]"
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
              <label className="block text-xs text-gray-600 mb-2 text-center">Phút</label>
              <div className="max-h-48 overflow-y-auto border border-gray-200 rounded">
                {minuteOptions.map((m) => (
                  <div
                    key={m}
                    onClick={() => handleMinuteChange(m)}
                    className={`px-3 py-2 cursor-pointer text-center ${
                      minutes === m
                        ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-700)]"
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
            className="w-full mt-3 px-4 py-2 bg-[var(--color-primary-500)] text-white rounded-lg hover:bg-[var(--color-primary-700)] transition-colors font-medium"
          >
            Xác nhận
          </button>
        </div>
      )}
    </div>
  );
}

export default React.memo(Time);
