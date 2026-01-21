import classNames from "classnames/bind";
import React, { useState, useEffect, useMemo } from "react";
import {
  DEPARTMENTS_OPTIONS,
  SPECIALTIES_OPTIONS,
  TAGS_DOCTOR_OPTIONS,
  DOCTOR_TITLES_OPTIONS,
  LANGUAGE_OPTIONS
} from "../../constants/option";
import { useForm, usePagination, useActive, useSearch, useValidation } from "../../components/hooks";
import { INITIAL_DETAIL_DOCTOR } from "../../constants/field";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import {
  Item,
  Form,
  Input,
  Button,
  Select,
  TagsSelector,
  TextArea,
  Modal,
  ArrayInput,
  TitleForm,
  Toast
} from "../../components/ui";
import { LuX, LuCamera, LuUser, LuSearch, LuPlus } from "react-icons/lu";
import { slugify } from "../../utils/format";
import { validateDoctor } from "../../utils/validation";
import { useDoctorStore } from "../../store/doctorStore";

const cx = classNames.bind(styles);

function Edit({ onClose }) {
  const getDoctorById = useDoctorStore((doc) => doc.getDoctorById);
  const editingDoctorId = useDoctorStore((s) => s.editingDoctorId);
  const doctor = editingDoctorId ? getDoctorById(editingDoctorId) : null;

  const { values, setFieldValue } = useForm({
    initialValues: INITIAL_DETAIL_DOCTOR,
    editValues: doctor
  });
  const [toast, setToast] = useState(null);
  const { validate, validateField, setAllTouched, getFieldError } = useValidation(validateDoctor);
  const component = [
    {
      id: 1,
      component: (
        <MainForm value={values} setValue={setFieldValue} getFieldError={getFieldError} validateField={validateField} />
      )
    },
    {
      id: 2,
      component: (
        <InfoForm value={values} setValue={setFieldValue} getFieldError={getFieldError} validateField={validateField} />
      )
    }
  ];

  const { currentPage, totalPages, pagedData, nextPage, prevPage } = usePagination(component, 1);

  const handleNext = () => {
    const isValid = validate(values);
    if (isValid) {
      nextPage();
    } else {
      setAllTouched(values);
      setToast({
        type: "INFO",
        message: "Vui lòng điền đầy đủ thông tin bắt buộc"
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate(values);
    if (!isValid) {
      setAllTouched(values);
      setToast({
        type: "INFO",
        message: "Vui lòng điền đầy đủ thông tin bắt buộc"
      });
      return;
    }

    // Gửi data lên server
    console.log("Submit data:", values);
    // submitDoctor(values);
  };

  return (
    <>
      <TitleForm
        onClose={onClose}
        title={"Cập nhật bác sĩ"}
        subTitle={"Điền đầy đủ thông tin bác sĩ vào danh sách của bạn."}
      />

      {/* Content */}
      <Form
        id="doctorForm"
        onSubmit={handleSubmit}
        className="space-y-4 p-6 overflow-y-auto hidden-scrollbar max-h-[90vh]"
      >
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
              handleNext();
            }
          }}
          width="100%"
          className="bg-[var(--color-primary)] text-white font-semibold"
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

export default React.memo(Edit);

function MainForm({ value, setValue, getFieldError, validateField }) {
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [tagKeyword, setTagKeyword] = useState("");
  const [languageKeyword, setLanguageKeyword] = useState("");

  const selectedTags = TAGS_DOCTOR_OPTIONS.filter((tag) => value?.tags?.includes(tag.name));
  const searchedTags = useSearch(TAGS_DOCTOR_OPTIONS, tagKeyword, (tag) => tag.name, Infinity);
  const filteredTags = useMemo(() => {
    const merged = [
      ...selectedTags,
      ...searchedTags.filter((tag) => !selectedTags.some((sel) => sel.value === tag.value))
    ];

    return merged.slice(0, 9);
  }, [selectedTags, searchedTags]);

  const filteredLanguages = useSearch(LANGUAGE_OPTIONS, languageKeyword, (lang) => lang.name, 5);

  const modal = {
    addTag: useActive(),
    searchTag: useActive(),
    addLanguage: useActive(),
    searchLanguage: useActive()
  };

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

  const filteredSpecialties = useMemo(() => {
    if (!value?.department) return [];

    const department = DEPARTMENTS_OPTIONS.find((item) => item.value === value.department);

    return SPECIALTIES_OPTIONS.filter((item) => item.departmentId === department?.id);
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
            data={DEPARTMENTS_OPTIONS}
            value={value?.department}
            onChange={handleChangeDepartment}
            onBlur={() => handleBlur("department")}
            error={getFieldError("department")}
            placeholder="Chọn khoa"
            required
          />
          <Select
            name="specialty"
            data={filteredSpecialties}
            value={value?.specialty}
            onChange={(val) => setValue("specialty", val)}
            onBlur={() => handleBlur("specialty")}
            error={getFieldError("specialty")}
            placeholder={value?.department ? "Chọn chuyên khoa" : "Vui lòng chọn khoa trước"}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <TagsSelector
            label={"Tags"}
            data={filteredTags}
            value={value?.tags}
            onChange={(val) => setValue("tags", val)}
            required
          />
          <div className="flex gap-2">
            <Button
              type="button"
              width={"auto"}
              height={"auto"}
              className={cx(TWCSS.tagButton)}
              onClick={modal.addTag.toggleActive}
              icon={<LuPlus />}
              children={"Thêm tag mới"}
            />
            <Button
              type="button"
              width={"auto"}
              height={"auto"}
              className={cx(TWCSS.tagButton, modal.searchTag.isActive && TWCSS.tagButtonActive)}
              onClick={modal.searchTag.toggleActive}
              icon={<LuSearch />}
              children={"Tim kiếm tag"}
            />
          </div>
          {modal.searchTag.isActive && (
            <div className="w-full">
              <Input
                type="text"
                value={tagKeyword}
                onChange={(e) => setTagKeyword(e.target.value)}
                name="searchTag"
                placeholder="Nhập tên tag cần tìm kiếm"
              />
            </div>
          )}
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
        <div className="flex flex-col gap-2">
          <TagsSelector
            label={"Ngôn ngữ"}
            data={filteredLanguages}
            value={value?.languages}
            onChange={(val) => setValue("languages", val)}
            required
          />
          <div className="flex gap-2">
            <Button
              type="button"
              width={"auto"}
              height={"auto"}
              className={cx(TWCSS.tagButton)}
              onClick={modal.addLanguage.toggleActive}
              icon={<LuPlus />}
              children={"Thêm ngôn ngữ"}
            />
            <Button
              type="button"
              width={"auto"}
              height={"auto"}
              className={cx(TWCSS.tagButton, modal.searchLanguage.isActive && TWCSS.tagButtonActive)}
              onClick={modal.searchLanguage.toggleActive}
              icon={<LuSearch />}
              children={"Tim kiếm ngôn ngữ"}
            />
          </div>
          {modal.searchLanguage.isActive && (
            <div className="w-full">
              <Input
                type="text"
                value={languageKeyword}
                onChange={(e) => setLanguageKeyword(e.target.value)}
                name="searchLanguage"
                placeholder="Nhập tên ngôn ngữ cần tìm kiếm"
              />
            </div>
          )}
        </div>
      </div>

      {/* Modal Tag - Languages Add */}
      <>
        <Modal open={modal.addTag.isActive} onClose={modal.addTag.deactivate} backdrop={true} width="max-w-xl">
          <>
            <TitleForm
              onClose={modal.addTag.deactivate}
              title={"Thêm tag mới"}
              subTitle={"Thêm tag mới vào danh sách."}
            />
            <Form id={"tagForm"} className="p-6">
              <Input type="text" name="newTag" placeholder="Nhập tên tag mới" />
            </Form>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <Button
                type="button"
                children={"Huỷ"}
                onClick={modal.addTag.deactivate}
                width="100%"
                className={cx(
                  "text-gray-700 font-semibold transition-all duration-200",
                  "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]"
                )}
              />
              <Button
                type={"submit"}
                form={"tagForm"}
                children={"Xác nhận"}
                width="100%"
                className="bg-[var(--color-primary)] text-white font-semibold"
              />
            </div>
          </>
        </Modal>
        <Modal
          open={modal.addLanguage.isActive}
          onClose={modal.addLanguage.deactivate}
          backdrop={true}
          width="max-w-xl"
        >
          <>
            <TitleForm
              onClose={modal.addLanguage.deactivate}
              title={"Thêm ngôn ngữ mới"}
              subTitle={"Thêm ngôn ngữ mới vào danh sách."}
            />
            <Form id={"languageForm"} className="p-6">
              <Input type="text" name="newLanguage" placeholder="Nhập tên ngôn ngữ mới" />
            </Form>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
              <Button
                type="button"
                children={"Huỷ"}
                onClick={modal.addLanguage.deactivate}
                width="100%"
                className={cx(
                  "text-gray-700 font-semibold transition-all duration-200",
                  "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]"
                )}
              />
              <Button
                type={"submit"}
                form={"languageForm"}
                children={"Xác nhận"}
                width="100%"
                className="bg-[var(--color-primary)] text-white font-semibold"
              />
            </div>
          </>
        </Modal>
      </>
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
