import { useRef, useState } from "react";

export default function useScrollIndicator() {
  const ref = useRef(null);

  const [isTop, setIsTop] = useState(true);
  const [isBottom, setIsBottom] = useState(false);

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;

    setIsTop(scrollTop === 0);
    setIsBottom(scrollTop + clientHeight >= scrollHeight - 2);
  };

  const scrollTo = () => {
    const el = ref.current;
    if (!el) return;

    if (isBottom) {
      el.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  };

  return {
    ref,
    isTop,
    isBottom,
    handleScroll,
    scrollTo,
  };
}
