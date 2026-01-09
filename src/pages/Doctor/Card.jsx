import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { mockDoctors } from "../../mock/manage";
import { getColorByIndex } from "../../utils/color";

const cx = classNames.bind(styles);

function Card({ doctor, onDragStart }) {
  const doctorIndex = mockDoctors.findIndex((d) => d.id === doctor.id);
  const colorObj = getColorByIndex(doctorIndex);
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, doctor.id)}
      style={{ backgroundColor: colorObj.hex }}
      className={cx("text-white p-2 rounded-[8px] cursor-move transition-opacity mb-2")}
    >
      <div className="font-semibold">Bs. {doctor.firstName + " " + doctor.lastName}</div>
      <div className="text-xs opacity-90 mt-1">{doctor.specialty}</div>
    </div>
  );
}

export default React.memo(Card);
