import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { formatDate, getDaysInMonth } from "../../utils/format";
import { WEEK_DAYS } from "../../constants/option";

export default function DatePicker({ sourceDate, onClose, onConfirm }) {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const days = getDaysInMonth(currentMonth);

  const toggleDate = (dateStr) => {
    if (dateStr === sourceDate) return;
    if (selectedDates.includes(dateStr)) {
      setSelectedDates(selectedDates.filter((d) => d !== dateStr));
    } else {
      setSelectedDates([...selectedDates, dateStr]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h3 className="text-xl font-bold text-gray-900">Chọn ngày cần copy cấu hình</h3>
          <p className="text-sm text-gray-600 mt-1">Đã chọn: {selectedDates.length} ngày</p>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <LuChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold">
              Tháng {currentMonth.getMonth() + 1}, {currentMonth.getFullYear()}
            </h3>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <LuChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {WEEK_DAYS.map((day, idx) => (
              <div key={idx} className="text-center font-semibold text-gray-700 p-2 text-sm">
                {day}
              </div>
            ))}
            {days.map((day, idx) => {
              const dateStr = formatDate(day.date);
              const isSource = dateStr === sourceDate;
              const isSelected = selectedDates.includes(dateStr);

              return (
                <button
                  key={idx}
                  onClick={() => toggleDate(dateStr)}
                  disabled={!day.isCurrentMonth || isSource}
                  className={`p-2 text-sm rounded-lg transition-colors ${
                    !day.isCurrentMonth
                      ? "text-gray-300 cursor-not-allowed"
                      : isSource
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-600 text-white"
                      : "hover:bg-blue-50 text-gray-700"
                  }`}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6 border-t flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Hủy
          </button>
          <button
            onClick={() => onConfirm(selectedDates)}
            disabled={selectedDates.length === 0}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Copy sang {selectedDates.length} ngày
          </button>
        </div>
      </div>
    </div>
  );
}
