import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { ArrayInput, TextArea } from "../../components/ui";

const cx = classNames.bind(style);

function InDeptProfile({ value, setValue, getFieldError, validateField }) {
  const handleBlur = (fieldName) => {
    validateField(fieldName, value);
  };
  return (
    <div className={cx("flex flex-col items-center justify-center gap-2 w-full")}>
      {/* In-Dept Profile */}
      <TextArea
        label={"Bio"}
        name="bio"
        type="text"
        value={value?.bio}
        onChange={(val) => setValue("bio", val.target.value)}
        onBlur={() => handleBlur("bio")}
        error={getFieldError("bio")}
        placeholder="Nhập thông tin về bác sĩ..."
        className={cx("w-full rounded-xl")}
        labelClassName={cx("text-[11.5px] font-bold")}
        inputClassName={cx("rounded-xl")}
      />
      <TextArea
        label={"Cơ sở công tác"}
        name="facility"
        type="text"
        minHeight={50}
        value={value?.facility}
        onChange={(val) => setValue("facility", val.target.value)}
        onBlur={() => handleBlur("facility")}
        error={getFieldError("facility")}
        placeholder="Nhập cơ sở công tác..."
        className={cx("w-full rounded-xl")}
        labelClassName={cx("text-[11.5px] font-bold")}
        inputClassName={cx("rounded-xl")}
      />
      <ArrayInput
        label="Thế mạnh chuyên môn"
        name="expertise"
        value={value?.expertise}
        onChange={(val) => setValue("expertise", val)}
        placeholder="Nhập chuyên môn..."
        width={"100%"}
        height={"auto"}
        labelClassName={cx("text-[11.5px] font-bold")}
        inputClassName={cx("rounded-xl w-full")}
        className="w-full"
      />
    </div>
  );
}

export default InDeptProfile;
