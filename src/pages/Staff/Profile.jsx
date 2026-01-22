import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { TitleForm, Item } from "../../components/ui";
import { useStaffStore } from "../../store/staffStore";
import { LuUser } from "react-icons/lu";

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
            Hồ sơ thông tin nhân sự <span className="font-semibold text-[var(--color-error)]">{staff.name}</span>
          </span>
        }
      />
      <div className="p-6">
        <Avatar avatar={staff.avatar} />
      </div>
    </>
  );
}

export default React.memo(Profile);

function Avatar({ avatar }) {
  return (
    <div className="flex flex-col items-center justify-center mb-6 gap-2">
      <div className="relative">
        {avatar ? (
          <img src={avatar} alt="Preview" className="h-[120px] w-[120px] rounded-full object-cover" />
        ) : (
          <>
            <div
              className={cx(
                "flex items-center justify-center cursor-pointer",
                "h-[120px] w-[120px] rounded-full bg-[var(--color-primary-300)]"
              )}
            >
              <LuUser className="text-white text-4xl" />
            </div>
          </>
        )}
      </div>
      <Item as="span" children={"Ảnh đại diện"} />
    </div>
  );
}
