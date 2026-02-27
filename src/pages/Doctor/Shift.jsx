import { useState } from "react";
import classNames from "classnames/bind";
import { LuX, LuCopy } from "react-icons/lu";
import { scheduleStore } from "../../store/scheduleStore";
import { useShiftConfig } from "../../components/hooks";
import { SESSION_PRESETS } from "../../constants/option";
import { DatePicker } from "./index";
import { Toast, Time, Item, Button, Input, TitleForm } from "../../components/ui";
import styles from "../../styles/pages.module.css";

const cx = classNames.bind(styles);

export default function Shift({ schedule, date, onClose }) {
  const { getDoctorById } = scheduleStore();
  const doctor = getDoctorById(schedule?.doctorId);

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
    getTimeConstraints,
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
      <TitleForm
        onClose={onClose}
        title={"Cấu hình ca làm việc"}
        subTitle={
          <p className="text-[12px]">
            {doctor?.name} -{" "}
            {new Date(date).toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        }
      />

      {/* Body */}
      <div className="p-6 bg-white space-y-4.5">
        {/* Session Type Selection */}
        <div>
          <Item as="label" children="Chọn buổi làm việc" className="block text-[11.5px] font-bold mb-2" />
          <div className="flex gap-2">
            {Object.entries(SESSION_PRESETS).map(([key, { label }]) => (
              <Button
                key={key}
                width="auto"
                height={36}
                children={label}
                onClick={() => handleSessionChange(key)}
                className={cx(
                  "flex-1 p-2 rounded-xl text-[12px] text-[var(--color-unavailable-700)] font-bold transition-all",
                  "border",
                  sessionType === key
                    ? "bg-linear-[var(--color-ln-primary)] text-white border-transparent"
                    : "bg-[var(--color-unavailable-100)] border-[var(--color-unavailable)]",
                )}
              />
            ))}
          </div>
        </div>

        {/* Time Range */}
        {sessionType !== "allday" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Item as="label" children="Giờ bắt đầu" className="block text-[11.5px] font-bold mb-2" />
              <Time
                value={startTime}
                onChange={(newValue) => setStartTime(newValue)}
                min={constraints.min}
                max={constraints.max}
                placeholder="Chọn giờ bắt đầu"
                inputClassName={cx("rounded-xl")}
              />
            </div>
            <div>
              <Item as="label" children="Giờ kết thúc" className="block text-[11.5px] font-bold mb-2" />
              <Time
                value={endTime}
                onChange={(newValue) => setEndTime(newValue)}
                min={constraints.min}
                max={constraints.max}
                placeholder="Chọn giờ kết thúc"
                inputClassName={cx("rounded-xl")}
              />
            </div>
          </div>
        )}

        {sessionType === "allday" && (
          <div className="bg-[var(--color-primary-100)] border border-[var(--color-primary-500)] rounded-xl p-4">
            <p className="text-[11.5px] text-[var(--color-primary-700)]">
              <strong>Cả ngày</strong> bao gồm: Sáng 8h-11h và Chiều 13h-17h (có nghỉ trưa)
            </p>
          </div>
        )}

        {/* Slot Duration */}
        <div>
          <Item as="label" children="Thời lượng mỗi ca khám (phút)" className="block text-[11.5px] font-bold mb-2" />
          <Input
            type="number"
            value={slotDuration}
            onChange={(e) => setSlotDurationValue(Number(e.target.value))}
            min="15"
            step="15"
            placeholder="30"
            width={"100%"}
            height={"auto"}
            labelClassName={cx("text-[11.5px] font-bold")}
            inputClassName={cx("rounded-xl")}
          />
          <p className="text-[10.5px] text-gray-500 mt-2">Khuyến nghị: 15, 30, 45 hoặc 60 phút</p>
        </div>

        {/* Generate Button */}
        <div>
          <Button
            width={"100%"}
            height={40}
            onClick={generateSlots}
            children={"Sinh khung giờ"}
            className="py-2 bg-linear-[var(--color-ln-primary)] text-white rounded-xl text-[13px] font-bold"
          />
          {isDirtyConfig && (
            <p className="text-[10.5px] text-blue-500 mt-2">Cấu hình đã thay đổi, vui lòng sinh lại khung giờ</p>
          )}
        </div>

        {/* Generated Slots with Checkboxes */}
        {generatedSlots.length > 0 && (
          <div
            className={cx(
              "bg-[var(--color-unavailable-100)]/40",
              "border border-[var(--color-unavailable-300)] rounded-xl p-4",
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-[12.5px]">Chọn khung giờ làm việc</h4>
              <div className="text-[11.5px] font-bold text-[var(--color-primary-700)]">
                Đã chọn: {selectedSlotIndices.length} / {generatedSlots.length}
              </div>
            </div>

            <div className="flex gap-2 mb-3">
              <Button
                width="auto"
                height="auto"
                children="Chọn tất cả"
                onClick={selectAllSlots}
                className={cx(
                  "px-3 py-1 text-[11.5px] rounded-lg transition-colors",
                  "bg-white text-[var(--color-unavailable-700)] font-bold",
                  "border border-[var(--color-unavailable-300)]",
                  "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
                )}
              />
              <Button
                width="auto"
                height="auto"
                children="Bỏ chọn tất cả"
                onClick={deselectAllSlots}
                className={cx(
                  "px-3 py-1 text-[11.5px] rounded-lg transition-colors",
                  "bg-white text-[var(--color-unavailable-700)] font-bold",
                  "border border-[var(--color-unavailable-300)]",
                  "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 max-h-64 overflow-y-auto">
              {generatedSlots.map((slot, idx) => {
                const isSelected = selectedSlotIndices.includes(idx);

                return (
                  <label
                    key={idx}
                    className={`flex flex-1 items-center gap-2 p-2 border rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "border-[var(--color-primary)]/50 bg-[var(--color-primary-100)]/50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSlot(idx)}
                      className={cx(
                        "relative appearance-none",
                        "w-[15px] h-[15px] text-[var(--color-primary-500)] rounded-sm focus:ring-2 focus:ring-[var(--color-primary)]",
                        "checked:bg-[var(--color-primary-500)]",
                        "checked:border-[var(--color-primary-500)]",
                        "checked:before:content-['✓']",
                        "checked:before:text-white",
                        "checked:before:text-[9px]",
                        "checked:before:flex",
                        "checked:before:items-center",
                        "checked:before:justify-center",
                        "checked:before:absolute",
                        "checked:before:inset-0",
                      )}
                    />
                    <span
                      className={`text-[11.5px] font-bold ${
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
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
        <Button
          type="button"
          icon={<LuCopy />}
          children={"Copy sang ngày khác"}
          onClick={() => setShowDatePicker(true)}
          width="100%"
          height={38}
          disabled={selectedSlots.length === 0 || isDirtyConfig === true}
          className={cx(
            "bg-[var(--color-unavailable-100)] gap-2",
            "text-[var(--color-unavailable-700)] font-bold text-[13px] rounded-xl",
          )}
        />
        <Button
          children={`Lưu cấu hình (${selectedSlots.length} slots)`}
          onClick={handleSave}
          width="100%"
          height={38}
          disabled={selectedSlots.length === 0 || isDirtyConfig === true}
          className={cx("bg-linear-[var(--color-ln-primary)]", "text-white font-bold text-[13px] rounded-xl")}
        />
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
