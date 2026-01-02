// Libraries - Mock - Hooks - Constants
import classNames from "classnames/bind";
import React, { useState, useMemo, Fragment } from "react";
import { APPOINTMENT_STATUS } from "../../constants/status";
// Styles - UI - Motions - Utils
import styles from "../../styles/pages.module.css";
import {
  LuX,
  LuUser,
  LuCalendarDays,
  LuStethoscope,
  LuSparkle,
  LuNotepadText,
  LuSmile,
  LuAnnoyed,
  LuAngry
} from "react-icons/lu";
import { Button, Item } from "../../components/ui";
import { formatDateVN } from "../../utils/format";

const cx = classNames.bind(styles);

function Detail({ data, onClose }) {
  const detailConfig = APPOINTMENT_STATUS[data?.status];
  if (!detailConfig) return null;

  return (
    <div className="relative">
      <Item children="Lịch hẹn chi tiết" className="flex items-center gap-2 text-2xl font-bold mb-4" />
      <Button
        icon={<LuX />}
        width={40}
        height={40}
        className={cx("absolute top-0 right-0", "hover:bg-[var(--color-error)] hover:text-white")}
        iconClassName="text-[20px]"
        onClick={onClose}
      />

      <div className="space-y-4">
        <div className="py-4 border-b border-t border-gray-200">
          <Item
            as="strong"
            icon={<LuUser />}
            children={data.patientName}
            iconClassName="w-4"
            className="flex items-center gap-3"
          />
          <Item
            as="span"
            icon=""
            children={data.patientPhone}
            iconClassName="w-4"
            className="flex items-center gap-3 text-[15px] py-1"
          />
        </div>
        <div>
          <Item
            as="strong"
            icon={<LuSparkle />}
            children="Trạng thái"
            iconClassName="w-4"
            className="flex items-center gap-3 text-[15px]"
          />
          <Item
            as="div"
            children={detailConfig.label}
            className={cx("inline-block px-3 py-1 rounded-full", "ml-6 text-sm font-bold text-white")}
            style={{ background: `${detailConfig.color}` }}
          />
        </div>
        <div className="flex justify-between">
          <div>
            <Item
              as="strong"
              icon={<LuCalendarDays />}
              children={data.scheduled}
              iconClassName="w-4"
              className="flex items-center gap-3 text-[15px]"
            />
            <Item
              as="span"
              icon=" "
              children={formatDateVN(data.date)}
              iconClassName="w-4"
              className="flex items-center gap-3 text-[15px] py-1"
            />
          </div>
          {data.rescheduled && (
            <div>
              <Item
                as="strong"
                icon={<LuCalendarDays />}
                children={data.rescheduled}
                iconClassName="w-4"
                className="flex items-center gap-3 text-[15px]"
              />
              <Item
                as="span"
                icon=" "
                children={formatDateVN(data.date)}
                iconClassName="w-4"
                className="flex items-center gap-3 text-[15px] py-1"
              />
            </div>
          )}
        </div>
        <div className="">
          <Item
            as="strong"
            icon={<LuStethoscope />}
            children={data.doctorName}
            iconClassName="w-4"
            className="flex items-center gap-3 text-[15px]"
          />
          <Item
            as="span"
            icon=" "
            children={`Chuyên khoa - ${data.specialty}`}
            iconClassName="w-4"
            className="flex items-center gap-3 text-[15px] py-1"
          />
        </div>
        <div className="">
          <Item
            as="strong"
            icon={<LuNotepadText />}
            children="Lý do khám"
            iconClassName="w-4"
            className="flex items-center gap-3 text-[15px]"
          />
          <Item
            as="span"
            icon=" "
            children={data.description || "Không có thông tin chi tiết"}
            iconClassName="w-4"
            className="flex items-center gap-3 text-[15px] py-1"
          />
        </div>
      </div>

      <div className="flex justify-between gap-2 py-4">
        <Button
          icon={<LuSmile />}
          width={150}
          height={50}
          children="Hoàn thành"
          iconClassName="text-xl"
          className={cx(
            "gap-3 px-4",
            "border rounded-[8px] border-gray-400 text-sm font-medium",
            "hover:bg-[var(--color-primary-100)] hover:text-[var(--color-primary-900)] hover:border-[var(--color-primary-900)]"
          )}
        />
        <Button
          icon={<LuAngry />}
          width={150}
          height={50}
          children="Không đến"
          iconClassName="text-xl"
          className={cx(
            "gap-3 px-4",
            "border rounded-[8px] border-gray-400 text-sm font-medium",
            "hover:bg-[var(--color-warning-100)] hover:text-[var(--color-warning-900)] hover:border-[var(--color-warning-900)]"
          )}
        />
        <Button
          icon={<LuAnnoyed />}
          width={150}
          height={50}
          children="Huỷ lịch"
          iconClassName="text-xl"
          className={cx(
            "gap-3 px-4",
            "border rounded-[8px] border-gray-400 text-sm font-medium",
            "hover:bg-[var(--color-error-100)] hover:text-[var(--color-error-900)] hover:border-[var(--color-error-900)]"
          )}
        />
      </div>
    </div>
  );
}

export default React.memo(Detail);
