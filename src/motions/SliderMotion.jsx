import { motion, AnimatePresence } from "framer-motion";

export default function SliderMotion({ page, direction, children }) {
  const variants = {
    enter: (direction) => ({
      x: direction === "next" ? "100%" : "-100%",
      position: "absolute" // chỉ enter là absolute
    }),
    center: {
      x: 0,
      position: "relative" // ⚠ phải đặt relative → container auto height
    },
    exit: (direction) => ({
      x: direction === "next" ? "-100%" : "100%",
      position: "absolute" // chỉ exit là absolute
    })
  };

  return (
    <div className="relative w-full overflow-hidden">
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
