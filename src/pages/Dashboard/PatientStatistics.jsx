// Libraries - Mock
import classNames from "classnames/bind";
import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { patientData } from "../../mock/chart";
// Styles - UI
import style from "../../styles/pages.module.css";
import { Item, Button } from "../../components/ui";

const cx = classNames.bind(style);

function PatientStatistics() {
  const [timeFilter, setTimeFilter] = useState("Monthly");

  const PATIENT_LABELS = useMemo(
    () => ({
      recovered: "Đã hồi phục",
      newPatient: "Bệnh nhân mới"
    }),
    []
  );

  const filteredData = useMemo(() => {
    return patientData;
  }, [timeFilter]);

  // Chuẩn bị data cho Chart.js
  const chartData = useMemo(
    () => ({
      labels: filteredData.map((d) => d.month),
      datasets: [
        {
          label: PATIENT_LABELS.recovered,
          data: filteredData.map((d) => d.recovered),
          borderColor: "#fb7185",
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return "rgba(251, 113, 133, 0.3)";

            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0.05, "rgba(251, 113, 133, 0.3)");
            gradient.addColorStop(0.95, "rgba(251, 113, 133, 0.05)");
            return gradient;
          },
          borderWidth: 2.5,
          pointRadius: 5,
          pointBackgroundColor: "#fb7185",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#fb7185",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 2,
          fill: true,
          tension: 0 // Line thẳng
        },
        {
          label: PATIENT_LABELS.newPatient,
          data: filteredData.map((d) => d.newPatient),
          borderColor: "#4ade80",
          backgroundColor: function (context) {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return "rgba(74, 222, 128, 0.3)";

            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0.05, "rgba(74, 222, 128, 0.3)");
            gradient.addColorStop(0.95, "rgba(74, 222, 128, 0.05)");
            return gradient;
          },
          borderWidth: 2.5,
          pointRadius: 5,
          pointBackgroundColor: "#4ade80",
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#4ade80",
          pointHoverBorderColor: "#ffffff",
          pointHoverBorderWidth: 2,
          fill: true,
          tension: 0
        }
      ]
    }),
    [filteredData, PATIENT_LABELS]
  );

  // Options cho Chart.js
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: "#ffffff",
          titleColor: "#000000",
          bodyColor: "#000000",
          borderColor: "#e5e7eb",
          borderWidth: 1,
          padding: 12,
          displayColors: true,
          titleFont: {
            size: 14,
            weight: "bold"
          },
          bodyFont: {
            size: 13
          },
          callbacks: {
            labelColor: function (context) {
              return {
                borderColor: context.dataset.borderColor,
                backgroundColor: context.dataset.borderColor,
                borderWidth: 2,
                borderRadius: 2
              };
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          border: {
            display: false
          },
          ticks: {
            color: "var(--color-text-light-primary)",
            font: {
              size: 12,
              weight: 600
            },
            padding: 10
          }
        },
        y: {
          min: 0,
          max: 1000,
          ticks: {
            stepSize: 200,
            color: "var(--color-text-light-primary)",
            font: {
              size: 13,
              weight: 600
            }
          },
          grid: {
            color: "#f0f0f0",
            drawBorder: false
          },
          border: {
            display: false
          }
        }
      }
    }),
    []
  );

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
        <Line data={chartData} options={chartOptions} />
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

export default React.memo(PatientStatistics);
