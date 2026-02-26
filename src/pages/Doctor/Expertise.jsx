import { useMemo } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Input, Item, Select, TagInput } from "../../components/ui";
import { LuActivity, LuPlus } from "react-icons/lu";
import { slugify } from "../../utils/format";
import { MOCK_DEPARTMENTS, MOCK_SPECIALTIES } from "../../mock/expertise";
import { POSITION_OPTIONS } from "../../constants/option";

const cx = classNames.bind(style);

function Expertise({ value, setValue, getFieldError, validateField }) {
  const FILTERED_POSITION = POSITION_OPTIONS.filter((p) => p.department === "khoa");
  const handleChangeDepartment = (val) => {
    setValue("department", val);
    setValue("specialty", null);
  };
  const handleBlur = (fieldName) => {
    validateField(fieldName, value);
  };
  const SPECIALTIES_LIST = useMemo(() => {
    if (!value?.department) return [];

    const dept = MOCK_DEPARTMENTS.find((d) => d.value === value.department);
    if (!dept) return [];

    return MOCK_SPECIALTIES.filter((s) => s.departmentId === dept.id);
  }, [value?.department]);
  return (
    <div className={cx("flex flex-col items-center justify-center gap-4")}>
      {/* Expertise */}
      <div className="flex flex-col gap-2 w-full">
        <Select
          label={
            <span>
              Khoa <span className="text-red-500">*</span>
            </span>
          }
          name="department"
          data={MOCK_DEPARTMENTS}
          value={value?.department}
          onChange={handleChangeDepartment}
          onBlur={() => handleBlur("department")}
          error={getFieldError("department")}
          placeholder="Chọn khoa"
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
              Chuyên khoa <span className="text-red-500">*</span>
            </span>
          }
          name="specialty"
          data={SPECIALTIES_LIST}
          value={value?.specialty}
          onChange={(val) => setValue("specialty", val)}
          onBlur={() => handleBlur("specialty")}
          error={getFieldError("specialty")}
          placeholder={value?.department ? "Chọn chuyên khoa" : "Vui lòng chọn khoa trước"}
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
          itemClassName={cx("text-[13px]")}
        />

        <div className="grid md:grid-cols-2 gap-3 w-full">
          <Input
            label={
              <span>
                Kinh nghiệm (năm) <span className="text-red-500">*</span>
              </span>
            }
            name="experienceYears"
            type="number"
            value={value?.experienceYears}
            onChange={(val) => setValue("experienceYears", val.target.value)}
            onBlur={() => handleBlur("experienceYears")}
            error={getFieldError("experienceYears")}
            placeholder=""
            required
            width={"100%"}
            height={"auto"}
            labelClassName={cx("text-[11.5px] font-bold")}
            inputClassName={cx("rounded-xl")}
          />

          <Select
            label={
              <span>
                Chức vụ trong khoa <span className="text-red-500">*</span>
              </span>
            }
            name="position"
            data={FILTERED_POSITION}
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

        <div className="flex flex-col gap-2">
          <TagInput
            label={
              <span>
                Tags chuyên môn <span className="text-red-500">*</span>
              </span>
            }
            name="tags"
            values={value?.tags}
            onChange={(tags) => setValue("tags", tags)}
            onBlur={() => handleBlur("tags")}
            error={getFieldError("tags")}
            width={"100%"}
            height={"auto"}
            labelClassName={cx("text-[11.5px] font-bold")}
            inputClassName={cx("rounded-xl")}
          />
          <TagInput
            label={
              <span>
                Ngôn ngữ <span className="text-red-500">*</span>
              </span>
            }
            name="languages"
            values={value?.languages}
            onChange={(languages) => setValue("languages", languages)}
            onBlur={() => handleBlur("languages")}
            error={getFieldError("languages")}
            placeholder="Thêm ngôn ngữ..."
            width={"100%"}
            height={"auto"}
            labelClassName={cx("text-[11.5px] font-bold")}
            inputClassName={cx("rounded-xl")}
          />
          <Item as="span" children={"Ấn Enter sau khi nhập"} itemClassName={cx("text-[12px] text-gray-500")} />
        </div>
      </div>
    </div>
  );
}

export default Expertise;
