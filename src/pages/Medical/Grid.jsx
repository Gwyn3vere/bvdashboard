import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Item, Button } from "../../components/ui";
import { ICON_MAP } from "../../constants/icon";
import { LuPlus, LuCircle, LuSquarePen, LuTrash2 } from "react-icons/lu";
import { EntityActionBar } from "./index";

const cx = classNames.bind(styles);

function Grid({ onGrEdit, onGrDel, onDeptCreate, group, setEdit, isMatched, keyword, departments, groupIcon }) {
  return (
    <div className={cx("space-y-6 my-6")}>
      {/* Groups */}
      <EntityActionBar
        onDeptCreate={onDeptCreate}
        onGrEdit={onGrEdit}
        onGrDel={onGrDel}
        setEdit={setEdit}
        groupId={group.id}
        className={cx("flex items-center justify-between")}
      >
        <Item
          icon={groupIcon}
          children={`Khối ${group.name}`}
          iconClassName={cx("p-3 bg-[var(--color-primary-100)] rounded-[8px]", "text-[var(--color-primary)] text-2xl")}
          itemClassName={cx("text-xl font-semibold")}
          className={cx("flex items-center gap-2")}
        />
      </EntityActionBar>
      <div className={cx("grid grid-cols-1 md:grid-cols-3 gap-3")}>
        {departments.map((dept) => {
          const DeptIcon = ICON_MAP[dept.icon] ?? LuCircle;
          return (
            <div
              key={dept.id}
              className={cx(
                "bg-white rounded-[8px] p-6 border-2",
                isMatched(dept.name, keyword) ? "border-[var(--color-secondary)]" : "border-transparent"
              )}
              style={{ boxShadow: "var(--shadow)" }}
            >
              <div className={cx("flex items-center justify-between")}>
                <div className="flex items-center gap-2">
                  <Item as="div" icon={<DeptIcon />} className={cx("p-2 text-[var(--color-primary)] text-2xl")} />
                  <div>
                    <Item as="span" children={dept.name} itemClassName={cx("text-md font-semibold")} />
                    <Item
                      as="div"
                      children={`${dept.specialties.length} Chuyên khoa`}
                      itemClassName={cx("text-[12px] sm:text-sm")}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    width={40}
                    height={40}
                    iconClassName="text-sm font-bold text-[var(--color-primary-500)]"
                    icon={<LuSquarePen />}
                  />
                  <Button
                    width={40}
                    height={40}
                    iconClassName="text-sm font-bold text-[var(--color-primary-500)]"
                    icon={<LuTrash2 />}
                  />
                  <Button
                    width={40}
                    height={40}
                    iconClassName="text-sm font-bold text-[var(--color-primary-500)]"
                    icon={<LuPlus />}
                  />
                </div>
              </div>
              <div className="py-2">
                {dept.specialties.length > 0 ? (
                  dept.specialties.map((spec) => (
                    <div
                      key={spec.id}
                      className={cx(
                        "rounded-[8px] p-2",
                        "flex items-center justify-between",
                        "hover:bg-[var(--color-primary-100)]",
                        "group my-1",
                        isMatched(spec.name, keyword) ? "bg-[var(--color-secondary-100)]" : "bg-white"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={cx(
                            "w-2 h-2 rounded-full",
                            isMatched(spec.name, keyword) ? "bg-[var(--color-secondary)]" : "bg-[var(--color-primary)]"
                          )}
                        />
                        <Item as="span" children={spec.name} itemClassName={cx("text-sm font-medium")} />
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          width={30}
                          height={30}
                          iconClassName="text-sm font-bold text-[var(--color-primary-500)]"
                          icon={<LuSquarePen />}
                        />
                        <Button
                          width={30}
                          height={30}
                          iconClassName="text-sm font-bold text-[var(--color-primary-500)]"
                          icon={<LuTrash2 />}
                        />
                      </div>
                    </div>
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
