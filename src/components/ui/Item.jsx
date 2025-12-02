// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Item({ boolean, as: Component = "div", icon, children, href, to, onClick, className, style = {} }) {
  return (
    <Component
      href={href}
      to={to}
      onClick={onClick}
      className={cx(
        "px-3 py-2 cursor-pointer rounded-[8px] ",
        "hover:bg-[var(--color-bg-light-primary-200)]",
        className,
        boolean ? "flex justify-center items-center" : "flex items-center gap-2"
      )}
      style={{ ...style }}
    >
      {icon && <span className="">{icon}</span>}
      <div
        className={cx("overflow-hidden whitespace-nowrap transition-all duration-300", boolean ? "w-0" : "w-[190px]")}
      >
        <span>{children}</span>
      </div>
    </Component>
  );
}

export default Item;
