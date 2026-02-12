import React from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { Item } from "../../components/ui";

const cx = classNames.bind(style);

function Skeleton() {
  return (
    <div
      className={cx(
        "bg-white p-4 rounded-[8px]",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1.5 hover:shadow-xl hover:scale-[1.02]",
      )}
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div className={cx("space-y-5")}>
        {/* Thumbnail */}
        <div className={cx("relative rounded-[8px] overflow-hidden max-h-50")}>
          <div className={cx("skeleton", "w-full h-40")} />
          <Item
            className={cx(
              "skeleton",
              "absolute z-10 bottom-2 left-2",
              "w-24 h-6 rounded-md",
            )}
          />
        </div>
        {/* Status */}
        <Item className={cx("skeleton", "h-6 w-40 rounded-md")} />
        {/* Title */}
        <div className={cx("space-y-2")}>
          <Item itemClassName={cx("skeleton", "h-6 rounded-md")} />
          <Item itemClassName={cx("skeleton", "h-6 w-70 rounded-md")} />
        </div>
        {/* Short Description */}
        <div className={cx("space-y-2")}>
          <Item itemClassName={cx("skeleton", "h-4 rounded-md")} />
          <Item itemClassName={cx("skeleton", "h-4 w-90 rounded-md")} />
        </div>
        {/* Author and Date */}
        <div className={cx("flex flex-col justify-between gap-2")}>
          <Item className={cx("skeleton", "h-5 w-32 rounded-md")} />
          <Item className={cx("skeleton", "h-4 w-25 rounded-md")} />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Skeleton);
