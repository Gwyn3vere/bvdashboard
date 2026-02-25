import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Input, Item } from "../../components/ui";
import { LuUser, LuPlus } from "react-icons/lu";
import { slugify } from "../../utils/format";

const cx = classNames.bind(style);

function Information({ value, setValue, getFieldError, validateField }) {
  const [previewAvatar, setPreviewAvatar] = useState(null);

  const handleChangeAvatar = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      setToast({
        type: "INFO",
        message: "Vui lòng chọn một tệp hình ảnh hợp lệ.",
      });
      return;
    }

    setValue("avatar", selectedFile);
  };

  useEffect(() => {
    if (!value.avatar) {
      setPreviewAvatar(null);
      return;
    }

    const objectUrl = URL.createObjectURL(value.avatar);
    setPreviewAvatar(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [value.avatar]);

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
    <div className={cx("flex flex-col items-center justify-center gap-4")}>
      {/* Avatar */}
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="relative">
          {previewAvatar ? (
            <img src={previewAvatar} alt="Preview" className="h-[76px] w-[76px] rounded-full object-cover" />
          ) : (
            <>
              <div
                className={cx(
                  "flex items-center justify-center cursor-pointer",
                  "h-[76px] w-[76px] rounded-full bg-linear-[var(--color-ln-primary)]",
                )}
                style={{ boxShadow: "var(--shadow)" }}
              >
                <LuUser className="text-white text-[28px]" />
              </div>
              <div
                className={cx(
                  "flex items-center justify-center",
                  "w-[22px] h-[22px] rounded-full bg-[var(--color-primary)]",
                  "absolute bottom-0 right-0 border-2 border-white",
                )}
              >
                <LuPlus className="text-white text-[11px]" />
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
        <Item
          as="span"
          children={"Ảnh đại diện"}
          itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]")}
        />
      </div>
      {/* Information */}
      <div className="flex flex-col gap-2 w-full">
        <Input
          label={
            <span>
              Họ và tên <span className="text-red-500">*</span>
            </span>
          }
          name="name"
          type="text"
          value={value?.name}
          onChange={(val) => setValue("name", val.target.value)}
          onBlur={() => handleBlur("name")}
          error={getFieldError("name")}
          placeholder="Nguyễn Văn A"
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
        />
        <Input
          label={
            <span>
              Slug <span className="text-red-500">*</span>
            </span>
          }
          name="slug"
          type="text"
          value={value?.slug}
          readOnly
          disabled
          onChange={(val) => setValue("slug", val.target.value)}
          placeholder="Slug (tự động tạo)"
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
        />
      </div>
    </div>
  );
}

export default Information;
