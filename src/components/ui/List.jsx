// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { Pagination } from "../ui";

const cx = classNames.bind(style);

function List({ className, columns = [], data = [] }) {
  return (
    <div className={cx(className)}>
      <div className="flex items-center bg-[var(--color-bg-light-primary-300)]">
        {columns.map((col) => (
          <label
            key={col.key}
            className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap backdrop-blur-sm"
            style={{ width: col.width }}
          >
            {col.label}
          </label>
        ))}
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="hidden-scrollbar h-full overflow-auto">
          {data.map((row) => (
            <div
              key={row.id}
              className="flex items-center border-b border-gray-100 hover:bg-[var(--color-bg-light-primary-300)] transition cursor-pointer"
            >
              {columns.map((col) => (
                <div
                  key={col.key}
                  className="text-left px-4 py-3 text-gray-800 whitespace-nowrap"
                  style={{ width: col.width }}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Pagination />
    </div>
  );
}

export default List;
