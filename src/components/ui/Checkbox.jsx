// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Checkbox({ text, className, checkboxClassName, style = {}, checked, onChange, disabled, ...props }) {
  return (
    <label
      className={cx(
        "cursor-pointer select-none",
        text && "flex items-center gap-3",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <input type="checkbox" hidden checked={checked} disabled={disabled} onChange={onChange} {...props} />

      {/* custom checkbox */}
      <span className={cx("checkbox-indicator", checkboxClassName)} style={style} />

      {text && <span>{text}</span>}
    </label>
  );
}

export default Checkbox;
