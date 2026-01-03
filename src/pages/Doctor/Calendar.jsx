import { useState } from "react";
import { LuChevronLeft, LuChevronRight, LuX, LuGripVertical } from "react-icons/lu";
import { scheduleStore } from "../../store/scheduleStore";
import { useDoctorCalendar, useScheduleResize } from "../../components/hooks";
import { getDaysInMonth } from "../../utils/format";
import { SESSION_PRESETS, WEEK_DAYS } from "../../constants/option";
import { Card, Shift } from "./index";

function Calendar() {
  const { doctors, getSchedulesByDate, getDoctorById, removeSchedule } = scheduleStore();

  const { currentDate, draggedDoctorId, goToPreviousMonth, goToNextMonth, goToToday, handleDragStart, handleDrop } =
    useDoctorCalendar();

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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Danh sách bác sĩ */}
      <div className="w-80 bg-white border-r p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Danh sách bác sĩ</h2>
        <p className="text-sm text-gray-600 mb-4">Kéo bác sĩ vào lịch để tạo ca làm việc</p>
        <div className="space-y-2">
          {doctors.map((doctor) => (
            <Card key={doctor.id} doctor={doctor} onDragStart={handleDragStartEvent} />
          ))}
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                <LuChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-gray-800 min-w-64 text-center">
                Tháng {currentDate.getMonth() + 1}, {currentDate.getFullYear()}
              </h2>
              <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
                <LuChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={goToToday}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Hôm nay
            </button>
          </div>
        </div>

        {/* Week days */}
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {WEEK_DAYS.map((day, idx) => (
            <div key={idx} className="p-3 text-center font-semibold text-gray-700 border-r last:border-r-0">
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="flex-1 overflow-auto" onMouseUp={handleResizeEnd} onMouseLeave={handleResizeEnd}>
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {daysInMonth.map((day, index) => {
              const dateStr = day.date.toISOString().split("T")[0];
              const schedules = getSchedulesByDate(dateStr);

              return (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDropEvent(e, dateStr, day.isCurrentMonth)}
                  onMouseEnter={() => handleResizeMove(dateStr)}
                  className={`bg-white min-h-[120px] p-2 ${!day.isCurrentMonth ? "opacity-40" : ""} ${
                    draggedDoctorId && day.isCurrentMonth ? "hover:bg-blue-50" : ""
                  } ${isDateInResizeRange(dateStr) ? "bg-blue-100 ring-2 ring-blue-500 ring-inset" : ""}`}
                >
                  <div className="text-sm font-semibold text-gray-700 mb-2">{day.date.getDate()}</div>
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

      {/* Modal */}
      {selectedSchedule && (
        <Shift schedule={selectedSchedule} date={selectedSchedule.date} onClose={() => setSelectedSchedule(null)} />
      )}
    </div>
  );
}

export default Calendar;
