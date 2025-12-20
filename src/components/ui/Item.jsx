// Libraries
import React from "react";
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Item({
  as: Component = "div",
  icon,
  children,
  to,
  onClick,
  className,
  itemClassName,
  iconClassName,
  whitespace = "whitespace-nowrap",
  style = {},
  editable = false,
  onEdit,
  placeholder
}) {
  const handleInput = (e) => {
    if (editable && onEdit) {
      onEdit(e.target.innerText);
    }
  };
  return (
    <Component to={to} onClick={onClick} className={cx(className)} style={{ ...style }}>
      {icon && <span className={cx("flex items-center justify-center", iconClassName)}>{icon}</span>}
      <div
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
          itemClassName
        )}
        style={{
          wordBreak: "break-word"
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export default React.memo(Item);
