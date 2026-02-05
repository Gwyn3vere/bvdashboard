import classNames from "classnames/bind";
import { useState } from "react";

import { useActive, useSearch } from "../../components/hooks";
import { useStaffStore } from "../../store/staffStore";

import { POSITION_OPTIONS, ROLE_OPTIONS } from "../../constants/option";

import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";

import { List, Breadcrumb, Item, Search, Checkbox, Avatar, Button, Modal, Filter } from "../../components/ui";
import { LuListFilter, LuUserRoundPlus, LuLayoutDashboard, LuTrash2, LuUserPen, LuSquareUser } from "react-icons/lu";

import { Create, Edit, Delete, Profile } from "../Staff";

const cx = classNames.bind(styles);

function Staff() {
  const staffs = useStaffStore((s) => s.staffs);
  const setEditingStaffId = useStaffStore((s) => s.setEditingStaffId);
  const editingStaffId = useStaffStore((s) => s.editingStaffId);

  const [staffKeyword, setStaffKeyword] = useState("");
  const filteredStaff = useSearch(staffs, staffKeyword, (staff) =>
    [staff.name, staff.position, staff.role].filter(Boolean).join(" ")
  );

  const modal = {
    filter: useActive(),
    profile: useActive(),
    add: useActive(),
    edit: useActive(),
    delete: useActive()
  };

  return (
    <div className={TWCSS.container}>
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <LuLayoutDashboard /> },
          { label: "Quản lý nhân sự" }
        ]}
      />
      <Item as="strong" children="Quản lý nhân sự" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Quản lý thành viên nhóm của bạn và quyền tài khoản của họ ở đây."
        itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
      />
      <OptionBar
        modal={modal}
        totalStaff={filteredStaff.length}
        keyword={staffKeyword}
        onChange={(e) => setStaffKeyword(e.target.value)}
      />

      <List
        className={TWCSS.list}
        style={{ boxShadow: "var(--shadow)" }}
        columns={[
          { key: "Index", label: "#", width: "3%", render: (row) => row.id },
          {
            key: "Username",
            label: "Tên thành viên",
            width: "28%",
            render: (row) => (
              <div className="flex items-center gap-2">
                <Avatar src={row.avatarUrl} className="rounded-full" width={50} height={50} />
                <div>
                  <span className="font-bold">{row.name}</span>
                  <p className="text-sm opacity-70">{row.email}</p>
                </div>
              </div>
            )
          },
          {
            key: "Position",
            label: "Chức vụ",
            width: "27%",
            render: (row) => {
              const positionConfig = POSITION_OPTIONS.find((item) => item.value === row.position);
              return <span>{positionConfig ? positionConfig.name : row.position}</span>;
            }
          },
          {
            key: "Phone",
            label: "Liên hệ",
            width: "17%",
            render: (row) => <span>{row.phone}</span>
          },
          {
            key: "Access",
            label: "Quyền",
            width: "10%",
            render: (row) => {
              const roleConfig = ROLE_OPTIONS.find((item) => item.value === row.role);

              if (!roleConfig) return row.role;
              return (
                <span
                  className={cx(
                    "px-2 py-1 text-xs rounded-full",
                    "bg-[var(--color-unavailable-100)] text-black font-medium"
                  )}
                >
                  {roleConfig.name}
                </span>
              );
            }
          },
          {
            key: "Profile",
            label: "",
            width: "5%",
            render: (row) => (
              <Button
                onClick={() => {
                  setEditingStaffId(row.id);
                  modal.profile.toggleActive();
                }}
                width={40}
                height={40}
                iconClassName="text-[20px] font-bold"
                className={cx(
                  "hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg-light-primary-100)]",
                  "rounded-full transition"
                )}
                icon={<LuSquareUser />}
              />
            )
          },
          {
            key: "Edit",
            label: "",
            width: "5%",
            render: (row) => (
              <Button
                onClick={() => {
                  setEditingStaffId(row.id);
                  modal.edit.toggleActive();
                }}
                width={40}
                height={40}
                iconClassName="text-[20px] font-bold"
                className={cx(
                  "hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg-light-primary-100)]",
                  "rounded-full transition"
                )}
                icon={<LuUserPen />}
              />
            )
          },
          {
            key: "Delete",
            label: "",
            width: "5%",
            render: (row) => (
              <Button
                onClick={() => {
                  setEditingStaffId(row.id);
                  modal.delete.toggleActive();
                }}
                width={40}
                height={40}
                iconClassName="text-[20px] font-bold"
                className={cx(
                  "hover:bg-[var(--color-error)] hover:text-[var(--color-bg-light-primary-100)]",
                  "rounded-full transition"
                )}
                icon={<LuTrash2 />}
              />
            )
          }
        ]}
        data={filteredStaff}
      />
      <Modal open={modal.profile.isActive} onClose={modal.profile.deactivate} backdrop={true} width="max-w-xl">
        <Profile staffId={editingStaffId} onClose={modal.profile.deactivate} />
      </Modal>
      <Modal open={modal.edit.isActive} onClose={modal.edit.deactivate} backdrop={true} width="max-w-xl">
        <Edit onClose={modal.edit.deactivate} />
      </Modal>
      <Modal
        open={modal.delete.isActive}
        onClose={() => modal.delete.toggleActive(false)}
        backdrop={true}
        width="max-w-xl"
      >
        <Delete staffId={editingStaffId} onClose={() => modal.delete.toggleActive(false)} />
      </Modal>
    </div>
  );
}

export default Staff;

function OptionBar({ modal, totalStaff, keyword, onChange }) {
  return (
    <div className="md:flex justify-between items-end mb-5">
      <div className="flex gap-2 mb-3 md:mb-0">
        <Item as="strong" children="Tổng bác sĩ:" />
        <span>{totalStaff}</span>
      </div>
      <div className="flex justify-between md:justify-end gap-2">
        <Search value={keyword} onChange={onChange} className="rounded-[8px]" inputClass="max-w-[150px]" />
        <div className="flex gap-2">
          {/* Filter */}
          <Button
            icon={<LuListFilter />}
            children="Bộ lọc"
            width="auto"
            onClick={modal.filter.toggleActive}
            iconClassName="text-[20px]"
            btnClassName={cx("hidden md:inline")}
            className={cx(
              "gap-2 text-[14px] px-3 rounded-[8px] font-medium",
              " border-2 border-[var(--color-bg-light-primary-300)] cursor-pointer"
            )}
          />
          <Modal
            open={modal.filter.isActive}
            onClose={() => modal.filter.toggleActive(false)}
            backdrop={true}
            style={{ boxShadow: "var(--shadow)" }}
            className="bg-[var(--color-bg-light-primary-300)]"
            footer={
              <Button
                form="staffForm"
                type="submit"
                children="Xác nhận"
                width="100%"
                height={40}
                className="px-4 py-2 font-bold"
                style={{ background: "var(--color-text-light-primary)", color: "var(--color-bg-light-primary-100)" }}
              />
            }
          >
            <Filter onClose={() => modal.filter.toggleActive(false)} />
          </Modal>
          {/* Create */}
          <Button
            icon={<LuUserRoundPlus />}
            children="Thêm mới"
            width="auto"
            onClick={modal.add.toggleActive}
            iconClassName="text-[20px]"
            btnClassName={cx("hidden md:inline")}
            className={cx(
              "gap-2 text-[14px] px-3 rounded-[8px] text-white font-medium",
              "bg-[var(--color-primary)] cursor-pointer "
            )}
          />
          <Modal open={modal.add.isActive} onClose={modal.add.toggleActive} backdrop={true} width="max-w-2xl">
            <Create onClose={modal.add.deactivate} />
          </Modal>
        </div>
      </div>
    </div>
  );
}
