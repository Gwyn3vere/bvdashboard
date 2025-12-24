// Libraries - Mock
import classNames from "classnames/bind";
import React, { useState, useMemo, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { appointmentData } from "../../mock/chart";
import { useActive } from "../../components/hooks";
// Styles - UI
import style from "../../styles/pages.module.css";
import { Item, Button } from "../../components/ui";
import { IoCaretDownOutline, IoHeartCircleSharp, IoHeartDislikeCircle } from "react-icons/io5";

const cx = classNames.bind(style);

function AppointmentStatistics() {
  const yearSelected = useActive();
  const saveTimeoutRef = useRef(null);

  const stats = useMemo(() => {
    return {
      attended: appointmentData.reduce((s, i) => s + i.attended, 0),
      cancelled: appointmentData.reduce((s, i) => s + i.cancelled, 0),
      mostAttended: Math.max(...appointmentData.map((i) => i.attended)),
      mostCancelled: Math.max(...appointmentData.map((i) => i.cancelled))
    };
  }, []);

  const [selectedYear, setSelectedYear] = useState(() => {
    return localStorage.getItem("year") || "2025";
  });

  const handleSelectYear = (year) => {
    setSelectedYear(year);

    // Debounce localStorage write
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem("year", year);
    }, 300);

    yearSelected.deactivate();
  };

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  const APPOINTMENT_LABELS = useMemo(
    () => ({
      attended: "Đã đến",
      cancelled: "Đã huỷ"
    }),
    []
  );

  // Chuẩn bị data cho Chart.js
  const chartData = useMemo(
    () => ({
      labels: appointmentData.map((d) => d.month),
      datasets: [
        {
          label: APPOINTMENT_LABELS.attended,
          data: appointmentData.map((d) => d.attended),
          backgroundColor: "#00bcd4ff",
          maxBarThickness: 40
        },
        {
          label: APPOINTMENT_LABELS.cancelled,
          data: appointmentData.map((d) => d.cancelled),
          backgroundColor: "#8100f2",
          maxBarThickness: 40
        }
      ]
    }),
    [APPOINTMENT_LABELS]
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
                borderColor: context.dataset.backgroundColor,
                backgroundColor: context.dataset.backgroundColor,
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
              size: 13,
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
            children={`Tổng số lịch hẹn đã đến: ${stats.attended}`}
            className={cx("flex items-center gap-2 my-2", "text-[var(--color-cyan)]")}
            iconClassName={cx("text-2xl")}
            itemClassName={cx("text-md ")}
          />
          <Item
            as="span"
            icon={<IoHeartCircleSharp />}
            children={`Tháng có lịch hẹn đến nhiều nhất: ${stats.mostAttendedMonth}`}
            className={cx("flex items-center gap-2 my-2", "text-[var(--color-cyan)]")}
            iconClassName={cx("text-2xl")}
            itemClassName={cx("text-md ")}
          />
        </div>
        <div className="px-6">
          <Item
            as="span"
            icon={<IoHeartDislikeCircle />}
            children={`Tổng số lịch hẹn đã huỷ: ${stats.cancelled}`}
            className={cx("flex items-center gap-2 my-2", "text-[var(--color-purple)]")}
            iconClassName={cx("text-2xl")}
            itemClassName={cx("text-md ")}
          />
          <Item
            as="span"
            icon={<IoHeartDislikeCircle />}
            children={`Tháng có lịch hẹn huỷ nhiều nhất: ${stats.mostCancelledMonth}`}
            className={cx("flex items-center gap-2 my-2", "text-[var(--color-purple)]")}
            iconClassName={cx("text-2xl")}
            itemClassName={cx("text-md ")}
          />
        </div>
      </div>

      <div className="p-6">
        <div style={{ width: "100%", height: "380px" }}>
          <Bar data={chartData} options={chartOptions} />
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

export default React.memo(AppointmentStatistics);
