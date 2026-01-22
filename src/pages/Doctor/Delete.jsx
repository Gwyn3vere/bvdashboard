import classNames from "classnames/bind";
import React from "react";
import styles from "../../styles/pages.module.css";
import { TitleForm, Button } from "../../components/ui";
import { useDoctorStore } from "../../store/doctorStore";

const cx = classNames.bind(styles);

function Delete({ onClose, doctorId }) {
  const getDoctorById = useDoctorStore((doc) => doc.getDoctorById);
  const deleteDoctor = useDoctorStore((s) => s.deleteDoctor);
  const setEditingDoctorId = useDoctorStore((s) => s.setEditingDoctorId);

  const doctor = getDoctorById(doctorId);
  if (!doctor) return null;

  const handleConfirmDelete = () => {
    if (!doctorId) return;

    deleteDoctor(doctorId);
    setEditingDoctorId(null);
    onClose();
  };
  return (
    <>
      <TitleForm
        onClose={onClose}
        title={"Cảnh báo"}
        subTitle={
          <span>
            Hành động này sẽ xoá vĩnh viễn thông tin bác sĩ{" "}
            <span className="font-semibold text-[var(--color-error)]">{doctor.name}</span> khỏi hệ thống! Bạn có muốn
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
