// Libraries
import classNames from "classnames/bind";
// Styles - UI
import { Item } from "../../components/ui";
import style from "../../styles/pages.module.css";
import { OverviewStats } from ".";

const cx = classNames.bind(style);

function Dashboard() {
  return (
    <div className={cx("wrapper")}>
      <Item as="strong" children="Xin chào, Guest👋" itemClassName="text-3xl" width="100%" />
      <Item
        as="span"
        children="Đây là trang tổng quan giúp bạn theo dõi mọi hoạt động quan trọng."
        itemClassName="text-[14px] text-gray-500"
        className="mb-5 mt-1"
        width="100%"
      />
      {/* Overview */}
      <OverviewStats />
    </div>
  );
}

export default Dashboard;
