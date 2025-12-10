// Libraries
import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
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
  whitespace = "whitespace-nowrap",
  style = {}
}) {
  return (
    <Component to={to} onClick={onClick} className={cx(className)} style={{ ...style }}>
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      <div className={cx("overflow-hidden transition-all duration-300", whitespace, itemClassName)}>{children}</div>
    </Component>
  );
}

export default React.memo(Item);
