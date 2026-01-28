import { useState, useEffect, useMemo } from "react";
import { useActive, useSearch, useDebouncedCallback } from "../../components/hooks";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { Breadcrumb, Item, Search, Button, Modal, Filter } from "../../components/ui";
import {
  LuLayoutDashboard,
  LuChevronRight,
  LuListFilter,
  LuGrid3X3,
  LuList,
  LuPlus,
  LuCircle,
  LuSquarePen,
  LuTrash2
} from "react-icons/lu";
import { ICON_MAP } from "../../constants/icon";
import { CreateGroup, EditGroup } from "./index";
import { useGroupStore } from "../../store/groupStore";
import { slugify } from "../../utils/format";

const cx = classNames.bind(styles);

function Medical() {
  const [viewMode, setViewMode] = useState("hierarchy");
  const [keyword, setKeyword] = useState("");

  const groups = useGroupStore((gr) => gr.groups);
  const setEditingGroupId = useGroupStore((gr) => gr.setEditingGroupId);

  const modal = {
    grCreate: useActive(),
    grEdit: useActive(),
    grDel: useActive(),
    department: useActive(),
    specialty: useActive()
  };

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
      totalSpecialties
    };
  }, [groups]);

  const filtered = useSearch(groups, keyword, (gr) => {
    const groupName = gr.name;

    const departmentNames = gr.departments?.map((dept) => dept.name) || [];

    const specialtyNames = gr.departments?.flatMap((dept) => dept.specialties?.map((spec) => spec.name) || []) || [];

    return [groupName, ...departmentNames, ...specialtyNames].filter(Boolean).join(" ");
  });

  const normalizedKeyword = useMemo(() => slugify(keyword), [keyword]);

  const isMatched = (targetName) => normalizedKeyword && slugify(targetName).includes(normalizedKeyword);
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
        totalGroups={totals.totalGroups}
        totalDepartments={totals.totalDepartments}
        totalSpecialties={totals.totalSpecialties}
        viewMode={viewMode}
        onClick={changeViewMode}
        onAdd={modal.grCreate.toggleActive}
        keyword={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* Groups */}
      {viewMode === "hierarchy" && (
        <HierarchyGroups
          onEdit={modal.grEdit.toggleActive}
          groups={filtered}
          setEdit={setEditingGroupId}
          keyword={keyword}
          isMatched={isMatched}
        />
      )}
      {viewMode === "grid" && (
        <GridGroups
          onEdit={modal.grEdit.toggleActive}
          groups={filtered}
          setEdit={setEditingGroupId}
          keyword={keyword}
          isMatched={isMatched}
        />
      )}

      {/* Groups Modal */}
      <Modal open={modal.grCreate.isActive} onClose={modal.grCreate.deactivate} backdrop={true} width="max-w-lg">
        <CreateGroup onClose={modal.grCreate.deactivate} />
      </Modal>
      <Modal open={modal.grEdit.isActive} onClose={modal.grEdit.deactivate} backdrop={true} width="max-w-lg">
        <EditGroup onClose={modal.grEdit.deactivate} />
      </Modal>
    </div>
  );
}

export default Medical;

function HeaderMedical({
  totalGroups,
  totalDepartments,
  totalSpecialties,
  viewMode,
  onClick,
  onAdd,
  keyword,
  onChange
}) {
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
        <Search value={keyword} onChange={onChange} className={cx("rounded-[8px]")} />
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
            onClick={onAdd}
          />
        </div>
      </div>
    </div>
  );
}

function HierarchyGroups({ onEdit, groups, setEdit, isMatched, keyword }) {
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

    // Dùng chính danh sách 'groups' đang hiển thị để duyệt
    groups?.forEach((group) => {
      let groupShouldOpen = false;

      group.departments?.forEach((dept) => {
        // 1. Kiểm tra nếu tên Khoa khớp
        const deptMatches = slugify(dept.name).includes(searchStr);

        // 2. Kiểm tra nếu có bất kỳ Chuyên khoa nào bên trong khớp
        const hasSpecMatch = dept.specialties?.some((spec) => slugify(spec.name).includes(searchStr));

        // Nếu Khoa khớp HOẶC Chuyên khoa bên trong khớp -> Mở Khoa này
        if (deptMatches || hasSpecMatch) {
          newExpandedDepts[dept.id] = true;
          groupShouldOpen = true; // Đánh dấu là Group chứa Khoa này cũng phải mở
        }
      });

      // 3. Kiểm tra nếu chính tên Group (Khối) khớp
      const groupMatches = slugify(group.name).includes(searchStr);

      if (groupMatches || groupShouldOpen) {
        newExpandedGroups[group.id] = true;
      }
    });

    // Cập nhật state (Sử dụng ghi đè để chỉ mở những cái khớp search)
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

  return groups ? (
    groups.map((group) => {
      const departments = group.departments ?? [];
      const specialties = departments.flatMap((d) => d.specialties ?? []);
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

              <div className="flex items-center">
                <Button
                  width={40}
                  height={40}
                  iconClassName="text-sm font-bold"
                  icon={<LuSquarePen />}
                  onClick={() => {
                    setEdit(group.id);
                    onEdit();
                  }}
                />
                <Button width={40} height={40} iconClassName="text-sm font-bold" icon={<LuTrash2 />} />
                <Button width={40} height={40} iconClassName="text-sm font-bold" icon={<LuPlus />} />
              </div>
            </div>
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
                        isMatched(dept.name, keyword)
                          ? "border-[var(--color-secondary)]"
                          : "border-[var(--color-primary)]"
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

function GridGroups({ onEdit, groups, setEdit, isMatched, keyword }) {
  return groups ? (
    groups.map((group) => {
      const departments = group.departments;
      const GroupIcon = ICON_MAP[group.icon] ?? LuCircle;
      return (
        <div key={group.id} className={cx("space-y-6 my-6")}>
          <div className={cx("flex items-center justify-between")}>
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
            <div className="flex items-center">
              <Button
                width={40}
                height={40}
                iconClassName="text-sm font-bold"
                icon={<LuSquarePen />}
                onClick={() => {
                  setEdit(group.id);
                  onEdit();
                }}
              />
              <Button width={40} height={40} iconClassName="text-sm font-bold" icon={<LuTrash2 />} />
              <Button width={40} height={40} iconClassName="text-sm font-bold" icon={<LuPlus />} />
            </div>
          </div>
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
                            "bg-white rounded-[8px] p-2",
                            "flex items-center justify-between",
                            "hover:bg-[var(--color-primary-100)]",
                            "group"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <div className={cx("w-2 h-2 rounded-full bg-[var(--color-primary)]")} />
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
    })
  ) : (
    <div className="flex items-center justify-center p-10">
      <Item as="div" children={"Danh sách rỗng"} />
    </div>
  );
}
