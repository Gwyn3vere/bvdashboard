// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../../styles/components.module.css";
import { Search, Button, Avatar } from "../index";
import { CiBellOn, CiLight, CiCalendar } from "react-icons/ci";

const cx = classNames.bind(style);

function Header() {
  return (
    <header className="sticky top-0 w-full h-[50px] flex justify-between">
      <Search />
      <div className="flex gap-2">
        <Button
          height={40}
          width={40}
          className="border-2 border-[var(--color-bg-light-primary-300)]"
          icon={<CiLight />}
        />
        <Button
          height={40}
          width={40}
          className="border-2 border-[var(--color-bg-light-primary-300)]"
          icon={<CiBellOn />}
        />
        <div
          className={cx(
            "w-auto h-[40px] py-2 px-4 bg-[var(--color-bg-light-primary-300)] rounded-[8px] ",
            "text-[14px] flex items-center justify-center font-medium gap-1"
          )}
        >
          <CiCalendar className="text-[18px]" />
          Chủ Nhật, 30/11/2025
        </div>
        <Avatar className="rounded-full" />
      </div>
    </header>
  );
}

export default Header;
