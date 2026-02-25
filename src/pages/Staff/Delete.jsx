import classNames from "classnames/bind";
import React from "react";
import styles from "../../styles/pages.module.css";
import { TitleForm, Item, Button } from "../../components/ui";
import { useStaffStore } from "../../store/staffStore";
import { LuTrash } from "react-icons/lu";

const cx = classNames.bind(styles);

function Delete({ onClose, staffId }) {
  const getStaffById = useStaffStore((s) => s.getStaffById);
  const deleteStaff = useStaffStore((s) => s.deleteStaff);
  const setEditingStaffId = useStaffStore((s) => s.setEditingStaffId);

  const staff = getStaffById(staffId);
  if (!staff) return null;

  const handleConfirmDelete = () => {
    if (!staffId) return;

    deleteStaff(staffId);
    setEditingStaffId(null);
    onClose();
  };
  return (
    <div className={cx("bg-white px-8 py-7 flex flex-col items-center")}>
      <Button
        width={56}
        height={56}
        icon={<LuTrash />}
        iconClassName={cx("text-[24px] text-[var(--color-error)]")}
        className={cx("bg-[var(--color-error)]/20 rounded-2xl mx-auto mb-[16px]")}
      />

      <Item children={"Xoá nhân sự?"} itemClassName={cx("text-[17px] font-bold")} />
      <Item
        children={
          <span>
            Bạn có chắc muốn xoá <strong className="text-black">{staff?.name}</strong>
            <br />
            <span>Hành động này không thể hoàn tác.</span>
          </span>
        }
        itemClassName={cx("text-[13px] text-[var(--color-unavailable-700)]")}
        className={cx("text-center mt-2 mb-7")}
      />

      <div className="flex gap-3 w-full">
        <Button
          type="button"
          children={"Huỷ"}
          onClick={onClose}
          width="100%"
          className={cx(
            "text-[var(--color-unavailable-900)] font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]",
            "rounded-xl",
            "font-semibold text-[13px]",
          )}
        />
        <Button
          type={"button"}
          children={"Xác nhận"}
          onClick={handleConfirmDelete}
          width="100%"
          className={cx("bg-linear-[var(--color-ln-error)] rounded-xl", "text-white font-semibold text-[13px]")}
        />
      </div>
    </div>
  );
}

export default React.memo(Delete);
