import React, { useState, useEffect } from "react";
import { useDebouncedCallback } from "../../components/hooks";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Item, Button } from "../../components/ui";
import { LuChevronRight, LuPlus, LuCircle, LuSquarePen, LuTrash2 } from "react-icons/lu";
import { ICON_MAP } from "../../constants/icon";
import { slugify } from "../../utils/format";
import { EntityActionBar, DeptActionBar, SpecActionBar } from "./index";

const cx = classNames.bind(styles);

function Hierarchy({
  //Handle Specialty
  onSpecCreate,
  onSpecEdit,
  setSpecEdit,
  onSpecDel,
  // Handle Department
  onDeptCreate,
  onDeptEdit,
  setDeptEdit,
  onDeptDel,
  // Handle Group
  onGrEdit,
  onGrDel,
  group,
  groupIcon,
  departments,
  specialties,
  setEdit,
  isMatched,
  keyword,
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
    setExpandedDepartments((prev) => ({
      ...prev,
      [departmentId]: !prev[departmentId],
    }));
  };

  return (
    <div className="mb-6">
      <div className={cx("")}>
        {/* Groups */}
        <EntityActionBar
          onDeptCreate={onDeptCreate}
          setDeptEdit={setDeptEdit}
          onGrEdit={onGrEdit}
          onGrDel={onGrDel}
          setEdit={setEdit}
          groupId={group.id}
          onClick={() => toggleGroup(group.id)}
          className={cx(
            "flex items-center justify-between rounded-2xl",
            "bg-linear-[var(--color-ln-primary)] py-3.5 px-5 text-white",
          )}
        >
          <div className={cx("flex items-center gap-3")}>
            <Button
              icon={<LuChevronRight />}
              className={cx(
                expandedGroups[group.id] ? "rotate-90 transition-transform" : "transition-transform",
                "text-[14px]",
              )}
              width={"auto"}
              height={40}
            />
            <Item
              as="div"
              icon={groupIcon}
              className={cx(
                "w-[40px] h-[40px] bg-white/20 rounded-xl",
                "flex items-center justify-center text-white text-[18px]",
              )}
            />
            <div className={cx("")}>
              <Item as="strong" children={`Khối ${group.name}`} itemClassName={cx("text-[15px]")} />
              <Item
                as="div"
                children={`${departments?.length} Khoa • ${specialties.length} Chuyên khoa`}
                itemClassName={cx("text-[11.5px]")}
              />
            </div>
          </div>
        </EntityActionBar>
        {/* Departments */}
        {expandedGroups[group.id] && (
          <div className="ml-[20px] mt-[6px] space-y-[6px]">
            {departments.map((dept) => {
              const DeptIcon = ICON_MAP[dept.icon] ?? LuCircle;
              return (
                <div key={dept.id} className={cx("overflow-hidden rounded-xl")} style={{ boxShadow: "var(--shadow)" }}>
                  <div className={cx(isMatched(dept.name, keyword) ? "bg-[var(--color-secondary-200)]" : "bg-white")}>
                    <DeptActionBar
                      groupId={group.id}
                      deptId={dept.id}
                      // Handle Specialty
                      onSpecCreate={onSpecCreate}
                      // Handle Department
                      onDeptEdit={onDeptEdit}
                      setDeptEdit={setDeptEdit}
                      // Handle Group
                      setGrEdit={setEdit}
                      onDeptDel={onDeptDel}
                      isMatched={isMatched}
                      keyword={keyword}
                      deptName={dept.name}
                      className={cx(
                        "flex items-center justify-between",
                        "py-3 px-4",

                        expandedDepartments[dept.id] && "border-b border-[var(--color-unavailable-100)]",
                        isMatched(dept.name, keyword) ? "bg-[var(--color-secondary-100)]" : "bg-white",
                      )}
                      onClick={() => toggleDepartment(dept.id)}
                    >
                      <div className={cx("flex items-center gap-2")}>
                        <Button
                          icon={<LuChevronRight />}
                          className={cx(
                            expandedDepartments[dept.id] ? "rotate-90 transition-transform" : "transition-transform",
                            "text-[8px]",
                          )}
                          width={"auto"}
                          height={30}
                        />
                        <Item
                          as="div"
                          icon={<DeptIcon />}
                          className={cx(
                            "flex items-center justify-center",
                            "text-[13px] w-[30px] h-[30px] rounded-lg",
                            isMatched(dept.name, keyword)
                              ? "text-[var(--color-secondary)]"
                              : "text-[var(--color-primary)] bg-[var(--color-primary)]/10",
                          )}
                        />
                        <div className={cx("")}>
                          <Item as="span" children={dept.name} itemClassName={cx("text-[13px] font-bold")} />
                          <Item
                            as="div"
                            children={`${dept.specialties.length} Chuyên khoa`}
                            itemClassName={cx("text-[10.5px] text-[var(--color-unavailable-700)]")}
                          />
                        </div>
                      </div>
                    </DeptActionBar>

                    {/* Specialties */}
                    {expandedDepartments[dept.id] && (
                      <div className="px-4 py-2 space-y-[4px]">
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
                                " rounded-lg py-2 px-2.5 border border-[var(--color-primary)]/10",
                                "flex items-center justify-between",
                                "group hover:bg-[var(--color-primary)]/10",
                                isMatched(spec?.name, keyword)
                                  ? "bg-[var(--color-secondary-100)]"
                                  : "bg-[var(--color-primary)]/3 ",
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={cx(
                                    "w-1 h-1 rounded-full",
                                    isMatched(dept.name, keyword) || isMatched(spec?.name, keyword)
                                      ? "bg-[var(--color-secondary)]"
                                      : "bg-[var(--color-primary-700)]",
                                  )}
                                />
                                <Item
                                  as="span"
                                  children={spec.name}
                                  itemClassName={cx(
                                    "text-[12.5px] font-bold",
                                    isMatched(spec?.name, keyword) ? "text-[var(--color-secondary)]" : "text-black/70",
                                  )}
                                />
                              </div>
                            </SpecActionBar>
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
