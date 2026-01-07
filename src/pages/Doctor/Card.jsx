import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";

const cx = classNames.bind(styles);

function Card({ doctor, onDragStart, color }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, doctor.id)}
      style={{ "--bg-color": color.bg, "--text-color": color.text }}
      className={cx(
        "p-2 rounded-[8px] cursor-move transition-opacity mb-2",
        "bg-[var(--bg-color)]/50 text-[var(--text-color)]"
      )}
    >
      <div className="font-semibold">Bs. {doctor.firstName + " " + doctor.lastName}</div>
      <div className="text-xs opacity-90 mt-1">{doctor.specialty}</div>
    </div>
  );
}

export default React.memo(Card);
