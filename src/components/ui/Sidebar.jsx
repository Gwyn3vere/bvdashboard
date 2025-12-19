// Libraries - Constants
import React from "react";
import classNames from "classnames/bind";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_MENU } from "../../constants";
import { useState } from "react";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { Item, Logo, Button } from ".";
import { IoIosArrowBack } from "react-icons/io";

const cx = classNames.bind(style);

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <aside className={cx("p-3 rounded-[8px] h-full transition-all duration-300")}>
      <div className="flex flex-col h-full rounded-[8px] ">
        <div className={cx("p-2 mb-5", isCollapsed ? "flex justify-center items-center" : "flex items-center gap-2")}>
          <Logo src="" className="rounded-[8px]" width={50} height={50} />
          <div
            className={cx(
              "overflow-hidden whitespace-nowrap transition-all duration-300",
              isCollapsed ? "w-0" : "w-[190px]"
            )}
          >
            <span className="text-[12px] font-bold uppercase text-blue-700">Trung tâm y tế Liên Chiểu</span>
            <div className="text-[12px] font-bold italic text-red-500">Y tế gần dân, cân cần chăm sóc</div>
          </div>
        </div>

        <div className="relative flex-1">
          <div className="hidden-scrollbar overflow-auto p-2">
            {SIDEBAR_MENU.map((group) => (
              <div key={group.group} className={cx(isCollapsed ? "mb-0" : "mb-5")}>
                <div
                  className={cx(
                    "text-[var(--color-text-light-secondary)] text-[12px] font-black uppercase",
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    isCollapsed ? "w-0 h-0" : "w-[200px] mb-3"
                  )}
                >
                  <span>{group.group}</span>
                </div>
                {group.items.map((item) => {
                  const isActive = new RegExp(`^${item.to}(/|$)`).test(pathname);
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
                        isActive && "bg-[var(--color-primary)] text-[var(--color-bg-light-primary-100)] rounded-ee-4xl",
                        isCollapsed ? "flex justify-center items-center" : "flex items-center gap-4"
                      )}
                      itemClassName={cx("text-[16px]", isCollapsed ? "w-0" : "w-[190px]")}
                      iconClassName={cx("text-[24px]")}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <Button
            icon={<IoIosArrowBack />}
            width={50}
            height={50}
            className={cx(
              "text-[14px] text-[var(--color-primary)]",
              "absolute cursor-pointer -right-7 top-1/2 translate-y-[-50%] bg-[var(--color-bg-light-primary-200)] p-2 rounded-full",
              isCollapsed ? "rotate-180 transition-transform" : "transition-transform"
            )}
            style={{ boxShadow: "var(--shadow)" }}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
