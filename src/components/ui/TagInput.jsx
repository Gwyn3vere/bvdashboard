import React, { useCallback, useState } from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { Button } from "./index";
import { LuX } from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";

const cx = classNames.bind(style);

function TagInput({
  values = [],
  width = "100%",
  height = 50,
  style = {},
  error,
  label,
  onChange,
  className,
  inputClassName,
  labelClassName,
  placeholder = "Thêm tag...",
  ...props
}) {
  const [inputValue, setInputValue] = useState("");

  const tags = values;

  const addTag = useCallback(() => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;

    onChange?.([...tags, trimmed]);
    setInputValue("");
  }, [inputValue, tags, onChange]);

  const removeTag = useCallback(
    (tag) => {
      onChange?.(tags.filter((t) => t !== tag));
    },
    [tags, onChange],
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className={className}>
      {label && <label className={cx("font-medium", labelClassName)}>{label}</label>}
      <div className={cx(TWCSS.input, error && TWCSS.inputError, inputClassName)}>
        <div className="flex flex-wrap">
          {tags.map((tag) => (
            <span
              key={tag}
              className={cx(
                "h-auto m-1",
                "flex items-center gap-1 rounded-md bg-linear-[var(--color-ln-primary)] p-1 text-[13px] text-white",
              )}
            >
              {tag}
              <Button
                width={10}
                height={10}
                icon={<LuX />}
                onClick={() => removeTag(tag)}
                className="text-white hover:text-red-500"
              />
            </span>
          ))}

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            // className="min-w-[120px] flex-1 bg-transparent outline-none text-sm"
            className={cx("flex-1 outline-none px-3.5 py-2.5 text-[13px]")}
            style={{ width, height, ...style }}
            {...props}
          />
        </div>
      </div>
      {error && <label className={cx("font-medium text-[11px] text-[var(--color-error)]")}>{error}</label>}
    </div>
  );
}

export default React.memo(TagInput);
