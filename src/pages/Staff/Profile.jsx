import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TitleForm, Item, Button } from "../../components/ui";
import { useStaffStore } from "../../store/staffStore";
import { POSITION_OPTIONS, ROLE_OPTIONS } from "../../constants/option";
import {
  LuUser,
  LuMapPin,
  LuMail,
  LuEllipsisVertical,
  LuKeyRound,
  LuPhone,
  LuBriefcase,
  LuShield
} from "react-icons/lu";

const cx = classNames.bind(styles);

function Profile({ onClose, staffId }) {
  const getStaffById = useStaffStore((s) => s.getStaffById);

  const staff = getStaffById(staffId);
  if (!staff) return null;
  return (
    <>
      <TitleForm
        onClose={onClose}
        title={"Hồ sơ nhân sự"}
        subTitle={
          <span>
            Hồ sơ thông tin nhân sự <span className="font-semibold text-[var(--color-primary)]">{staff.name}</span>
          </span>
        }
      />

      <div className="p-6 bg-[var(--color-primary-100)]">
        <Avatar avatar={staff.avatar} staff={staff} />
        <Infomation staff={staff} />
      </div>
    </>
  );
}

export default React.memo(Profile);

function Avatar({ avatar, staff }) {
  return (
    <div className="flex flex-col items-center justify-center mb-6 gap-4">
      <div className="relative">
        {avatar ? (
          <img src={avatar} alt="Preview" className="h-[120px] w-[120px] rounded-full object-cover" />
        ) : (
          <>
            <div
              className={cx(
                "flex items-center justify-center cursor-pointer",
                "h-[120px] w-[120px] rounded-full bg-[var(--color-primary-300)]",
                "border-5 border-[var(--color-bg-light-primary-100)]"
              )}
              style={{ boxShadow: "var(--shadow)" }}
            >
              <LuUser className="text-white text-4xl" />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col items-center gap-1">
        <Item as="strong" children={staff?.name} itemClassName={cx("text-xl")} />
        <Item as="span" icon={<LuMapPin />} children={staff?.facility} className={cx("flex gap-2 text-sm")} />
      </div>
    </div>
  );
}

function CardInfo({ icon: Icon, title, children, id }) {
  return (
    <div
      id={id}
      className={cx("flex items-center justify-between p-4 rounded-[8px]", "bg-[var(--color-bg-light-primary-100)]")}
    >
      <div className="flex items-center gap-4">
        <Item
          as="div"
          icon={<Icon />}
          iconClassName={cx("text-3xl text-[var(--color-primary)]")}
          className={cx("px-2")}
        />
        <div>
          <Item as="span" children={title} itemClassName={cx("text-lg font-semibold")} />
          {children}
        </div>
      </div>
      <Button type={"button"} icon={<LuEllipsisVertical />} width={50} />
    </div>
  );
}

function Infomation({ staff }) {
  const positionConfig = POSITION_OPTIONS.find((position) => position.value === staff?.position);
  const roleConfig = ROLE_OPTIONS.find((role) => role.value === staff?.role);
  return (
    <div className="flex flex-col gap-1">
      <CardInfo icon={LuMail} title={"Email"} id={"email"}>
        <Item as="span" children={staff?.email} itemClassName={cx("text-[15px]")} />
      </CardInfo>
      <CardInfo icon={LuKeyRound} title={"Mật khẩu"} id={"password"}>
        <Item as="span" children={staff?.password ? "********" : ""} itemClassName={cx("text-[15px]")} />
      </CardInfo>
      <CardInfo icon={LuPhone} title={"Liên hệ"} id={"phone"}>
        <Item as="span" children={staff?.phone} itemClassName={cx("text-[15px]")} />
      </CardInfo>
      <CardInfo icon={LuBriefcase} title={"Chức vụ"} id={"position"}>
        <Item
          as="span"
          children={positionConfig ? positionConfig.name : staff?.position}
          itemClassName={cx("text-[15px]")}
        />
      </CardInfo>
      <CardInfo icon={LuShield} title={"Vai trò hệ thống"} id={"role"}>
        <Item as="span" children={roleConfig ? roleConfig.name : staff?.role} itemClassName={cx("text-[15px]")} />
      </CardInfo>
    </div>
  );
}
