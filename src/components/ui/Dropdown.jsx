// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Dropdown({ minWidth = "200px", minHeight = "100px", children, className, style = {}, ...props }) {
  return (
    <div className={cx(className)} style={{ minWidth, minHeight, ...style }} {...props}>
      {children}
    </div>
  );
}

export default Dropdown;
