import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import React, { useEffect, useRef } from "react";

const cx = classNames.bind(style);

function Item({
  as: Component = "div",
  icon,
  children,
  to,
  href,
  onClick,
  className,
  itemClassName,
  iconClassName,
  whitespace = "whitespace-normal",
  style = {},
  editable = false,
  value,
  onEdit,
  placeholder,
  ...props
}) {
  const handleInput = (e) => {
    const text = e.target.innerText;
    onEdit?.(text);
    props.onChange?.(text);
  };
  const contentRef = useRef(null);

  useEffect(() => {
    if (!editable) return;
    if (!contentRef.current) return;

    if (value !== contentRef.current.innerText) {
      contentRef.current.innerText = value || "";
    }
  }, [value, editable]);
  return (
    <Component
      to={to}
      href={href}
      onClick={onClick}
      className={cx(className)}
      style={{ ...style }}
    >
      {icon && (
        <span className={cx("flex items-center justify-center", iconClassName)}>
          {icon}
        </span>
      )}
      <div
        ref={contentRef}
        contentEditable={editable}
        suppressContentEditableWarning={editable}
        onInput={handleInput}
        onBlur={(e) => {
          const text = e.target.innerText.trim();
          if (text === "") {
            // Xoá toàn bộ nội dung DOM để :empty hoạt động
            e.target.innerHTML = "";
            if (onEdit) onEdit("");
          }
        }}
        data-placeholder={placeholder}
        className={cx(
          "overflow-hidden transition-all duration-300",
          editable ? "whitespace-normal outline-none" : whitespace,
          itemClassName,
        )}
        style={{
          wordBreak: "break-word",
        }}
        {...props}
      >
        {children}
      </div>
    </Component>
  );
}

export default React.memo(Item);
