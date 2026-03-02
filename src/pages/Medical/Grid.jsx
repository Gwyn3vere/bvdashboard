import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/ui.module.css";
import { Item, Button } from "../../components/ui";
import { ICON_MAP } from "../../constants/icon";
import { LuPlus, LuCircle, LuSquarePen, LuTrash2 } from "react-icons/lu";
import { EntityActionBar, DeptActionBar, SpecActionBar } from "./index";
import { EXPERTISE_COLOR_SYSTEM } from "../../constants/menu";

const cx = classNames.bind(styles);

function Grid({
  groupIdx,
  // Handle Specialty
  onSpecCreate,
  onSpecEdit,
  setSpecEdit,
  onSpecDel,
  // Handle Department
  onDeptCreate,
  onDeptEdit,
  setDeptEdit,
  onDeptDel,
  // handle Group
  onGrEdit,
  onGrDel,
  group,
  setEdit,
  isMatched,
  keyword,
  departments,
  groupIcon,
}) {
  const groupColor = EXPERTISE_COLOR_SYSTEM[groupIdx % EXPERTISE_COLOR_SYSTEM.length];
  return (
    <div className={cx("my-6")}>
      {/* Groups */}
      <EntityActionBar
        onDeptCreate={onDeptCreate}
        onGrEdit={onGrEdit}
        onGrDel={onGrDel}
        setDeptEdit={setDeptEdit}
        setEdit={setEdit}
        groupId={group.id}
        className={cx("flex items-center justify-between mb-[14px]")}
        actionClassName={cx("bg-white rounded-lg shadow")}
      >
        <Item
          icon={groupIcon}
          children={`Khối ${group.name}`}
          iconClassName={cx("w-[34px] h-[34px] rounded-lg", "text-white text-[16px]")}
          itemClassName={cx("text-[15px] font-bold")}
          className={cx("flex items-center gap-2")}
          istyle={{ background: groupColor.gradient }}
        />
      </EntityActionBar>
      <div className={cx("grid grid-cols-1 md:grid-cols-3 gap-3")}>
        {departments.map((dept, idx) => {
          const DeptIcon = ICON_MAP[dept.icon] ?? LuCircle;
          return (
            <div
              key={dept.id}
              className={cx("fadeUp", "bg-white rounded-2xl p-4 border border-transparent")}
              style={{
                boxShadow: "var(--shadow)",
                border: isMatched(dept.name, keyword) && `1px solid ${groupColor.solid}`,
                animationDelay: `${Math.min(idx * 40, 400)}ms`,
              }}
            >
              <DeptActionBar
                groupId={group.id}
                deptId={dept.id}
                // Handle Specialty
                onSpecCreate={onSpecCreate}
                // Handle Department
                onDeptEdit={onDeptEdit}
                setDeptEdit={setDeptEdit}
                onDeptDel={onDeptDel}
                // Handle Group
                setGrEdit={setEdit}
                isMatched={isMatched}
                className={cx("flex items-center justify-between mb-[11px]")}
              >
                <div className="flex items-center gap-2">
                  <Item
                    as="div"
                    icon={<DeptIcon />}
                    iconClassName={cx("w-[32px] h-[32px] rounded-lg")}
                    className={cx("text-[var(--color-primary)] text-[14px]")}
                    istyle={{ color: groupColor.solid, background: groupColor.light }}
                  />
                  <div>
                    <Item as="span" children={dept.name} itemClassName={cx("text-[12.5px] font-bold")} />
                    <Item
                      as="div"
                      children={`${dept.specialties.length} Chuyên khoa`}
                      itemClassName={cx("text-[10.5px] text-[var(--color-unavailable-700)]")}
                    />
                  </div>
                </div>
              </DeptActionBar>
              <div className="">
                {dept.specialties.length > 0 ? (
                  dept.specialties.map((spec) => (
                    <SpecActionBar
                      groupId={group.id}
                      deptId={dept.id}
                      specId={spec.id}
                      // Handle Specialty
                      onSpecEdit={onSpecEdit}
                      setSpecEdit={setSpecEdit}
                      onSpecDel={onSpecDel}
                      // Handle Group
                      setGrEdit={setEdit}
                      // Handle Department
                      setDeptEdit={setDeptEdit}
                      key={spec.id}
                      className={cx(
                        "flex items-center justify-between py-[2px]",
                        "group border-b last:border-b-0 border-[var(--color-unavailable-100)]",
                      )}
                    >
                      <div className="flex items-center gap-1">
                        <div className={cx("w-1 h-1 rounded-full")} style={{ background: groupColor.solid }} />
                        <Item
                          as="span"
                          children={spec.name}
                          itemClassName={cx("text-[12px] font-medium")}
                          style={{
                            color: isMatched(spec.name, keyword) ? groupColor.text : "var(--color-unavailable-900)",
                          }}
                        />
                      </div>
                    </SpecActionBar>
                  ))
                ) : (
                  <Item as="div" children={"Không có chuyên khoa"} itemClassName={cx("text-sm font-medium")} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(Grid);
