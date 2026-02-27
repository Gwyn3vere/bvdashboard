import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TitleForm, Item, Button, Avatar } from "../../components/ui";
import { useStaffStore } from "../../store/staffStore";
import { POSITION_OPTIONS, ROLE_OPTIONS } from "../../constants/option";
import { STAFF_ROLE } from "../../constants/role";
import {
  LuHandshake,
  LuMapPin,
  LuMail,
  LuKeyRound,
  LuPhone,
  LuBriefcase,
  LuShield,
  LuX,
  LuUserPen,
  LuUsers,
  LuCalendar,
} from "react-icons/lu";

const cx = classNames.bind(styles);

function Profile({ onClose, onEdit, staffId }) {
  const tabs = ["Thông tin", "Bảo mật"];
  const [tab, setTab] = useState(0);

  const getStaffById = useStaffStore((s) => s.getStaffById);

  const staff = getStaffById(staffId);
  if (!staff) return null;
  return (
    <>
      <Header avatar={staff.avatar} staff={staff} onClose={onClose} tabs={tabs} tab={tab} setTab={setTab} />

      <div className="px-3 md:px-7 py-6 bg-white">
        {tab === 0 && <Information staff={staff} />}
        {tab === 1 && <Security staff={staff} />}
      </div>

      <div className={cx("flex gap-2 bg-white px-3 md:px-7 pb-6")}>
        <Button
          icon={<LuX />}
          children={"Đóng"}
          onClick={onClose}
          width="100%"
          height={38}
          className={cx(
            "bg-[var(--color-unavailable-100)] gap-2",
            "text-[var(--color-unavailable-700)] font-bold text-[13px] rounded-xl",
          )}
        />
        <Button
          icon={<LuUserPen />}
          children={"Chỉnh sửa"}
          onClick={(e) => {
            onEdit();
            onClose();
          }}
          width="100%"
          height={38}
          className={cx("bg-linear-[var(--color-ln-primary)] gap-2", "text-white font-bold text-[13px] rounded-xl")}
        />
      </div>
    </>
  );
}

export default React.memo(Profile);

function Header({ avatar, staff, onClose, tabs, tab, setTab }) {
  const roleConfig = STAFF_ROLE[staff.role];
  if (!roleConfig) return staff.role;
  return (
    <div
      className={cx(
        "relative",
        "bg-linear-[var(--color-ln-primary)] px-7 pt-7",
        "flex flex-col items-center justify-center gap-3",
      )}
    >
      <Button
        type="button"
        width={32}
        height={32}
        icon={<LuX />}
        iconClassName="text-[15px] text-white"
        onClick={onClose}
        className={cx("absolute top-0 right-0 m-4 md:m-6", "bg-white/20 rounded-full")}
      />
      <div className="">
        {avatar ? (
          <img src={avatar} alt="Preview" className="h-[72px] w-[72px] rounded-full object-cover" />
        ) : (
          <>
            <Avatar
              src={staff?.avatarUrl}
              name={staff?.name}
              className={cx("rounded-full", "border-3 border-[var(--color-bg-light-primary-100)]")}
              width={72}
              height={72}
            />
          </>
        )}
      </div>
      <div className="text-center">
        <Item as="strong" children={staff?.name} itemClassName={cx("text-[18px] text-white")} />
        <Item
          as="span"
          icon={<LuMapPin />}
          children={staff?.facility}
          className={cx("flex gap-2 text-[12px] text-white/80")}
        />
      </div>
      <div className="flex items-center gap-2">
        <Item
          as="div"
          icon={staff?.role === "ADMIN" ? <LuShield /> : <LuHandshake />}
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
        <Item
          as="div"
          icon={
            <div
              className={cx(
                "w-2 h-2 rounded-full",
                staff?.featured ? "bg-[var(--color-primary)]" : "bg-[var(--color-error)]",
              )}
            />
          }
          children={staff?.featured ? "Đang làm việc" : "Tạm nghỉ"}
          className={cx(
            "px-2 py-1 text-[11px] rounded-full",
            "font-bold",

            "bg-white text-[var(--color-primary-900)]",
            "flex items-center gap-1 inline-flex",
          )}
        />
      </div>
      {/* Tabs */}
      <div className={cx("flex items-center pt-[10px] w-full")}>
        {tabs.map((t, i) => (
          <Button
            key={i}
            onClick={() => setTab(i)}
            children={t}
            className={cx("flex-1 py-2 text-[12.5px] font-semibold bg-transparent")}
            style={{
              color: tab === i ? "#fff" : "rgba(255,255,255,.6)",
              borderBottom: tab === i ? "2.5px solid #fff" : "2.5px solid transparent",
              transition: "all .15s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CardInfo({ icon: Icon, title, children, id, change }) {
  return (
    <div
      id={id}
      className={cx(
        "grid grid-cols-[36px_auto] gap-3 items-center py-3 px-4 rounded-xl",
        "bg-[var(--color-unavailable-100)]/30 border border-[var(--color-unavailable-300)]/50",
      )}
    >
      <Item
        as="div"
        icon={<Icon />}
        iconClassName={cx("text-[15px] text-[var(--color-primary)]")}
        className={cx("w-[36px] h-[36px] flex items-center justify-center")}
      />
      <div className="flex items-center justify-between gap-4">
        <div>
          <Item
            as="span"
            children={title}
            itemClassName={cx("text-[10.5px] font-semibold text-[var(--color-unavailable-700)]")}
          />
          {children}
        </div>
        {change ? (
          <Button
            width={"auto"}
            height={"auto"}
            children={"Đổi"}
            className={cx(
              "text-[10.5px] py-1 px-3 text-[var(--color-primary-900)] rounded-lg",
              "bg-[var(--color-primary)]/10 border border-[var(--color-primary-300)]",
              "font-bold inline",
            )}
          />
        ) : null}
      </div>
    </div>
  );
}

function Information({ staff }) {
  const dateNow = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const positionConfig = POSITION_OPTIONS.find((position) => position.value === staff?.position);
  return (
    <div className="flex flex-col gap-2.5">
      <CardInfo icon={LuMail} title={"Email"} id={"email"}>
        <Item as="strong" children={staff?.email} itemClassName={cx("text-[13px] line-clamp-1")} />
      </CardInfo>
      <CardInfo icon={LuPhone} title={"Liên hệ"} id={"phone"}>
        <Item as="strong" children={staff?.phone} itemClassName={cx("text-[13px]")} />
      </CardInfo>
      <CardInfo icon={LuBriefcase} title={"Chức vụ"} id={"position"}>
        <Item
          as="strong"
          children={positionConfig ? positionConfig.name : staff?.position}
          itemClassName={cx("text-[13px]")}
        />
      </CardInfo>
      <CardInfo icon={LuUsers} title={"Phòng ban"} id={"deparment"}>
        <Item as="strong" children={staff?.department || "chưa có"} itemClassName={cx("text-[13px] line-clamp-1")} />
      </CardInfo>
      <CardInfo icon={LuCalendar} title={"Ngày thêm vào"} id={"createdAt"}>
        <Item as="strong" children={staff?.createdAt || dateNow} itemClassName={cx("text-[13px]")} />
      </CardInfo>
    </div>
  );
}

function Security({ staff }) {
  const roleConfig = ROLE_OPTIONS.find((role) => role.value === staff?.role);

  return (
    <div className="flex flex-col gap-2.5">
      <CardInfo icon={LuMail} title={"Tài khoản"} id={"email"} change={true}>
        <Item as="strong" children={staff?.email} itemClassName={cx("text-[13px] line-clamp-1")} />
      </CardInfo>
      <CardInfo icon={LuKeyRound} title={"Mật khẩu"} id={"password"} change={true}>
        <Item as="strong" children={staff?.password ? "••••••••••" : "**********"} itemClassName={cx("text-[13px]")} />
      </CardInfo>
      <CardInfo icon={LuShield} title={"Vai trò hệ thống"} id={"role"} change={true}>
        <Item as="strong" children={roleConfig ? roleConfig.name : staff?.role} itemClassName={cx("text-[13px]")} />
      </CardInfo>
    </div>
  );
}
