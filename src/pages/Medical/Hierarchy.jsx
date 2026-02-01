import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "../../components/hooks";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Item, Button } from "../../components/ui";
import { LuChevronRight, LuPlus, LuCircle, LuSquarePen, LuTrash2 } from "react-icons/lu";
import { ICON_MAP } from "../../constants/icon";
import { slugify } from "../../utils/format";
import { EntityActionBar } from "./index";

const cx = classNames.bind(styles);

function Hierarchy({
  onDeptCreate,
  onGrEdit,
  onGrDel,
  group,
  groupIcon,
  departments,
  specialties,
  setEdit,
  isMatched,
  keyword
}) {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [expandedDepartments, setExpandedDepartments] = useState({});

  const handleAutoExpand = useDebouncedCallback((currentKeyword) => {
    if (!currentKeyword.trim()) {
      setExpandedGroups({});
      setExpandedDepartments({});
      return;
    }

    const searchStr = slugify(currentKeyword);
    const newExpandedGroups = {};
    const newExpandedDepts = {};

    let groupShouldOpen = false;

    group.departments?.forEach((dept) => {
      const deptMatches = slugify(dept.name).includes(searchStr);

      const hasSpecMatch = dept.specialties?.some((spec) => slugify(spec.name).includes(searchStr));

      if (deptMatches || hasSpecMatch) {
        newExpandedDepts[dept.id] = true;
        groupShouldOpen = true;
      }
    });

    const groupMatches = slugify(group.name).includes(searchStr);

    if (groupMatches || groupShouldOpen) {
      newExpandedGroups[group.id] = true;
    }

    setExpandedGroups(newExpandedGroups);
    setExpandedDepartments(newExpandedDepts);
  }, 300);

  // 2. Lắng nghe keyword thay đổi
  useEffect(() => {
    handleAutoExpand(keyword);
  }, [keyword, handleAutoExpand]);

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };
  const toggleDepartment = (departmentId) => {
    setExpandedDepartments((prev) => ({ ...prev, [departmentId]: !prev[departmentId] }));
  };

  return (
    <div className="mb-6 overflow-hidden rounded-[8px]" style={{ boxShadow: "var(--shadow)" }}>
      <div className={cx("bg-white")}>
        {/* Groups */}
        <EntityActionBar
          onDeptCreate={onDeptCreate}
          onGrEdit={onGrEdit}
          onGrDel={onGrDel}
          setEdit={setEdit}
          groupId={group.id}
          className={cx("flex items-center justify-between", "bg-[var(--color-primary)] p-6 text-white")}
        >
          <div className={cx("flex items-center gap-2 sm:gap-5")}>
            <Button
              onClick={() => toggleGroup(group.id)}
              icon={<LuChevronRight />}
              className={expandedGroups[group.id] ? "rotate-90 transition-transform" : "transition-transform"}
              width={40}
              height={40}
            />
            <Item
              as="div"
              icon={groupIcon}
              className={cx(
                "p-3 bg-[var(--color-bg-light-primary-100)] rounded-[8px]",
                "text-[var(--color-primary)] text-2xl"
              )}
            />
            <div className={cx("")}>
              <Item as="strong" children={`Khối ${group.name}`} itemClassName={cx("text-md sm:text-lg")} />
              <Item
                as="div"
                children={`${departments?.length} Khoa • ${specialties.length} Chuyên khoa`}
                itemClassName={cx("text-[12px] sm:text-sm")}
              />
            </div>
          </div>
        </EntityActionBar>
        {/* Departments */}
        {expandedGroups[group.id] && (
          <div className="p-6 space-y-4">
            {departments.map((dept) => {
              const DeptIcon = ICON_MAP[dept.icon] ?? LuCircle;
              return (
                <div
                  key={dept.id}
                  className={cx(
                    "overflow-hidden rounded-[8px] border-2",
                    isMatched(dept.name, keyword) ? "border-[var(--color-secondary)]" : "border-[var(--color-primary)]"
                  )}
                >
                  <div
                    className={cx(
                      isMatched(dept.name, keyword)
                        ? "bg-[var(--color-secondary-200)]"
                        : "bg-[var(--color-primary-200)]"
                    )}
                  >
                    <div
                      className={cx(
                        "flex items-center justify-between",
                        "p-4",
                        isMatched(dept.name, keyword)
                          ? "bg-[var(--color-secondary-100)]"
                          : "bg-[var(--color-primary-100)]"
                      )}
                    >
                      <div className={cx("flex items-center gap-2")}>
                        <Button
                          onClick={() => toggleDepartment(dept.id)}
                          icon={<LuChevronRight />}
                          className={
                            expandedDepartments[dept.id] ? "rotate-90 transition-transform" : "transition-transform"
                          }
                          width={40}
                          height={40}
                        />
                        <Item
                          as="div"
                          icon={<DeptIcon />}
                          className={cx(
                            "p-3 text-2xl",
                            isMatched(dept.name, keyword)
                              ? "text-[var(--color-secondary)]"
                              : "text-[var(--color-primary)]"
                          )}
                        />
                        <div className={cx("")}>
                          <Item as="span" children={dept.name} itemClassName={cx("text-md sm:text-md font-medium")} />
                          <Item
                            as="div"
                            children={`${dept.specialties.length} Chuyên khoa`}
                            itemClassName={cx("text-[12px]")}
                          />
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Button
                          width={40}
                          height={40}
                          iconClassName={cx(
                            "text-sm font-bold ",
                            isMatched(dept.name, keyword)
                              ? "text-[var(--color-secondary-500)]"
                              : "text-[var(--color-primary-500)]"
                          )}
                          icon={<LuSquarePen />}
                        />
                        <Button
                          width={40}
                          height={40}
                          iconClassName={cx(
                            "text-sm font-bold",
                            isMatched(dept.name, keyword)
                              ? "text-[var(--color-secondary-500)]"
                              : "text-[var(--color-primary-500)]"
                          )}
                          icon={<LuTrash2 />}
                        />
                        <Button
                          width={40}
                          height={40}
                          iconClassName={cx(
                            "text-sm font-bold",
                            isMatched(dept.name, keyword)
                              ? "text-[var(--color-secondary-500)]"
                              : "text-[var(--color-primary-500)]"
                          )}
                          icon={<LuPlus />}
                        />
                      </div>
                    </div>

                    {/* Specialties */}
                    {expandedDepartments[dept.id] && (
                      <div className="p-4 space-y-3">
                        {dept.specialties.length > 0 ? (
                          dept.specialties.map((spec) => (
                            <div
                              key={spec.id}
                              className={cx(
                                " rounded-[8px] py-2 px-4",
                                "flex items-center justify-between",
                                "group",
                                isMatched(spec?.name, keyword) ? "bg-[var(--color-secondary-100)]" : "bg-white"
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={cx(
                                    "w-2 h-2 rounded-full",
                                    isMatched(dept.name, keyword) || isMatched(spec?.name, keyword)
                                      ? "bg-[var(--color-secondary)]"
                                      : "bg-[var(--color-primary)]"
                                  )}
                                />
                                <Item
                                  as="span"
                                  children={spec.name}
                                  itemClassName={cx(
                                    "text-sm font-medium",
                                    isMatched(spec?.name, keyword)
                                      ? "text-[var(--color-secondary)]"
                                      : "text-[var(--color-text-bg-light-primary)]"
                                  )}
                                />
                              </div>
                              <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  width={40}
                                  height={40}
                                  iconClassName="text-sm font-bold text-[var(--color-secondary)]"
                                  icon={<LuSquarePen />}
                                />
                                <Button
                                  width={40}
                                  height={40}
                                  iconClassName="text-sm font-bold text-[var(--color-error)]"
                                  icon={<LuTrash2 />}
                                />
                              </div>
                            </div>
                          ))
                        ) : (
                          <Item as="div" children={"Không có chuyên khoa"} itemClassName={cx("text-sm font-medium")} />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Hierarchy);
