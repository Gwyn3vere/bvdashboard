import { useState, useMemo, useEffect } from "react";
import classNames from "classnames/bind";
import { SPECIALTIES_OPTIONS, DOCTOR_FEATURED_OPTION } from "../../constants/option";
import { useActive, useSearch } from "../../components/hooks";
import { Link } from "react-router-dom";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { List, ActionBar, Item, Search, Tooltip, Avatar, Button, Modal, Filter } from "../../components/ui";
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

const TITLE_COLOR_MAP = {
  BS: "var(--color-primary-700)",
  "ThS.BS": "var(--color-secondary-700)",
  "TS.BS": "var(--color-error-700)",
  "BS.CKI": "var(--color-unavailable-700)",
  "BS.CKII": "var(--color-warning-700)",
  "BS.CK Nội": "var(--color-cyan-700)",
  "BS.CK Nhi": "var(--color-purple-700)",
  "BS.CK Sản": "var(--color-primary-700)",
};

function Doctor() {
  const doctors = useDoctorStore((doc) => doc.doctors);
  const fetchDoctors = useDoctorStore((doc) => doc.fetchDoctors);
  const editingDoctorId = useDoctorStore((doc) => doc.editingDoctorId);
  const setEditingDoctorId = useDoctorStore((doc) => doc.setEditingDoctorId);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const [doctorKeyword, setDoctorKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  // Lọc tầng 1
  const searchedDoctor = useSearch(doctors, doctorKeyword, (doctor) =>
    [doctor.name, doctor.specialty, doctor.tags].filter(Boolean).join(" "),
  );

  // Lọc tầng 2
  const tabbedDoctor = useMemo(() => {
    if (activeTab === "ALL") return searchedDoctor;
    if (activeTab === true) return searchedDoctor.filter((d) => d.featured === true);
    if (activeTab === false) return searchedDoctor.filter((d) => d.featured === false);
    return searchedDoctor;
  }, [searchedDoctor, activeTab]);

  const isEmptyData = doctors.length === 0;
  const isEmptySearch = doctors.length > 0 && searchedDoctor.length === 0;

  const modal = {
    filter: useActive(),
    doctorFom: useActive(),
    delete: useActive(),
    profile: useActive(),
  };

  const handleClose = () => {
    if (modal.doctorFom.isActive) {
      modal.doctorFom.deactivate();
      setEditingDoctorId(null);
    }
  };

  return (
    <div className={TWCSS.container}>
      <div className={cx("bg-white rounded-2xl")} style={{ boxShadow: "var(--shadow)" }}>
        <ActionBar
          name="bác sĩ"
          onFilter={modal.filter}
          onForm={modal.doctorFom}
          formModal={<DoctorForm onClose={handleClose} />}
          keyword={doctorKeyword}
          onChange={(e) => setDoctorKeyword(e.target.value)}
          onClose={handleClose}
          featured={DOCTOR_FEATURED_OPTION}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        >
          <Tooltip content="Bộ lọc" position="top" className="order-1 md:order-2">
            <Button
              width={36}
              height={36}
              icon={<LuSlidersHorizontal />}
              className={cx(
                "font-medium rounded-xl",
                "bg-[var(--color-unavailable-100)] transition-all",
                "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
              )}
            />
          </Tooltip>
          <Tooltip content="Quản lý lịch làm việc" position="top" className="order-1 md:order-2">
            <Item
              as={Link}
              to="/quan-ly-bac-si/lich-lam-viec"
              icon={<LuCalendarRange />}
              iconClassName="text-[20px]"
              className={cx(
                "flex items-center justify-center",
                "font-medium rounded-xl w-[36px] h-[36px]",
                "bg-[var(--color-unavailable-100)] transition-all",
                "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
              )}
            />
          </Tooltip>
        </ActionBar>

        <List
          name="bác sĩ"
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
              key: "Doctor",
              label: "Bác sĩ",
              width: "28%",
              render: (row) => {
                const baseColor = TITLE_COLOR_MAP[row.title] || "var(--color-unavailable)";
                return (
                  <div className="flex items-center gap-2">
                    <Avatar src={row.avatarUrl} name={row.name} className="rounded-full" width={38} height={38} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[13.5px]">{row.name}</span>
                        <Item
                          children={row.title}
                          itemClassName={cx("text-[10.5px] font-bold")}
                          className={cx("px-2 py-0.5 rounded-full")}
                          style={{
                            backgroundColor: `color-mix(in srgb, ${baseColor} 20%, white)`,
                            color: baseColor,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              },
            },
            {
              key: "Specialty",
              label: "Chuyên khoa",
              width: "27%",
              render: (row) => {
                const specialtyConfig = SPECIALTIES_OPTIONS.find((item) => item.value === row.specialty);
                return (
                  <div>
                    <span className="text-[12.5px] font-bold text-black/80">
                      {specialtyConfig ? specialtyConfig.name : row.specialty}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(row.tags) &&
                        row.tags.map((tag) => (
                          <span
                            key={tag}
                            className={cx(
                              "px-2 py-0.5 text-[10px] rounded-full",
                              "bg-[var(--color-primary-100)]/70 font-semibold",
                              "text-[var(--color-primary-700)]",
                              "border border-[var(--color-primary-300)]",
                            )}
                          >
                            # {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                );
              },
            },
            {
              key: "Experience",
              label: "Kinh nghiệm",
              width: "15%",
              render: (row) => (
                <div className="flex flex-col gap-1 inline-flex">
                  <span className="text-[12.5px] font-bold text-black/80">{row.experienceYears} năm</span>
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
              ),
            },
            {
              key: "Shift",
              label: "Lịch tuần này",
              width: "18%",
              render: (row) => {
                return (
                  <div className="flex flex-wrap gap-0.5 items-end">
                    {row.weekSummary.map((item, idx) => (
                      <div
                        key={idx}
                        className={cx(
                          "w-[8px] rounded-[3px]",
                          item.sessionsBooked === 2 && "h-[20px] bg-[var(--color-primary-900)]",
                          item.sessionsBooked === 1 && "h-[12px] bg-[var(--color-primary)]",
                          item.sessionsBooked === 0 && "h-[6px] bg-[var(--color-primary-200)]",
                        )}
                      />
                    ))}
                    <span className={cx("text-[10.5px] text-[var(--color-primary)] font-bold ml-2")}>
                      {row.weeklyTotalAppointments} ca
                    </span>
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
                    setEditingDoctorId(row.id);
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
                  icon={<LuSquareUser />}
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
                    setEditingDoctorId(row.id);
                    modal.doctorFom.toggleActive();
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
                    setEditingDoctorId(row.id);
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
          data={tabbedDoctor}
          isEmptyData={isEmptyData}
          isEmptySearch={isEmptySearch}
          animated
        />
      </div>

      <Modal open={modal.profile.isActive} onClose={modal.profile.deactivate} backdrop={true} width="max-w-4xl">
        <Profile doctorId={editingDoctorId} onClose={modal.profile.deactivate} />
      </Modal>
      <Modal
        open={modal.delete.isActive}
        onClose={() => modal.delete.toggleActive(false)}
        backdrop={true}
        width="max-w-xl"
      >
        <Delete doctorId={editingDoctorId} onClose={() => modal.delete.toggleActive(false)} />
      </Modal>
    </div>
  );
}

export default Doctor;
