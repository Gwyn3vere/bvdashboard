// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Checkbox({ text, className, checkboxClassName, style = {}, ...props }) {
  return (
    <div className={cx("flex items-center gap-2 cursor-pointer", className)} style={{ ...style }} {...props}>
      <input type="checkbox" className={cx(checkboxClassName)} />
      <span>{text}</span>
    </div>
  );
}

export default Checkbox;
