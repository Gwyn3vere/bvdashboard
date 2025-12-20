// Libraries
import classNames from "classnames/bind";
// Styles - UI
import { Item } from "../../components/ui";
import style from "../../styles/pages.module.css";
import { OverviewStats, AppointmentLineChart } from ".";

const cx = classNames.bind(style);

function Dashboard() {
  return (
    <div className="px-10 pb-5">
      <div className={cx("flex gap-5")}>
        <div>
          <Item as="strong" children="Xin chào, Guest👋" itemClassName="text-3xl" width="100%" />
          <Item
            as="span"
            children="Bảng điều khiển quản trị bệnh viện."
            itemClassName="text-xl text-gray-500 mt-2"
            width="100%"
          />
          {/* Overview */}
          <OverviewStats />
          <AppointmentLineChart />
        </div>
        <div>Right</div>
      </div>
    </div>
  );
}

export default Dashboard;
