// Libraries - Mock - Hooks - Constants
import classNames from "classnames/bind";
import { mockDoctors, mockDoctorAppointmentStats } from "../../mock/manage";
import { MOCK_DOCTOR_LIST } from "../../mock/doctors";
import { DOCTOR_STATUS } from "../../constants/status";
import { useActive } from "../../components/hooks";
import { Link } from "react-router-dom";
// Styles - UI - TWCSS
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { List, Breadcrumb, Item, Search, Checkbox, Avatar, Button, Modal, Filter } from "../../components/ui";
import { LuListFilter, LuUserRoundPlus, LuLayoutDashboard, LuTrash2, LuUserPen, LuCalendarRange } from "react-icons/lu";
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

  const doctorListData = MOCK_DOCTOR_LIST.map((doctor) => ({ ...doctor }));

  return (
    <div className={TWCSS.container}>
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
        itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
      />

      <OptionBar modal={modal} totalDoctor={doctorListData.length} />

      <List
        className={TWCSS.list}
        style={{ boxShadow: "var(--shadow)" }}
        columns={[
          { key: "Index", label: "#", width: "3%", render: (row, index) => index + 1 },
          {
            key: "checkbox",
            label: <Checkbox checkboxClassName="w-5 h-5" />,
            width: "3%",
            render: () => <Checkbox checkboxClassName="w-5 h-5" />
          },
          {
            key: "Doctor",
            label: "Bác sĩ",
            width: "30%",
            render: (row) => (
              <div className="flex items-center gap-2">
                <Avatar src={row.avatarUrl} className="rounded-full" width={50} height={50} />
                <div>
                  <span className="font-bold">{row.name}</span>
                  <p className="text-sm opacity-70">{row.title}</p>
                </div>
              </div>
            )
          },
          {
            key: "Specialty",
            label: "Chuyên khoa",
            width: "16%",
            render: (row) => <span>{row.specialty}</span>
          },
          {
            key: "Experience",
            label: "Kinh nghiệm",
            width: "10%",
            render: (row) => <span>{row.experienceYears} năm</span>
          },
          {
            key: "Tags",
            label: "Tags",
            width: "28%",
            render: (row) => (
              <div className="flex flex-wrap gap-2">
                {Array.isArray(row.tags) &&
                  row.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cx(
                        "px-2 py-1 text-xs rounded-full",
                        "bg-[var(--color-unavailable-100)] text-black font-medium"
                      )}
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            )
          },
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
        data={doctorListData}
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

function OptionBar({ modal, totalDoctor }) {
  return (
    <div className="sm:flex justify-between items-end mb-5">
      <div className="flex gap-2 mb-3 sm:mb-0">
        <Item as="strong" children="Tổng bác sĩ:" />
        <span>{totalDoctor}</span>
      </div>
      <div className="flex justify-between sm:justify-end gap-2">
        <Search className="rounded-[8px]" />
        {/* Filter */}
        <Button
          icon={<LuListFilter />}
          children="Bộ lọc"
          width="auto"
          onClick={modal.filter.toggleActive}
          className="text-[14px] font-medium border-2 px-3 rounded-[8px] border-[var(--color-bg-light-primary-300)] cursor-pointer"
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
        {/* Shift */}
        <Item
          as={Link}
          to="/quan-ly-bac-si/lich-lam-viec"
          icon={<LuCalendarRange />}
          children="Quản lý ca làm việc"
          width="auto"
          iconClassName="text-[20px]"
          className={cx(
            "gap-2 text-[14px] border-2 px-3 rounded-[8px]",
            "border-[var(--color-bg-light-primary-300)] cursor-pointer",
            "font-medium flex items-center"
          )}
        />
        {/* Create */}
        <Button
          icon={<LuUserRoundPlus />}
          children="Thêm mới"
          width="auto"
          onClick={modal.add.toggleActive}
          iconClassName="text-[20px]"
          className="gap-2 text-[14px] px-3 rounded-[8px] bg-[var(--color-primary)] cursor-pointer text-white font-medium"
        />
        <Modal open={modal.add.isActive} onClose={modal.add.toggleActive} backdrop={true} width="max-w-xl">
          <Create onClose={modal.add.deactivate} />
        </Modal>
      </div>
    </div>
  );
}
