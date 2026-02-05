import { useEffect, useRef } from "react";

export default function useClickOutsideManager() {
  const itemsRef = useRef(new Map());

  useEffect(() => {
    const handler = (e) => {
      itemsRef.current.forEach((callback, ref) => {
        if (ref.current && !ref.current.contains(e.target)) {
          callback();
        }
      });
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const register = (ref, onOutsideClick) => {
    itemsRef.current.set(ref, onOutsideClick);
  };

  const unregister = (ref) => {
    itemsRef.current.delete(ref);
  };

  return { register, unregister };
}
