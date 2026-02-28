import { useState } from "react";
import { LuChevronLeft, LuChevronRight, LuX } from "react-icons/lu";
import { formatDate, getDaysInMonth } from "../../utils/format";
import { WEEK_DAYS } from "../../constants/option";
import { Button, TitleForm } from "../../components/ui";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";

const cx = classNames.bind(styles);

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
    <>
      <TitleForm
        onClose={onClose}
        title={"Chọn ngày cần copy cấu hình"}
        subTitle={`Đã chọn: ${selectedDates.length} ngày`}
      />

      <div className="bg-white">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Button
              width={36}
              height={36}
              icon={<LuChevronLeft className="w-5 h-5" />}
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-2 hover:bg-gray-100 rounded-xl"
            />

            <h3 className="text-[13px] font-semibold">
              Tháng {currentMonth.getMonth() + 1}, {currentMonth.getFullYear()}
            </h3>
            <Button
              width={36}
              height={36}
              icon={<LuChevronRight className="w-5 h-5" />}
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-2 hover:bg-gray-100 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-7 gap-1">
            {WEEK_DAYS.map((day, idx) => (
              <div key={idx} className="text-center font-bold text-gray-700 p-2 text-[12px]">
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
                  className={`p-2 text-[12px] rounded-xl transition-colors ${
                    !day.isCurrentMonth
                      ? "text-gray-300 cursor-not-allowed"
                      : isSource
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : isSelected
                          ? "bg-linear-[var(--color-ln-primary)] text-white"
                          : "hover:bg-[var(--color-primary)]/10 text-gray-700"
                  }`}
                >
                  {day.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
          <Button
            type="button"
            icon={<LuX />}
            children={"Hủy"}
            onClick={onClose}
            width="100%"
            height={38}
            className={cx(
              "bg-[var(--color-unavailable-100)] gap-2",
              "text-[var(--color-unavailable-700)] font-bold text-[13px] rounded-xl",
            )}
          />
          <Button
            children={`Copy sang ${selectedDates.length} ngày`}
            onClick={() => onConfirm(selectedDates)}
            width="100%"
            height={38}
            disabled={selectedDates.length === 0}
            className={cx("bg-linear-[var(--color-ln-primary)]", "text-white font-bold text-[13px] rounded-xl")}
          />
        </div>
      </div>
    </>
  );
}
