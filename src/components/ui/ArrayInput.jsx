import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { Button } from "../ui";
import { LuDelete } from "react-icons/lu";

const cx = classNames.bind(style);

function ArrayInput({
  label,
  value = [],
  width = "100%",
  height = "50px",
  onChange,
  placeholder = "Nhập nội dung...",
  buttonText = "",
  className = "",
  labelClassName = "",
  inputClassName = "",
  multiline = false,
  maxItems = 20,
  style = {},
  icon
}) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) return;

    if (value.length >= maxItems) {
      alert(`Tối đa ${maxItems} mục`);
      return;
    }

    onChange([...value, trimmedValue]);
    setInputValue("");
  };

  const handleRemove = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleEdit = (index, newText) => {
    const newValue = [...value];
    newValue[index] = newText;
    onChange(newValue);
  };

  const moveItem = (index, direction) => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === value.length - 1)) {
      return;
    }

    const newValue = [...value];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newValue[index], newValue[targetIndex]] = [newValue[targetIndex], newValue[index]];
    onChange(newValue);
  };

  return (
    <div className={className}>
      {label && <label className={cx("font-medium", labelClassName)}>{label}</label>}

      {/* Input để thêm item mới */}
      <div className="flex justify-between gap-2 mb-3">
        {multiline ? (
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            rows={3}
            className="flex-1 outline-none p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 transition-colors resize-none"
          />
        ) : (
          <div className={cx(TWCSS.input, inputClassName)}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              style={{ width, height, ...style }}
              className={cx("outline-none px-2")}
            />
          </div>
        )}

        <Button
          type="button"
          onClick={handleAdd}
          width={50}
          height={50}
          children={buttonText}
          className={cx("rounded-[8px] bg-[var(--color-primary)]", "text-white text-2xl font-medium px-3 mt-1")}
        />
      </div>

      {/* Danh sách các items */}
      {value.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-gray-600 mb-2">{value.length} mục</div>

          {value.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-2 mb-3">
              {/* Move buttons */}
              <div className="flex flex-col gap-1 pt-1 justify-center">
                <button
                  type="button"
                  onClick={() => moveItem(index, "up")}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  title="Di chuyển lên"
                >
                  <span className="block rotate-180">▼</span>
                </button>
                <button
                  type="button"
                  onClick={() => moveItem(index, "down")}
                  disabled={index === value.length - 1}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed text-xs"
                  title="Di chuyển xuống"
                >
                  <span className="block">▼</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between gap-2">
                  {multiline ? (
                    <textarea
                      value={item}
                      onChange={(e) => handleEdit(index, e.target.value)}
                      rows={2}
                      className="w-full outline-none p-2 rounded bg-white border border-gray-200 focus:border-blue-500 resize-none"
                    />
                  ) : (
                    <div className={cx(TWCSS.input, inputClassName)}>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleEdit(index, e.target.value)}
                        style={{ width, height, ...style }}
                        className={cx("outline-none px-2")}
                      />
                    </div>
                  )}
                  {/* Remove button */}
                  <Button
                    type="button"
                    onClick={() => handleRemove(index)}
                    width={50}
                    height={50}
                    children={<LuDelete />}
                    className={cx(
                      "rounded-[8px] bg-[var(--color-primary)]",
                      "text-white text-2xl font-medium px-3 mt-1"
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {value.length === 0 && (
        <div className="text-center py-8 text-gray-400 border-2 border-dashed border-[var(--color-primary-300)] rounded-lg">
          Chưa có mục nào. Nhập và nhấn "{buttonText}" để thêm.
        </div>
      )}
    </div>
  );
}
export default React.memo(ArrayInput);
