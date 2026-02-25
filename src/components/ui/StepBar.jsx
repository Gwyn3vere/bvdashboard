import React from "react";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { LuCheck } from "react-icons/lu";

const cx = classNames.bind(style);

function StepBar({ currentPage, totalSteps, steps }) {
  return (
    <div className="bg-white flex items-center px-6 pt-5 pb-2">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isDone = stepNum < currentPage;
        const isActive = stepNum === currentPage;

        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cx(
                  "w-7 h-7 rounded-full flex items-center justify-center",
                  "text-[11px] font-bold transition-all",
                  isDone && "bg-[var(--color-primary)] text-white",
                  isActive && "bg-linear-[var(--color-ln-primary)] text-white ring-4 ring-[var(--color-primary-200)]",
                  !isDone && !isActive && "bg-[var(--color-unavailable-100)] text-[var(--color-unavailable-500)]",
                )}
              >
                {isDone ? <LuCheck className="text-xs" strokeWidth={3} /> : stepNum}
              </div>
              <span
                className={cx(
                  "text-[11px] font-bold whitespace-nowrap",
                  isActive && "text-[var(--color-primary)]",
                  isDone && "text-[var(--color-primary)]",
                  !isDone && !isActive && "text-[var(--color-unavailable-500)]",
                )}
              >
                {label}
              </span>
            </div>

            {/* Connector line — không render sau item cuối */}
            {i < steps.length - 1 && (
              <div
                className={cx(
                  "h-[2px] flex-1 mx-2 mb-5 rounded-full transition-all",
                  isDone ? "bg-[var(--color-primary)]" : "bg-[var(--color-unavailable-100)]",
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default React.memo(StepBar);
