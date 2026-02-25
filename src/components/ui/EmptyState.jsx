import React from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function EmptyState({ icon: Icon, text, subText }) {
  return (
    <div
      className={cx("flex flex-col items-center justify-center gap-2 py-15")}
    >
      <span className={cx("text-[32px] text-[var(--color-unavailable)] my-3")}>
        {<Icon />}
      </span>
      <div
        className={cx(
          "text-[14px] font-bold text-[var(--color-unavailable-700)]",
          "leading-2",
        )}
      >
        {text}
      </div>
      <div className={cx("text-[12px] text-[var(--color-unavailable-700)]")}>
        {subText}
      </div>
    </div>
  );
}

export default React.memo(EmptyState);
