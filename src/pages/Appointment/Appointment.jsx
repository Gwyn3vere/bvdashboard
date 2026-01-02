// Libraries - Mock -Hooks
import classNames from "classnames/bind";
import { useState } from "react";
// Styles - UI - Motions
import styles from "../../styles/pages.module.css";
import { Calendar } from "./index";
import { Breadcrumb, Item } from "../../components/ui";
import {
  LuChevronLeft,
  LuChevronRight,
  LuClock,
  LuUser,
  LuStethoscope,
  LuPlus,
  LuLayoutDashboard
} from "react-icons/lu";

const cx = classNames.bind(styles);

function Appointment() {
  return (
    <div className={cx("px-4 xl:px-10 pb-5", "flex flex-col h-full overflow-hidden")}>
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <LuLayoutDashboard /> },
          { label: "Lịch hẹn khám bệnh" }
        ]}
      />
      <Item as="strong" children="Lịch hẹn khám bệnh" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Xem danh sách lịch hẹn và quản lý lịch khám tại đây."
        itemClassName="text-[14px] text-gray-500"
        className="mb-5 mt-1"
      />

      <div className="flex-1 overflow-auto p-1 hidden-scrollbar">
        <div className="xl:grid grid-cols-[80%_20%] gap-5">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default Appointment;
