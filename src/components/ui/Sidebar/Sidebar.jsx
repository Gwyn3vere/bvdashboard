import classNames from "classnames/bind";
// Styles - UI
import style from "../../../styles/ui.module.css";
import { Button } from "../../ui";

const cx = classNames.bind(style);

function Sidebar() {
  return (
    <aside className="overflow-hidden">
      <div className="flex flex-col gap-2 h-full overflow-hidden">
        <div className="h-[50px] bg-[var(--color-bg-light-primary-300)] rounded-[8px]">Logo</div>

        <div className="flex-1 overflow-hidden bg-[var(--color-bg-light-primary-300)] rounded-[8px]">
          <div className="hidden-scrollbar overflow-auto p-2">
            <Button />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
