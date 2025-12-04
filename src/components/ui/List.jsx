// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function List({
  columns = [],
  data = [],
  loading = false,
  emptyText = "No data",
  rowKey = "id",
  onRowClick = null,
  border = true,
  striped = true,
  className
}) {
  return (
    <div className={cx("hidden-scrollbar w-full h-full overflow-auto", className)}>
      <table className="min-w-full border-collapse">
        {/* Header */}
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 font-semibold text-gray-700 whitespace-nowrap"
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-gray-500">
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={row[rowKey]}
                className={[
                  "cursor-pointer transition",
                  striped && index % 2 === 1 ? "bg-gray-50" : "",
                  onRowClick ? "hover:bg-blue-50" : ""
                ].join(" ")}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
