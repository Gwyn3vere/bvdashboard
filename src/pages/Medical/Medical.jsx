import { useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { List, Breadcrumb, Item, Search, Checkbox, Avatar, Button, Modal, Filter } from "../../components/ui";
import {
  LuLayoutDashboard,
  LuChevronRight,
  LuListFilter,
  LuGrid3X3,
  LuList,
  LuPlus,
  LuEllipsisVertical,
  LuCircle
} from "react-icons/lu";
import { ICON_MAP } from "../../constants/icon";
import { MOCK_GROUPS_LIST } from "../../mock/groups";

const cx = classNames.bind(styles);

function Medical() {
  const [viewMode, setViewMode] = useState("hierarchy");
  const changeViewMode = () => {
    setViewMode((prev) => (prev === "hierarchy" ? "grid" : "hierarchy"));
  };
  return (
    <div className={TWCSS.container}>
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <LuLayoutDashboard /> },
          { label: "Quản lý chuyên môn" }
        ]}
      />
      <Item as="strong" children="Quản lý chuyên môn" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Quản lý danh sách chuyên môn tại đây."
        itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
      />

      {/* Header */}
      <HeaderMedical
        totalGroups={3}
        totalDepartments={6}
        totalSpecialties={11}
        viewMode={viewMode}
        onClick={changeViewMode}
      />

      {/* Groups dropdown */}
      {viewMode === "hierarchy" && <HierarchyGroups />}
      {viewMode === "grid" && <GridGroups />}
    </div>
  );
}

export default Medical;

function HeaderMedical({ totalGroups, totalDepartments, totalSpecialties, viewMode, onClick }) {
  return (
    <div className={cx("flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-2 mb-4")}>
      <div className="flex items-center gap-5 w-full">
        <div className={cx("flex flex-col")}>
          <Item as="h3" children={totalGroups} itemClassName={cx("text-3xl font-bold text-[var(--color-primary)]")} />
          <Item as="span" children={"Khối"} itemClassName={cx("text-sm")} />
        </div>
        <div className={cx("flex flex-col")}>
          <Item
            as="h3"
            children={totalDepartments}
            itemClassName={cx("text-3xl font-bold text-[var(--color-primary)]")}
          />
          <Item as="span" children={"Khoa"} itemClassName={cx("text-sm")} />
        </div>
        <div className={cx("flex flex-col")}>
          <Item
            as="h3"
            children={totalSpecialties}
            itemClassName={cx("text-3xl font-bold text-[var(--color-primary)]")}
          />
          <Item as="span" children={"Chuyên khoa"} itemClassName={cx("text-sm")} />
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-2 w-full">
        <Search className={cx("rounded-[8px]")} />
        <div className="flex gap-2">
          <Button
            icon={<LuListFilter />}
            children="Bộ lọc"
            width="auto"
            iconClassName="text-[20px]"
            btnClassName={cx("hidden md:inline")}
            className={cx(
              "gap-2 text-[14px] px-3 rounded-[8px] font-medium",
              " border-2 border-[var(--color-bg-light-primary-300)] cursor-pointer"
            )}
          />
          <Button
            icon={viewMode === "grid" ? <LuList /> : <LuGrid3X3 />}
            children={viewMode === "grid" ? "Phân cấp" : "Dạng lưới"}
            width="auto"
            onClick={onClick}
            iconClassName="text-[20px]"
            btnClassName={cx("hidden md:inline")}
            className={cx(
              "gap-2 text-[14px] px-3 rounded-[8px] font-medium",
              " border-2 border-[var(--color-bg-light-primary-300)] cursor-pointer"
            )}
          />
          <Button
            width={"auto"}
            icon={<LuPlus />}
            children={"Thêm khối"}
            className={cx(
              "text-white font-semibold",
              "flex items-center justify-between gap-2",
              "bg-[var(--color-primary)] text-[14px] px-3"
            )}
          />
        </div>
      </div>
    </div>
  );
}

function HierarchyGroups({}) {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [expandedDepartments, setExpandedDepartments] = useState({});

  const toggleGroup = (groupId) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };
  const toggleDepartment = (departmentId) => {
    setExpandedDepartments((prev) => ({ ...prev, [departmentId]: !prev[departmentId] }));
  };

  return MOCK_GROUPS_LIST ? (
    MOCK_GROUPS_LIST.map((group) => {
      const departments = group.departments;
      const specialties = departments.flatMap((item) => item.specialties);
      const GroupIcon = ICON_MAP[group.icon] ?? LuCircle;

      return (
        <div key={group.id} className="mb-6 overflow-hidden rounded-[8px]" style={{ boxShadow: "var(--shadow)" }}>
          <div className={cx("bg-white")}>
            {/* Groups */}
            <div className={cx("flex items-center justify-between", "bg-[var(--color-primary)] p-6 text-white")}>
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
                  icon={<GroupIcon />}
                  className={cx(
                    "p-3 bg-[var(--color-bg-light-primary-100)] rounded-[8px]",
                    "text-[var(--color-primary)] text-2xl"
                  )}
                />
                <div className={cx("")}>
                  <Item as="strong" children={group.name} itemClassName={cx("text-md sm:text-lg")} />
                  <Item
                    as="div"
                    children={`${departments?.length} Khoa • ${specialties.length} Chuyên khoa`}
                    itemClassName={cx("text-[12px] sm:text-sm")}
                  />
                </div>
              </div>

              <Button
                icon={<LuPlus />}
                children={"Thêm mới"}
                width={"auto"}
                className={cx(
                  "px-4 py-2 bg-[var(--color-bg-light-primary-100)] text-[var(--color-primary)] font-semibold",
                  "flex items-center gap-2 text-sm sm:text-md"
                )}
              />
            </div>
            {/* Departments */}
            {expandedGroups[group.id] && (
              <div className="p-6 space-y-4">
                {departments.map((dept) => {
                  const DeptIcon = ICON_MAP[dept.icon] ?? LuCircle;
                  return (
                    <div
                      key={dept.id}
                      className={cx("overflow-hidden rounded-[8px] border-2 border-[var(--color-primary)]")}
                    >
                      <div className={cx("bg-[var(--color-primary-200)]")}>
                        <div className={cx("flex items-center justify-between", "p-4 bg-[var(--color-primary-100)]")}>
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
                              className={cx("p-3 text-[var(--color-primary)] text-2xl")}
                            />
                            <div className={cx("")}>
                              <Item
                                as="span"
                                children={dept.name}
                                itemClassName={cx("text-md sm:text-md font-medium")}
                              />
                              <Item
                                as="div"
                                children={`${dept.specialties.length} Chuyên khoa`}
                                itemClassName={cx("text-[12px]")}
                              />
                            </div>
                          </div>

                          <Button
                            icon={<LuEllipsisVertical />}
                            width={40}
                            height={40}
                            className={cx(
                              "text-[var(--color-primary)] transition-all duration-300",
                              "hover:bg-[var(--color-primary-200)]"
                            )}
                          />
                        </div>

                        {/* Specialties */}
                        {expandedDepartments[dept.id] && (
                          <div className="p-4 space-y-3">
                            {dept.specialties.length > 0 ? (
                              dept.specialties.map((spec) => (
                                <div
                                  key={spec.id}
                                  className={cx(
                                    "bg-white rounded-[8px] py-2 px-4",
                                    "flex items-center justify-between"
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className={cx("w-2 h-2 rounded-full bg-[var(--color-primary)]")} />
                                    <Item as="span" children={spec.name} itemClassName={cx("text-sm font-medium")} />
                                  </div>
                                  <Button
                                    icon={<LuEllipsisVertical />}
                                    width={30}
                                    height={40}
                                    className={cx(
                                      "text-[var(--color-primary)] transition-all duration-300",
                                      "hover:bg-[var(--color-primary-100)]"
                                    )}
                                  />
                                </div>
                              ))
                            ) : (
                              <Item as="div" children={"Không có chuyên khoa"} />
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
    })
  ) : (
    <div className="flex items-center justify-center p-10">
      <Item as="div" children={"Danh sách rỗng"} itemClassName={cx("text-sm font-medium")} />
    </div>
  );
}

function GridGroups({}) {
  return MOCK_GROUPS_LIST ? (
    MOCK_GROUPS_LIST.map((group) => {
      const departments = group.departments;
      const GroupIcon = ICON_MAP[group.icon] ?? LuCircle;
      return (
        <div key={group.id} className={cx("space-y-6 my-6")}>
          <Item
            icon={<GroupIcon />}
            children={group.name}
            iconClassName={cx(
              "p-3 bg-[var(--color-primary-100)] rounded-[8px]",
              "text-[var(--color-primary)] text-2xl"
            )}
            itemClassName={cx("text-xl font-semibold")}
            className={cx("flex items-center gap-2")}
          />
          <div className={cx("grid grid-cols-1 md:grid-cols-3 gap-3")}>
            {departments.map((dept) => {
              const DeptIcon = ICON_MAP[dept.icon] ?? LuCircle;
              return (
                <div key={dept.id} className={cx("bg-white rounded-[8px] p-6")} style={{ boxShadow: "var(--shadow)" }}>
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
                    <Button
                      icon={<LuEllipsisVertical />}
                      width={30}
                      height={40}
                      className={cx(
                        "text-[var(--color-primary)] transition-all duration-300",
                        "hover:bg-[var(--color-primary-100)]"
                      )}
                    />
                  </div>
                  <div className="py-2">
                    {dept.specialties.length > 0 ? (
                      dept.specialties.map((spec) => (
                        <div
                          key={spec.id}
                          className={cx("bg-white rounded-[8px] py-2", "flex items-center justify-between")}
                        >
                          <div className="flex items-center gap-2">
                            <div className={cx("w-2 h-2 rounded-full bg-[var(--color-primary)]")} />
                            <Item as="span" children={spec.name} itemClassName={cx("text-sm font-medium")} />
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
    })
  ) : (
    <div className="flex items-center justify-center p-10">
      <Item as="div" children={"Danh sách rỗng"} />
    </div>
  );
}
