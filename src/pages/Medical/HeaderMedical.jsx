import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Item, Search, Button, Tooltip } from "../../components/ui";
import { LuSlidersHorizontal, LuGrid3X3, LuList, LuPlus } from "react-icons/lu";

const cx = classNames.bind(styles);

function HeaderMedical({ viewMode, onClick, onAdd, keyword, onChange }) {
  return (
    <div
      className={cx(
        "bg-white rounded-[8px] p-4 outline outline-[var(--color-unavailable-300)]",
        "mb-5",
      )}
    >
      <div className={cx("grid grid-cols-1fr xl:grid-cols-[380px_1fr] gap-3")}>
        <Search
          value={keyword}
          onChange={onChange}
          width={"auto"}
          height={45}
          className={cx("rounded-[8px]")}
        />

        <div className={cx("flex flex-col md:flex-row justify-between gap-3")}>
          <div className="flex gap-1">
            <Tooltip content="Bộ lọc" position="top">
              <Button
                width={45}
                height={45}
                icon={<LuSlidersHorizontal />}
                className={cx(
                  "font-medium",
                  "hover:bg-[var(--color-primary-100)]",
                )}
              />
            </Tooltip>
            <Tooltip
              content={viewMode === "grid" ? "Phân cấp" : "Dạng lưới"}
              position="top"
            >
              <Button
                icon={viewMode === "grid" ? <LuList /> : <LuGrid3X3 />}
                width={45}
                height={45}
                onClick={onClick}
                className={cx(
                  "font-medium",
                  "hover:bg-[var(--color-primary-100)]",
                )}
              />
            </Tooltip>
          </div>
          <Button
            width={"auto"}
            height={45}
            icon={<LuPlus />}
            children={"Thêm khối"}
            className={cx(
              "text-white font-semibold",
              "flex items-center justify-between gap-2",
              "bg-[var(--color-primary)] text-[14px] px-3",
            )}
            onClick={onAdd}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(HeaderMedical);
