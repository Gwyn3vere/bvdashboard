import { useState } from "react";
import classNames from "classnames/bind";
import { LuX, LuCopy } from "react-icons/lu";
import { scheduleStore } from "../../store/scheduleStore";
import { useShiftConfig } from "../../components/hooks";
import { SESSION_PRESETS } from "../../constants/option";
import { DatePicker } from "./index";
import { Toast, Time, Item, Button, Input } from "../../components/ui";
import styles from "../../styles/pages.module.css";

const cx = classNames.bind(styles);

export default function Shift({ schedule, date, onClose }) {
  const { getDoctorById } = scheduleStore();
  const doctor = getDoctorById(schedule.doctorId);

  const {
    toast,
    setToast,
    sessionType,
    slotDuration,
    startTime,
    endTime,
    generatedSlots,
    selectedSlotIndices,
    isDirtyConfig,
    setSlotDurationValue,
    setStartTime,
    setEndTime,
    handleSessionChange,
    generateSlots,
    toggleSlot,
    selectAllSlots,
    deselectAllSlots,
    getSelectedSlots,
    saveConfig,
    copyToOtherDays,
    getTimeConstraints
  } = useShiftConfig(schedule, date);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    saveConfig();
    onClose();
  };

  const handleCopyToOtherDays = (targetDates) => {
    copyToOtherDays(targetDates);
    setShowDatePicker(false);
    onClose();
  };

  const selectedSlots = getSelectedSlots();
  const constraints = getTimeConstraints();

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={onClose}>
        <div
          className="bg-white rounded-[8px] shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto hidden-scrollbar"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
            <div>
              <Item as="h3" children="Cấu hình ca làm việc" className="text-xl font-bold text-gray-900" />
              <p className="text-sm text-gray-600 mt-1">
                {doctor?.firstName + " " + doctor?.lastName} -{" "}
                {new Date(date).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}
              </p>
            </div>
            <Button
              width={50}
              height={50}
              icon={<LuX />}
              iconClassName="text-2xl"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            />
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Session Type Selection */}
            <div>
              <Item
                as="label"
                children="Chọn buổi làm việc"
                className="block text-sm font-semibold text-gray-700 mb-3"
              />
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(SESSION_PRESETS).map(([key, { label }]) => (
                  <Button
                    key={key}
                    width="auto"
                    height={50}
                    children={label}
                    onClick={() => handleSessionChange(key)}
                    className={cx(
                      "p-3 rounded-[8px] border-2 font-medium transition-all",
                      sessionType === key
                        ? "border-[var(--color-primary-500)] bg-[var(--color-primary-100)] text-[var(--color-primary-700)]"
                        : "border-[var(--color-bg-light-primary-400)] hover:border-[var(--color-bg-light-primary-500)]"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Time Range */}
            {sessionType !== "allday" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Item as="label" children="Giờ bắt đầu" className="block text-sm font-semibold text-gray-700 mb-3" />
                  <Time
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    min={constraints.min}
                    max={constraints.max}
                    placeholder="Chọn giờ bắt đầu"
                  />
                </div>
                <div>
                  <Item as="label" children="Giờ kết thúc" className="block text-sm font-semibold text-gray-700 mb-3" />
                  <Time
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    min={constraints.min}
                    max={constraints.max}
                    placeholder="Chọn giờ kết thúc"
                  />
                </div>
              </div>
            )}

            {sessionType === "allday" && (
              <div className="bg-[var(--color-primary-100)] border border-[var(--color-primary-500)] rounded-lg p-4">
                <p className="text-sm text-[var(--color-primary-700)]">
                  <strong>Cả ngày</strong> bao gồm: Sáng 8h-11h và Chiều 13h-17h (có nghỉ trưa)
                </p>
              </div>
            )}

            {/* Slot Duration */}
            <div>
              <Item
                as="label"
                children="Thời lượng mỗi ca khám (phút)"
                className="block text-sm font-semibold text-gray-700 mb-3"
              />
              <Input
                type="number"
                value={slotDuration}
                onChange={(e) => setSlotDurationValue(Number(e.target.value))}
                min="15"
                step="15"
                className={cx("w-full", "rounded-[8px] focus:border-[var(--color-primary)] focus:outline-none")}
                placeholder="30"
              />
              <p className="text-xs text-gray-500 mt-2">Khuyến nghị: 15, 30, 45 hoặc 60 phút</p>
            </div>

            {/* Generate Button */}
            <div>
              <button
                onClick={generateSlots}
                className="w-full px-4 py-3 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-700)] transition-colors font-medium"
              >
                Sinh khung giờ
              </button>
              {isDirtyConfig && (
                <p className="text-xs text-blue-500 mt-2">Cấu hình đã thay đổi, vui lòng sinh lại khung giờ</p>
              )}
            </div>

            {/* Generated Slots with Checkboxes */}
            {generatedSlots.length > 0 && (
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Chọn khung giờ làm việc</h4>
                  <div className="text-sm text-gray-600">
                    Đã chọn:{" "}
                    <span className="font-semibold text-[var(--color-primary-500)]">{selectedSlotIndices.length}</span>{" "}
                    / {generatedSlots.length}
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <Button
                    width="auto"
                    children="Chọn tất cả"
                    onClick={selectAllSlots}
                    className={cx(
                      "px-3 py-1.5 text-sm rounded-[8px] transition-colors",
                      "bg-[var(--color-primary-100)] text-[var(--color-primary-900)] font-medium",
                      " hover:bg-[var(--color-primary-300)]"
                    )}
                  />
                  <Button
                    width="auto"
                    children="Bỏ chọn tất cả"
                    onClick={deselectAllSlots}
                    className={cx(
                      "px-3 py-1.5 text-sm rounded-[8px]transition-colors",
                      "bg-[var(--color-unavailable-100)] text-[var(--color-unavailable-700)] font-medium",
                      "hover:bg-[var(--color-unavailable-300)]"
                    )}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                  {generatedSlots.map((slot, idx) => {
                    const isSelected = selectedSlotIndices.includes(idx);
                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected
                            ? "border-[var(--color-primary-500)] bg-[var(--color-primary-100)]"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSlot(idx)}
                          className="w-4 h-4 text-[var(--color-primary-500)] rounded-[8px] focus:ring-2 focus:ring-[var(--color-primary-500)]"
                        />
                        <span
                          className={`text-sm font-medium ${
                            isSelected ? "text-[var(--color-primary-900)]" : "text-gray-700"
                          }`}
                        >
                          {slot.start} - {slot.end}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {generatedSlots.length === 0 && (
              <div className="bg-[var(--color-primary-100)] border border-[var(--color-primary-300)] rounded-[8px] p-8 text-center">
                <p className="text-[var(--color-primary-500)]">Chưa có khung giờ nào. Nhấn "Sinh khung giờ" để tạo.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
            <button
              onClick={() => setShowDatePicker(true)}
              disabled={selectedSlots.length === 0 || isDirtyConfig === true}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-[8px] hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LuCopy className="w-4 h-4" />
              Copy sang ngày khác
            </button>
            <button
              onClick={handleSave}
              disabled={selectedSlots.length === 0 || isDirtyConfig === true}
              className={cx(
                "flex-1 px-4 py-3 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed",
                "bg-[var(--color-primary-500)] text-white rounded-[8px] hover:bg-[var(--color-primary-700)]"
              )}
            >
              Lưu cấu hình ({selectedSlots.length} slots)
            </button>
          </div>
        </div>
      </div>

      {showDatePicker && (
        <DatePicker sourceDate={date} onClose={() => setShowDatePicker(false)} onConfirm={handleCopyToOtherDays} />
      )}
      <Toast
        visible={!!toast}
        duration={3000}
        position="bottom-right"
        onClose={() => setToast(null)}
        type={toast?.type}
        content={toast?.message}
      />
    </>
  );
}
