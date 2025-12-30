// Libraries - Mock - Hooks - Constants
import classNames from "classnames/bind";
import React, { useState, useMemo } from "react";
import { APPOINTMENT_STATUS } from "../../constants/status";
// Styles - UI - Motions
import styles from "../../styles/pages.module.css";
import { LuChevronLeft, LuChevronRight, LuClock, LuUser, LuStethoscope, LuPlus } from "react-icons/lu";
import { Button, Item } from "../../components/ui";

const cx = classNames.bind(styles);

function Detail({ data, onClose }) {
  const detailConfig = APPOINTMENT_STATUS[data?.status];
  if (!detailConfig) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Chi tiết lịch hẹn</h3>
        <button onClick={() => onClose(null)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">Trạng thái</label>
          <div
            className={cx("inline-block px-3 py-1 rounded-full", "text-sm font-bold text-white")}
            style={{ background: `${detailConfig.color}` }}
          >
            {detailConfig.label}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">Bệnh nhân</label>
          <p className="text-gray-900 font-medium">{data.patientName}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">Bác sĩ</label>
          <p className="text-gray-900 font-medium">{data.doctorName}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">Chuyên khoa</label>
          <p className="text-gray-900">{data.specialty}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Ngày khám</label>
            <p className="text-gray-900">
              {new Date(data.date).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              })}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">Giờ khám</label>
            <p className="text-gray-900">
              {data.timeStart} - {data.timeEnd}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Detail);
