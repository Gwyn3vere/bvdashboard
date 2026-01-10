// Libraries - Constants - Hooks
import React, { useEffect, useRef } from "react";
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { LuCircleAlert, LuCircleCheck, LuTriangleAlert, LuCircleX, LuX } from "react-icons/lu";

const cx = classNames.bind(style);

const POSITION_CLASS = {
  "top-left": "toastTopLeft",
  "top-right": "toastTopRight",
  "bottom-left": "toastBottomLeft",
  "bottom-right": "toastBottomRight",
  "top-center": "toastTopCenter",
  "bottom-center": "toastBottomCenter"
};

const ICON_TYPE = {
  INFO: <LuCircleAlert />,
  SUCCESS: <LuCircleCheck />,
  WARNING: <LuTriangleAlert />,
  ERROR: <LuCircleX />
};

const TITLE_TYPE = {
  INFO: "Thông báo",
  SUCCESS: "Thành công",
  WARNING: "Lưu ý",
  ERROR: "Lỗi"
};

function Toast({ visible, duration = 3000, onClose, type, content, position = "top-right", style = {}, ...props }) {
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    timeoutRef.current = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className={cx("toast", type, POSITION_CLASS[position])} style={style} {...props}>
      <div className="flex gap-2">
        {type && <span className={cx("icon")}>{ICON_TYPE[type]}</span>}
        <div>
          <strong className="text-[17px]">{TITLE_TYPE[type]}</strong>
          <div className="text-[14px]">{content}</div>
        </div>
      </div>
      <LuX onClick={onClose} />
    </div>
  );
}

export default React.memo(Toast);
