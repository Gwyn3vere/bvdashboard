import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { SPECIALTIES_OPTIONS } from "../../constants/option";
import { Avatar, Item, Tooltip } from "../../components/ui";

const cx = classNames.bind(styles);

function Card({ doctor, onDragStart, onDrag, onDragEnd }) {
  const specialtyConfig = SPECIALTIES_OPTIONS.find((item) => item.value === doctor.specialty);

  const getLastTwoWords = (fullName) => {
    const parts = fullName.trim().split(" ");
    return parts.slice(-1).join(" ");
  };
  return (
    <Tooltip
      content={
        <div className="flex flex-col items-center">
          <div>{doctor.name}</div>
          <div>{specialtyConfig.name || doctor.specialty}</div>
        </div>
      }
      position="top"
      className="order-1 md:order-2"
    >
      <div
        draggable
        onDragStart={(e) => onDragStart(e, doctor.id)}
        onDrag={onDrag}
        onDragEnd={onDragEnd}
        className={cx("flex flex-col items-center gap-0.5 px-1 cursor-move", "w-[60px]")}
      >
        <Avatar src={doctor.avatarUrl} name={doctor.name} className="rounded-full" width={44} height={44} />
        <Item as="span" children={getLastTwoWords(doctor.name)} itemClassName={cx("text-[10.5px] font-semibold")} />
        <Item
          as="span"
          children={specialtyConfig.name || doctor.specialty}
          itemClassName={cx("line-clamp-1 text-[9px] font-semibold text-[var(--color-unavailable)]")}
        />
      </div>
    </Tooltip>
  );
}

export default React.memo(Card);
