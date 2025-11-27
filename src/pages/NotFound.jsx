import classnames from "classnames/bind";
import styles from "../styles/pages.module.css";

const cx = classnames.bind(styles);

function NotFound() {
  return <div className={cx("not-found", "text-sm text-red-500")}>404 Not Found</div>;
}

export default NotFound;
