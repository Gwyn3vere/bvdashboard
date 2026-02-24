// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { CiSearch } from "react-icons/ci";

const cx = classNames.bind(style);

function Search({
  value,
  defaultValue,
  minWidth = "auto",
  height = 40,
  onChange,
  placeholder = "Tìm kiếm...",
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
        "px-4 flex items-center gap-2",
        "border border-[var(--color-unavailable-300)]",
        "focus-within:shadow-[var(--shadow-focus)]",
        "focus-within:border-[var(--color-primary-300)]",
        wrapperClass,
        className,
      )}
      style={{ minWidth, height, ...style }}
      {...props}
    >
      <Icon className="text-[16px] text-[var(--color-unavailable-700)]" />

      <input
        type="search"
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder={placeholder}
        className={cx(
          "w-full outline-none bg-transparent text-xs h-full flex-1",
          inputClass,
          "placeholder:text-xs placeholder:text-[var(--color-unavailable)]",
          "placeholder:font-semibold",
        )}
      />
    </div>
  );
}

export default Search;
