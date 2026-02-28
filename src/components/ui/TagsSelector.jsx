import React from "react";
import { Checkbox } from "./index";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function TagsSelector({ data, value = [], onChange, label, labelClassName }) {
  const handleToggle = (tagLabel) => {
    const newTags = value.includes(tagLabel) ? value.filter((tag) => tag !== tagLabel) : [...value, tagLabel];

    onChange(newTags);
  };

  const TAGS_OPTIONS = data || [];

  return (
    <div className="space-y-3">
      <label className={cx(labelClassName)}>{label}</label>
      <div className="flex flex-wrap gap-2 mt-1">
        {TAGS_OPTIONS.map((tag) => {
          const isChecked = value.includes(tag.name);

          return (
            <Checkbox
              key={tag.id}
              text={tag.name}
              checkboxClassName="hidden"
              className={cx(
                "px-3 py-1.5 rounded-full font-medium text-sm transition-all duration-200 border-1 border-[var(--color-gray-400)]",
                isChecked
                  ? "bg-[var(--color-primary)] text-white border-1 border-transparent"
                  : "hover:bg-[var(--color-primary)]/5 hover:text-[var(--color-primary-700)] hover:border-[var(--color-primary-700)]",
              )}
              onClick={() => handleToggle(tag.name)}
            />
          );
        })}
      </div>

      {/* Hiển thị các tag đã chọn */}
      {value.length > 0 && (
        <div className="text-sm text-gray-600">
          {label} đã chọn: <span className="font-medium text-green-600">{value.join(", ")}</span>
        </div>
      )}
    </div>
  );
}

export default React.memo(TagsSelector);
