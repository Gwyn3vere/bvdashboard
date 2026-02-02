import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TitleForm, Input, Button, Select, Form, Toast } from "../../components/ui";
import { useForm } from "../../components/hooks";
import { INITAL_SPECIALTY } from "../../constants/field";
import { toUpperSlug } from "../../utils/format";
import { useDepartmentStore } from "../../store/departmentStore";
import { useSpecialtyStore } from "../../store/specialtyStore";

const cx = classNames.bind(styles);

function SpecForm({ onClose }) {
  const [toast, setToast] = useState(null);

  const getSpecialtyById = useSpecialtyStore((s) => s.getSpecialtyById);
  const editingSpecialtyId = useSpecialtyStore((s) => s.editingSpecialtyId);
  const createSpecialty = useSpecialtyStore((s) => s.createSpecialty);
  const updateSpecialty = useSpecialtyStore((s) => s.updateSpecialty);

  const specialty = editingSpecialtyId ? getSpecialtyById(editingSpecialtyId) : null;

  const editingDepartmentId = useDepartmentStore((d) => d.editingDepartmentId);
  const department = useDepartmentStore((d) => d.departments.find((d) => d.id === editingDepartmentId));

  const { values, setFieldValue, resetForm } = useForm({
    initialValues: {
      ...INITAL_SPECIALTY,
      departmentId: editingDepartmentId
    },
    editValues: specialty
  });

  const handleSubmit = (e) => {
    e.preventDefault();

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
        title={specialty ? "Cập nhật chuyên khoa" : "Thêm chuyên khoa"}
        subTitle={
          <span>
            Điền đầy đủ thông tin vào danh sách chuyên khoa thuộc{" "}
            <span className="text-[var(--color-primary)]">{department?.name}</span>
          </span>
        }
      />

      <Form
        id="specForm"
        onSubmit={handleSubmit}
        className="space-y-4 p-6 overflow-y-auto hidden-scrollbar max-h-[90vh]"
      >
        <GroupInput value={values} setValue={setFieldValue} />
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
          form={"specForm"}
          children={"Xác nhận"}
          width="100%"
          className="bg-[var(--color-primary)] text-white font-semibold"
        />
      </div>
    </>
  );
}

export default React.memo(SpecForm);

function GroupInput({ icons, value, setValue }) {
  useEffect(() => {
    const name = value?.name?.trim() || "";

    if (name) {
      const value = toUpperSlug(`${name}`);

      setValue("value", value);
    } else {
      setValue("value", "");
    }
  }, [value?.name, setValue]);

  return (
    <div className="flex flex-col gap-4">
      <Input
        label={
          <span>
            ID <span className="text-red-500">*</span>
          </span>
        }
        name="id"
        type="text"
        value={value?.id}
        onChange={(val) => setValue("id", val.target.value)}
        placeholder="VD: noi-tong-quat"
        required
      />
      <Input
        label={
          <span>
            Value <span className="text-red-500">*</span>
          </span>
        }
        name="value"
        type="text"
        value={value?.value}
        onChange={(val) => setValue("value", val.target.value)}
        placeholder="Tự động tạo từ tên"
        inputClassName={cx("bg-gray-100")}
        disabled
        required
      />
      <Input
        label={
          <span>
            Tên chuyên khoa <span className="text-red-500">*</span>
          </span>
        }
        name="name"
        type="text"
        value={value?.name}
        onChange={(val) => setValue("name", val.target.value)}
        placeholder="VD: Khoa nội"
        required
      />
    </div>
  );
}
