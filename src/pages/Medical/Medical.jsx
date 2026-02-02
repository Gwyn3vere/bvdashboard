import { useState, useMemo, useCallback, useEffect } from "react";
import { useActive, useSearch, useGroupTree } from "../../components/hooks";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { Breadcrumb, Item, Search, Button, Modal } from "../../components/ui";
import { LuLayoutDashboard, LuListFilter, LuGrid3X3, LuList, LuPlus, LuCircle } from "react-icons/lu";
import { ICON_MAP } from "../../constants/icon";
import { Delete, Hierarchy, Grid, HeaderMedical, GroupForm, DeptForm, SpecForm } from "./index";
import { useGroupStore } from "../../store/groupStore";
import { useDepartmentStore } from "../../store/departmentStore";
import { useSpecialtyStore } from "../../store/specialtyStore";
import { slugify } from "../../utils/format";

const cx = classNames.bind(styles);

function Medical() {
  const [viewMode, setViewMode] = useState("hierarchy");
  const [keyword, setKeyword] = useState("");

  const groups = useGroupTree();

  // Group Store
  const setEditingGroupId = useGroupStore((gr) => gr.setEditingGroupId);
  const editingGroupId = useGroupStore((gr) => gr.editingGroupId);
  const selectedGroup = useGroupStore((s) => s.groups.find((g) => g.id === editingGroupId));
  // Department Store
  const setEditingDepartmentId = useDepartmentStore((d) => d.setEditingDepartmentId);
  const editingDepartmentId = useDepartmentStore((d) => d.editingDepartmentId);
  const selectedDepartment = useDepartmentStore((d) => d.departments.find((d) => d.id === editingDepartmentId));
  // Specialty Store
  const setEditingSpecialtyId = useSpecialtyStore((s) => s.setEditingSpecialtyId);
  const editingSpecialtyId = useSpecialtyStore((s) => s.editingSpecialtyId);
  const selectedSpecialty = useSpecialtyStore((s) => s.specialties.find((s) => s.id === editingSpecialtyId));

  const modal = {
    grForm: useActive(),
    grDel: useActive(),
    deptForm: useActive(),
    deptDel: useActive(),
    specForm: useActive(),
    specDel: useActive()
  };
  const handleClose = () => {
    if (modal.grForm.isActive) {
      modal.grForm.deactivate();
    } else if (modal.deptForm.isActive) {
      setEditingDepartmentId(null);
      modal.deptForm.deactivate();
    } else {
      setEditingSpecialtyId(null);
      setEditingDepartmentId(null);
      modal.specForm.deactivate();
    }
    setEditingGroupId(null);
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
  const isMatched = useCallback(
    (targetName) => !!normalizedKeyword && slugify(targetName).includes(normalizedKeyword),
    [normalizedKeyword]
  );
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
        onAdd={modal.grForm.toggleActive}
        keyword={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      {/* Groups */}
      {filtered ? (
        filtered.map((group) => {
          const departments = group.departments ?? [];
          const specialties = departments.flatMap((d) => d.specialties ?? []);
          const GroupIcon = ICON_MAP[group.icon] ?? LuCircle;
          return (
            <div key={group.id}>
              {viewMode === "hierarchy" && (
                <Hierarchy
                  // Modal Specialty
                  onSpecCreate={modal.specForm.toggleActive}
                  onSpecEdit={modal.specForm.toggleActive}
                  setSpecEdit={setEditingSpecialtyId}
                  onSpecDel={modal.specDel.toggleActive}
                  // Modal Department
                  onDeptCreate={modal.deptForm.toggleActive}
                  onDeptEdit={modal.deptForm.toggleActive}
                  setDeptEdit={setEditingDepartmentId}
                  onDeptDel={modal.deptDel.toggleActive}
                  // Modal Group
                  onGrEdit={modal.grForm.toggleActive}
                  setEdit={setEditingGroupId}
                  onGrDel={modal.grDel.toggleActive}
                  group={group}
                  groupIcon={<GroupIcon />}
                  departments={departments}
                  specialties={specialties}
                  keyword={keyword}
                  isMatched={isMatched}
                />
              )}
              {viewMode === "grid" && (
                <Grid
                  // Modal Specialty
                  onSpecCreate={modal.specForm.toggleActive}
                  onSpecEdit={modal.specForm.toggleActive}
                  setSpecEdit={setEditingSpecialtyId}
                  onSpecDel={modal.specDel.toggleActive}
                  // Modal Department
                  onDeptCreate={modal.deptForm.toggleActive}
                  onDeptEdit={modal.deptForm.toggleActive}
                  setDeptEdit={setEditingDepartmentId}
                  onDeptDel={modal.deptDel.toggleActive}
                  // Modal Group
                  onGrEdit={modal.grForm.toggleActive}
                  setEdit={setEditingGroupId}
                  onGrDel={modal.grDel.toggleActive}
                  group={group}
                  groupIcon={<GroupIcon />}
                  departments={departments}
                  keyword={keyword}
                  isMatched={isMatched}
                />
              )}
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center p-10">
          <Item as="div" children={"Danh sách rỗng"} itemClassName={cx("text-sm font-medium")} />
        </div>
      )}

      {/* Groups Modal */}
      <Modal open={modal.grForm.isActive} onClose={handleClose} backdrop={true} width="max-w-lg">
        <GroupForm onClose={handleClose} />
      </Modal>
      <Modal open={modal.grDel.isActive} onClose={modal.grDel.deactivate} backdrop={true} width="max-w-lg">
        <Delete
          onClose={modal.grDel.deactivate}
          title={
            <span>
              Hành động này sẽ xoá <span className="text-[var(--color-error)]">Khối {selectedGroup?.name}</span> và toàn
              bộ <span className="text-[var(--color-secondary)]">Khoa</span>,
              <span className="text-[var(--color-secondary)]"> Chuyên khoa</span> thuộc khối này! Bạn có muốn tiếp tục?
            </span>
          }
        />
      </Modal>
      {/* Department Modal */}
      <Modal open={modal.deptForm.isActive} onClose={handleClose} backdrop={true} width="max-w-lg">
        <DeptForm onClose={handleClose} />
      </Modal>
      <Modal open={modal.deptDel.isActive} onClose={modal.deptDel.deactivate} backdrop={true} width="max-w-lg">
        <Delete
          onClose={modal.deptDel.deactivate}
          title={
            <span>
              Hành động này sẽ xoá <span className="text-[var(--color-error)]">{selectedDepartment?.name}</span> và toàn
              bộ <span className="text-[var(--color-secondary)]">Chuyên khoa</span> thuộc khoa này! Bạn có muốn tiếp
              tục?
            </span>
          }
        />
      </Modal>
      {/* Specialty Modal */}
      <Modal open={modal.specForm.isActive} onClose={handleClose} backdrop={true} width="max-w-lg">
        <SpecForm onClose={handleClose} />
      </Modal>
      <Modal open={modal.specDel.isActive} onClose={modal.specDel.deactivate} backdrop={true} width="max-w-lg">
        <Delete
          onClose={modal.specDel.deactivate}
          title={
            <span>
              Hành động này sẽ xoá chuyên khoa{" "}
              <span className="text-[var(--color-error)]">{selectedSpecialty?.name}</span> ra khỏi danh sách thuộc{" "}
              <span className="text-[var(--color-secondary)]">{selectedDepartment?.name}</span>! Bạn có muốn tiếp tục?
            </span>
          }
        />
      </Modal>
    </div>
  );
}

export default Medical;
