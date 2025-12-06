// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function Form({ id, children, className, style = {}, ...props }) {
  return (
    <form id={id} className={cx(className)} style={{ ...style }} {...props}>
      {children}
    </form>
  );
}

export default Form;
