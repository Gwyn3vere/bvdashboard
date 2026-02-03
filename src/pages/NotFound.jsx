import classnames from "classnames/bind";
import styles from "../styles/pages.module.css";
import { Item } from "../components/ui";
import { TWCSS } from "../styles/defineTailwindcss";
import { Link } from "react-router-dom";

const cx = classnames.bind(styles);

function NotFound() {
  return (
    <div className={cx("w-full h-screen overflow-hidden", "bg-[var(--color-bg-light-primary-200)]", TWCSS.container)}>
      <div className={cx("w-full h-full flex items-center justify-center")}>
        <div className={cx("flex flex-col items-center space-y-5 leading-none")}>
          <Item
            as="h1"
            children={"404"}
            itemClassName={cx(
              "text-[10vh] sm:text-[20vh] md:text-[30vh] font-black text-[var(--color-primary-200)] scale-y-120"
            )}
          />
          <Item
            children={"Xin lỗi, không thể tìm thấy trang này!"}
            itemClassName={cx("text-xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-center")}
          />
          <Item
            children={"Trang bạn đang tìm kiếm có thể không đủ quyền truy cập hoặc trang không tồn tại!"}
            itemClassName={cx("text-sm text-center")}
          />
          <Item
            as={Link}
            to={"/bang-dieu-khien"}
            children={"Trở về trang chủ"}
            itemClassName={cx("text-md font-semibold text-white")}
            className={cx("p-5 bg-[var(--color-primary)] rounded-full")}
          />
        </div>
      </div>
    </div>
  );
}

export default NotFound;
