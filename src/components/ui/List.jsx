// Libraries
import React from "react";
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { Item, Pagination } from "../ui";

const cx = classNames.bind(style);

function List({ className, columns = [], data = [], style = {} }) {
  return (
    <div className={cx(className)} style={{ ...style }}>
      <div className="px-4 py-3 flex items-center bg-[var(--color-primary)] rounded-t-[8px]">
        {columns.map((col) => (
          <label
            key={col.key}
            className="text-left font-semibold text-white whitespace-nowrap backdrop-blur-sm"
            style={{ width: col.width }}
          >
            {col.label}
          </label>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="hidden-scrollbar h-full overflow-auto">
          {data.length !== 0 ? (
            data.map((row, index) => (
              <div
                key={row.id}
                className={cx(
                  "flex items-center border-b border-gray-100 transition cursor-pointer",
                  "hover:bg-[var(--color-primary)] hover:text-white"
                )}
              >
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={cx("text-left px-4 py-3 whitespace-nowrap")}
                    style={{ width: col.width }}
                  >
                    {col.render ? col.render(row, index) : row[col.key]}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <Item
              as="div"
              children="Danh sách trống"
              className={cx(
                "flex items-center justify-center h-full",
                "text-[16px] text-[var(--color-text-light-secondary)]"
              )}
            />
          )}
        </div>
      </div>
      <Pagination />
    </div>
  );
}

export default React.memo(List);
