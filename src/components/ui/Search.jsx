// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { CiSearch } from "react-icons/ci";

const cx = classNames.bind(style);

function Search({
  value,
  defaultValue,
  width = "auto",
  height = 40,
  onChange,
  placeholder = "Tìm kiếm",
  icon: Icon = CiSearch,
  inputClass = "",
  wrapperClass = "",
  className = "",
  style = {},
  ...props
}) {
  return (
    <div
      className={cx(
        "bg-[var(--color-bg-light-primary-100)] px-4 flex items-center gap-2",
        "border-2 border-[var(--color-unavailable-300)]",
        wrapperClass,
        className
      )}
      style={{ width, height, ...style }}
      {...props}
    >
      <Icon className="text-[20px] text-[var(--color-text-light-secondary)]" />

      <input
        type="search"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        className={cx("w-full outline-none bg-transparent text-[14px] h-full flex-1", inputClass)}
      />
    </div>
  );
}

export default Search;
