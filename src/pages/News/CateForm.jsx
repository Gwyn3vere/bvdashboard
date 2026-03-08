import React from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Item, TitleForm, Input, Button, Form, Radio } from "../../components/ui";
import { COLORS_CATE_OPTION } from "../../constants/option";
import { INITAL_NEWS_CATEGORY } from "../../constants/field";
import { ICONS_CATE_MAP } from "../../constants/icon";
import { useForm } from "../../components/hooks";
import { generateCategoryId } from "../../utils/helper";
import { useCategoryStore } from "../../store/categoryStore";

const cx = classNames.bind(style);

function CateForm({ onClose }) {
  const getCategoryById = useCategoryStore((c) => c.getCategoryById);
  const editingCategoryId = useCategoryStore((c) => c.editingCategoryId);
  const category = editingCategoryId ? getCategoryById(editingCategoryId) : null;

  const { values, setFieldValue, setValues, resetForm } = useForm({
    initialValues: INITAL_NEWS_CATEGORY,
    editValues: category,
  });

  const handleSubmit = () => {
    const existingIds = useCategoryStore.getState().categories.map((c) => c.id);

    const newId = generateCategoryId(values.name, existingIds);

    createCategory({
      ...values,
      id: newId,
    });

    resetForm();
    onClose();
  };

  return (
    <>
      <TitleForm
        title={"Thêm danh mục"}
        subTitle={"Bảng thêm danh mục tin tức, blog của bạn."}
        onClose={() => {
          onClose();
          resetForm();
        }}
      />
      <Form id={"cateForm"} className={cx("px-6 py-4 space-y-4 bg-white")} onSubmit={handleSubmit}>
        <Input
          label="Tên danh mục"
          placeholder="Nhập tên danh mục..."
          type="text"
          name="name"
          value={values?.name}
          onChange={(val) => setFieldValue("name", val.target.value)}
          required
          width="100%"
          height={"auto"}
          labelClassName="text-[11.5px] font-bold"
          inputClassName={cx("rounded-xl")}
        />

        <div>
          <div className={cx("mb-1 text-[11.5px] font-bold")}>Màu sắc</div>
          <div className={cx("flex flex-wrap gap-2")}>
            {COLORS_CATE_OPTION.map((item) => (
              <Radio
                key={item}
                name={"color"}
                checked={values?.color === item}
                onChange={() => setFieldValue("color", item)}
                style={{ background: item, outlineColor: item }}
                className={cx(
                  "border-1 transition-all rounded-xl",
                  "w-10 h-10",
                  values?.color === item
                    ? "border-transparent outline outline-2 outline-offset-2"
                    : " border-transparent",
                )}
                hidden={true}
              />
            ))}
          </div>
        </div>

        <div>
          <div className={cx("mb-1 text-[11.5px] font-bold")}>Icon</div>
          <div className={cx("flex flex-wrap gap-2")}>
            {Object.entries(ICONS_CATE_MAP).map(([key, IconComponent]) => (
              <Radio
                key={key}
                name={"icon"}
                text={<IconComponent size={20} />}
                checked={values?.icon === key}
                onChange={() => setFieldValue("icon", key)}
                className={cx(
                  "transition-all rounded-xl text-[var(--color-unavailable-700)]",
                  "w-10 h-10 flex items-center justify-center",
                  values?.icon === key ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-unavailable-100)]",
                )}
                hidden={true}
              />
            ))}
          </div>
        </div>
      </Form>

      {/* Footer */}
      <div className={cx("sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4", "flex justify-end gap-3")}>
        <div className="flex gap-2">
          <Button
            width={"auto"}
            height={"auto"}
            children={"Huỷ"}
            onClick={() => {
              onClose();
              resetForm();
            }}
            className={cx(
              "px-[18px] py-[9px] bg-[var(--color-unavailable-100)]",
              "text-[12.5px] font-bold rounded-xl text-[var(--color-unavailable-700)]",
              "hover:bg-[var(--color-unavailable-300)]",
            )}
          />
          <Button
            width={"auto"}
            height={"auto"}
            form={"cateForm"}
            children={"Xác nhận"}
            className={cx(
              "px-[18px] py-[9px] bg-linear-[var(--color-ln-primary)]",
              "text-[12.5px] font-bold text-white rounded-xl",
            )}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(CateForm);
