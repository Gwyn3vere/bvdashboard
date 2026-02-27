import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { ArrayInput, TextArea } from "../../components/ui";

const cx = classNames.bind(style);

function Experience({ value, setValue, getFieldError, validateField }) {
  return (
    <div className={cx("flex flex-col items-center justify-center gap-2 w-full")}>
      <ArrayInput
        label="Quá trình công tác"
        name="experience"
        value={value?.experience}
        onChange={(val) => setValue("experience", val)}
        placeholder="VD: 2015 - 2020 - BV Bạch Mai, Hà Nội"
        width={"100%"}
        height={"auto"}
        labelClassName={cx("text-[11.5px] font-bold")}
        inputClassName={cx("rounded-xl w-full")}
        className="w-full"
      />
      <ArrayInput
        label="Quá trình đào tạo"
        name="education"
        value={value?.education}
        onChange={(val) => setValue("education", val)}
        placeholder="VD: 2010 - ĐH Y Hà Nội, Bác sĩ Đa Khoa"
        width={"100%"}
        height={"auto"}
        labelClassName={cx("text-[11.5px] font-bold")}
        inputClassName={cx("rounded-xl w-full")}
        className="w-full"
      />
      <ArrayInput
        label="Bài viết & Công trình nghiên cứu"
        name="publications"
        value={value?.publications}
        onChange={(val) => setValue("publications", val)}
        placeholder="VD: Nghiên cứu điều trị tăng huyết áp, 2023"
        width={"100%"}
        height={"auto"}
        labelClassName={cx("text-[11.5px] font-bold")}
        inputClassName={cx("rounded-xl w-full")}
        className="w-full"
      />
    </div>
  );
}

export default Experience;
