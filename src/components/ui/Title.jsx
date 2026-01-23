import React from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { LuX } from "react-icons/lu";
import { Item, Button } from "../ui";

const cx = classNames.bind(style);

function TitleForm({ onClose, title, subTitle }) {
  return (
    <div
      className={cx("sticky top-0 bg-white border-b border-gray-200", "p-6 flex justify-between z-50 rounded-t-[8px]")}
    >
      <div>
        <Item as="h3" children={title} className="text-xl font-bold text-gray-900" />
        <Item as="div" children={subTitle} className="text-sm text-gray-600 mt-1" />
      </div>
      <Button
        type="button"
        width={50}
        height={50}
        icon={<LuX />}
        iconClassName="text-2xl"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600"
      />
    </div>
  );
}

export default React.memo(TitleForm);
