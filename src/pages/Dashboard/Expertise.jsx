import React, { useMemo } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Item } from "../../components/ui";
import { useGroupTree } from "../../components/hooks";
import { LuDroplet, LuLayers3, LuZap } from "react-icons/lu";

const cx = classNames.bind(style);

function Expertise() {
  const groups = useGroupTree();

  const totals = useMemo(() => {
    let totalGroups = 0;
    let totalDepartments = 0;
    let totalSpecialties = 0;

    groups?.forEach((group) => {
      totalGroups += 1;

      const departments = group.departments ?? [];
      totalDepartments += departments.length;

      departments.forEach((dept) => {
        totalSpecialties += (dept.specialties ?? []).length;
      });
    });

    return {
      totalGroups,
      totalDepartments,
      totalSpecialties,
    };
  }, [groups]);

  return (
    <section
      className={cx("bg-[var(--color-primary-100)] rounded-2xl px-6 py-5.5 ")}
      style={{ boxShadow: "var(--shadow)" }}
    >
      {/* Header */}
      <Item
        as="h2"
        children={"Cơ cấu hệ thống"}
        itemClassName={cx("text-[15px] font-black text-[var(--color-primary-900)]")}
      />
      {/* Statistic */}
      <div className={cx("flex items-center gap-2")}>
        {/* Group */}
        <div className={cx("flex-1 py-[11px] px-2 bg-white rounded-xl")} style={{ boxShadow: "var(--shadow)" }}>
          <Item
            icon={<LuLayers3 />}
            iconClassName={cx("text-[14px] text-white")}
            className={cx(
              "w-[32px] h-[32px] bg-[var(--color-primary)] rounded-lg",
              "flex items-center justify-center mx-auto mb-[7px]",
            )}
          />
          <Item
            children={totals.totalGroups}
            itemClassName={cx("text-[20px] font-black")}
            className={cx("flex items-center justify-center")}
          />
          <Item
            children={"Khối"}
            itemClassName={cx("text-[9.5px]")}
            className={cx("flex items-center justify-center mt-[2px]")}
          />
        </div>
        {/* Department */}
        <div className={cx("flex-1 py-[11px] px-2 bg-white rounded-xl")} style={{ boxShadow: "var(--shadow)" }}>
          <Item
            icon={<LuDroplet />}
            iconClassName={cx("text-[14px] text-white")}
            className={cx(
              "w-[32px] h-[32px] bg-[var(--color-cyan)] rounded-lg",
              "flex items-center justify-center mx-auto mb-[7px]",
            )}
          />
          <Item
            children={totals.totalDepartments}
            itemClassName={cx("text-[20px] font-black")}
            className={cx("flex items-center justify-center")}
          />
          <Item
            children={"Khoa"}
            itemClassName={cx("text-[9.5px]")}
            className={cx("flex items-center justify-center mt-[2px]")}
          />
        </div>
        {/* Specialty */}
        <div className={cx("flex-1 py-[11px] px-2 bg-white rounded-xl")} style={{ boxShadow: "var(--shadow)" }}>
          <Item
            icon={<LuZap />}
            iconClassName={cx("text-[14px] text-white")}
            className={cx(
              "w-[32px] h-[32px] bg-[var(--color-purple)] rounded-lg",
              "flex items-center justify-center mx-auto mb-[7px]",
            )}
          />
          <Item
            children={totals.totalSpecialties}
            itemClassName={cx("text-[20px] font-black")}
            className={cx("flex items-center justify-center")}
          />
          <Item
            children={"Chuyên khoa"}
            itemClassName={cx("text-[9.5px]")}
            className={cx("flex items-center justify-center mt-[2px]")}
          />
        </div>
      </div>
    </section>
  );
}

export default Expertise;
