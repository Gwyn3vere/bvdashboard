import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Input, Item } from "../../components/ui";
import { LuShield } from "react-icons/lu";

const cx = classNames.bind(style);

function Account({ value, setValue, getFieldError, validateField }) {
  const handleBlur = (fieldName) => {
    validateField(fieldName, value);
  };
  return (
    <div className={cx("flex flex-col items-center justify-center gap-2")}>
      <div
        className={cx(
          "flex items-center gap-2 w-full rounded-2xl",
          "bg-[var(--color-primary)]/10 px-4 py-3",
          "border border-[var(--color-primary)]/20",
        )}
      >
        <LuShield className="text-md text-[var(--color-primary-700)]" />
        <div>
          <Item children={"Thông tin đăng nhập hệ thống"} itemClassName={cx("text-[12px] text-[var(--color-primary-900)] font-bold")} />
          <Item
            children={"Hệ thống sẽ gửi thông báo xác nhận tài khoản qua Email"}
            itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]")}
          />
        </div>
      </div>
      {/* Information */}
      <div className="flex flex-col gap-2 w-full">
        <Input
          label={
            <span>
              tài khoản <span className="text-red-500">*</span>
            </span>
          }
          name="email"
          type="email"
          value={value?.email}
          onChange={(val) => setValue("email", val.target.value)}
          onBlur={() => handleBlur("email")}
          error={getFieldError("email")}
          placeholder="example@gmail.com"
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
        />
        <Input
          label={
            <span>
              Password <span className="text-red-500">*</span>
            </span>
          }
          name="password"
          type="password"
          value={value?.password}
          onChange={(val) => setValue("password", val.target.value)}
          placeholder="Nhập mật khẩu"
          onBlur={() => handleBlur("password")}
          error={getFieldError("password")}
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

export default Account;
