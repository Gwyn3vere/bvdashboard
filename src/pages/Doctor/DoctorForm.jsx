import classNames from "classnames/bind";
import React, { useState, useEffect, useMemo } from "react";
import { POSITION_OPTIONS, DOCTOR_TITLES_OPTIONS } from "../../constants/option";
import { MOCK_DEPARTMENTS, MOCK_SPECIALTIES } from "../../mock/expertise";
import { useMultiStep } from "../../components/hooks";
import { INITIAL_DETAIL_DOCTOR } from "../../constants/field";
import styles from "../../styles/pages.module.css";
import {
  Item,
  Form,
  Input,
  Button,
  Select,
  TextArea,
  ArrayInput,
  TitleForm,
  Toast,
  TagInput,
  StepBar,
} from "../../components/ui";
import { LuCamera, LuUser } from "react-icons/lu";
import { slugify } from "../../utils/format";
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
          children={isLast ? (staff ? "Chỉnh sửa nhân sự" : "Thêm nhân sự") : "Tiếp theo →"}
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

function MainForm({ value, setValue, getFieldError, validateField }) {
  const [previewAvatar, setPreviewAvatar] = useState(null);

  useEffect(() => {
    const title = value?.title?.trim() || "";
    const name = value?.name?.trim() || "";

    if (title || name) {
      const slug = slugify(`${title} ${name}`);

      setValue("slug", slug);
    } else {
      setValue("slug", "");
    }
  }, [value?.name, value?.title, setValue]);

  useEffect(() => {
    if (!value.avatar) {
      setPreviewAvatar(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value.avatar);
    setPreviewAvatar(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value.avatar]);

  const handleChangeAvatar = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Vui lòng chọn một tệp hình ảnh hợp lệ.");
      return;
    }

    setValue("avatar", selectedFile);
  };
  const handleChangeDepartment = (val) => {
    setValue("department", val);
    setValue("specialty", null);
  };
  const handleBlur = (fieldName) => {
    validateField(fieldName, value);
  };

  const SPECIALTIES_LIST = useMemo(() => {
    if (!value?.department) return [];

    const dept = MOCK_DEPARTMENTS.find((d) => d.value === value.department);
    if (!dept) return [];

    return MOCK_SPECIALTIES.filter((s) => s.departmentId === dept.id);
  }, [value?.department]);

  return (
    <>
      {/* Avatar Upload */}
      <div className="flex flex-col items-center justify-center mb-6 gap-2">
        <div className="relative">
          {previewAvatar ? (
            <img src={previewAvatar} alt="Preview" className="h-[120px] w-[120px] rounded-full object-cover" />
          ) : (
            <>
              <div
                className={cx(
                  "flex items-center justify-center cursor-pointer",
                  "h-[120px] w-[120px] rounded-full bg-[var(--color-primary-300)]",
                )}
              >
                <LuUser className="text-white text-4xl" />
              </div>
              <div
                className={cx(
                  "flex items-center justify-center",
                  "w-8 h-8 rounded-full bg-white",
                  "absolute bottom-0 right-0 border border-gray-300",
                )}
              >
                <LuCamera className="text-green-500 text-xl" />
              </div>
            </>
          )}

          <Input
            width={100}
            height={120}
            type="file"
            accept="image/*"
            onChange={handleChangeAvatar}
            inputClassName="rounded-full"
            className={cx("opacity-0 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2")}
          />
        </div>
        <Item as="span" children={"Ảnh đại diện"} />
      </div>

      {/* Basic Information */}
      <div className={cx("flex flex-col gap-8")}>
        <div className="flex flex-col gap-2">
          <Input
            label={"Họ và tên"}
            name="name"
            type="text"
            value={value?.name}
            onChange={(val) => setValue("name", val.target.value)}
            onBlur={() => handleBlur("name")}
            error={getFieldError("name")}
            placeholder="Nguyễn Văn A"
            required
          />
          <Select
            name="title"
            data={DOCTOR_TITLES_OPTIONS}
            value={value?.title}
            onChange={(val) => setValue("title", val)}
            onBlur={() => handleBlur("title")}
            error={getFieldError("title")}
            placeholder="Chọn chức danh"
            required
          />
          <Input
            name="slug"
            type="text"
            value={value?.slug}
            readOnly
            disabled
            onChange={(val) => setValue("slug", val.target.value)}
            placeholder="Slug (tự động tạo)"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Select
            label="Khoa"
            name="department"
            data={MOCK_DEPARTMENTS}
            value={value?.department}
            onChange={handleChangeDepartment}
            onBlur={() => handleBlur("department")}
            error={getFieldError("department")}
            placeholder="Chọn khoa"
            required
          />
          <Select
            name="specialty"
            data={SPECIALTIES_LIST}
            value={value?.specialty}
            onChange={(val) => setValue("specialty", val)}
            onBlur={() => handleBlur("specialty")}
            error={getFieldError("specialty")}
            placeholder={value?.department ? "Chọn chuyên khoa" : "Vui lòng chọn khoa trước"}
            required
          />
          <Select
            name="position"
            data={POSITION_OPTIONS}
            value={value?.position}
            onChange={(val) => setValue("position", val)}
            onBlur={() => handleBlur("position")}
            error={getFieldError("position")}
            placeholder="Chọn chức vụ"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <TagInput
            label={"Tags & Ngôn ngữ"}
            name="tags"
            values={value?.tags}
            onChange={(tags) => setValue("tags", tags)}
          />
          <TagInput
            name="languages"
            values={value?.languages}
            onChange={(languages) => setValue("languages", languages)}
            placeholder="Thêm ngôn ngữ..."
          />
          <Item as="span" children={"Ấn Enter sau khi nhập"} itemClassName={cx("text-[12px] text-gray-500")} />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            label={"Kinh nghiệm (năm)"}
            name="experienceYears"
            type="number"
            value={value?.experienceYears}
            onChange={(val) => setValue("experienceYears", val.target.value)}
            onBlur={() => handleBlur("experienceYears")}
            error={getFieldError("experienceYears")}
            placeholder=""
            required
          />
          <TextArea
            name="facility"
            type="text"
            value={value?.facility}
            onChange={(val) => setValue("facility", val.target.value)}
            onBlur={() => handleBlur("facility")}
            error={getFieldError("facility")}
            placeholder="Nhập cơ sở công tác"
            rows={3}
            required
          />
        </div>
      </div>
    </>
  );
}

function InfoForm({ value, setValue }) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <TextArea
            label={"Bio"}
            name="bio"
            type="text"
            value={value?.bio}
            onChange={(val) => setValue("bio", val.target.value)}
            placeholder="Nhập thông tin về bác sĩ"
            rows={3}
          />
          <Input
            name="scheduleNote"
            type="text"
            value={value?.scheduleNote}
            onChange={(val) => setValue("scheduleNote", val.target.value)}
            placeholder="Thứ 2 - Thứ 6"
          />
        </div>
        <div className="flex flex-col gap-2">
          <ArrayInput
            label="Thế mạnh chuyên môn"
            name="expertise"
            value={value?.expertise}
            onChange={(val) => setValue("expertise", val)}
            placeholder="Nhập chuyên môn..."
            inputClassName="w-full"
            buttonText="+"
          />
        </div>
        <div className="flex flex-col gap-2">
          <ArrayInput
            label="Quá trình công tác"
            name="experience"
            value={value?.experience}
            onChange={(val) => setValue("experience", val)}
            placeholder="Nhập quá trình công tác..."
            inputClassName="w-full"
            buttonText="+"
          />
        </div>
        <div className="flex flex-col gap-2">
          <ArrayInput
            label="Quá trình đào tạo"
            name="education"
            value={value?.education}
            onChange={(val) => setValue("education", val)}
            placeholder="Nhập quá trình đào tạo..."
            inputClassName="w-full"
            buttonText="+"
          />
        </div>
        <div className="flex flex-col gap-2">
          <ArrayInput
            label="Bài viết và công trình nghiên cứu đã công bố"
            name="publications"
            value={value?.publications}
            onChange={(val) => setValue("publications", val)}
            placeholder="Nhập bài viết và công trình nghiên cứu đã công bố..."
            inputClassName="w-full"
            buttonText="+"
          />
        </div>
      </div>
    </>
  );
}
