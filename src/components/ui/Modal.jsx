import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames/bind";
// Styles - UI
import style from "../../styles/ui.module.css";
import { Button } from "../ui";

const cx = classNames.bind(style);

function Modal({ open = false, backdrop = true, onClose = () => {}, children, style = {}, className, ...props }) {
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
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [open]);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      {/* Backdrop */}
      {backdrop && (
        <div
          className={cx(
            "absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto",
            closing ? "backdrop-fadeOut" : "backdrop-fadeI"
          )}
          onClick={onClose}
        />
      )}

      {/* Content */}
      <div
        className={cx(
          "pointer-events-auto relative bg-white rounded-[8px] p-5 w-full max-w-lg transition-all",
          closing ? "animate-fadeOut" : "animate-fadeIn",
          className
        )}
        style={style}
        {...props}
      >
        {children}

        <div className="flex justify-end gap-2 mt-5 text-[14px]">
          <Button
            onClick={onClose}
            children="Huỷ"
            width="auto"
            height={40}
            className="px-4 py-2"
            style={{ background: "var(--color-bg-light-primary-300)" }}
          />
          <Button
            children="Xác nhận"
            width="auto"
            height={40}
            className="px-4 py-2"
            style={{ background: "var(--color-text-light-primary)", color: "var(--color-bg-light-primary-100)" }}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Modal);
