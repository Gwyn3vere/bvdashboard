import classNames from "classnames/bind";
import React from "react";
import { useMultiStep } from "../../components/hooks";
import { INITIAL_DETAIL_DOCTOR } from "../../constants/field";
import styles from "../../styles/pages.module.css";
import { Form, Button, TitleForm, Toast, StepBar } from "../../components/ui";
import { validateDoctor } from "../../utils/validation";
import { useDoctorStore } from "../../store/doctorStore";
import { Information, Expertise, InDeptProfile, Experience } from "./index";

const cx = classNames.bind(styles);

function DoctorForm({ onClose }) {
  const getDoctorById = useDoctorStore((doc) => doc.getDoctorById);
  const editingDoctorId = useDoctorStore((s) => s.editingDoctorId);
  const doctor = editingDoctorId ? getDoctorById(editingDoctorId) : null;

  const {
    values,
    setFieldValue,
    reset,
    validateField,
    getFieldError,
    currentPage,
    totalSteps,
    isFirst,
    isLast,
    handleNext,
    prevPage,
    handleSubmit,
    toast,
    setToast,
  } = useMultiStep({
    initialValues: INITIAL_DETAIL_DOCTOR,
    editValues: doctor,
    validate: validateDoctor,
    totalSteps: 4,
  });

  const renderStep = () => {
    if (currentPage === 1)
      return (
        <Information
          value={values}
          setValue={setFieldValue}
          getFieldError={getFieldError}
          validateField={validateField}
        />
      );
    if (currentPage === 2)
      return (
        <Expertise
          value={values}
          getFieldError={getFieldError}
          setValue={setFieldValue}
          validateField={validateField}
        />
      );
    if (currentPage === 3)
      return (
        <InDeptProfile
          value={values}
          getFieldError={getFieldError}
          setValue={setFieldValue}
          validateField={validateField}
        />
      );
    if (currentPage === 4)
      return (
        <Experience
          value={values}
          getFieldError={getFieldError}
          setValue={setFieldValue}
          validateField={validateField}
        />
      );
  };

  const STEP_LABELS = ["Thông tin cơ bản", "Khoa & Chuyên môn", "Hồ sơ chuyên sâu", "Kinh nghiệm & Nghiên cứu"];

  return (
    <>
      <TitleForm
        onClose={() => {
          onClose();
          reset();
        }}
        title={doctor ? "Chỉnh sửa bác sĩ" : "Thêm bác sĩ"}
        subTitle={`Bước ${currentPage} / ${totalSteps} · ${STEP_LABELS[currentPage - 1]}`}
      />

      <StepBar currentPage={currentPage} totalSteps={totalSteps} steps={STEP_LABELS} />

      {/* Content */}
      <Form
        id="doctorForm"
        noValidate
        onSubmit={(e) =>
          handleSubmit(e, (data) => {
            console.log("Submit:", data);
            onClose();
            reset();
          })
        }
        className="space-y-4 p-3 md:p-6 bg-white overflow-y-auto hidden-scrollbar max-h-[90vh]"
      >
        {renderStep()}
      </Form>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-3 py-6 md:p-6 flex gap-3">
        <Button
          type="button"
          children={isFirst ? "Huỷ" : "← Quay lại"}
          onClick={isFirst ? onClose : prevPage}
          width="100%"
          height={38}
          className={cx(
            "bg-[var(--color-unavailable-100)]",
            "text-[var(--color-unavailable-700)] font-bold text-[13px] rounded-xl",
          )}
        />
        <Button
          type={isLast ? "submit" : "button"}
          form={isLast ? "staffForm" : ""}
          children={isLast ? (doctor ? "Chỉnh sửa nhân sự" : "Thêm nhân sự") : "Tiếp theo →"}
          onClick={(e) => {
            if (!isLast) {
              e.preventDefault();
              handleNext();
            }
          }}
          width="100%"
          height={38}
          className={cx("bg-linear-[var(--color-ln-primary)]", "text-white font-bold text-[13px] rounded-xl")}
        />
      </div>

      <Toast
        visible={!!toast}
        duration={3000}
        position="bottom-right"
        onClose={() => setToast(null)}
        type={toast?.type}
        content={toast?.message}
      />
    </>
  );
}

export default React.memo(DoctorForm);
