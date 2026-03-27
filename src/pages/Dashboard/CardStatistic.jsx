import React, { useEffect } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Item } from "../../components/ui";
import { LuActivity, LuCalendar, LuFileText, LuUsers } from "react-icons/lu";
import { useStaffStore } from "../../store/staffStore";
import { useDoctorStore } from "../../store/doctorStore";
import { useAppointmentStore } from "../../store/appointmentStore";
import { useNewsStore } from "../../store/newsStore";
import { useCountUp } from "../../components/hooks";

const cx = classNames.bind(style);

function AnimatedNumber({ value }) {
  const animated = useCountUp(value);

  return <>{animated.toLocaleString()}</>;
}

function CardStatistic() {
  const { staffs, fetchStaffs } = useStaffStore();
  const { doctors, fetchDoctors } = useDoctorStore();
  const { news, fetchNews } = useNewsStore();
  const { getWeekStats } = useAppointmentStore();

  const { weekStats, days } = getWeekStats(0);
  const today = days.find((d) => d.isToday);

  const activeStaff = staffs.reduce((acc, cur) => {
    if (acc[cur.featured]) {
      acc[cur.featured] = acc[cur.featured] + 1;
    } else {
      acc[cur.featured] = 1;
    }
    return acc;
  }, {});
  const activeDoctor = doctors.reduce((acc, cur) => {
    if (acc[cur.featured]) {
      acc[cur.featured] = acc[cur.featured] + 1;
    } else {
      acc[cur.featured] = 1;
    }
    return acc;
  }, {});
  const pendingNews = news.reduce((acc, cur) => {
    if (acc[cur.status]) {
      acc[cur.status] = acc[cur.status] + 1;
    } else {
      acc[cur.status] = 1;
    }
    return acc;
  }, {});

  useEffect(() => {
    fetchStaffs();
    fetchDoctors();
    fetchNews();
  }, []);
  const overview = [
    {
      id: 1,
      icon: <LuUsers />,
      total: staffs.length ?? 0,
      title: "Tổng nhân sự",
      activity: `${activeStaff.true ?? 0} hoạt động`,
      grd: "var(--color-grd-primary)",
    },
    {
      id: 2,
      icon: <LuActivity />,
      total: doctors.length ?? 0,
      title: "Tổng bác sĩ",
      activity: `${activeDoctor.true ?? 0} hoạt động`,
      grd: "var(--color-grd-secondary)",
    },
    {
      id: 3,
      icon: <LuCalendar />,
      total: weekStats.total ?? 0,
      title: "Lịch hẹn tuần này",
      activity: `${today.stats.total ?? 0} lịch hôm nay`,
      grd: "var(--color-grd-purple)",
    },
    {
      id: 4,
      icon: <LuFileText />,
      total: pendingNews.PENDING ?? 0,
      title: "Bài viết chờ duyệt",
      activity: "Cần xử lý",
      grd: "var(--color-grd-warning)",
    },
  ];
  return (
    <section className={cx("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4")}>
      {overview.map((item) => (
        <div
          key={item.id}
          className={cx("cardStatistic", "relative px-6 py-5.5 rounded-3xl")}
          style={{ background: item.grd, boxShadow: "var(--shadow)" }}
        >
          <div className={cx("flex justify-between mb-[16px]")}>
            <Item
              icon={item.icon}
              iconClassName={cx("text-[22px] text-white")}
              className={cx("w-[44px] h-[44px] rounded-xl", "bg-white/20 flex items-center justify-center")}
            />
            <div className="inline-block">
              <Item
                children={item.activity}
                itemClassName={cx("text-[11px] font-bold text-white")}
                className={cx("py-[4px] px-[10px] rounded-full bg-white/20")}
              />
            </div>
          </div>

          <Item
            children={<AnimatedNumber value={item.total} />}
            itemClassName={cx("text-[36px] font-black text-white leading-none")}
          />

          <Item children={item.title} itemClassName={cx("text-[13px] font-medium text-white leading-4 mt-[5px]")} />
        </div>
      ))}
    </section>
  );
}

export default React.memo(CardStatistic);
