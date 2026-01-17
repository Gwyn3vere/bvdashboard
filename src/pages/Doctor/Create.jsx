import classNames from "classnames/bind";
import React, { useState, useEffect, useMemo } from "react";
import {
  DEPARTMENTS_OPTIONS,
  SPECIALTIES_OPTIONS,
  TAGS_DOCTOR_OPTIONS,
  LANGUAGE_OPTIONS
} from "../../constants/option";
import { useForm, usePagination } from "../../components/hooks";
import { INITIAL_DOCTOR } from "../../constants/field";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { Item, Form, Input, Button, Select, TagsSelector, TextArea } from "../../components/ui";
import { LuX, LuCamera, LuUser, LuSearch, LuPlus } from "react-icons/lu";

const cx = classNames.bind(styles);

function Create({ onClose }) {
  const { values, setFieldValue } = useForm({
    initialValues: INITIAL_DOCTOR
  });
  const component = [
    { id: 1, component: <MainForm value={values} setValue={setFieldValue} /> },
    { id: 2, component: <InfoForm /> }
  ];
  const { currentPage, totalPages, pagedData, nextPage, prevPage } = usePagination(component, 1);

  return (
    <>
      <TitleForm onClose={onClose} />

      {/* Content */}
      <Form id="doctorForm" className="space-y-4 p-6 overflow-y-auto hidden-scrollbar max-h-[90vh]">
        {pagedData !== 0 ? (
          pagedData.map((item) => <div key={item.id}>{item.component}</div>)
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </Form>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
        <Button
          type="button"
          children={"Quay lại"}
          onClick={prevPage}
          disabled={currentPage === 1}
          width="100%"
          className={cx(
            "text-gray-700 font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]"
          )}
        />
        <Button
          type={currentPage < totalPages ? "button" : "submit"}
          form={currentPage < totalPages ? "" : "doctorForm"}
          children={currentPage < totalPages ? "Tiếp theo" : "Xác nhận"}
          onClick={(e) => {
            if (currentPage < totalPages) {
              e.preventDefault();
              nextPage();
            }
          }}
          width="100%"
          className="bg-[var(--color-primary)] text-white font-semibold"
        />
      </div>
    </>
  );
}

export default React.memo(Create);

function TitleForm({ onClose }) {
  return (
    <div
      className={cx(
        "sticky top-0 bg-white border-b border-gray-200",
        "p-6 flex items-center justify-between z-10 rounded-t-[8px]"
      )}
    >
      <div>
        <Item as="h3" children="Thêm bác sĩ" className="text-xl font-bold text-gray-900" />
        <Item
          as="div"
          children="Điền đầy đủ thông tin bác sĩ vào danh sách của bạn."
          className="text-sm text-gray-600 mt-1"
        />
      </div>
      <Button
        width={50}
        height={50}
        icon={<LuX />}
        iconClassName="text-2xl"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600"
      />
    </div>
  );
}

function MainForm({ value, setValue }) {
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const handleChangeAvatar = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Vui lòng chọn một tệp hình ảnh hợp lệ.");
      return;
    }

    setValue("avatar", selectedFile);
  };

  useEffect(() => {
    if (!value.avatar) {
      setPreviewAvatar(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value.avatar);
    setPreviewAvatar(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value.avatar]);

  const filteredSpecialties = useMemo(() => {
    if (!value?.department) return [];

    const department = DEPARTMENTS_OPTIONS.find((item) => item.value === value.department);

    return SPECIALTIES_OPTIONS.filter((item) => item.departmentId === department?.id);
  }, [value?.department]);

  const handleChangeDepartment = (val) => {
    setValue("department", val);
    setValue("specialty", null);
  };

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
                  "h-[120px] w-[120px] rounded-full bg-[var(--color-primary-300)]"
                )}
              >
                <LuUser className="text-white text-4xl" />
              </div>
              <div
                className={cx(
                  "flex items-center justify-center",
                  "w-8 h-8 rounded-full bg-white",
                  "absolute bottom-0 right-0 border border-gray-300"
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
            placeholder="Nguyễn Văn A"
          />
          <Input
            name="title"
            type="text"
            value={value?.title}
            onChange={(val) => setValue("title", val.target.value)}
            placeholder="BS.CKII"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Select
            label="Khoa"
            name="department"
            data={DEPARTMENTS_OPTIONS}
            value={value?.department}
            onChange={handleChangeDepartment}
            placeholder="Chọn khoa"
            required
          />
          <Select
            name="specialty"
            data={filteredSpecialties}
            value={value?.specialty}
            onChange={(val) => setValue("specialty", val)}
            placeholder={value?.department ? "Chọn chuyên khoa" : "Vui lòng chọn khoa trước"}
            required
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <TagsSelector
            label={"Tags"}
            data={TAGS_DOCTOR_OPTIONS}
            value={value?.tags}
            onChange={(val) => setValue("tags", val)}
          />
          <Button
            type="button"
            width={"auto"}
            height={"auto"}
            className={cx(TWCSS.tagButton)}
            icon={<LuPlus />}
            children={"Thêm tag mới"}
          />
          <Button
            type="button"
            width={"auto"}
            height={"auto"}
            className={cx(TWCSS.tagButton)}
            icon={<LuSearch />}
            children={"Tim kiếm tag"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            label={"Kinh nghiệm (năm)"}
            name="experienceYears"
            type="number"
            value={value?.experienceYears}
            onChange={(val) => setValue("experienceYears", val.target.value)}
            placeholder=""
          />
          <TextArea
            name="facility"
            type="text"
            value={value?.facility}
            onChange={(val) => setValue("facility", val.target.value)}
            placeholder="Nhập cơ sở công tác"
            rows={3}
          />
        </div>
        <div className="flex flex-col gap-2">
          <TagsSelector
            label={"Ngôn ngữ"}
            data={LANGUAGE_OPTIONS}
            value={value?.languages}
            onChange={(val) => setValue("languages", val)}
          />
        </div>
      </div>
    </>
  );
}

function InfoForm() {
  return <div>InfoForm</div>;
}
