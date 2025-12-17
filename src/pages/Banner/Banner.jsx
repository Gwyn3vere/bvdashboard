// Libraries - Mock -Hooks
import classNames from "classnames/bind";
import { mockBanners } from "../../mock/account";
import { useActive } from "../../components/hooks";
// Styles - UI - Motions
import styles from "../../styles/pages.module.css";
import { Breadcrumb, Item, List, Checkbox, Modal, Button } from "../../components/ui";
import {
  HiMiniSquares2X2,
  HiMiniTrash,
  HiPencilSquare,
  HiMiniCheck,
  HiOutlinePlus,
  HiMiniXMark
} from "react-icons/hi2";
const cx = classNames.bind(styles);

function Banner() {
  const modal = {
    filter: useActive(),
    add: useActive(),
    edit: useActive(),
    delete: useActive()
  };
  return (
    <div className="flex flex-col overflow-hidden w-full h-full min-h-0 max-w-[1600px] mx-auto">
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <HiMiniSquares2X2 /> },
          { label: "Quản lý banner" }
        ]}
      />
      <Item as="strong" children="Quản lý banner" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Quản lý danh sách banner tại đây."
        itemClassName="text-[14px] text-gray-500"
        className="mb-5 mt-1"
      />
      <div className="flex justify-between items-end mb-5">
        <div className="flex gap-2">
          <Item as="strong" children="Tổng banner hoạt động:" />
          <span>3</span>
        </div>
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
          {/* <Create onClose={() => modal.add.toggleActive(false)} /> */}
        </Modal>
      </div>
      <List
        className="flex flex-col w-full h-full min-h-0"
        columns={[
          { key: "Index", label: "#", width: "3%", render: (row) => row.id },
          { key: "checkbox", label: <Checkbox />, width: "3%", render: () => <Checkbox /> },
          {
            key: "Banner",
            label: "Banner",
            width: "20%",
            render: (row) => <img src={row.imageUrl} alt="banner" className="w-[150px] h-[80px]" />
          },
          {
            key: "View Order",
            label: "Thứ tự hiển thị",
            width: "10%",
            render: (row) => <span className={cx("px-3")}>{row.viewOrder}</span>
          },
          {
            key: "Active",
            label: "Active",
            width: "10%",
            render: (row) => (row.isActive ? <HiMiniCheck /> : <HiMiniXMark />)
          },
          { key: "Url", label: "Url", width: "44%", render: (row) => <span className={cx("px-3")}>{row.url}</span> },
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
        data={mockBanners}
      />
    </div>
  );
}

export default Banner;
