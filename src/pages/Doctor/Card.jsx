import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { MOCK_DOCTOR_LIST } from "../../mock/doctors";
import { SPECIALTIES_OPTIONS } from "../../constants/option";
import { getColorByIndex } from "../../utils/color";

const cx = classNames.bind(styles);

function Card({ doctor, onDragStart, onDrag, onDragEnd }) {
  const doctorIndex = MOCK_DOCTOR_LIST.findIndex((d) => d.id === doctor.id);
  const colorObj = getColorByIndex(doctorIndex);
  const specialtyConfig = SPECIALTIES_OPTIONS.find((item) => item.value === doctor.specialty);
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, doctor.id)}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      style={{ backgroundColor: colorObj.hex }}
      className={cx("text-white p-2 rounded-[8px] cursor-move transition-opacity mb-2")}
    >
      <div className="font-semibold">Bs. {doctor.name}</div>
      <div className="text-xs opacity-90 mt-1">{specialtyConfig ? specialtyConfig.name : doctor.specialty}</div>
    </div>
  );
}

export default React.memo(Card);
