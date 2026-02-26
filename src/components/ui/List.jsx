import React from "react";
import classNames from "classnames/bind";

import { usePagination } from "../hooks";

import style from "../../styles/ui.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { EmptyState, Pagination } from "../ui";
import { LuFileQuestion, LuSearch } from "react-icons/lu";

const cx = classNames.bind(style);

function List({
  name,
  className,
  columns = [],
  data = [],
  style = {},
  animated = false,
  animationStep = 40,
  isEmptyData,
  isEmptySearch,
}) {
  const { currentPage, totalPages, pagedData, pages, setCurrentPage, nextPage, prevPage } = usePagination(data, 10);

  return (
    <div className={cx(className, "overflow-hidden")} style={{ ...style }}>
      <div className={cx("overflow-x-auto overflow-y-hidden mt-5", TWCSS.scrollbarX)}>
        <div
          className={cx(
            "w-[1600px] 2xl:w-full px-4 py-3 flex items-center bg-linear-[var(--color-ln-primary)]",
            "rounded-2xl",
          )}
        >
          {columns.map((col) => (
            <label
              key={col.key}
              className={cx("text-left font-semibold text-white whitespace-nowrap text-[11.5px]")}
              style={{ width: col.width }}
            >
              {col.label}
            </label>
          ))}
        </div>

        {isEmptyData ? (
          <EmptyState
            icon={LuFileQuestion}
            text={`Danh sách ${name} rỗng`}
            subText={`Hãy ấn vào nút "Thêm ${name}" để thêm vào danh sách`}
          />
        ) : isEmptySearch ? (
          <EmptyState
            icon={LuSearch}
            text={`Không tìm thấy ${name} nào`}
            subText={`Thử thay đổi bộ lọc hoặc từ khoá tìm kiếm`}
          />
        ) : (
          <div key={currentPage}>
            {pagedData.map((row, index) => (
              <div
                key={row.id}
                className={cx(
                  "group w-[1600px] 2xl:w-full",
                  "flex items-center border-b border-gray-100 transition cursor-pointer",
                  "hover:bg-[var(--color-primary-100)]/50 py-3 px-4",
                  animated && "fadeUp",
                )}
                style={
                  animated
                    ? {
                        animationDelay: `${Math.min(index * animationStep, 400)}ms`,
                      }
                    : undefined
                }
              >
                {columns.map((col) => (
                  <div key={col.key} className={cx("text-left whitespace-nowrap")} style={{ width: col.width }}>
                    {col.render ? col.render(row, index) : row[col.key]}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
}

export default React.memo(List);
