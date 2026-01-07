import { useState } from "react";
import { LuX, LuCopy } from "react-icons/lu";
import { scheduleStore } from "../../store/scheduleStore";
import { useShiftConfig } from "../../components/hooks";
import { SESSION_PRESETS } from "../../constants/option";
import { DatePicker } from "./index";
import { Toast } from "../../components/ui";

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
    setSlotDuration,
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
          className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Cấu hình ca làm việc</h3>
              <p className="text-sm text-gray-600 mt-1">
                {doctor?.name} -{" "}
                {new Date(date).toLocaleDateString("vi-VN", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}
              </p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <LuX className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-6">
            {/* Session Type Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Chọn buổi làm việc</label>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(SESSION_PRESETS).map(([key, { label }]) => (
                  <button
                    key={key}
                    onClick={() => handleSessionChange(key)}
                    className={`p-3 rounded-lg border-2 font-medium transition-all ${
                      sessionType === key
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Range */}
            {sessionType !== "allday" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Giờ bắt đầu</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    min={constraints.min || undefined}
                    max={constraints.max || undefined}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Giờ kết thúc</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    min={constraints.min || undefined}
                    max={constraints.max || undefined}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {sessionType === "allday" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  <strong>Cả ngày</strong> bao gồm: Sáng 8h-11h và Chiều 13h-17h (có nghỉ trưa)
                </p>
              </div>
            )}

            {/* Slot Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Thời lượng mỗi ca khám (phút)</label>
              <input
                type="number"
                value={slotDuration}
                onChange={(e) => setSlotDuration(Number(e.target.value))}
                min="15"
                step="15"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                placeholder="30"
              />
              <p className="text-xs text-gray-500 mt-2">Khuyến nghị: 15, 30, 45 hoặc 60 phút</p>
            </div>

            {/* Generate Button */}
            <div>
              <button
                onClick={generateSlots}
                className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Sinh khung giờ
              </button>
            </div>

            {/* Generated Slots with Checkboxes */}
            {generatedSlots.length > 0 && (
              <div className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Chọn khung giờ làm việc</h4>
                  <div className="text-sm text-gray-600">
                    Đã chọn: <span className="font-semibold text-blue-600">{selectedSlotIndices.length}</span> /{" "}
                    {generatedSlots.length}
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <button
                    onClick={selectAllSlots}
                    className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    Chọn tất cả
                  </button>
                  <button
                    onClick={deselectAllSlots}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    Bỏ chọn tất cả
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
                  {generatedSlots.map((slot, idx) => {
                    const isSelected = selectedSlotIndices.includes(idx);
                    return (
                      <label
                        key={idx}
                        className={`flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer transition-all ${
                          isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSlot(idx)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={`text-sm font-medium ${isSelected ? "text-blue-700" : "text-gray-700"}`}>
                          {slot.start} - {slot.end}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {generatedSlots.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">Chưa có khung giờ nào. Nhấn "Sinh khung giờ" để tạo.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t p-6 flex gap-3">
            <button
              onClick={() => setShowDatePicker(true)}
              disabled={selectedSlots.length === 0}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LuCopy className="w-4 h-4" />
              Copy sang ngày khác
            </button>
            <button
              onClick={handleSave}
              disabled={selectedSlots.length === 0}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
