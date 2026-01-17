import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
// Styles - UI
import style from "../../styles/ui.module.css";
import { Button } from "../ui";

const cx = classNames.bind(style);

function Modal({
  open = false,
  backdrop = true,
  onClose = () => {},
  children,
  footer = null,
  style = {},
  className,
  width = "max-w-3xl",
  ...props
}) {
  const [visible, setVisible] = useState(open);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setVisible(true);
      setClosing(false);
    } else {
      setClosing(true);
      const timeout = setTimeout(() => setVisible(false), 180);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <div
      className={cx(
        "fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50",
        closing ? "backdrop-fadeOut" : "backdrop-fadeIn"
      )}
      onClick={onClose}
    >
      <div
        className={cx(
          "bg-white rounded-[8px] shadow-xl w-full max-h-[90vh] overflow-y-auto hidden-scrollbar",
          className,
          width
        )}
        onClick={(e) => e.stopPropagation()}
        style={style}
        {...props}
      >
        {children}
      </div>
    </div>
  );
}

export default React.memo(Modal);
