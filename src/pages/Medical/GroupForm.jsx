import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TitleForm, Input, Button, Select, Form, Toast } from "../../components/ui";
import { useForm, useValidation } from "../../components/hooks";
import { ICONS_OPTIONS } from "../../constants/option";
import { INITAL_GROUP } from "../../constants/field";
import { slugify, toUpperSlug } from "../../utils/format";
import { validateExpertise } from "../../utils/validation";
import { useGroupStore } from "../../store/groupStore";

const cx = classNames.bind(styles);

function GroupForm({ onClose }) {
  const [toast, setToast] = useState(null);

  const getGroupById = useGroupStore((gr) => gr.getGroupById);
  const editingGroupId = useGroupStore((gr) => gr.editingGroupId);
  const updateGroup = useGroupStore((gr) => gr.updateGroup);
  const group = editingGroupId ? getGroupById(editingGroupId) : null;

  const { validate, validateField, setAllTouched, getFieldError } = useValidation(validateExpertise);
  const { values, setFieldValue, resetForm } = useForm({
    initialValues: INITAL_GROUP,
    editValues: group
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

    if (editingGroupId) {
      updateGroup(values);
      setToast({
        type: "SUCCESS",
        message: "Cập nhật khối chuyên môn thành công"
      });
    } else {
      setToast({
        type: "SUCCESS",
        message: "Tạo mới khối chuyên môn thành công"
      });
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
        title={"Thêm khối chuyên môn"}
        subTitle={"Điền đầy đủ thông tin khối chuyên môn vào danh sách."}
      />

      <Form
        id="groupForm"
        onSubmit={handleSubmit}
        className="space-y-4 p-6 overflow-y-auto hidden-scrollbar max-h-[90vh]"
      >
        <GroupInput
          icons={ICONS_OPTIONS}
          value={values}
          setValue={setFieldValue}
          getFieldError={getFieldError}
          validateField={validateField}
        />
      </Form>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
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
          type={"submit"}
          form={"groupForm"}
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

export default React.memo(GroupForm);

function GroupInput({ icons, value, setValue, getFieldError, validateField }) {
  useEffect(() => {
    const name = value?.name?.trim() || "";

    if (!value?.id && value?.name) {
      setValue("value", toUpperSlug(value.name));
    }

    if (name) {
      const id = slugify(`${name}`);
      const value = toUpperSlug(`${name}`);

      setValue("id", id);
      setValue("value", value);
    } else {
      setValue("id", "");
      setValue("value", "");
    }
  }, [value?.name, setValue]);

  const handleBlur = (fieldName) => {
    validateField(fieldName, value);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label={
          <span>
            ID <span className="text-red-500">*</span> <span className="text-[11px] text-gray-500">(Tự động tạo)</span>
          </span>
        }
        name="id"
        type="text"
        value={value?.id}
        onChange={(val) => setValue("id", val.target.value)}
        onBlur={() => handleBlur("id")}
        error={getFieldError("id")}
        placeholder="Tự động tạo từ tên"
        inputClassName={cx("bg-gray-100")}
        disabled
        required
      />
      <Input
        label={
          <span>
            Value <span className="text-red-500">*</span>{" "}
            <span className="text-[11px] text-gray-500">(Tự động tạo)</span>
          </span>
        }
        name="value"
        type="text"
        value={value?.value}
        onChange={(val) => setValue("value", val.target.value)}
        onBlur={() => handleBlur("value")}
        error={getFieldError("value")}
        placeholder="Tự động tạo từ tên"
        inputClassName={cx("bg-gray-100")}
        disabled
        required
      />
      <Input
        label={
          <span>
            Tên khối <span className="text-red-500">*</span>
          </span>
        }
        name="name"
        type="text"
        value={value?.name}
        onChange={(val) => setValue("name", val.target.value)}
        onBlur={() => handleBlur("name")}
        error={getFieldError("name")}
        placeholder="VD: Lâm sàng"
        required
      />
      <Select
        label={"Icon"}
        name="icon"
        data={icons}
        value={value?.icon}
        onChange={(val) => setValue("icon", val)}
        placeholder="Chọn biểu tượng"
      />
    </div>
  );
}
