import React, { useEffect, useRef } from "react";

function DragPreview({ doctor, colorObj, position, onRefReady }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && onRefReady) {
      onRefReady(ref.current);
    }
  }, [onRefReady]);

  if (!position) return null;

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: "320px",
        backgroundColor: colorObj.hex,
        color: "white",
        padding: "8px",
        borderRadius: "8px",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        willChange: "transform", // Optimize rendering
        transition: "none" // Remove any transitions
      }}
    >
      <div style={{ fontWeight: 600 }}>
        Bs. {doctor.firstName} {doctor.lastName}
      </div>
      <div style={{ fontSize: "12px", opacity: 0.9, marginTop: "4px" }}>{doctor.specialty}</div>
    </div>
  );
}
export default React.memo(DragPreview);
