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
      {icon && <span className="">{icon}</span>}
      <div
        className={cx(
          "overflow-hidden whitespace-nowrap transition-all duration-300",
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
