import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Form, TitleForm, Button, Toast, Input, Item, Select } from "../../components/ui";
import { useBannerStore } from "../../store/bannerStore";
import { useForm } from "../../components/hooks";
import { INITAL_BANNER } from "../../constants/field";
import { LuImage, LuX } from "react-icons/lu";
import { BANNER_COLOR_OPTION, BANNER_ACTIVE_OPTION } from "../../constants/option";

const cx = classNames.bind(style);

function BannerForm({ onClose }) {
  const [toast, setToast] = useState();

  const getBannerById = useBannerStore((b) => b.getBannerById);
  const editingBannerId = useBannerStore((b) => b.editingBannerId);
  const banner = editingBannerId ? getBannerById(editingBannerId) : null;

  const { values, setFieldValue, resetForm } = useForm({
    initialValues: INITAL_BANNER,
    editValues: banner,
  });

  return (
    <>
      <TitleForm
        onClose={() => {
          onClose();
          resetForm();
        }}
        title={banner ? "Chỉnh sửa banner" : "Thêm banner mới"}
        subTitle={"Điền thông tin để tạo banner mới"}
      />
      {/* Content */}
      <Form
        id="bannerForm"
        onSubmit={(e) =>
          handleSubmit(e, (data) => {
            console.log("Submit:", data);
            onClose();
            resetForm();
          })
        }
        className="space-y-4 p-3 md:p-6 bg-white overflow-y-auto hidden-scrollbar max-h-[90vh]"
      >
        <Thumbnail value={values} setValue={setFieldValue} />
      </Form>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-3 py-6 md:p-6 flex gap-3">
        <Button
          type="button"
          children={"Huỷ"}
          onClick={() => {
            onClose();
            resetForm();
          }}
          width="100%"
          height={38}
          className={cx(
            "bg-[var(--color-unavailable-100)]",
            "text-[var(--color-unavailable-700)] font-bold text-[13px] rounded-xl",
          )}
        />
        <Button
          type={"submit"}
          form={"bannerForm"}
          children={banner ? "Chỉnh sửa banner" : "Thêm banner"}
          // onClick={(e) => {
          //   if (!isLast) {
          //     e.preventDefault();
          //     handleNext();
          //   }
          // }}
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

function Thumbnail({ value, setValue }) {
  const [previewImage, setPreviewImage] = useState(null);
  const displayImage = previewImage ?? value?.imageUrl ?? null;

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn (tối đa 5MB)");
      return;
    }

    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    const url = URL.createObjectURL(file);

    setValue("imageFile", file);
    setPreviewImage(url);
  };
  const handleRemoveImage = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setValue("imageUrl", null);
    setValue("imageFile", null);
    setPreviewImage(null);
  };

  useEffect(() => {
    setPreviewImage(null);
  }, [value?.imageUrl]);
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  return (
    <div className="flex flex-col gap-4">
      {displayImage ? (
        <div className={cx("relative h-[120px] w-full rounded-2xl overflow-hidden")}>
          <img src={displayImage} alt="Preview" className="w-full h-full object-cover" />
          <Button
            type="button"
            width={32}
            height={32}
            icon={<LuX />}
            iconClassName="text-[15px] text-white"
            onClick={handleRemoveImage}
            className={cx("absolute top-2 right-2", "bg-[var(--color-error)] rounded-full")}
          />
        </div>
      ) : (
        <div
          className={cx("relative", "flex items-center justify-center cursor-pointer", "h-[120px] w-full rounded-2xl")}
          style={{ boxShadow: "var(--shadow)", backgroundColor: value?.color }}
        >
          <Item
            icon={<LuImage />}
            children={"Ảnh banner"}
            iconClassName={cx("text-[26px]")}
            itemClassName={cx("text-[11px] font-bold")}
            className={cx("text-[var(--color-unavailable-700)]")}
          />

          <Input
            width={"100%"}
            height={120}
            type="file"
            accept="image/*"
            onChange={handleChangeImage}
            inputClassName="rounded-2xl"
            className={cx("opacity-0 w-full h-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2")}
          />
        </div>
      )}

      <div>
        <Item children={"Màu nền placeholder"} itemClassName={cx("text-[11.5px] font-bold")} className={cx("mb-2")} />

        <div className={cx("flex items-center gap-2")}>
          {BANNER_COLOR_OPTION.map((color) => (
            <Button
              type="button"
              key={color}
              width={26}
              height={26}
              onClick={() => setValue("color", color)}
              className={cx("rounded-full", value?.color === color && "ring-2 ring-offset-2")}
              style={{ background: color, "--tw-ring-color": color }}
            />
          ))}
        </div>
      </div>
      <div>
        <Input
          label={
            <span>
              Tiêu đề banner <span className="text-red-500">*</span>
            </span>
          }
          name="name"
          type="text"
          value={value?.name}
          onChange={(val) => setValue("name", val.target.value)}
          //   onBlur={() => handleBlur("name")}
          //   error={getFieldError("name")}
          placeholder="Nhập tiêu đề banner..."
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold mb-2")}
          inputClassName={cx("rounded-xl")}
        />
      </div>
      <div className="flex justify-between gap-3 w-full">
        <Input
          label={"Thứ tự hiển thị"}
          name="viewOrder"
          type="number"
          value={value?.viewOrder}
          onChange={(val) => setValue("viewOrder", val.target.value)}
          width={"100%"}
          height={"auto"}
          min={1}
          labelClassName={cx("text-[11.5px] font-bold mb-2")}
          inputClassName={cx("rounded-xl")}
          className={cx("w-full")}
        />
        <Select
          label={"Trạng thái"}
          name="isActive"
          data={BANNER_ACTIVE_OPTION}
          value={value?.isActive}
          onChange={(val) => setValue("isActive", val)}
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
          itemClassName={cx("text-[13px]")}
          className={cx("w-full")}
        />
      </div>
      <div>
        <Input
          label={"URL liên kết"}
          name="url"
          type="text"
          value={value?.url}
          onChange={(val) => setValue("url", val.target.value)}
          placeholder="https://..."
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold mb-2")}
          inputClassName={cx("rounded-xl")}
        />
      </div>
    </div>
  );
}

export default React.memo(BannerForm);
