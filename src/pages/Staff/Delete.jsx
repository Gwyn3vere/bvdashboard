import classNames from "classnames/bind";
import React from "react";
import styles from "../../styles/pages.module.css";
import { TitleForm, Button } from "../../components/ui";
import { useStaffStore } from "../../store/staffStore";

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
    <>
      <TitleForm
        onClose={onClose}
        title={"Cảnh báo"}
        subTitle={
          <span>
            Hành động này sẽ xoá vĩnh viễn thông tin nhân sự{" "}
            <span className="font-semibold text-[var(--color-error)]">{staff.name}</span> khỏi hệ thống! Bạn có muốn
            tiếp tục?
          </span>
        }
      />

      <div className="sticky bottom-0 p-6 flex gap-3">
        <Button
          type="button"
          children={"Huỷ"}
          onClick={onClose}
          width="100%"
          className={cx(
            "text-gray-700 font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]"
          )}
        />
        <Button
          type={"button"}
          children={"Xác nhận"}
          onClick={handleConfirmDelete}
          width="100%"
          className="bg-[var(--color-error)] text-white font-semibold"
        />
      </div>
    </>
  );
}

export default React.memo(Delete);
