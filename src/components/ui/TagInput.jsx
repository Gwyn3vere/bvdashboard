import React, { useCallback, useState } from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { LuX } from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";

const cx = classNames.bind(style);

function TagInput({
  values = [],
  label,
  onChange,
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
    <>
      <label className="font-medium">{label}</label>
      <div className={cx(TWCSS.tagInput)}>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 rounded-md bg-[var(--color-primary)] p-2 text-sm text-white"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-white hover:text-red-500"
              >
                <LuX />
              </button>
            </span>
          ))}

          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="min-w-[120px] flex-1 bg-transparent outline-none text-sm"
            {...props}
          />
        </div>
      </div>
    </>
  );
}

export default React.memo(TagInput);
