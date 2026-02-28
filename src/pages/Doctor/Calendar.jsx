import { useState, useRef } from "react";
import classNames from "classnames/bind";
import { scheduleStore } from "../../store/scheduleStore";
import { useDoctorCalendar, useScheduleResize, useSearch } from "../../components/hooks";
import { SESSION_PRESETS, WEEK_DAYS } from "../../constants/option";
import { TWCSS } from "../../styles/defineTailwindcss";
import { LuChevronLeft, LuChevronRight, LuX, LuGripVertical, LuRefreshCcw } from "react-icons/lu";
import { getDaysInMonth, formatDate } from "../../utils/format";
import { getDoctorGradient } from "../../utils/color";
import { Card, Shift, DragPreview } from "./index";
import { Item, Button, Search, Toast, Modal } from "../../components/ui";
import styles from "../../styles/pages.module.css";

const cx = classNames.bind(styles);

function Calendar() {
  const [doctorKeyword, setDoctorKeyword] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [dragPreview, setDragPreview] = useState(null);

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
    isToday,
  } = useDoctorCalendar();
  const { isResizing, resizingSchedule, handleResizeStart, handleResizeMove, handleResizeEnd, isDateInResizeRange } =
    useScheduleResize();
  const filteredDoctor = doctors.filter((d) => d.featured);
  const searchedDoctor = useSearch(filteredDoctor, doctorKeyword, (doctor) =>
    [doctor.name, doctor.specialty, doctor.tags].filter(Boolean).join(" "),
  );

  const dragPreviewRef = useRef(null);
  const rafId = useRef(null);

  const daysInMonth = getDaysInMonth(currentDate);
  const dirtyCount = getDirtySchedules();

  const handleDragStartEvent = (e, doctor) => {
    handleDragStart(doctor.id);

    // Ẩn drag image mặc định của browser
    const emptyImage = new Image();
    emptyImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    e.dataTransfer.setDragImage(emptyImage, 0, 0);

    // Set custom drag preview
    setDragPreview({
      doctor,
      position: { x: e.clientX, y: e.clientY },
    });
  };
  const handleDrag = (e) => {
    if (!dragPreview || e.clientX === 0 || e.clientY === 0) return;

    // Cancel previous animation frame
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    // Use requestAnimationFrame for smooth updates
    rafId.current = requestAnimationFrame(() => {
      if (dragPreviewRef.current) {
        dragPreviewRef.current.style.left = `${e.clientX}px`;
        dragPreviewRef.current.style.top = `${e.clientY}px`;
      }
    });
  };
  const handleDragEnd = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    setDragPreview(null);
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
      <div className="space-y-5">
        {/* Sidebar - Danh sách bác sĩ */}
        <div
          className={cx("bg-white rounded-2xl")}
          style={{
            boxShadow: "var(--shadow)",
          }}
        >
          <div
            className={cx("flex items-center justify-between p-3 md:p-6", "border-b border-[var(--color-primary-100)]")}
          >
            <div className="flex items-center gap-3">
              <div className={cx("")}>
                <Item as="h4" children="Danh sách bác sĩ" className="text-[13px] font-bold" />
                <Item
                  as="span"
                  children="Kéo vào lịch • Click để tạo"
                  className="text-[11px] text-[var(--color-unavailable)] leading-[1.8]"
                />
              </div>

              <Search
                value={doctorKeyword}
                onChange={(e) => setDoctorKeyword(e.target.value)}
                className="rounded-xl w-full md:w-[260px]"
                width="100%"
                height={36}
                placeholder="Tìm tên, chuyên môn, chức vụ,..."
              />
            </div>

            <Button
              height={36}
              width="auto"
              icon={<LuRefreshCcw />}
              className={cx(
                "px-4 py-2 rounded-xl transition-colors font-bold",
                "bg-linear-[var(--color-ln-primary)] text-white text-[12.5px]",
                "gap-2",
              )}
              children={`Đồng bộ: ${dirtyCount.length}`}
            />
          </div>

          <div className={cx("flex gap-3 p-3 md:p-6 w-full overflow-auto", TWCSS.scrollbarX)}>
            {searchedDoctor.map((doctor) => (
              <Card
                key={doctor.id}
                doctor={doctor}
                onDragStart={(e) => handleDragStartEvent(e, doctor)}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
          {dragPreview && (
            <DragPreview
              doctor={dragPreview.doctor}
              position={dragPreview.position}
              onRefReady={(element) => {
                dragPreviewRef.current = element;
              }}
            />
          )}
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "var(--shadow)" }}>
          {/* Header */}
          <div className={cx("px-3 md:px-6 md:py-4")}>
            <div className="flex flex-col xl:flex-row gap-3 items-center justify-between overflow-hidden">
              <div className="flex items-center gap-2">
                <Button
                  width={36}
                  height={36}
                  icon={<LuChevronLeft />}
                  onClick={goToPreviousMonth}
                  className={cx(
                    "p-2 rounded-xl transition-colors",
                    "border border-[var(--color-unavailable-300)]",
                    "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
                  )}
                />
                <Button
                  width={36}
                  height={36}
                  icon={<LuChevronRight />}
                  onClick={goToNextMonth}
                  className={cx(
                    "p-2 rounded-xl transition-colors",
                    "border border-[var(--color-unavailable-300)]",
                    "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
                  )}
                />
                <Button
                  height={36}
                  onClick={goToToday}
                  className={cx(
                    "px-4 py-2 rounded-xl transition-colors font-bold",
                    "bg-linear-[var(--color-ln-primary)] text-white text-[12.5px]",
                  )}
                  children="Hôm nay"
                />
              </div>

              <Item
                as="h2"
                children={`Tháng ${currentDate.getMonth() + 1}, ${currentDate.getFullYear()}`}
                className={cx("text-[17px] font-bold px-2 text-center w-[200px]")}
              />

              <Item
                as="span"
                children={`${dirtyCount.length} ca đã xếp lịch`}
                className={cx("text-[12px] font-bold px-2 text-center text-[var(--color-unavailable)]")}
              />
            </div>
          </div>

          {/* Week days */}
          <div className="overflow-hidden">
            <div className={cx("grid grid-cols-7 bg-linear-[var(--color-ln-primary)]")}>
              {WEEK_DAYS.map((day, idx) => (
                <Item
                  as="div"
                  children={day}
                  key={idx}
                  className={cx("py-3 text-center font-semibold text-white text-[12.5px]")}
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
                      className={`min-h-[100px] border border-gray-100 p-2 relative ${
                        !day.isCurrentMonth ? "bg-[var(--color-primary-100)]/30" : "bg-white"
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
                          const colorHex = getDoctorGradient(doctor?.name || "");
                          const isResizeActive =
                            isResizing &&
                            resizingSchedule?.scheduleId === schedule.scheduleId &&
                            resizingSchedule?.startDate === dateStr;

                          return (
                            <div
                              key={schedule.scheduleId}
                              onClick={() => handleScheduleClick(schedule, dateStr)}
                              style={{ background: colorHex }}
                              className={` text-white px-2 py-1 rounded-lg text-xs cursor-pointer hover:opacity-90 transition-opacity relative group`}
                            >
                              <div className="font-bold truncate text-[10.5px]">Bs. {doctor?.name}</div>
                              {schedule.configured && schedule.sessionType ? (
                                <div className="text-[9px] opacity-90">
                                  {SESSION_PRESETS[schedule.sessionType]?.label} • {schedule.slots?.length || 0} slots
                                </div>
                              ) : (
                                <div className="text-[9px] opacity-90">Chưa cấu hình bác sĩ</div>
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

      <Modal open={selectedSchedule} onClose={() => setSelectedSchedule(null)} width="max-w-[540px]">
        <Shift schedule={selectedSchedule} date={selectedSchedule?.date} onClose={() => setSelectedSchedule(null)} />
      </Modal>

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
