import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TitleForm, Input, Button, Select, Form, Toast } from "../../components/ui";
import { useForm } from "../../components/hooks";
import { ICONS_OPTIONS } from "../../constants/option";
import { INITAL_DEPARTMENT } from "../../constants/field";
import { toUpperSlug } from "../../utils/format";
import { useGroupStore } from "../../store/groupStore";
import { useDepartmentStore } from "../../store/departmentStore";

const cx = classNames.bind(styles);

function DeptForm({ onClose }) {
  const [toast, setToast] = useState(null);

  const getDepartmentById = useDepartmentStore((d) => d.getDepartmentById);
  const editingDepartmentId = useDepartmentStore((d) => d.editingDepartmentId);
  const createDepartment = useDepartmentStore((d) => d.createDepartment);
  const updateDepartment = useDepartmentStore((d) => d.updateDepartment);

  const department = editingDepartmentId ? getDepartmentById(editingDepartmentId) : null;

  const editingGroupId = useGroupStore((gr) => gr.editingGroupId);
  const group = useGroupStore((s) => s.groups.find((g) => g.id === editingGroupId));

  const { values, setFieldValue, resetForm } = useForm({
    initialValues: {
      ...INITAL_DEPARTMENT,
      groupId: editingGroupId
    },
    editValues: department
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
        title={department ? "Cập nhật khoa" : "Thêm khoa"}
        subTitle={
          <span>
            Điền đầy đủ thông tin vào danh sách khoa thuộc{" "}
            <span className="text-[var(--color-primary)]">Khối {group?.name}</span>
          </span>
        }
      />

      <Form
        id="deptForm"
        onSubmit={handleSubmit}
        className="space-y-4 p-6 overflow-y-auto hidden-scrollbar max-h-[90vh]"
      >
        <GroupInput icons={ICONS_OPTIONS} value={values} setValue={setFieldValue} />
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
          form={"deptForm"}
          children={"Xác nhận"}
          width="100%"
          className="bg-[var(--color-primary)] text-white font-semibold"
        />
      </div>
    </>
  );
}

export default React.memo(DeptForm);

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
        placeholder="VD: noi"
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
            Tên khoa <span className="text-red-500">*</span>
          </span>
        }
        name="name"
        type="text"
        value={value?.name}
        onChange={(val) => setValue("name", val.target.value)}
        placeholder="VD: Khoa nội"
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
