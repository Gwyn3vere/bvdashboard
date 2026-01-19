import { useCallback, useEffect, useRef } from "react";

export default function useDebouncedCallback(callback, delay = 500) {
  const timeoutRef = useRef(null);
  const callbackRef = useRef(callback);

  // Luôn giữ callback mới nhất
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );
}
