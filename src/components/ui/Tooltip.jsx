import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Tooltip({
  children,
  content,
  position = "top",
  trigger = "hover",
  delay = 200,
  className,
  disabled = false,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    if (disabled) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const toggleTooltip = () => {
    if (disabled) return;
    setIsVisible(!isVisible);
  };

  // Tính toán vị trí tooltip
  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top - tooltipRect.height - 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + 8;
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
          break;
        case "left":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          break;
        case "right":
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
          left = triggerRect.right + 8;
          break;
        default:
          break;
      }

      // Điều chỉnh nếu tooltip vượt ra ngoài viewport
      const padding = 8;
      if (left < padding) left = padding;
      if (left + tooltipRect.width > window.innerWidth - padding) {
        left = window.innerWidth - tooltipRect.width - padding;
      }
      if (top < padding) top = padding;
      if (top + tooltipRect.height > window.innerHeight - padding) {
        top = window.innerHeight - tooltipRect.height - padding;
      }

      setCoords({ top, left });
    }
  }, [isVisible, position]);

  // Event handlers dựa trên trigger type
  const handlers =
    trigger === "hover"
      ? {
          onMouseEnter: showTooltip,
          onMouseLeave: hideTooltip,
        }
      : {
          onClick: toggleTooltip,
        };

  // Đóng tooltip khi click bên ngoài (cho trigger click)
  useEffect(() => {
    if (trigger === "click" && isVisible) {
      const handleClickOutside = (e) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target) &&
          tooltipRef.current &&
          !tooltipRef.current.contains(e.target)
        ) {
          hideTooltip();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [trigger, isVisible]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
        className={cx("tooltip-trigger", className)}
        {...handlers}
      >
        {children}
      </div>

      {isVisible && content && (
        <div
          ref={tooltipRef}
          className={cx("tooltip", `tooltip-${position}`)}
          style={{
            position: "fixed",
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            zIndex: 9999,
          }}
        >
          <div className={cx("tooltip-content")}>{content}</div>
          <div className={cx("tooltip-arrow")} />
        </div>
      )}
    </>
  );
}

export default React.memo(Tooltip);
