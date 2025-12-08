// Libraries - Mock
import classNames from "classnames/bind";
import { mockOverviewStats } from "../../mock/overview";
// Styles - UI
import { Item } from "../../components/ui";
import style from "../../styles/pages.module.css";

const cx = classNames.bind(style);

function OverviewStats() {
  return (
    <div className="flex gap-2 my-5">
      {mockOverviewStats.map((stat) => (
        <Item
          key={stat.id}
          as="div"
          style={{ background: stat.color }}
          className={cx("w-[250px] h-[150px] rounded-[8px] p-5")}
        >
          <div className="flex items-center gap-2">
            <Item
              as="div"
              icon={stat.icon}
              className={cx("flex items-center justify-center", "w-[50px] h-[50px] rounded-[8px] bg-white")}
            />
            <div>
              <p>{stat.title}</p>
              <p>{stat.value}</p>
            </div>
          </div>
        </Item>
      ))}
    </div>
  );
}

export default OverviewStats;
