// Libraries - Constants - Hooks
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_MENU } from "../../constants";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { Item, Logo } from ".";

const cx = classNames.bind(style);

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <>
      {!collapsed && (
        <div className="fixed inset-0 bg-black/50 z-30 xl:hidden top-[70px]" onClick={() => setCollapsed(true)} />
      )}
      <aside
        className={cx(
          "xl:p-3 rounded-[8px] h-full transition-all duration-300",
          "bg-[var(--color-bg-light-primary-100)]",
          // Responsive positioning
          "fixed xl:relative",
          "top-[70px] xl:top-0",
          "left-0",
          "z-40",
          // Responsive visibility - ẩn khi collapsed trên mobile, luôn hiện trên xl
          collapsed ? "-translate-x-full xl:translate-x-0" : "translate-x-0",
          // Shadow cho mobile
          "shadow-lg xl:shadow-none"
        )}
      >
        <div className={cx("flex flex-col h-full rounded-[8px]")}>
          <div className={cx("p-2 mb-5", collapsed ? "flex justify-center items-center" : "flex items-center gap-2")}>
            <Logo src="" className="rounded-[8px]" width={50} height={50} />
            <div
              className={cx(
                "overflow-hidden whitespace-nowrap transition-all duration-300",
                collapsed ? "w-0" : "w-[190px]"
              )}
            >
              <span className="text-[12px] font-bold uppercase text-blue-700">Trung tâm y tế Liên Chiểu</span>
              <div className="text-[12px] font-bold italic text-red-500">Y tế gần dân, cân cần chăm sóc</div>
            </div>
          </div>

          <div className="relative flex-1">
            <div className="hidden-scrollbar overflow-auto p-2">
              {SIDEBAR_MENU.map((group) => (
                <div key={group.group} className={cx(collapsed ? "mb-0" : "mb-5")}>
                  <div
                    className={cx(
                      "text-[var(--color-text-light-secondary)] text-[12px] font-black uppercase",
                      "overflow-hidden whitespace-nowrap transition-all duration-300",
                      collapsed ? "w-0 h-0" : "w-[200px] mb-3"
                    )}
                  >
                    <span>{group.group}</span>
                  </div>
                  {group.items.map((item) => {
                    const isActive = pathname === item.to || pathname.startsWith(item.to + "/");
                    return (
                      <Item
                        key={item.title}
                        as={Link}
                        to={item.to}
                        icon={item.icon}
                        children={item.title}
                        className={cx(
                          "h-[45px] transition-all",
                          "px-3 py-2 cursor-pointer rounded-[8px] mb-2",
                          isActive
                            ? ""
                            : "hover:text-[var(--color-primary)] text-[var(--color-text-light-secondary)] font-medium",
                          isActive &&
                            "bg-[var(--color-primary)] text-[var(--color-bg-light-primary-100)] rounded-ee-4xl",
                          collapsed ? "flex justify-center items-center" : "flex items-center gap-4"
                        )}
                        itemClassName={cx("text-[16px]", collapsed ? "w-0" : "w-[190px]")}
                        iconClassName={cx("text-[24px]")}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
