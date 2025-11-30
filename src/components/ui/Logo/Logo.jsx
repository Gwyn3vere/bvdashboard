import classNames from "classnames/bind";
// Styles - UI
import style from "../../../styles/ui.module.css";

const cx = classNames.bind(style);

function Logo({ width, height, className = "", src, style = {}, ...props }) {
  return (
    <div className="bg-[var(--color-bg-light-primary-300)] rounded-[8px] p-2 flex items-center gap-2">
      {src ? (
        <img src={src} alt="logo" className={className} style={{ width, height, ...style }} {...props} />
      ) : (
        <div className="rounded-[8px] bg-blue-500" style={{ width, height, ...style }} {...props}></div>
      )}

      <div>
        <span className="text-[12px] font-bold uppercase">Trung tâm y tế Liên Chiểu</span>
        <div className="text-[12px] font-bold italic text-red-500">Y tế gần dân, cân cần chăm sóc</div>
      </div>
    </div>
  );
}

export default Logo;
