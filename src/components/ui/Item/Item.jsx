// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../../styles/components.module.css";

const cx = classNames.bind(style);

function Item({ as: Component = "div", icon, children, href, to, onClick, className, style = {} }) {
  return (
    <Component
      href={href}
      to={to}
      onClick={onClick}
      className={cx(
        "px-3 py-2 cursor-pointer rounded-[8px] ",
        "hover:bg-[var(--color-bg-light-primary-200)]",
        "flex items-center gap-2",
        className
      )}
      style={{ ...style }}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </Component>
  );
}

export default Item;
