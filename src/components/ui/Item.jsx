// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Item({
  boolean,
  as: Component = "div",
  width = "w-[190px]",
  icon,
  children,
  href,
  to,
  onClick,
  className,
  itemClassName,
  whitespace = "whitespace-nowrap",
  style = {}
}) {
  return (
    <Component
      href={href}
      to={to}
      onClick={onClick}
      className={cx(className, boolean ? "flex justify-center items-center" : "flex items-center gap-2")}
      style={{ ...style }}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      <div
        className={cx(
          "overflow-hidden transition-all duration-300",
          whitespace,
          itemClassName,
          boolean ? "w-0" : width
        )}
      >
        <span>{children}</span>
      </div>
    </Component>
  );
}

export default Item;
