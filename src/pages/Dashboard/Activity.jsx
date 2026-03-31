import React, { useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Item } from "../../components/ui";
import { useActivityStore } from "../../store/activityStore";
import { ACTION_CONFIG } from "../../mock/activity";

const cx = classNames.bind(style);

function Activity() {
  const { fetchActivities, getRecentActivities } = useActivityStore();
  const activities = useActivityStore((s) => s.activities);

  const recentActivities = useMemo(() => {
    return activities
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [activities]);

  const firstActivity = recentActivities[0];
  const formatted = firstActivity?.createdAt ? new Date(firstActivity.createdAt).toLocaleDateString("vi-VN") : "";

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <section className={cx("bg-white rounded-2xl px-6 py-5.5 ")} style={{ boxShadow: "var(--shadow)" }}>
      {/* Header */}
      <div className={cx("flex items-center justify-between mb-[16px]")}>
        <div>
          <Item as="h2" children={"Hoạt động gần đây"} itemClassName={cx("text-[15px] font-black leading-5")} />
          <Item
            children={`Hôm nay, ${formatted}`}
            itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]/70 font-medium")}
            className={cx("mt-[2px] leading-3")}
          />
        </div>
      </div>

      {/* Activity Log */}
      {recentActivities.map((act) => {
        const config = ACTION_CONFIG[act.action];
        const meta = act.meta;
        return (
          <div
            key={act.id}
            className={cx("flex items-center gap-2 py-2.5", "border-b border-[var(--color-unavailable-100)]")}
          >
            <Item
              icon={config.icon}
              iconClassName={cx("text-[14px]")}
              className={cx("w-[34px] h-[34px] rounded-lg flex items-center justify-center")}
              style={{ color: config.color, background: config.light }}
            />

            <div className="flex-1">
              <Item children={config.label} itemClassName={cx("text-[12.5px] font-bold")} />
              <Item
                children={config.renderMeta?.(act.meta) || ""}
                itemClassName={cx("text-[10.5px] text-[var(--color-unavailable-700)]")}
              />
            </div>

            <Item
              children={
                act?.createdAt
                  ? new Date(act.createdAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : ""
              }
              itemClassName={cx("text-[10px] text-[var(--color-unavailable-700)]")}
              className={cx("")}
            />
          </div>
        );
      })}
    </section>
  );
}

export default React.memo(Activity);
