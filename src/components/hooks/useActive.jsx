import { useState, useCallback, useEffect, useRef } from "react";

export default function useActive(initialValue = false) {
  const [isActive, setIsActive] = useState(initialValue);
  const ref = useRef(null);

  // Toggle ON/OFF — nếu truyền boolean → set trực tiếp
  const toggleActive = useCallback((value) => {
    if (typeof value === "boolean") setIsActive(value);
    else setIsActive((prev) => !prev);
  }, []);

  const activate = useCallback(() => setIsActive(true), []);
  const deactivate = useCallback(() => setIsActive(false), []);

  // Detect click outside (chỉ dùng cho dropdown / menu)
  useEffect(() => {
    function handleClickOutside(event) {
      // chỉ chạy khi ref gán vào 1 element còn hoạt động
      if (ref.current && !ref.current.contains(event.target)) {
        setIsActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { isActive, toggleActive, activate, deactivate, ref };
}
