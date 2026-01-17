// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Checkbox({ text, className, checkboxClassName, style = {}, ...props }) {
  return (
    <div
      className={cx("cursor-pointer", text ? "flex items-center gap-2" : "", className)}
      style={{ ...style }}
      {...props}
    >
      <input type="checkbox" className={cx(checkboxClassName)} readOnly />
      <span>{text}</span>
    </div>
  );
}

export default Checkbox;
