// Libraries - Constants
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { SIDEBAR_MENU } from "../../../constants";
// Styles - UI - Icons
import style from "../../../styles/ui.module.css";
import { Item, Logo } from "../../ui";

const cx = classNames.bind(style);

function Sidebar() {
  return (
    <aside className="overflow-hidden">
      <div className="flex flex-col gap-2 h-full overflow-hidden">
        <Logo src="" className="rounded-[8px]" width={50} height={50} />

        <div className="flex-1 overflow-hidden bg-[var(--color-bg-light-primary-300)] rounded-[8px]">
          <div className="hidden-scrollbar overflow-auto p-2">
            {SIDEBAR_MENU.map((group) => (
              <div key={group.group} className="mb-5 last:mb-0">
                <span className="px-3 text-[var(--color-text-light-secondary)] text-[11px] font-bold mb-2 uppercase">
                  {group.group}
                </span>
                {group.items.map((item) => (
                  <Item
                    key={item.title}
                    as={Link}
                    to={item.to}
                    icon={item.icon}
                    children={item.title}
                    className="h-[50px]"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
