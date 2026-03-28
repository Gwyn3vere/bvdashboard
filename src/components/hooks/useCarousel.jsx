import { useState, useEffect } from "react";

const BREAKPOINTS = [
  { min: 1280, value: 6 }, // xl
  { min: 1024, value: 5 }, // lg
  { min: 768, value: 3 }, // md
  { min: 640, value: 2 }, // sm
  { min: 0, value: 1 }, // default (mobile)
];

export default function useCarousel() {
  const getItemsPerPage = () => {
    const width = window.innerWidth;
    return BREAKPOINTS.find((bp) => width >= bp.min).value;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerPage;
}
