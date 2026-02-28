import classNames from "classnames/bind";
import React from "react";
import styles from "../../styles/pages.module.css";
import { Item, Button } from "../../components/ui";
import { useBannerStore } from "../../store/bannerStore";
import { LuTrash } from "react-icons/lu";
const cx = classNames.bind(styles);

function ConfirmAction({
  onClose,
  title,
  description,
  icon,
  confirmText,
  onConfirm,
  iconClass,
  iconLayoutClass,
  confirmClassName,
}) {
  return (
    <div className={cx("bg-white px-8 py-7 flex flex-col items-center")}>
      <Button width={56} height={56} icon={icon} iconClassName={cx(iconClass)} className={cx(iconLayoutClass)} />

      <Item children={title} itemClassName={cx("text-[17px] font-bold")} />
      <Item
        children={description}
        itemClassName={cx("text-[13px] text-[var(--color-unavailable-700)]")}
        className={cx("text-center mt-2 mb-7")}
      />

      <div className="flex gap-3 w-full">
        <Button
          type="button"
          children={"Huỷ"}
          onClick={onClose}
          width="100%"
          className={cx(
            "text-[var(--color-unavailable-900)] font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]",
            "rounded-xl",
            "font-semibold text-[13px]",
          )}
        />
        <Button
          type={"button"}
          children={confirmText}
          onClick={onConfirm}
          width="100%"
          className={cx(confirmClassName)}
        />
      </div>
    </div>
  );
}

export default React.memo(ConfirmAction);
