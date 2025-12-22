// Libraries - Mock
import classNames from "classnames/bind";
import { useState } from "react";
import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ComposedChart, Area, ResponsiveContainer } from "recharts";
import { patientData } from "../../mock/chart";
// Styles - UI
import style from "../../styles/pages.module.css";
import { CustomTooltip, Dot } from "./index";
import { Item, Button } from "../../components/ui";

const cx = classNames.bind(style);

export default function PatientStatistics() {
  const [timeFilter, setTimeFilter] = useState("Monthly");
  const PATIENT_LABELS = {
    recovered: "Đã hồi phục",
    newPatient: "Bệnh nhân mới"
  };
  return (
    <div className="bg-white rounded-[8px] p-6 lg:col-span-2" style={{ boxShadow: "var(--shadow)" }}>
      <div className="flex justify-between items-center mb-6">
        <Item as="strong" children="Thống kê bệnh nhân" itemClassName={cx("text-xl")} />
        <div className="flex gap-2">
          <Button
            children="Tháng"
            onClick={() => setTimeFilter("Monthly")}
            className={cx(
              "transition-all text-md font-bold",
              timeFilter === "Monthly"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-bg-light-primary-200)]"
            )}
          />
          <Button
            children="Tuần"
            onClick={() => setTimeFilter("Weekly")}
            className={cx(
              "transition-all text-md font-bold",
              timeFilter === "Weekly"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-bg-light-primary-200)]"
            )}
          />
          <Button
            children="Ngày"
            onClick={() => setTimeFilter("Today")}
            className={cx(
              "transition-all text-md font-bold",
              timeFilter === "Today"
                ? "bg-[var(--color-primary)] text-white"
                : "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-bg-light-primary-200)]"
            )}
          />
        </div>
      </div>

      <div style={{ width: "100%", height: "380px" }}>
        <ResponsiveContainer outline="none">
          <ComposedChart data={patientData} margin={{ top: 10, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="recoveredGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-error)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-error)" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="newPatientGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-light-primary)", fontSize: 12, fontWeight: 600 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--color-text-light-primary)", fontSize: 13, fontWeight: 600 }}
              ticks={[0, 200, 400, 600, 800, 1000]}
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Area backgrounds - phía dưới */}
            <Area type="linear" dataKey="recovered" fill="url(#recoveredGradient)" stroke="none" />
            <Area type="linear" dataKey="newPatient" fill="url(#newPatientGradient)" stroke="none" />

            {/* Lines - phía trên */}
            <Line
              type="linear"
              dataKey="recovered"
              name={PATIENT_LABELS.recovered}
              stroke="#fb7185"
              strokeWidth={2.5}
              dot={<Dot fill="#fb7185" />}
              activeDot={{ r: 6, fill: "#fb7185", stroke: "white", strokeWidth: 2 }}
            />
            <Line
              type="linear"
              dataKey="newPatient"
              name={PATIENT_LABELS.newPatient}
              stroke="#4ade80"
              strokeWidth={2.5}
              dot={<Dot fill="#4ade80" />}
              activeDot={{ r: 6, fill: "#4ade80", stroke: "white", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-8 mt-2">
        <div className="flex items-center gap-2">
          <Item as="div" className="w-3 h-3 rounded-full bg-[var(--color-error)]" />
          <Item as="span" children="Bệnh nhân hồi phục" className="text-sm text-[var(--color-text-light-secondary)]" />
        </div>
        <div className="flex items-center gap-2">
          <Item as="div" className="w-3 h-3 rounded-full bg-[var(--color-primary)]" />
          <Item as="span" children="Bệnh nhân mới" className="text-sm text-[var(--color-text-light-secondary)]" />
        </div>
      </div>
    </div>
  );
}
