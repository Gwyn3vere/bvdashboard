// Libraries - Mock -Hooks
import classNames from "classnames/bind";
import { mockStaff } from "../../mock/account";
import { useActive } from "../../components/hooks";
// Styles - UI
import styles from "../../styles/pages.module.css";
import { List, Breadcrumb, Item, Search, Checkbox, Avatar, Button, Modal } from "../../components/ui";
import { HiMiniSquares2X2, HiOutlinePlus, HiMiniTrash, HiPencilSquare } from "react-icons/hi2";
import { LuListFilter } from "react-icons/lu";
import { Create, Edit } from "../Staff";

const cx = classNames.bind(styles);

function Staff() {
  const modal = {
    filter: useActive(),
    add: useActive(),
    edit: useActive(),
    delete: useActive()
  };

  return (
    <div className="flex flex-col overflow-hidden w-full h-full min-h-0">
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <HiMiniSquares2X2 /> },
          { label: "Quản lý nhân sự" }
        ]}
      />
      <Item as="strong" children="Quản lý nhân sự" itemClassName="text-3xl" width="100%" />
      <Item
        as="span"
        children="Quản lý thành viên nhóm của bạn và quyền tài khoản của họ ở đây."
        itemClassName="text-[14px] text-gray-500"
        className="mb-5 mt-1"
        width="100%"
      />
      <div className="flex justify-between items-end mb-5">
        <div className="flex gap-2">
          <Item as="strong" children="Tổng thành viên:" width="auto" />
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
          >
            <div className="text-xl font-bold mb-4">Bộ lọc danh sách</div>
            <div>Nội dung modal...</div>
          </Modal>
          <Button
            icon={<HiOutlinePlus />}
            children="Thêm mới"
            width="auto"
            onClick={modal.add.toggleActive}
            className="text-[14px] px-3 rounded-[8px] bg-[var(--color-text-light-primary)] cursor-pointer text-white font-bold"
          />
          <Modal
            open={modal.add.isActive}
            onClose={() => modal.add.toggleActive(false)}
            backdrop={true}
            style={{ boxShadow: "var(--shadow)" }}
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
        className="flex flex-col w-full h-full min-h-0"
        columns={[
          { key: "Index", label: "#", width: "3%", render: (row) => row.id },
          { key: "checkbox", label: <Checkbox />, width: "3%", render: () => <Checkbox /> },
          {
            key: "Username",
            label: "Tên thành viên",
            width: "64%",
            render: (row) => (
              <div className="flex items-center gap-2">
                <Avatar className="rounded-full" width={50} height={50} />
                <div>
                  <span className="font-bold">{row.name}</span>
                  <p className="text-sm opacity-70">{row.email}</p>
                </div>
              </div>
            )
          },
          {
            key: "Access",
            label: "Quyền",
            width: "10%",
            render: (row) => (
              <span
                className={cx(
                  "px-3 rounded-full border-2",
                  row.role === "admin"
                    ? " bg-green-200 border-green-500 text-green-700"
                    : "bg-blue-200 border-blue-500 text-blue-700"
                )}
              >
                {row.role}
              </span>
            )
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
                className={cx(
                  "hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]",
                  "rounded-full transition"
                )}
                icon={<HiPencilSquare />}
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
                className={cx(
                  "hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]",
                  "rounded-full transition"
                )}
                icon={<HiMiniTrash />}
              />
            )
          }
        ]}
        data={mockStaff}
      />
      <Modal
        open={modal.edit.isActive}
        onClose={() => modal.edit.toggleActive(false)}
        backdrop={true}
        style={{ boxShadow: "var(--shadow)" }}
      >
        <div className="text-xl font-bold mb-4">Cập nhật thông tin</div>
        <Edit />
      </Modal>
      <Modal
        open={modal.delete.isActive}
        onClose={() => modal.delete.toggleActive(false)}
        backdrop={true}
        style={{ boxShadow: "var(--shadow)" }}
      >
        <div className="text-xl font-bold mb-4">Thông báo</div>
        <div>Xác nhận xoá người này khỏi hệ thống?</div>
      </Modal>
    </div>
  );
}

export default Staff;
