import React from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import {
  Item,
  TitleForm,
  Input,
  Button,
  Form,
  Radio,
} from "../../components/ui";
import { COLORS_CATE_OPTION } from "../../constants/option";
import { INITAL_NEWS_CATEGORY } from "../../constants/field";
import { ICONS_CATE_MAP } from "../../constants/icon";
import { useForm } from "../../components/hooks";

const cx = classNames.bind(style);

function CateForm({ onClose }) {
  const { values, setFieldValue, resetForm } = useForm({
    initialValues: INITAL_NEWS_CATEGORY,
  });
  return (
    <>
      <TitleForm
        title={"Thêm danh mục"}
        subTitle={"Bảng thêm danh mục tin tức, blog của bạn."}
        onClose={onClose}
      />
      <Form id={"cateForm"} className={cx("p-6 space-y-6")}>
        <Input
          label="Tên danh mục"
          labelClassName="text-sm"
          placeholder="Nhập tên danh mục..."
        />

        <div>
          <div className={cx("mb-2 text-sm font-medium")}>Màu sắc</div>
          <div
            className={cx(
              "grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4",
            )}
          >
            {COLORS_CATE_OPTION.map((item) => (
              <Radio
                key={item}
                name={"color"}
                checked={values?.color === item}
                onChange={() => setFieldValue("color", item)}
                style={{ background: item, outlineColor: item }}
                className={cx(
                  "p-4 border-1 transition-all rounded-[8px]",
                  "h-12",
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
          <div className={cx("mb-2 text-sm font-medium")}>Icon</div>
          <div
            className={cx(
              "grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-4",
            )}
          >
            {Object.entries(ICONS_CATE_MAP).map(([key, IconComponent]) => (
              <Radio
                key={key}
                name={"icon"}
                text={<IconComponent size={20} />}
                checked={values?.icon === key}
                onChange={() => setFieldValue("icon", key)}
                className={cx(
                  "p-4 transition-all rounded-[8px]",
                  "h-12 flex items-center justify-center",
                  values?.icon === key
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-unavailable-100)]",
                )}
                hidden={true}
              />
            ))}
          </div>
        </div>
      </Form>

      {/* Footer */}
      <div
        className={cx(
          "sticky bottom-0 bg-white border-t border-gray-200 p-6",
          "flex justify-end gap-3",
        )}
      >
        <div className="flex gap-2">
          <Button
            children={"Huỷ"}
            onClick={onClose}
            className={cx(
              "p-2 bg-[var(--color-unavailable-100)]",
              "text-sm font-semibold",
              "hover:bg-[var(--color-unavailable-300)]",
            )}
          />
          <Button
            form={"cateForm"}
            width={"auto"}
            children={"Xác nhận"}
            className={cx(
              "p-2 bg-[var(--color-primary)] gap-2",
              "text-sm font-semibold text-white",
            )}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(CateForm);
