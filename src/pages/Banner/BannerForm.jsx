import React, { useState, useEffect, useMemo } from "react";
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

  const banners = useBannerStore((b) => b.banners);
  const fetchBanners = useBannerStore((b) => b.fetchBanners);
  const getBannerById = useBannerStore((b) => b.getBannerById);
  const editingBannerId = useBannerStore((b) => b.editingBannerId);
  const createBanner = useBannerStore((b) => b.createBanner);
  const banner = editingBannerId ? getBannerById(editingBannerId) : null;

  const { values, setFieldValue, resetForm } = useForm({
    initialValues: INITAL_BANNER,
    editValues: banner,
  });

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const generateOrderOptions = (banners, currentId = null) => {
    const active = banners
      .filter((b) => b.archive === 0 && b.id !== currentId)
      .sort((a, b) => a.viewOrder - b.viewOrder);

    if (active.length === 0) {
      return [
        {
          value: { prevId: null, nextId: null },
          name: "Đứng đầu",
        },
      ];
    }

    const options = [];

    // đứng đầu
    options.push({
      value: { prevId: null, nextId: active[0].id },
      name: "Đứng đầu",
    });

    // giữa
    for (let i = 0; i < active.length - 1; i++) {
      options.push({
        value: {
          prevId: active[i].id,
          nextId: active[i + 1].id,
        },
        name: `Sau ${active[i].name}`,
      });
    }

    // đứng cuối
    options.push({
      value: {
        prevId: active[active.length - 1].id,
        nextId: null,
      },
      name: "Đứng cuối",
    });

    return options;
  };

  const orderOptions = useMemo(() => {
    return generateOrderOptions(banners, editingBannerId);
  }, [banners, editingBannerId]);

  useEffect(() => {
    if (!editingBannerId && orderOptions.length > 0) {
      setFieldValue("viewOrder", orderOptions[0].value);
    }
  }, [orderOptions, editingBannerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const position = values.viewOrder || {};
      let imageUrl = values.imageUrl ?? null;

      // Upload nếu có file mới
      if (values.imageFile) {
        const formData = new FormData();
        formData.append("file", values.imageFile);

        const uploadRes = await uploadImageService(formData);

        if (!uploadRes.success) {
          setToast({ type: "error", message: "Upload ảnh thất bại" });
          return;
        }

        imageUrl = uploadRes.data.url;
      }

      const payload = {
        name: values.name.trim(),
        isActive: values.isActive,
        url: values.url.trim(),
        color: values.color,
        imageUrl,
        prevId: position?.prevId ?? null,
        nextId: position?.nextId ?? null,
      };

      const result = await createBanner(payload);

      if (!result.success) {
        setToast({ type: "error", message: result.message });
        return;
      }

      setToast({ type: "success", message: "Tạo banner thành công" });

      resetForm();
      onClose();
    } catch (error) {
      setToast({ type: "error", message: "Lỗi hệ thống" });
    }
  };

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
        onSubmit={handleSubmit}
        className="space-y-4 p-3 md:p-6 bg-white overflow-y-auto hidden-scrollbar max-h-[90vh]"
      >
        <Thumbnail value={values} setValue={setFieldValue} orderOptions={orderOptions} />
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

function Thumbnail({ value, setValue, orderOptions }) {
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
          placeholder="Nhập tiêu đề banner..."
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold mb-2")}
          inputClassName={cx("rounded-xl")}
        />
      </div>
      <div className="flex justify-between gap-3 w-full">
        <Select
          label={"Thứ tự hiển thị"}
          name="viewOrder"
          data={orderOptions}
          value={value?.viewOrder}
          onChange={(val) => {
            setValue("viewOrder", val);
            console.log("=== USER SELECT POSITION ===");
            console.log("Selected:", val);

            console.log("prevId:", val?.prevId);
            console.log("nextId:", val?.nextId);
          }}
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
          itemClassName={cx("text-[13px]")}
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
