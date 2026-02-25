import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { POSITION_OPTIONS, DEPARTMENTS_OPTIONS, ROLE_OPTIONS } from "../../constants/option";
import { Input, Item, Select, TextArea } from "../../components/ui";

const cx = classNames.bind(style);

function Contract({ value, setValue, getFieldError, validateField }) {
  const handleBlur = (fieldName) => {
    validateField(fieldName, value);
  };
  const FILTERED_DEPARTMENTS = DEPARTMENTS_OPTIONS.filter((dept) => dept.block === "PHONG_CHUC_NANG");

  const dateNow = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className={cx("flex flex-col items-center justify-center gap-2")}>
      {/* Position */}
      <div className="flex flex-col gap-2 w-full">
        <Select
          label={
            <span>
              Chức vụ <span className="text-red-500">*</span>
            </span>
          }
          name="position"
          data={POSITION_OPTIONS}
          value={value?.position}
          onChange={(val) => setValue("position", val)}
          onBlur={() => handleBlur("position")}
          error={getFieldError("position")}
          placeholder="Chọn chức vụ"
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
          itemClassName={cx("text-[13px]")}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-3 w-full">
        <Select
          label={
            <span>
              Vai trò hệ thống <span className="text-red-500">*</span>
            </span>
          }
          name="role"
          data={ROLE_OPTIONS}
          value={value?.role}
          onChange={(val) => setValue("role", val)}
          onBlur={() => handleBlur("role")}
          error={getFieldError("role")}
          placeholder="Chọn vai trò"
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
          itemClassName={cx("text-[13px]")}
        />
        <Select
          label={
            <span>
              Phòng ban <span className="text-red-500">*</span>
            </span>
          }
          name="department"
          data={FILTERED_DEPARTMENTS}
          value={value?.department}
          onChange={(val) => setValue("department", val)}
          onBlur={() => handleBlur("department")}
          error={getFieldError("department")}
          placeholder="Chọn phòng ban"
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
          itemClassName={cx("text-[13px]")}
        />
      </div>
      <div className="flex flex-col gap-2 w-full pb-5 border-b border-gray-200">
        <Input
          label={"Ngày thêm vào"}
          name="featured"
          type="text"
          value={value?.createdAt ? dateNow : dateNow}
          readOnly
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
        />
      </div>
      {/* Contract */}
      <div className="flex flex-col gap-2 w-full">
        <Input
          label={"Số điện thoại"}
          name="phone"
          type="phone"
          value={value?.phone}
          onChange={(val) => setValue("phone", val.target.value)}
          onBlur={() => handleBlur("phone")}
          error={getFieldError("phone")}
          placeholder="09xx xxx xxx"
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
        />
        <TextArea
          label={"Cơ sở công tác"}
          name="facility"
          type="facility"
          value={value?.facility}
          onChange={(val) => setValue("facility", val.target.value)}
          placeholder="Nhập cơ sở công tác..."
          onBlur={() => handleBlur("facility")}
          error={getFieldError("facility")}
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
        />
      </div>
    </div>
  );
}

export default Contract;
