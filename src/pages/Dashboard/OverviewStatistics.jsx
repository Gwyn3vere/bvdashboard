// Libraries - Mock
import classNames from "classnames/bind";
import { mockOverviewStats } from "../../mock/overview";
// Styles - UI
import { Item } from "../../components/ui";
import style from "../../styles/pages.module.css";

const cx = classNames.bind(style);

function OverviewStatistics() {
  return (
    <div className="flex gap-2 my-5">
      {mockOverviewStats.map((stat) => (
        <div
          key={stat.id}
          style={{ background: stat.color, boxShadow: "var(--shadow)" }}
          className={cx("w-[270px] h-[150px] rounded-[8px] p-5", "flex flex-1 items-center justify-between")}
        >
          <div className="text-white flex flex-col gap-2">
            <p className="text-md font-medium">{stat.title}</p>
            <p className="text-4xl font-bold">{stat.value}</p>
          </div>
          <div className="p-4 border-2 border-white rounded-full">
            <Item icon={stat.icon} className="text-white text-4xl" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default OverviewStatistics;
