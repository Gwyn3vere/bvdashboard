import React, { useCallback } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Item, Modal } from "../../components/ui";
import { useActive, useModalManager } from "../../components/hooks";
import { Link } from "react-router-dom";
import { LuActivity, LuCalendar, LuImage, LuLayers3, LuSquarePen, LuUsers, LuZap } from "react-icons/lu";
import { DoctorForm } from "../Doctor";
import { StaffForm } from "../Staff";
import { BannerForm } from "../Banner";

const cx = classNames.bind(style);

function QuickAction() {
  const { modal, open, close } = useModalManager({
    doctor: false,
    staff: false,
    banner: false,
    appointment: false,
    specialty: false,
  });

  const buttons = [
    {
      id: 1,
      icon: <LuCalendar />,
      title: "Thêm lịch hẹn",
      as: "button",
      onClick: () => console.log("click"),
      grd: "var(--color-grd-primary)",
    },
    {
      id: 2,
      icon: <LuSquarePen />,
      title: "Đăng bài mới",
      as: Link,
      to: "/quan-ly-tin-tuc/dang-bai",
      grd: "var(--color-grd-secondary)",
    },
    {
      id: 3,
      icon: <LuActivity />,
      title: "Thêm bác sĩ",
      as: "button",
      onClick: () => open("doctor"),
      grd: "var(--color-grd-purple)",
    },
    {
      id: 4,
      icon: <LuUsers />,
      title: "Thêm nhân sự",
      as: "button",
      onClick: () => open("staff"),
      grd: "var(--color-grd-warning)",
    },
    {
      id: 5,
      icon: <LuImage />,
      title: "Thêm banner",
      as: "button",
      onClick: () => open("banner"),
      grd: "var(--color-grd-error)",
    },
    {
      id: 6,
      icon: <LuLayers3 />,
      title: "Thêm chuyên khoa",
      as: "button",
      onClick: () => console.log("click"),
      grd: "var(--color-grd-cyan)",
    },
  ];
  return (
    <>
      <section className={cx("px-6 py-5.5 bg-white rounded-2xl")} style={{ boxShadow: "var(--shadow)" }}>
        {/* Header */}
        <div className={cx("flex items-center justify-between mb-[16px]")}>
          <div>
            <Item as="h2" children={"Thao tác nhanh"} itemClassName={cx("text-[15px] font-black leading-5")} />
            <Item
              children={"Truy cập nhanh các tác vụ thường dùng"}
              itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]/70 font-medium")}
              className={cx("mt-[2px] leading-3")}
            />
          </div>
          <Item
            icon={<LuZap />}
            children={"Phím tắt"}
            itemClassName={cx("whitespace-nowrap")}
            className={cx(
              "text-[11px] text-[var(--color-primary)] font-bold",
              "flex items-center gap-1 rounded-full leading-4",
              "py-[4px] px-[10px] bg-[var(--color-primary-100)]/50",
            )}
          />
        </div>
        {/* Menu */}
        <div className={cx("grid grid-cols-6 gap-[10px]")}>
          {buttons.map((item) => {
            const Component = item.as || "div";

            return (
              <Component
                key={item.id}
                {...(Component === Link ? { to: item.to } : { onClick: item.onClick })}
                className={cx(
                  "bg-white py-4.5 px-3 rounded-2xl",
                  "border border-[var(--color-unavailable-300)]/50",
                  "flex flex-col items-center gap-[9px]",
                  "hover:shadow-[var(--shadow)] transition-all duration-200",
                  "hover:-translate-y-2 cursor-pointer",
                )}
              >
                <Item
                  icon={item.icon}
                  iconClassName={cx("text-white text-[19px]")}
                  className={cx("w-[44px] h-[44px] rounded-xl flex items-center justify-center")}
                  style={{ background: item.grd }}
                />
                <Item as="span" children={item.title} itemClassName={cx("text-[11px] text-black/70 font-bold")} />
              </Component>
            );
          })}
        </div>
      </section>

      <Modal open={modal.doctor} onClose={() => close("doctor")} width="max-w-[550px]">
        <DoctorForm onClose={() => close("doctor")} />
      </Modal>
      <Modal open={modal.staff} onClose={() => close("staff")} width="max-w-[550px]">
        <StaffForm onClose={() => close("staff")} />
      </Modal>
      <Modal open={modal.banner} onClose={() => close("banner")} width="max-w-[550px]">
        <BannerForm onClose={() => close("banner")} />
      </Modal>
    </>
  );
}

export default React.memo(QuickAction);
