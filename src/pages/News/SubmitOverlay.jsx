import React, { useEffect, useState } from "react";
import { LuCheck, LuSend } from "react-icons/lu";

const STEPS = [
  { id: "validate", label: "Kiểm tra dữ liệu..." },
  { id: "upload", label: "Tải ảnh lên server..." },
  { id: "save", label: "Lưu bài viết..." },
  { id: "done", label: "Hoàn tất!" },
];

function SubmitOverlay({ visible, status, submitPromise, onDone }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!visible || !submitPromise) return;
    setStep(0);
    setDone(false);

    const t1 = setTimeout(() => setStep(1), 600);
    const t2 = setTimeout(() => setStep(2), 1200);

    submitPromise.then(() => {
      setStep(3);
      setTimeout(() => {
        setDone(true);
        setTimeout(onDone, 1000);
      }, 700);
    });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [visible, submitPromise]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="bg-white rounded-2xl p-8 w-[340px] flex flex-col items-center gap-6"
        style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}
      >
        {/* Icon vòng tròn */}
        <div className="relative w-16 h-16">
          {!done ? (
            <>
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="4"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - (step + 1) / STEPS.length)}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dashoffset 0.5s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <LuSend
                  className="text-[var(--color-primary)]"
                  size={22}
                  style={{
                    animation: "pulse 1s ease-in-out infinite",
                    transform: step % 2 === 0 ? "translate(1px,-1px)" : "translate(0,0)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
            </>
          ) : (
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "var(--color-primary)", animation: "popIn 0.4s cubic-bezier(.17,.67,.35,1.3)" }}
            >
              <LuCheck className="text-white" size={28} strokeWidth={3} />
            </div>
          )}
        </div>

        {/* Label */}
        <div className="text-center">
          <p className="font-bold text-[15px] text-gray-800">
            {status === "PUBLISHED" ? "Đang xuất bản bài viết" : "Đang lưu bản nháp"}
          </p>
          <p className="text-[13px] text-gray-400 mt-1" style={{ transition: "opacity 0.3s", minHeight: 20 }}>
            {STEPS[step]?.label}
          </p>
        </div>

        {/* Step dots */}
        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className="w-2 h-2 rounded-full"
              style={{
                background: i <= step ? "var(--color-primary)" : "#e5e7eb",
                transition: "background 0.4s",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes popIn {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default React.memo(SubmitOverlay);
