// Libraries - Mock -Hooks
import classNames from "classnames/bind";
import { mockDoctors } from "../../mock/account";
import { useActive } from "../../components/hooks";
// Styles - UI
import styles from "../../styles/pages.module.css";
import { List, Breadcrumb, Item, Search, Checkbox, Avatar, Button, Modal, Filter } from "../../components/ui";
import { LuListFilter, LuUserRoundPlus, LuLayoutDashboard, LuTrash2, LuUserPen } from "react-icons/lu";
import { TiWarning } from "react-icons/ti";
import { Create, Edit } from ".";

const cx = classNames.bind(styles);

function Doctor() {
  const modal = {
    filter: useActive(),
    add: useActive(),
    edit: useActive(),
    delete: useActive()
  };
  return (
    <div className="px-10 pb-5 flex flex-col overflow-hidden w-full h-full min-h-0">
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <LuLayoutDashboard /> },
          { label: "Quản lý bác sĩ" }
        ]}
      />
      <Item as="strong" children="Quản lý bác sĩ" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Quản lý thông tin bác sĩ tại đây."
        itemClassName="text-[14px] text-gray-500"
        className="mb-5 mt-1"
      />
      <div className="flex justify-between items-end mb-5">
        <div className="flex gap-2">
          <Item as="strong" children="Tổng thành viên:" />
          <span>20</span>
        </div>
        <div className="flex gap-2">
          <Search className="rounded-[8px]" />
          <Button
            icon={<LuListFilter />}
            children="Bộ lọc"
            width="auto"
            onClick={modal.filter.toggleActive}
            className="text-[14px] border-2 px-3 rounded-[8px] border-[var(--color-bg-light-primary-300)] cursor-pointer"
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
          <Button
            icon={<LuUserRoundPlus />}
            children="Thêm mới"
            width="auto"
            onClick={modal.add.toggleActive}
            iconClassName="text-[20px]"
            className="gap-2 text-[14px] px-3 rounded-[8px] bg-[var(--color-primary)] cursor-pointer text-white font-bold"
          />
          <Modal
            open={modal.add.isActive}
            onClose={() => modal.add.toggleActive(false)}
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
            <Create onClose={() => modal.add.toggleActive(false)} />
          </Modal>
        </div>
      </div>

      <List
        className={cx(
          "p-4 w-full h-full min-h-0 bg-[var(--color-bg-light-primary-100)] rounded-[8px]",
          "flex flex-col justify-between"
        )}
        style={{ boxShadow: "var(--shadow)" }}
        columns={[
          { key: "Index", label: "#", width: "3%", render: (row, index) => index + 1 },
          { key: "checkbox", label: <Checkbox />, width: "3%", render: () => <Checkbox /> },
          {
            key: "Doctor",
            label: "Bác sĩ",
            width: "64%",
            render: (row) => (
              <div className="flex items-center gap-2">
                <Avatar src={row.avatarUrl} className="rounded-full" width={50} height={50} />
                <div>
                  <span className="font-bold">{row.name}</span>
                  <p className="text-sm opacity-70">{row.degree}</p>
                </div>
              </div>
            )
          },
          {
            key: "Access",
            label: "Chuyên khoa",
            width: "10%",
            render: (row) => <span className={cx("px-3")}>{row.specialty}</span>
          },
          { key: "DateAdded", label: "Ngày thêm vào", width: "10%", render: (row) => row.dateAdded },
          {
            key: "Edit",
            label: "",
            width: "5%",
            render: () => (
              <Button
                onClick={modal.edit.toggleActive}
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
            render: () => (
              <Button
                onClick={modal.delete.toggleActive}
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
        data={mockDoctors}
      />
      <Modal
        open={modal.edit.isActive}
        onClose={() => modal.edit.toggleActive(false)}
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
        <Edit onClose={() => modal.edit.toggleActive(false)} />
      </Modal>
      <Modal
        open={modal.delete.isActive}
        onClose={() => modal.delete.toggleActive(false)}
        backdrop={true}
        style={{ boxShadow: "var(--shadow)" }}
        footer={
          <div className="flex justify-end gap-2 mt-5 text-[14px]">
            <Button
              onClick={() => modal.delete.toggleActive(false)}
              children="Huỷ"
              width="auto"
              height={40}
              className="px-4 py-2 font-bold"
              style={{ background: "var(--color-bg-light-primary-300)" }}
            />
            <Button
              children="Xác nhận"
              width="auto"
              height={40}
              className="px-4 py-2 font-bold"
              style={{ background: "var(--color-text-light-primary)", color: "var(--color-bg-light-primary-100)" }}
            />
          </div>
        }
      >
        <div className="flex gap-2 items-center text-3xl font-bold">
          <TiWarning />
          <span>Cảnh báo</span>
        </div>
        <Item
          as="div"
          children="Hành động này sẽ xoá bác sĩ khỏi danh sách và hệ thống dữ liệu của bạn. Bạn có muốn tiếp tục?"
          className="mb-5 mt-2"
          whitespace=""
          itemClassName="text-[14px]"
        />
      </Modal>
    </div>
  );
}

export default Doctor;
