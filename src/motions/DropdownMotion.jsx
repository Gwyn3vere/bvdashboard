import { motion, AnimatePresence } from "framer-motion";

export default function DropdownMotion({ isOpen, children, duration = 0.3 }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="dropdown"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
          transition={{ duration, ease: "easeOut" }}
          style={{
            transformOrigin: "top"
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
