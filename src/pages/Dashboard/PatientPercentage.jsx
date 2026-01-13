// Libraries - Mock
import classNames from "classnames/bind";
import React, { useState, useMemo } from "react";
import { PatientPercentageData } from "../../mock/chart";
import { mockOverviewStats } from "../../mock/overview";
import { mockDoctors } from "../../mock/manage";
// Styles - UI - Utils
import style from "../../styles/pages.module.css";
import { Item, Button, Avatar } from "../../components/ui";
import { IoHeartSharp } from "react-icons/io5";
import { formatNumber } from "../../utils/format";

const cx = classNames.bind(style);

function PatientPercentage() {
  const [timeFilter, setTimeFilter] = useState("Monthly");
  const [hoveredMetric, setHoveredMetric] = useState(null);

  return (
    <div className={cx("mt-5 h-auto bg-white p-6")} style={{ boxShadow: "var(--shadow)" }}>
      <div className="sm:flex justify-between items-center mb-6">
        <Item as="strong" children="Tỷ lệ bệnh nhân" itemClassName={cx("text-[20px] mb-5 sm:mb-0")} />
        <Milestone filter={timeFilter} setFilter={setTimeFilter} />
      </div>
      <HeadLabel patient={mockOverviewStats} doctors={mockDoctors} />
      <div className="flex-col flex sm:flex-row items-center justify-between gap-8">
        <RadialProgressChart setHover={setHoveredMetric} />
        <Legend setHover={setHoveredMetric} />
      </div>
      <ExExplanationCards data={PatientPercentageData} hover={hoveredMetric} />
    </div>
  );
}

export default React.memo(PatientPercentage);

function Milestone({ filter, setFilter }) {
  return (
    <div className="flex gap-2">
      <Button
        children="Ngày"
        onClick={() => setFilter("Daily")}
        className={cx(
          "transition-all text-sm font-semibold",
          filter === "Daily"
            ? "bg-[var(--color-primary)] text-white"
            : "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-bg-light-primary-200)]"
        )}
      />
      <Button
        children="Tuần"
        onClick={() => setFilter("Weekly")}
        className={cx(
          "transition-all text-sm font-semibold",
          filter === "Weekly"
            ? "bg-[var(--color-primary)] text-white"
            : "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-bg-light-primary-200)]"
        )}
      />
      <Button
        children="Tháng"
        onClick={() => setFilter("Monthly")}
        className={cx(
          "transition-all text-sm font-semibold",
          filter === "Monthly"
            ? "bg-[var(--color-primary)] text-white"
            : "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-bg-light-primary-200)]"
        )}
      />
    </div>
  );
}

function HeadLabel({ patient, doctors }) {
  const totalPatient = patient.find((p) => p.title === "Ca khám hoàn thành")?.value;

  return (
    <div className="bg-[var(--color-bg-light-primary-200)] rounded-lg p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[var(--color-primary)] rounded-lg flex items-center justify-center">
          <IoHeartSharp className="text-white text-3xl" />
        </div>
        <div>
          <div className="text-sm text-[var(--color-text-light-secondary)] mb-1">Tổng ca khám hoàn thành</div>
          <Item
            as="span"
            children={formatNumber(totalPatient)}
            className="text-3xl font-bold text-[var(--color-primary)]"
          />
        </div>
      </div>
      <div className="flex -space-x-3">
        {doctors
          .map((d) => (
            <Avatar
              key={d.id}
              src={d.avatarUrl}
              alt="avatar"
              width={45}
              height={45}
              className="w-10 h-10 rounded-full border-2 border-white overflow-hidden"
            />
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
}

function RadialProgressChart({ setHover }) {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="gradient-new" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>

          <linearGradient id="gradient-recovered" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>

          <linearGradient id="gradient-treatment" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        <circle cx="100" cy="100" r="85" fill="none" stroke="#f3f4f6" strokeWidth="12" />
        <circle cx="100" cy="100" r="65" fill="none" stroke="#f3f4f6" strokeWidth="12" />
        <circle cx="100" cy="100" r="45" fill="none" stroke="#f3f4f6" strokeWidth="12" />

        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="url(#gradient-new)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(PatientPercentageData.newPatient.percentage / 100) * (2 * Math.PI * 85)} ${
            2 * Math.PI * 85
          }`}
          style={{
            transition: "stroke-dasharray 1s ease-in-out",
            cursor: "pointer"
          }}
          onMouseEnter={() => setHover(PatientPercentageData.newPatient)}
          onMouseLeave={() => setHover(null)}
        />

        <circle
          cx="100"
          cy="100"
          r="65"
          fill="none"
          stroke="url(#gradient-recovered)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(PatientPercentageData.recovered.percentage / 100) * (2 * Math.PI * 65)} ${
            2 * Math.PI * 65
          }`}
          style={{
            transition: "stroke-dasharray 1s ease-in-out",
            transitionDelay: "0.2s",
            cursor: "pointer"
          }}
          onMouseEnter={() => setHover(PatientPercentageData.recovered)}
          onMouseLeave={() => setHover(null)}
        />

        <circle
          cx="100"
          cy="100"
          r="45"
          fill="none"
          stroke="url(#gradient-treatment)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${(PatientPercentageData.inTreatment.percentage / 100) * (2 * Math.PI * 45)} ${
            2 * Math.PI * 45
          }`}
          style={{
            transition: "stroke-dasharray 1s ease-in-out",
            transitionDelay: "0.4s",
            cursor: "pointer"
          }}
          onMouseEnter={() => setHover(PatientPercentageData.inTreatment)}
          onMouseLeave={() => setHover(null)}
        />
      </svg>
    </div>
  );
}

function Legend({ setHover }) {
  return (
    <div className="flex-1 space-y-4">
      {/* New Patient */}
      <div
        className={cx(
          "flex items-center justify-between cursor-pointer",
          "hover:bg-[var(--color-bg-light-primary-200)] p-2 rounded-lg transition"
        )}
        onMouseEnter={() => setHover(PatientPercentageData.newPatient)}
        onMouseLeave={() => setHover(null)}
      >
        <div className="flex items-center gap-3">
          <Item as="div" className="w-3 h-8 rounded-full bg-gradient-to-b from-amber-500 to-amber-600" />
          <div>
            <Item
              as="div"
              children={`${PatientPercentageData.newPatient.percentage}%`}
              className="text-2xl font-bold text-gray-800"
            />
            <Item
              as="div"
              children={`${PatientPercentageData.newPatient.actual} / ${PatientPercentageData.newPatient.total}`}
              className="text-xs text-gray-500"
            />
          </div>
        </div>
        <Item
          as="span"
          children="Bệnh nhân mới"
          itemClassName="text-[var(--color-text-light-secondary)] text-sm font-medium"
        />
      </div>

      {/* Recovered */}
      <div
        className={cx(
          "flex items-center justify-between cursor-pointer",
          "hover:bg-[var(--color-bg-light-primary-200)] p-2 rounded-lg transition"
        )}
        onMouseEnter={() => setHover(PatientPercentageData.recovered)}
        onMouseLeave={() => setHover(null)}
      >
        <div className="flex items-center gap-3">
          <Item as="div" className="w-3 h-8 rounded-full bg-gradient-to-b from-teal-500 to-teal-600" />
          <div>
            <Item
              as="div"
              children={`${PatientPercentageData.recovered.percentage}%`}
              className="text-2xl font-bold text-gray-800"
            />
            <Item
              as="div"
              children={`${PatientPercentageData.recovered.actual} / ${PatientPercentageData.recovered.total}`}
              className="text-xs text-gray-500"
            />
          </div>
        </div>
        <Item
          as="span"
          children="Đã hồi phục"
          itemClassName="text-[var(--color-text-light-secondary)] text-sm font-medium"
        />
      </div>

      {/* In Treatment */}
      <div
        className={cx(
          "flex items-center justify-between cursor-pointer",
          "hover:bg-[var(--color-bg-light-primary-200)] p-2 rounded-lg transition"
        )}
        onMouseEnter={() => setHover(PatientPercentageData.inTreatment)}
        onMouseLeave={() => setHover(null)}
      >
        <div className="flex items-center gap-3">
          <Item as="div" className="w-3 h-8 rounded-full bg-gradient-to-b from-slate-600 to-slate-700" />
          <div>
            <Item
              as="div"
              children={`${PatientPercentageData.inTreatment.percentage}%`}
              className="text-2xl font-bold text-gray-800"
            />
            <Item
              as="div"
              children={`${PatientPercentageData.inTreatment.actual} / ${PatientPercentageData.inTreatment.total}`}
              className="text-xs text-gray-500"
            />
          </div>
        </div>
        <Item
          as="span"
          children="Đang điều trị"
          itemClassName="text-[var(--color-text-light-secondary)] text-sm font-medium"
        />
      </div>
    </div>
  );
}

function ExExplanationCards({ data, hover }) {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <div className="sm:grid grid-cols-3 gap-3">
        <div
          className={cx(
            "mb-2 sm:mb-0 p-3 rounded-[8px] border transition-all duration-300",
            hover === null || hover?.label === "New Patient"
              ? "bg-amber-50 border-amber-200 opacity-100"
              : "bg-gray-50 border-gray-200 opacity-40"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Item as="div" className="w-2 h-2 rounded-full bg-amber-500" />
            <Item as="div" children="Bệnh nhân mới" className="text-xs font-semibold text-amber-700" />
          </div>
          <Item
            as="div"
            children={`${data.newPatient.percentage}%`}
            className="text-xl font-bold text-amber-600 mb-1"
          />
          <Item
            as="div"
            children={`${data.newPatient.actual} khách mới / ${data.newPatient.total} lượt khám`}
            className="text-xs text-gray-600 leading-tight"
          />
        </div>

        <div
          className={cx(
            "mb-2 sm:mb-0 p-3 rounded-[8px] border transition-all duration-300",
            hover === null || hover?.label === "Recovered"
              ? "bg-teal-50 border-teal-200 opacity-100"
              : "bg-gray-50 border-gray-200 opacity-40"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Item as="div" className="w-2 h-2 rounded-full bg-teal-500" />
            <Item as="div" children="Đã hồi phục" className="text-xs font-semibold text-teal-700" />
          </div>
          <Item as="div" children={`${data.recovered.percentage}%`} className="text-xl font-bold text-teal-600 mb-1" />
          <Item
            as="div"
            children={`${data.recovered.actual} ca khỏi / ${data.recovered.total} ca hoàn thành`}
            className="text-xs text-gray-600 leading-tight"
          />
        </div>

        <div
          className={cx(
            "mb-2 sm:mb-0 p-3 rounded-[8px] border transition-all duration-300",
            hover === null || hover?.label === "In Treatment"
              ? "bg-slate-50 border-slate-200 opacity-100"
              : "bg-gray-50 border-gray-200 opacity-40"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            <Item as="div" className="w-2 h-2 rounded-full bg-slate-600" />
            <Item as="div" children="Đang điều trị" className="text-xs font-semibold text-slate-700" />
          </div>
          <Item
            as="div"
            children={`${data.inTreatment.percentage}%`}
            className="text-xl font-bold text-slate-600 mb-1"
          />
          <Item
            as="div"
            children={`${data.inTreatment.actual} giường dùng / ${data.inTreatment.total} tổng
            giường`}
            className="text-xs text-gray-600 leading-tight"
          />
        </div>
      </div>
    </div>
  );
}
