// Libraries
import { lazy, Suspense } from "react";
import classNames from "classnames/bind";
// Styles - UI
import { Item } from "../../components/ui";
import style from "../../styles/pages.module.css";
import {
  OverviewStatistics,
  DoctorStatistics,
  AppointmentActivity,
  PatientActivity,
  PatientPercentage,
} from ".";
const PatientStatistics = lazy(() => import("./PatientStatistics"));
const AppointmentStatistics = lazy(() => import("./AppointmentStatistics"));

const cx = classNames.bind(style);

function Dashboard() {
  return (
    <div className="px-4 xl:px-10 pb-5">
      <Item
        as="strong"
        children="Xin chào, Guest👋"
        itemClassName="text-3xl"
        width="100%"
      />
      {/* <Item
        as="span"
        children="Bảng điều khiển quản trị bệnh viện."
        itemClassName="text-xl text-gray-500 mt-2"
        width="100%"
      />
      <div className={cx("xl:grid grid-cols-[70%_30%] gap-5")}>
        <div>
          <OverviewStatistics />
          <Suspense fallback={<ChartSkeleton />}>
            <PatientStatistics />
          </Suspense>
        </div>

        <Suspense fallback={<ChartSkeleton />}>
          <AppointmentStatistics />
        </Suspense>
      </div>

      <div className="xl:grid grid-cols-[70%_30%] gap-5">
        <DoctorStatistics />
        <AppointmentActivity />
      </div>

      <div className={cx("xl:grid grid-cols-[50%_50%] gap-5")}>
        <PatientActivity />
        <PatientPercentage />
      </div> */}
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="bg-white rounded-[8px] p-6 animate-pulse">
      <div className="h-[400px] bg-gray-200 rounded"></div>
    </div>
  );
}

export default Dashboard;
