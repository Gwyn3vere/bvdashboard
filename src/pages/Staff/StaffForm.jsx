import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { POSITION_OPTIONS, ROLE_OPTIONS } from "../../constants/option";
import { useActive, useForm, useValidation } from "../../components/hooks";
import { INITIAL_STAFF } from "../../constants/field";
import styles from "../../styles/pages.module.css";
import { Item, Form, Input, Button, Select, Toast, TitleForm, TextArea } from "../../components/ui";
import { LuX, LuCamera, LuUser } from "react-icons/lu";
import { validateStaff } from "../../utils/validation";
import { slugify } from "../../utils/format";
import { useStaffStore } from "../../store/staffStore";

const cx = classNames.bind(styles);

function StaffForm({ onClose }) {
  const [toast, setToast] = useState(null);
  const { validate, validateField, setAllTouched, getFieldError } = useValidation(validateStaff);

  const getStaffById = useStaffStore((s) => s.getStaffById);
  const editingStaffId = useStaffStore((s) => s.editingStaffId);
  const staff = editingStaffId ? getStaffById(editingStaffId) : null;

  const { values, setFieldValue, resetForm } = useForm({
    initialValues: INITIAL_STAFF,
    editValues: staff
  });

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
        onClose={() => {
          onClose();
          resetForm();
        }}
        title={"Thêm nhân sự"}
        subTitle={"Điền đầy đủ thông tin nhân sự vào danh sách của bạn."}
      />

      {/* Content */}
      <Form
        id="staffForm"
        noValidate
        onSubmit={handleSubmit}
        className="space-y-4 p-6 overflow-y-auto hidden-scrollbar max-h-[90vh]"
      >
        <>
          <Avatar value={values} setValue={setFieldValue} setToast={setToast} />
          <InputForm
            value={values}
            setValue={setFieldValue}
            getFieldError={getFieldError}
            validateField={validateField}
          />
        </>
      </Form>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
        <Button
          type="button"
          children={"Huỷ"}
          onClose={() => {
            onClose();
            resetForm();
          }}
          width="100%"
          className={cx(
            "text-gray-700 font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]"
          )}
        />
        <Button
          type={"submit"}
          form={"staffForm"}
          children={"Xác nhận"}
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

export default React.memo(StaffForm);

function Avatar({ value, setValue, setToast }) {
  const [previewAvatar, setPreviewAvatar] = useState(null);

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
      setToast({
        type: "INFO",
        message: "Vui lòng chọn một tệp hình ảnh hợp lệ."
      });
      return;
    }

    setValue("avatar", selectedFile);
  };
  return (
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
  );
}

function InputForm({ value, setValue, getFieldError, validateField }) {
  useEffect(() => {
    const name = value?.name?.trim() || "";

    if (name) {
      const slug = slugify(`${name}`);

      setValue("slug", slug);
    } else {
      setValue("slug", "");
    }
  }, [value?.name, setValue]);

  const handleBlur = (fieldName) => {
    validateField(fieldName, value);
  };
  return (
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
        <Input
          label={"Tài khoản"}
          name="email"
          type="email"
          value={value?.email}
          onChange={(val) => setValue("email", val.target.value)}
          onBlur={() => handleBlur("email")}
          error={getFieldError("email")}
          placeholder="example@gmail.com"
          required
        />
        <Input
          name="password"
          type="password"
          value={value?.password}
          onChange={(val) => setValue("password", val.target.value)}
          placeholder="Nhập mật khẩu"
          onBlur={() => handleBlur("password")}
          error={getFieldError("password")}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Select
          label="Chức vụ"
          name="position"
          data={POSITION_OPTIONS}
          value={value?.position}
          onChange={(val) => setValue("position", val)}
          onBlur={() => handleBlur("position")}
          error={getFieldError("position")}
          placeholder="Chọn chức vụ"
          required
        />
        <Select
          name="role"
          data={ROLE_OPTIONS}
          value={value?.role}
          onChange={(val) => setValue("role", val)}
          onBlur={() => handleBlur("role")}
          error={getFieldError("role")}
          placeholder="Chọn vai trò hệ thống"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          label={"Liên hệ"}
          name="phone"
          type="text"
          value={value?.phone}
          onChange={(val) => setValue("phone", val.target.value)}
          onBlur={() => handleBlur("phone")}
          error={getFieldError("phone")}
          placeholder="Nhập số điện thoại liên hệ"
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
  );
}
