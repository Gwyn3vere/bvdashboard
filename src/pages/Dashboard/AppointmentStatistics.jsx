// Libraries - Mock
import classNames from "classnames/bind";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { appointmentData } from "../../mock/chart";
import { useActive } from "../../components/hooks";
// Styles - UI
import style from "../../styles/pages.module.css";
import { CustomTooltip } from "./index";
import { Item, Button } from "../../components/ui";
import { IoCaretDownOutline, IoHeartCircleSharp, IoHeartDislikeCircle } from "react-icons/io5";

const cx = classNames.bind(style);

function AppointmentStatistics() {
  const yearSelected = useActive();
  const attended = appointmentData.reduce((sum, item) => sum + item.attended, 0);
  const mostAttendedMonth = appointmentData.reduce((max, item) => (item.attended > max ? item.attended : max), 0);
  const cancelled = appointmentData.reduce((sum, item) => sum + item.cancelled, 0);
  const mostCancelledMonth = appointmentData.reduce((max, item) => (item.cancelled > max ? item.cancelled : max), 0);
  const [selectedYear, setSelectedYear] = useState(() => {
    return localStorage.getItem("year") || "2025";
  });

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    localStorage.setItem("year", year);
    yearSelected.deactivate();
  };

  const APPOINTMENT_LABELS = {
    attended: "Đã đến",
    cancelled: "Đã huỷ"
  };
  return (
    <div
      className={cx("flex flex-col justify-between", "bg-white rounded-[8px] w-full mt-5")}
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div>
        <div className="flex justify-between items-center p-6">
          <Item as="strong" children="Lịch hẹn" itemClassName={cx("text-[20px]")} />

          <div className="relative">
            <Button
              icon={<IoCaretDownOutline />}
              onClick={yearSelected.toggleActive}
              children={selectedYear}
              iconPosition="right"
              className={cx(
                "text-[var(--color-primary)] text-sm font-bold",
                "hover:bg-[var(--color-bg-light-primary-200)] gap-2"
              )}
            />

            {yearSelected.isActive && (
              <div className="absolute bg-white">
                {["2022", "2023", "2024", "2025"].map((year) => (
                  <Button
                    key={year}
                    children={year}
                    onClick={() => handleSelectYear(year)}
                    className={cx(
                      "text-[var(--color-primary)] text-sm font-bold",
                      "hover:bg-[var(--color-bg-light-primary-200)]"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-2 px-6">
          <Item
            as="span"
            icon={<IoHeartCircleSharp />}
            children={`Tổng số lịch hẹn đã đến: ${attended}`}
            className={cx("flex items-center gap-2 my-2", "text-[var(--color-cyan)]")}
            iconClassName={cx("text-2xl")}
            itemClassName={cx("text-md ")}
          />
          <Item
            as="span"
            icon={<IoHeartCircleSharp />}
            children={`Tháng có lịch hẹn đến nhiều nhất: ${mostAttendedMonth}`}
            className={cx("flex items-center gap-2 my-2", "text-[var(--color-cyan)]")}
            iconClassName={cx("text-2xl")}
            itemClassName={cx("text-md ")}
          />
        </div>
        <div className="px-6">
          <Item
            as="span"
            icon={<IoHeartDislikeCircle />}
            children={`Tổng số lịch hẹn đã huỷ: ${cancelled}`}
            className={cx("flex items-center gap-2 my-2", "text-[var(--color-purple)]")}
            iconClassName={cx("text-2xl")}
            itemClassName={cx("text-md ")}
          />
          <Item
            as="span"
            icon={<IoHeartDislikeCircle />}
            children={`Tháng có lịch hẹn huỷ nhiều nhất: ${mostCancelledMonth}`}
            className={cx("flex items-center gap-2 my-2", "text-[var(--color-purple)]")}
            iconClassName={cx("text-2xl")}
            itemClassName={cx("text-md ")}
          />
        </div>
      </div>

      <div className="p-6">
        <div style={{ width: "100%", height: "380px" }}>
          <ResponsiveContainer>
            <BarChart
              data={appointmentData}
              margin={{ top: 10, right: 5, left: -20, bottom: 5 }}
              barGap={8}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-text-light-primary)", fontSize: 13, fontWeight: 600 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "var(--color-text-light-primary)", fontSize: 13, fontWeight: 600 }}
                tickFormatter={(value) => value}
                ticks={[0, 200, 400, 600, 800, 1000]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
              <Bar
                dataKey="attended"
                name={APPOINTMENT_LABELS.attended}
                fill="var(--color-cyan)"
                stroke="var(--color-cyan)"
                maxBarSize={40}
              />
              <Bar
                dataKey="cancelled"
                name={APPOINTMENT_LABELS.cancelled}
                fill="var(--color-purple)"
                stroke="var(--color-purple)"
                maxBarSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-8 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
            <span className="text-sm text-gray-600">Đã đến</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-400"></div>
            <span className="text-sm text-gray-600">Đã huỷ</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentStatistics;
