// Libraries - Hook - Constants - Store
import { useState, useMemo } from "react";
import classNames from "classnames/bind";
import { scheduleStore } from "../../store/scheduleStore";
import { useDoctorCalendar, useScheduleResize, useActive } from "../../components/hooks";
import { SESSION_PRESETS, WEEK_DAYS } from "../../constants/option";
// Styles- UI - utils - Icon - TWCSS
import { TWCSS } from "../../styles/defineTailwindcss";
import { LuChevronLeft, LuChevronRight, LuLayoutDashboard, LuX, LuGripVertical, LuUserPlus } from "react-icons/lu";
import { getDaysInMonth, formatDate } from "../../utils/format";
import { getColorHexByName } from "../../utils/color";
import { Card, Create, Shift } from "./index";
import { Breadcrumb, Item, Button, Search, Toast, Modal } from "../../components/ui";
import styles from "../../styles/pages.module.css";

const cx = classNames.bind(styles);

function Calendar() {
  const create = useActive();

  const { doctors, getSchedulesByDate, getDoctorById, removeSchedule, getDirtySchedules } = scheduleStore();

  const {
    toast,
    setToast,
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
  const dirtyCount = getDirtySchedules();

  const handleDragStartEvent = (e, doctorId) => {
    handleDragStart(doctorId);

    const source = e.currentTarget;
    const rect = source.getBoundingClientRect();
    const dragImage = source.cloneNode(true);

    dragImage.style.width = `${rect.width}px`;
    dragImage.style.height = `${rect.height}px`;
    dragImage.style.opacity = "1";
    dragImage.style.filter = "none";
    dragImage.style.backdropFilter = "none";
    dragImage.style.transform = "none";
    dragImage.style.boxShadow = "none"; // QUAN TRỌNG
    dragImage.style.position = "absolute";
    dragImage.style.top = "-9999px";
    dragImage.style.left = "-9999px";
    dragImage.style.pointerEvents = "none";

    document.body.appendChild(dragImage);

    e.dataTransfer.setDragImage(dragImage, rect.width / 2, rect.height / 2);

    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
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
    <div className={TWCSS.container}>
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
          className={cx("bg-white p-6 flex flex-col justify-between w-80")}
          style={{
            boxShadow: "var(--shadow)"
          }}
        >
          <div>
            <div className={cx("mb-2 flex-shrink-0 h-[100px]")}>
              <Item as="h4" children="Danh sách bác sĩ" className="text-[18px] font-bold text-gray-900 mb-2" />
              <Item
                as="span"
                children="Kéo và thả bác sĩ vào lịch để tạo ca làm việc"
                className="text-[16px] text-gray-600 mb-4 leading-[1.8]"
              />
            </div>

            <Search className="rounded-[8px] mb-2" width="100%" height={48} />

            <div
              className="flex-1 w-full overflow-auto hidden-scrollbar"
              style={{
                maxHeight: "500px"
              }}
            >
              {doctors.map((doctor) => (
                <Card key={doctor.id} doctor={doctor} onDragStart={handleDragStartEvent} />
              ))}
            </div>
          </div>

          <div>
            <Button
              icon={<LuUserPlus />}
              children="Thêm mới"
              width="100%"
              height={50}
              onClick={create.toggleActive}
              className={cx(
                "bg-[var(--color-primary)] hover:bg-[var(--color-primary-700)]",
                "transition-all duration-300 text-white font-medium gap-2"
              )}
            />
            <Modal open={create.isActive} onClose={create.deactivate} backdrop={true} width="max-w-xl">
              <Create onClose={create.deactivate} />
            </Modal>
          </div>
        </div>

        {/* Calendar */}
        <div
          className="p-2 sm:p-6 bg-white w-full flex-1 "
          style={{
            boxShadow: "var(--shadow)"
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between h-[100px] mb-2">
            <div className="flex items-center gap-2">
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

            <Item
              as="h2"
              children={`Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`}
              className={cx("text-xl font-bold px-2 text-center w-[200px]")}
            />

            <Button
              height={40}
              width="auto"
              className={cx(
                "px-4 py-2 rounded-[8px] transition-colors font-bold",
                "bg-[var(--color-primary)] text-white text-[14px]"
              )}
              children={`Đồng bộ lịch làm việc: ${dirtyCount.length}`}
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
                  const dateStr = formatDate(day.date);
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
                      } ${draggedDoctorId && day.isCurrentMonth ? "hover:bg-green-50" : ""} ${
                        isDateInResizeRange(dateStr) ? "bg-green-100 ring-2 ring-[var(--color-primary)] ring-inset" : ""
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
                          const colorHex = getColorHexByName(schedule.colorName || doctor?.colorName);
                          const isResizeActive =
                            isResizing &&
                            resizingSchedule?.scheduleId === schedule.scheduleId &&
                            resizingSchedule?.startDate === dateStr;

                          return (
                            <div
                              key={schedule.scheduleId}
                              onClick={() => handleScheduleClick(schedule, dateStr)}
                              style={{ backgroundColor: colorHex }}
                              className={` text-white px-2 py-1 rounded text-xs cursor-pointer hover:opacity-90 transition-opacity relative group`}
                            >
                              <div className="font-medium truncate">
                                Bs. {doctor?.firstName + " " + doctor?.lastName}
                              </div>
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
      <Toast
        visible={!!toast}
        duration={3000}
        position="bottom-right"
        onClose={() => setToast(null)}
        type={toast?.type}
        content={toast?.message}
      />
    </div>
  );
}

export default Calendar;
