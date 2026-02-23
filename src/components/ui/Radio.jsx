import React, { useCallback } from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Radio({
  text,
  className,
  radioClassName,
  style = {},
  type = "radio",
  checked,
  onChange,
  disabled,
  hidden = false,
  ...props
}) {
  const handleChange = useCallback(
    (e) => {
      if (disabled) return;
      onChange?.(e);
    },
    [onChange, disabled],
  );

  return (
    <label
      className={cx(
        "cursor-pointer select-none",
        text && "flex items-center gap-3",
        disabled && "opacity-50 pointer-events-none",
        className,
      )}
      style={style}
    >
      <input
        hidden
        type={type}
        className={cx(radioClassName)}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />

      <span className={cx("radio-indicator")} hidden={hidden} />

      {text && <span>{text}</span>}
    </label>
  );
}

export default React.memo(Radio);
