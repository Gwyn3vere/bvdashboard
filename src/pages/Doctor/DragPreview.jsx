import React, { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { SPECIALTIES_OPTIONS } from "../../constants/option";
import { Avatar, Item } from "../../components/ui";

const cx = classNames.bind(styles);

function DragPreview({ doctor, position, onRefReady }) {
  const ref = useRef(null);
  const specialtyConfig = SPECIALTIES_OPTIONS.find((item) => item.value === doctor.specialty);

  const getLastTwoWords = (fullName) => {
    const parts = fullName.trim().split(" ");
    return parts.slice(-1).join(" ");
  };

  useEffect(() => {
    if (ref.current && onRefReady) {
      onRefReady(ref.current);
    }
  }, [onRefReady]);

  if (!position) return null;

  return (
    <div
      ref={ref}
      className={cx("flex flex-col items-center gap-0.5 px-1 cursor-move", "w-[60px] p-2")}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        borderRadius: "8px",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        willChange: "transform",
        transition: "none",
        background: "#ffffff",
      }}
    >
      <Avatar src={doctor.avatarUrl} name={doctor.name} className="rounded-full" width={44} height={44} />
      <Item as="span" children={getLastTwoWords(doctor.name)} itemClassName={cx("text-[10.5px] font-semibold")} />
      <Item
        as="span"
        children={specialtyConfig.name || doctor.specialty}
        itemClassName={cx("line-clamp-1 text-[9px] font-semibold text-[var(--color-unavailable)]")}
      />
    </div>
  );
}
export default React.memo(DragPreview);
