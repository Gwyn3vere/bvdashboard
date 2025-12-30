// Libraries - Mock - Hooks - Constants
import classNames from "classnames/bind";
import React, { useState, useMemo } from "react";
import { useCalendar, useActive } from "../../components/hooks";
import { mockAppointments } from "../../mock/manage";
import { APPOINTMENT_STATUS } from "../../constants/status";
// Styles - UI - Motions
import styles from "../../styles/pages.module.css";
import { LuChevronLeft, LuChevronRight, LuClock, LuUser, LuStethoscope, LuPlus } from "react-icons/lu";
import { Detail } from "./index";
import { Button, Item, Modal } from "../../components/ui";

const cx = classNames.bind(styles);

function Calendar() {
  const calendar = useCalendar(mockAppointments);
  const select = useActive();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDayModal, setShowDayModal] = useState(false);

  const weekDays = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

  // Get appointments for selected date
  const selectedDateAppointments = useMemo(() => {
    if (!selectedDate) return [];
    return calendar.getAppointmentsForDate(selectedDate);
  }, [selectedDate, calendar]);

  const handleOpenDayModal = (date) => {
    setSelectedDate(date);
    setShowDayModal(true);
  };

  const handleCloseDayModal = () => {
    setShowDayModal(false);
    setSelectedDate(null);
  };

  const handleCloseAppointmentModal = () => {
    setSelectedAppointment(null);
    select.deactivate();
  };

  return (
    <div className="rounded-[8px] p-6 bg-white" style={{ boxShadow: "var(--shadow)" }}>
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <Button
              width={40}
              height={40}
              icon={<LuChevronLeft />}
              onClick={calendar.goToPreviousMonth}
              className={cx(
                "p-2 rounded-lg transition-colors",
                "bg-[var(--color-bg-light-primary-300)]",
                "hover:bg-[var(--color-primary)] hover:text-white"
              )}
            />
            <Item
              as="h2"
              children={`Tháng ${calendar.currentDate.getMonth() + 1}, ${calendar.currentDate.getFullYear()}`}
              className={cx("text-xl font-bold px-2 text-center w-[200px]")}
            />
            <Button
              width={40}
              height={40}
              icon={<LuChevronRight />}
              onClick={calendar.goToNextMonth}
              className={cx(
                "p-2 rounded-lg transition-colors",
                "bg-[var(--color-bg-light-primary-300)]",
                "hover:bg-[var(--color-primary)] hover:text-white"
              )}
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="flex gap-4 text-sm">
              {Object.entries(APPOINTMENT_STATUS).map(([status, colors]) => (
                <div key={status} className="flex items-center gap-2">
                  <Item as="div" className={cx(`w-3 h-3 rounded-full`)} style={{ background: `${colors.color}` }} />
                  <Item as="span" children={colors.label} className="text-gray-600" />
                </div>
              ))}
            </div>
            <Button
              height={40}
              onClick={calendar.goToToday}
              className={cx(
                "px-4 py-2 rounded-[8px] transition-colors font-bold",
                "bg-[var(--color-primary)] text-white text-[14px]"
              )}
              children="Hôm nay"
            />
          </div>
        </div>

        <div className="bg-white rounded-[8px] overflow-hidden">
          <div className="grid grid-cols-7 bg-gray-50 ">
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className={cx(
                  "p-3 text-center font-semibold text-white",
                  "bg-[var(--color-primary)] border-r last:border-r-0"
                )}
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7">
            {calendar.daysInMonth.map((day, idx) => {
              const appointments = calendar.getAppointmentsForDate(day.date);
              const isCurrentDay = calendar.isToday(day.date);
              const hasMany = appointments.length > 2;

              return (
                <div
                  key={idx}
                  className={`min-h-32 border border-gray-200 p-2 relative ${
                    !day.isCurrentMonth ? "bg-[var(--color-bg-light-primary-200)]" : "bg-white"
                  } ${isCurrentDay ? "bg-[var(--color-bg-light-primary-300)]" : ""} ${
                    hasMany ? "cursor-pointer hover:bg-gray-50 transition-colors" : ""
                  }`}
                  onClick={hasMany ? () => handleOpenDayModal(day.date) : undefined}
                >
                  <div className="flex items-center justify-between mb-2 h-5">
                    <div className="flex items-center gap-1">
                      <Item
                        as="span"
                        children={day.date.getDate()}
                        className={`text-sm font-semibold ${
                          !day.isCurrentMonth
                            ? "text-[var(--color-bg-light-primary-500)]"
                            : "text-[var(--color-text-light-primary)]"
                        } ${
                          isCurrentDay
                            ? "bg-[var(--color-primary)] w-7 h-7 text-white rounded-full flex items-center justify-center"
                            : ""
                        }`}
                      />

                      {appointments.length > 0 && (
                        <Item
                          as="span"
                          children={appointments.length}
                          className={cx(
                            "flex items-center justify-center",
                            "text-xs w-5 h-5 rounded-full",
                            "bg-[var(--color-primary)] text-white font-bold"
                          )}
                        />
                      )}
                    </div>
                    {day.isCurrentMonth && (
                      <Button
                        width={4}
                        height={4}
                        icon={<LuPlus />}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle add appointment
                        }}
                        className="flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      />
                    )}
                  </div>
                  <div className="space-y-1">
                    {appointments.slice(0, 2).map((apt) => {
                      const apptConfig = APPOINTMENT_STATUS[apt.status];
                      return (
                        <div
                          key={apt.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAppointment(apt);
                            select.activate();
                          }}
                          className={cx("text-white", "rounded-[8px] px-2 py-1 cursor-pointer transition-shadow")}
                          style={{ background: `${apptConfig.color}` }}
                        >
                          <div className="flex items-center gap-1 mb-0.5 ">
                            <LuClock className="w-3 h-3" />
                            <Item as="span" children={apt.timeStart} className="text-xs font-semibold" />
                          </div>
                          <Item as="div" children={apt.patientName} className="text-xs truncate font-medium" />
                          <Item as="div" children={apt.specialty} className="text-xs  truncate" />
                        </div>
                      );
                    })}
                    {appointments.length > 2 && (
                      <div className="bg-[var(--color-bg-light-primary-500)] rounded-[8px] px-2 py-1 text-center">
                        <Item
                          as="div"
                          children={`+${appointments.length - 2} lịch khác`}
                          className="text-xs text-gray-700 font-semibold"
                        />
                        <Item children="Click để xem tất cả" className="text-xs text-gray-500 mt-0.5" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          open={select.isActive}
          onClose={handleCloseAppointmentModal}
          backdrop={true}
          style={{ boxShadow: "var(--shadow)" }}
          footer={
            <div className="flex justify-end gap-2 mt-5 text-[14px]">
              <Button
                onClick={handleCloseAppointmentModal}
                children="Huỷ"
                width="auto"
                height={40}
                className="px-4 py-2 font-bold"
                style={{ background: "var(--color-bg-light-primary-300)" }}
              />
              <Button
                children="Xác nhận"
                width="auto"
                height={40}
                className="px-4 py-2 font-bold"
                style={{ background: "var(--color-primary)", color: "var(--color-bg-light-primary-100)" }}
              />
            </div>
          }
        >
          {selectedAppointment && <Detail data={selectedAppointment} onClose={handleCloseAppointmentModal} />}
        </Modal>
        {/* {showDayModal && selectedDate && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseDayModal}
          >
            <div
              className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-bold text-gray-900">
                  Tất cả lịch hẹn -{" "}
                  {selectedDate.toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric"
                  })}
                </h3>
                <button
                  onClick={handleCloseDayModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              <div className="overflow-y-auto p-6">
                <div className="space-y-3">
                  {selectedDateAppointments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">Không có lịch hẹn</div>
                  ) : (
                    selectedDateAppointments.map((apt) => {
                      const colors = statusColors[apt.status];
                      return (
                        <div
                          key={apt.id}
                          onClick={() => {
                            handleCloseDayModal();
                            setSelectedAppointment(apt);
                          }}
                          className={`${colors.bg} border-l-4 ${colors.border} rounded-lg p-4 cursor-pointer hover:shadow-md transition-all`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <LuClock className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-bold text-gray-900">
                                  {apt.timeStart} - {apt.timeEnd}
                                </span>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${colors.text} font-medium`}>
                                  {colors.label}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-3 text-sm">
                                <div>
                                  <span className="text-gray-600">Bệnh nhân:</span>
                                  <span className="ml-2 font-medium text-gray-900">{apt.patientName}</span>
                                </div>
                                <div>
                                  <span className="text-gray-600">Bác sĩ:</span>
                                  <span className="ml-2 font-medium text-gray-900">{apt.doctorName}</span>
                                </div>
                                <div className="col-span-2">
                                  <span className="text-gray-600">Chuyên khoa:</span>
                                  <span className="ml-2 font-medium text-gray-900">{apt.specialty}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default React.memo(Calendar);
