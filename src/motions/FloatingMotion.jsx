import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function FloatingIcon({ icon, size = 50, parentRef, position }) {
  return (
    <motion.div
      drag
      dragConstraints={parentRef}
      dragElastic={0.2}
      animate={{
        y: [0, -6, 4, 0],
        x: [0, 3, -4, 0]
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute flex items-center justify-center cursor-grab"
      style={{
        width: size,
        height: size,
        top: position.y,
        left: position.x
      }}
    >
      <img src={icon} alt="icon" draggable={false} style={{ width: size, height: size, userSelect: "none" }} />
    </motion.div>
  );
}

export default function FloatingIconGroup({ icons, iconSize = 100 }) {
  const containerRef = useRef(null);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth: w, offsetHeight: h } = containerRef.current;
      const margin = iconSize;
      const newPositions = [];

      icons.forEach(() => {
        let tries = 0;
        let x, y;
        do {
          x = Math.random() * (w - iconSize);
          y = Math.random() * (h - iconSize);
          tries++;
        } while (newPositions.some((p) => Math.hypot(p.x - x, p.y - y) < margin) && tries < 100);
        newPositions.push({ x, y });
      });

      setPositions(newPositions);
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {positions.map((pos, idx) => (
        <FloatingIcon key={idx} icon={icons[idx]} size={iconSize} parentRef={containerRef} position={pos} />
      ))}
    </div>
  );
}
