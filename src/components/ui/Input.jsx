// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Input({
  children,
  width = "100%",
  height = "50px",
  type = "text",
  placeholder = "Typing here...",
  label,
  labelClassName = "",
  icon,
  className,
  inputClassName = "",
  style = {},
  ...props
}) {
  return (
    <div className={className}>
      {label && <label className={cx(labelClassName)}>{label}</label>}
      <div
        className={cx(
          "flex items-center px-3 rounded-[8px]",
          "border-2 border-[var(--color-bg-light-primary-400)]",
          "focus-within:border-2 focus-within:border-[var(--color-primary)]",
          inputClassName
        )}
      >
        <span>{icon}</span>
        <input
          type={type}
          className={cx("outline-none px-2")}
          placeholder={placeholder}
          style={{ width, height, ...style }}
          {...props}
        />
      </div>
    </div>
  );
}

export default Input;
