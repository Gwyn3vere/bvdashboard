import { useEffect } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TitleForm, Input, Button, Select, Form } from "../../components/ui";
import { useForm } from "../../components/hooks";
import { ICONS_OPTIONS } from "../../constants/option";
import { INITAL_GROUP } from "../../constants/field";
import { slugify, toUpperSlug } from "../../utils/format";

const cx = classNames.bind(styles);

function CreateGroup({ onClose }) {
  const { values, setFieldValue } = useForm({
    initialValues: INITAL_GROUP
  });
  return (
    <>
      <TitleForm
        onClose={onClose}
        title={"Thêm khối chuyên môn"}
        subTitle={"Điền đầy đủ thông tin khối chuyên môn vào danh sách."}
      />

      <Form
        id="groupForm"
        // onSubmit={handleSubmit}
        className="space-y-4 p-6 overflow-y-auto hidden-scrollbar max-h-[90vh]"
      >
        <GroupForm icons={ICONS_OPTIONS} value={values} setValue={setFieldValue} />
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
    </>
  );
}

export default CreateGroup;

function GroupForm({ icons, value, setValue }) {
  useEffect(() => {
    const name = value?.name?.trim() || "";

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
        placeholder="VD: Lâm sàng"
        required
      />
      <Select
        label={
          <span>
            Icon <span className="text-red-500">*</span>
          </span>
        }
        name="icon"
        data={icons}
        value={value?.icon}
        onChange={(val) => setValue("icon", val)}
        placeholder="Chọn biểu tượng"
        required
      />
    </div>
  );
}
