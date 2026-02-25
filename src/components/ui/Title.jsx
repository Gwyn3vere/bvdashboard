import React from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { LuX } from "react-icons/lu";
import { Item, Button } from "../ui";

const cx = classNames.bind(style);

function TitleForm({ onClose, title, subTitle }) {
  return (
    <div className={cx("sticky top-0 bg-linear-[var(--color-ln-primary)]", "px-7 py-5 flex items-center justify-between z-50")}>
      <div className="text-white">
        <Item as="span" children={title} className="text-[17px] font-bold" />
        <Item as="div" children={subTitle} className="text-[11.5px] text-white/70" />
      </div>
      <Button
        type="button"
        width={32}
        height={32}
        icon={<LuX />}
        iconClassName="text-[15px] text-white"
        onClick={onClose}
        className={cx("bg-white/20 rounded-full")}
      />
    </div>
  );
}

export default React.memo(TitleForm);
