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
  label = "Label",
  labelClassName = "",
  icon,
  className,
  inputClassName = "",
  style = {},
  ...props
}) {
  return (
    <div className={className}>
      <label className={cx(labelClassName)}>{label}</label>
      <div className={cx("flex items-center bg-[var(--color-bg-light-primary-300)] px-3", inputClassName)}>
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
