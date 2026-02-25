import classNames from "classnames/bind";
import { useState, useMemo } from "react";

import { useActive, useSearch } from "../../components/hooks";
import { useStaffStore } from "../../store/staffStore";

import { POSITION_OPTIONS, STAFF_FEATURED_OPTION } from "../../constants/option";
import { STAFF_ROLE } from "../../constants/role";

import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";

import { List, Avatar, Button, Modal, Item } from "../../components/ui";
import { LuShield, LuTrash2, LuUserPen, LuEye, LuHandshake } from "react-icons/lu";

import { ActionBar, Delete, Profile } from "../Staff";

const cx = classNames.bind(styles);

function Staff() {
  const staffs = useStaffStore((s) => s.staffs);
  const setEditingStaffId = useStaffStore((s) => s.setEditingStaffId);
  const editingStaffId = useStaffStore((s) => s.editingStaffId);

  const [staffKeyword, setStaffKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  // Lọc tầng 1
  const searchedStaff = useSearch(staffs, staffKeyword, (staff) =>
    [staff.name, staff.position, staff.role].filter(Boolean).join(" "),
  );

  // Lọc tầng 2
  const tabbedStaff = useMemo(() => {
    if (activeTab === "ALL") return searchedStaff;
    if (activeTab === "ADMIN") return searchedStaff.filter((s) => s.role === "ADMIN");
    if (activeTab === true) return searchedStaff.filter((s) => s.featured === true);
    if (activeTab === false) return searchedStaff.filter((s) => s.featured === false);
    return searchedStaff;
  }, [searchedStaff, activeTab]);

  const isEmptyData = staffs.length === 0;
  const isEmptySearch = staffs.length > 0 && searchedStaff.length === 0;

  const modal = {
    filter: useActive(),
    profile: useActive(),
    staffForm: useActive(),
    edit: useActive(),
    delete: useActive(),
  };

  const handleClose = () => {
    if (modal.staffForm.isActive) {
      modal.staffForm.deactivate();
      setEditingStaffId(null);
    }
  };

  return (
    <div className={TWCSS.container}>
      <div className={cx("bg-white rounded-2xl")} style={{ boxShadow: "var(--shadow)" }}>
        <ActionBar
          modal={modal}
          totalStaff={searchedStaff.length}
          keyword={staffKeyword}
          onChange={(e) => setStaffKeyword(e.target.value)}
          onClose={handleClose}
          featured={STAFF_FEATURED_OPTION}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <List
          name="nhân sự"
          className={TWCSS.list}
          columns={[
            {
              key: "Index",
              label: "#",
              width: "3%",
              render: (row) => (
                <Item
                  children={row.id}
                  itemClassName={cx("text-[12px] text-[var(--color-unavailable-700)]", "font-semibold")}
                />
              ),
            },
            {
              key: "Username",
              label: "Tên thành viên",
              width: "28%",
              render: (row) => (
                <div className="flex items-center gap-2">
                  <Avatar src={row.avatarUrl} name={row.name} className="rounded-full" width={38} height={38} />
                  <div>
                    <span className="font-bold text-[13.5px]">{row.name}</span>
                    <p className="text-[11px] text-[var(--color-unavailable-700)]">{row.email}</p>
                  </div>
                </div>
              ),
            },
            {
              key: "Position",
              label: "Chức vụ",
              width: "27%",
              render: (row) => {
                const positionConfig = POSITION_OPTIONS.find((item) => item.value === row.position);
                return (
                  <span className="text-[12.5px] font-semibold text-[var(--color-unavailable-900)]">
                    {positionConfig ? positionConfig.name : row.position}
                  </span>
                );
              },
            },
            {
              key: "Phone",
              label: "Liên hệ",
              width: "17%",
              render: (row) => (
                <span className="text-[12.5px] font-medium text-[var(--color-unavailable-900)]">{row.phone}</span>
              ),
            },
            {
              key: "Access",
              label: "Quyền",
              width: "16%",
              render: (row) => {
                const roleConfig = STAFF_ROLE[row.role];

                if (!roleConfig) return row.role;
                return (
                  <div className="space-y-1">
                    <Item
                      as="div"
                      icon={row.role === "ADMIN" ? <LuShield /> : <LuHandshake />}
                      children={roleConfig.label}
                      className={cx(
                        "px-2 py-1 text-[11px] rounded-full",
                        "bg-[var(--color-unavailable-100)] font-bold",
                        "flex items-center gap-1 inline-flex",
                      )}
                      style={{
                        background: roleConfig.background,
                        color: roleConfig.color,
                      }}
                    />
                    <br />
                    <Item
                      as="div"
                      icon={
                        <div
                          className={cx(
                            "w-2 h-2 rounded-full",
                            row.featured ? "bg-[var(--color-secondary)]" : "bg-[var(--color-error)]",
                          )}
                        />
                      }
                      children={row.featured ? "Đang làm việc" : "Tạm nghỉ"}
                      className={cx(
                        "px-2 py-1 text-[11px] rounded-full",
                        "font-bold",
                        row.featured
                          ? "bg-[var(--color-secondary-200)]/40 text-[var(--color-secondary-900)]"
                          : "bg-[var(--color-error-100)] text-[var(--color-error-900)]",
                        "flex items-center gap-1 inline-flex",
                      )}
                    />
                  </div>
                );
              },
            },
            {
              key: "Profile",
              label: "",
              width: "3%",
              render: (row) => (
                <Button
                  onClick={() => {
                    setEditingStaffId(row.id);
                    modal.profile.toggleActive();
                  }}
                  width={32}
                  height={32}
                  iconClassName="text-sm font-bold"
                  className={cx(
                    "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
                    "hover:bg-[var(--color-primary)] hover:text-white",
                    "rounded-xl transition",
                  )}
                  icon={<LuEye />}
                />
              ),
            },
            {
              key: "Edit",
              label: "",
              width: "3%",
              render: (row) => (
                <Button
                  onClick={() => {
                    setEditingStaffId(row.id);
                    modal.staffForm.toggleActive();
                  }}
                  width={32}
                  height={32}
                  iconClassName="text-sm font-bold"
                  className={cx(
                    "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)]",
                    "hover:bg-[var(--color-secondary)] hover:text-white",
                    "rounded-xl transition",
                  )}
                  icon={<LuUserPen />}
                />
              ),
            },
            {
              key: "Delete",
              label: "",
              width: "3%",
              render: (row) => (
                <Button
                  onClick={() => {
                    setEditingStaffId(row.id);
                    modal.delete.toggleActive();
                  }}
                  width={32}
                  height={32}
                  iconClassName="text-sm font-bold"
                  className={cx(
                    "bg-[var(--color-error-100)] text-[var(--color-error-700)]",
                    "hover:bg-[var(--color-error)] hover:text-white",
                    "rounded-xl transition",
                  )}
                  icon={<LuTrash2 />}
                />
              ),
            },
          ]}
          data={tabbedStaff}
          isEmptyData={isEmptyData}
          isEmptySearch={isEmptySearch}
          animated
        />
      </div>

      <Modal open={modal.profile.isActive} onClose={modal.profile.deactivate} backdrop={true} width="max-w-lg">
        <Profile staffId={editingStaffId} onClose={modal.profile.deactivate} onEdit={modal.staffForm.toggleActive} />
      </Modal>
      <Modal
        open={modal.delete.isActive}
        onClose={() => modal.delete.toggleActive(false)}
        backdrop={true}
        width="max-w-sm"
      >
        <Delete staffId={editingStaffId} onClose={() => modal.delete.toggleActive(false)} />
      </Modal>
    </div>
  );
}

export default Staff;
