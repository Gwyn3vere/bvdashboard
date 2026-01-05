// Libraries - Hook - Constants - Store
import { useState } from "react";
import classNames from "classnames/bind";
import { scheduleStore } from "../../store/scheduleStore";
import { useDoctorCalendar, useScheduleResize } from "../../components/hooks";
import { SESSION_PRESETS, WEEK_DAYS } from "../../constants/option";
// Styles- UI - utils - Icon
import { LuChevronLeft, LuChevronRight, LuLayoutDashboard, LuX, LuGripVertical } from "react-icons/lu";
import { getDaysInMonth } from "../../utils/format";
import { Card, Shift } from "./index";
import { Breadcrumb, Item, Button, Search } from "../../components/ui";
import styles from "../../styles/pages.module.css";

const cx = classNames.bind(styles);

function Calendar() {
  const { doctors, getSchedulesByDate, getDoctorById, removeSchedule } = scheduleStore();

  const {
    currentDate,
    draggedDoctorId,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    handleDragStart,
    handleDrop,
    isToday
  } = useDoctorCalendar();

  const { isResizing, resizingSchedule, handleResizeStart, handleResizeMove, handleResizeEnd, isDateInResizeRange } =
    useScheduleResize();

  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const daysInMonth = getDaysInMonth(currentDate);

  const handleDragStartEvent = (e, doctorId) => {
    handleDragStart(doctorId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDropEvent = (e, dateStr, isCurrentMonth) => {
    e.preventDefault();
    handleDrop(dateStr, isCurrentMonth);
  };

  const handleScheduleClick = (schedule, date) => {
    setSelectedSchedule({ ...schedule, date });
  };

  const handleResizeStartEvent = (e, schedule, dateStr) => {
    e.preventDefault();
    e.stopPropagation();
    handleResizeStart(schedule, dateStr);
  };

  return (
    <div className="px-10 pb-5">
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <LuLayoutDashboard /> },
          { label: "Quản lý bác sĩ", href: "/quan-ly-bac-si" },
          { label: "Lịch làm việc" }
        ]}
      />
      <Item as="strong" children="Tạo lịch làm việc" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Tạo ca làm việc cho bác sĩ tại đây."
        itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
      />

      <div className="rounded-[8px] md:flex gap-5 ">
        {/* Sidebar - Danh sách bác sĩ */}
        <div
          className={cx("bg-white min-w-[350px] p-6 flex flex-col")}
          style={{
            boxShadow: "var(--shadow)"
          }}
        >
          <div className={cx("mb-5 flex-shrink-0 h-[100px] space-y-2")}>
            <Item as="h4" children="Danh sách bác sĩ" className="text-[18px] font-bold text-gray-900" />
            <Item
              as="span"
              children="Kéo và thả bác sĩ vào lịch để tạo ca làm việc"
              className="text-[16px] text-gray-600 mb-4"
            />
            <Search className="rounded-[8px] mb-2" width="100%" height={48} />
          </div>

          <div
            className="flex-1 overflow-auto hidden-scrollbar"
            style={{
              maxHeight: "750px"
            }}
          >
            {doctors.map((doctor) => (
              <Card key={doctor.id} doctor={doctor} onDragStart={handleDragStartEvent} />
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div
          className="p-6 bg-white w-full flex-1"
          style={{
            boxShadow: "var(--shadow)"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between  mb-5">
            <div className="flex items-center gap-4">
              <Button
                width={40}
                height={40}
                icon={<LuChevronLeft />}
                onClick={goToPreviousMonth}
                className={cx(
                  "p-2 rounded-lg transition-colors",
                  "bg-[var(--color-bg-light-primary-300)]",
                  "hover:bg-[var(--color-primary)] hover:text-white"
                )}
              />
              <Item
                as="h2"
                children={`Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`}
                className={cx("text-xl font-bold px-2 text-center w-[200px]")}
              />
              <Button
                width={40}
                height={40}
                icon={<LuChevronRight />}
                onClick={goToNextMonth}
                className={cx(
                  "p-2 rounded-lg transition-colors",
                  "bg-[var(--color-bg-light-primary-300)]",
                  "hover:bg-[var(--color-primary)] hover:text-white"
                )}
              />
            </div>

            <Button
              height={40}
              onClick={goToToday}
              className={cx(
                "px-4 py-2 rounded-[8px] transition-colors font-bold",
                "bg-[var(--color-primary)] text-white text-[14px]"
              )}
              children="Hôm nay"
            />
          </div>

          {/* Week days */}
          <div className="rounded-[8px] overflow-hidden">
            <div className="grid grid-cols-7">
              {WEEK_DAYS.map((day, idx) => (
                <Item
                  as="div"
                  children={day}
                  key={idx}
                  className={cx(
                    "p-3 text-center font-semibold text-white",
                    "bg-[var(--color-primary)] border-r last:border-r-0"
                  )}
                />
              ))}
            </div>

            {/* Days grid */}
            <div className="flex-1 overflow-auto" onMouseUp={handleResizeEnd} onMouseLeave={handleResizeEnd}>
              <div className="grid grid-cols-7">
                {daysInMonth.map((day, index) => {
                  const dateStr = day.date.toISOString().split("T")[0];
                  const schedules = getSchedulesByDate(dateStr);
                  const isCurrentDay = isToday(day.date);

                  return (
                    <div
                      key={index}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDropEvent(e, dateStr, day.isCurrentMonth)}
                      onMouseEnter={() => handleResizeMove(dateStr)}
                      className={`min-h-32 border border-gray-200 p-2 relative ${
                        !day.isCurrentMonth ? "bg-[var(--color-bg-light-primary-200)]" : "bg-white"
                      } ${draggedDoctorId && day.isCurrentMonth ? "hover:bg-blue-50" : ""} ${
                        isDateInResizeRange(dateStr) ? "bg-blue-100 ring-2 ring-blue-500 ring-inset" : ""
                      }`}
                    >
                      <Item
                        as="span"
                        children={day.date.getDate()}
                        className={`text-sm font-semibold ${
                          !day.isCurrentMonth
                            ? "text-[var(--color-bg-light-primary-500)]"
                            : "text-[var(--color-text-light-primary)]"
                        } ${
                          isCurrentDay
                            ? "bg-[var(--color-primary)] w-5 h-5 text-white rounded-full flex items-center justify-center"
                            : ""
                        }`}
                      />
                      <div className="mt-1 space-y-1">
                        {schedules.map((schedule) => {
                          const doctor = getDoctorById(schedule.doctorId);
                          const isResizeActive =
                            isResizing &&
                            resizingSchedule?.scheduleId === schedule.scheduleId &&
                            resizingSchedule?.startDate === dateStr;

                          return (
                            <div
                              key={schedule.scheduleId}
                              onClick={() => handleScheduleClick(schedule, dateStr)}
                              className={`bg-blue-500/50 text-white px-2 py-1 rounded text-xs cursor-pointer hover:opacity-90 transition-opacity relative group`}
                            >
                              <div className="font-medium truncate">{doctor?.firstName + " " + doctor?.lastName}</div>
                              {schedule.configured && schedule.sessionType && (
                                <div className="text-[10px] opacity-90">
                                  {SESSION_PRESETS[schedule.sessionType]?.label} • {schedule.slots?.length || 0} slots
                                </div>
                              )}

                              {/* Resize handle */}
                              <div
                                onMouseDown={(e) => handleResizeStartEvent(e, schedule, dateStr)}
                                className={`absolute top-0 right-0 bottom-0 w-8 flex items-center justify-center cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500 bg-opacity-0 hover:bg-opacity-10 ${
                                  isResizeActive ? "opacity-100 bg-opacity-20" : ""
                                }`}
                              >
                                <LuGripVertical className="w-4 h-4 text-blue-600" />
                              </div>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSchedule(dateStr, schedule.scheduleId);
                                }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex"
                              >
                                <LuX className="w-3 h-3" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      {selectedSchedule && (
        <Shift schedule={selectedSchedule} date={selectedSchedule.date} onClose={() => setSelectedSchedule(null)} />
      )}
    </div>
  );
}

export default Calendar;
