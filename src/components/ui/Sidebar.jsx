// Libraries - Constants
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { SIDEBAR_MENU } from "../../constants";
import { useState } from "react";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { Item, Logo, Button } from ".";
import { IoIosArrowBack } from "react-icons/io";

const cx = classNames.bind(style);

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <aside className={cx("rounded-[8px] h-full transition-all duration-300")}>
      <div className="flex flex-col gap-2 h-full">
        <div
          className={cx(
            "bg-[var(--color-bg-light-primary-300)] rounded-[8px] p-2",
            isCollapsed ? "flex justify-center items-center" : "flex items-center gap-2"
          )}
        >
          <Logo src="" className="rounded-[8px]" width={50} height={50} />
          <div
            className={cx(
              "overflow-hidden whitespace-nowrap transition-all duration-300",
              isCollapsed ? "w-0" : "w-[190px]"
            )}
          >
            <span className="text-[12px] font-bold uppercase">Trung tâm y tế Liên Chiểu</span>
            <div className="text-[12px] font-bold italic text-red-500">Y tế gần dân, cân cần chăm sóc</div>
          </div>
        </div>

        <div className="relative flex-1 bg-[var(--color-bg-light-primary-300)] rounded-[8px]">
          <div className="hidden-scrollbar overflow-auto p-2">
            {SIDEBAR_MENU.map((group) => (
              <div key={group.group} className={cx(isCollapsed ? "mb-0" : "mb-5")}>
                <div
                  className={cx(
                    "px-3 text-[var(--color-text-light-secondary)] text-[11px] font-bold mb-2 uppercase",
                    "overflow-hidden whitespace-nowrap transition-all duration-300",
                    isCollapsed ? "w-0 h-0" : "w-[200px]"
                  )}
                >
                  <span>{group.group}</span>
                </div>
                {group.items.map((item) => (
                  <Item
                    key={item.title}
                    as={Link}
                    to={item.to}
                    icon={item.icon}
                    children={item.title}
                    className={cx(
                      "h-[50px]",
                      "px-3 py-2 cursor-pointer rounded-[8px] ",
                      "hover:bg-[var(--color-bg-light-primary-200)]"
                    )}
                    boolean={isCollapsed}
                  />
                ))}
              </div>
            ))}
          </div>
          <Button
            icon={<IoIosArrowBack />}
            width={50}
            height={50}
            className={cx(
              "text-[14px]",
              "absolute cursor-pointer -right-5 top-1/2 translate-y-[-50%] bg-[var(--color-bg-light-primary-200)] p-2 rounded-full shadow-md",
              isCollapsed ? "rotate-180 transition-transform" : "transition-transform"
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
