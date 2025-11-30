import { useState, useCallback, useEffect, useRef } from "react";

export default function useActive(initialValue = false) {
  const [isActive, setIsActive] = useState(initialValue);
  const ref = useRef(null);

  const toggleActive = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const activate = useCallback(() => setIsActive(true), []);
  const deactivate = useCallback(() => setIsActive(false), []);

  // Detect click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { isActive, toggleActive, activate, deactivate, ref };
}
