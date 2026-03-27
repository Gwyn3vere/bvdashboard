import { useEffect, useRef, useState } from "react";

export default function useCountUp(end, duration = 1200) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!end) {
      setValue(0);
      return;
    }

    const animate = (time) => {
      if (!startTimeRef.current) startTimeRef.current = time;

      const progress = time - startTimeRef.current;
      const percent = Math.min(progress / duration, 1);

      // ease-out cubic
      const ease = 1 - Math.pow(1 - percent, 3);

      setValue(Math.floor(ease * end));

      if (percent < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [end, duration]);

  return value;
}
