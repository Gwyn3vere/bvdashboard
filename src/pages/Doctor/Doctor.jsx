import { useState } from "react";
import classNames from "classnames/bind";
import { SPECIALTIES_OPTIONS } from "../../constants/option";
import { useActive, useSearch } from "../../components/hooks";
import { Link } from "react-router-dom";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import {
  List,
  Breadcrumb,
  Item,
  Search,
  Tooltip,
  Avatar,
  Button,
  Modal,
  Filter,
} from "../../components/ui";
import {
  LuSlidersHorizontal,
  LuUserRoundPlus,
  LuLayoutDashboard,
  LuTrash2,
  LuUserPen,
  LuCalendarRange,
  LuSquareUser,
} from "react-icons/lu";
import { DoctorForm, Delete, Profile } from ".";
import { useDoctorStore } from "../../store/doctorStore";

const cx = classNames.bind(styles);

function Doctor() {
  const doctors = useDoctorStore((doc) => doc.doctors);
  const editingDoctorId = useDoctorStore((doc) => doc.editingDoctorId);
  const setEditingDoctorId = useDoctorStore((doc) => doc.setEditingDoctorId);

  const [doctorKeyword, setDoctorKeyword] = useState("");
  const modal = {
    filter: useActive(),
    doctorFom: useActive(),
    delete: useActive(),
    profile: useActive(),
  };
  const filteredDoctor = useSearch(doctors, doctorKeyword, (doctor) =>
    [doctor.name, doctor.specialty, doctor.tags].filter(Boolean).join(" "),
  );

  const handleClose = () => {
    if (modal.doctorFom.isActive) {
      modal.doctorFom.deactivate();
      setEditingDoctorId(null);
    }
  };

  return (
    <div className={TWCSS.container}>
      <Breadcrumb
        className="mb-3"
        items={[
          {
            label: "Bảng điều khiển",
            href: "/bang-dieu-khien",
            icon: <LuLayoutDashboard />,
          },
          { label: "Quản lý bác sĩ" },
        ]}
      />
      <Item as="strong" children="Quản lý bác sĩ" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Quản lý thông tin bác sĩ tại đây."
        itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
      />

      <ActionBar
        modal={modal}
        keyword={doctorKeyword}
        onChange={(e) => setDoctorKeyword(e.target.value)}
        onClose={handleClose}
      />

      <List
        className={TWCSS.list}
        columns={[
          { key: "Index", label: "#", width: "3%", render: (row) => row.id },
          {
            key: "Doctor",
            label: "Bác sĩ",
            width: "28%",
            render: (row) => (
              <div className="flex items-center gap-2">
                <Avatar
                  src={row.avatarUrl}
                  className="rounded-full"
                  width={50}
                  height={50}
                />
                <div>
                  <span className="font-bold">{row.name}</span>
                  <p className="text-sm opacity-70">{row.title}</p>
                </div>
              </div>
            ),
          },
          {
            key: "Specialty",
            label: "Chuyên khoa",
            width: "16%",
            render: (row) => {
              const specialtyConfig = SPECIALTIES_OPTIONS.find(
                (item) => item.value === row.specialty,
              );
              return (
                <span>
                  {specialtyConfig ? specialtyConfig.name : row.specialty}
                </span>
              );
            },
          },
          {
            key: "Experience",
            label: "Kinh nghiệm",
            width: "10%",
            render: (row) => <span>{row.experienceYears} năm</span>,
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
                        "bg-[var(--color-unavailable-100)] text-black font-medium",
                      )}
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            ),
          },
          {
            key: "Profile",
            label: "",
            width: "5%",
            render: (row) => (
              <Button
                onClick={() => {
                  setEditingDoctorId(row.id);
                  modal.profile.toggleActive();
                }}
                width={40}
                height={40}
                iconClassName="text-[20px] font-bold"
                className={cx(
                  "hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg-light-primary-100)]",
                  "rounded-full transition",
                )}
                icon={<LuSquareUser />}
              />
            ),
          },
          {
            key: "Edit",
            label: "",
            width: "5%",
            render: (row) => (
              <Button
                onClick={() => {
                  setEditingDoctorId(row.id);
                  modal.doctorFom.toggleActive();
                }}
                width={40}
                height={40}
                iconClassName="text-[20px] font-bold"
                className={cx(
                  "hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg-light-primary-100)]",
                  "rounded-full transition",
                )}
                icon={<LuUserPen />}
              />
            ),
          },
          {
            key: "Delete",
            label: "",
            width: "5%",
            render: (row) => (
              <Button
                onClick={() => {
                  setEditingDoctorId(row.id);
                  modal.delete.toggleActive();
                }}
                width={40}
                height={40}
                iconClassName="text-[20px] font-bold"
                className={cx(
                  "hover:bg-[var(--color-error)] hover:text-[var(--color-bg-light-primary-100)]",
                  "rounded-full transition",
                )}
                icon={<LuTrash2 />}
              />
            ),
          },
        ]}
        data={filteredDoctor}
      />
      <Modal
        open={modal.profile.isActive}
        onClose={modal.profile.deactivate}
        backdrop={true}
        width="max-w-4xl"
      >
        <Profile
          doctorId={editingDoctorId}
          onClose={modal.profile.deactivate}
        />
      </Modal>
      <Modal
        open={modal.delete.isActive}
        onClose={() => modal.delete.toggleActive(false)}
        backdrop={true}
        width="max-w-xl"
      >
        <Delete
          doctorId={editingDoctorId}
          onClose={() => modal.delete.toggleActive(false)}
        />
      </Modal>
    </div>
  );
}

export default Doctor;

function ActionBar({ modal, keyword, onChange, onClose }) {
  return (
    <div
      className={cx(
        "bg-white rounded-[8px] p-4 outline outline-[var(--color-unavailable-300)] mb-5",
      )}
    >
      <div className="grid grid-cols-1fr xl:grid-cols-[380px_1fr] gap-3">
        <Search
          value={keyword}
          onChange={onChange}
          width={"auto"}
          height={45}
          className={cx("rounded-[8px]")}
        />

        <div className="flex flex-col md:flex-row justify-between gap-3">
          <div className="flex gap-1">
            <Tooltip content="Bộ lọc" position="top">
              <Button
                width={45}
                height={45}
                icon={<LuSlidersHorizontal />}
                className={cx(
                  "font-medium",
                  "hover:bg-[var(--color-primary-100)]",
                )}
              />
            </Tooltip>
            <Tooltip content="Quản lý lịch làm việc" position="top">
              <Item
                as={Link}
                to="/quan-ly-bac-si/lich-lam-viec"
                icon={<LuCalendarRange />}
                iconClassName="text-[20px]"
                className={cx(
                  "font-medium rounded-[8px]",
                  "hover:bg-[var(--color-primary-100)]",
                  "flex items-center justify-center w-[45px] h-[45px]",
                )}
              />
            </Tooltip>
          </div>
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
                style={{
                  background: "var(--color-text-light-primary)",
                  color: "var(--color-bg-light-primary-100)",
                }}
              />
            }
          >
            <Filter onClose={() => modal.filter.toggleActive(false)} />
          </Modal>

          <Button
            icon={<LuUserRoundPlus />}
            children="Thêm mới"
            width="auto"
            height={45}
            onClick={modal.doctorFom.toggleActive}
            iconClassName="text-[20px]"
            className={cx(
              "gap-2 text-[14px] px-3 rounded-[8px] text-white font-medium",
              "bg-[var(--color-primary)] cursor-pointer ",
            )}
          />
          <Modal
            open={modal.doctorFom.isActive}
            onClose={onClose}
            backdrop={true}
            width="max-w-2xl"
          >
            <DoctorForm onClose={onClose} />
          </Modal>
        </div>
      </div>
    </div>
  );
}
