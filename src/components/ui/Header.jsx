// Libraries - Hooks - Motions
import classNames from "classnames/bind";
import { useActive } from "../../../../Portlify/FE/src/components/hooks";
import { DropdownMotion } from "../../motions";
import { Link } from "react-router-dom";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { Search, Button, Avatar, Dropdown, Item, Username, Role } from ".";
import { CiBellOn, CiLight, CiCalendar, CiLogout, CiUser, CiSettings } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

const cx = classNames.bind(style);

function Header() {
  const avatar = useActive(false);
  return (
    <header className="sticky top-0 w-full flex justify-between">
      <Search />
      <div className="flex gap-2">
        {/* Theme mode */}
        <Button
          height={40}
          width={40}
          className="border-2 border-[var(--color-bg-light-primary-300)]"
          icon={<CiLight />}
        />
        {/* Notifications */}
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
        {/* Avatar with Dropdown */}
        <div className="relative">
          <Avatar className="rounded-full" onClick={avatar.toggleActive}>
            <div className="h-[40px]">
              <Username children="John Doe" className="font-medium text-[14px]" />
              <Role children="Administrator" className="text-small text-[14px]" />
            </div>
            <IoIosArrowDown
              className={cx(
                "text-[14px]",
                avatar.isActive ? "rotate-180 transition-transform" : "transition-transform"
              )}
            />
          </Avatar>
          <DropdownMotion isOpen={avatar.isActive} duration={0.3}>
            <Dropdown
              className="absolute right-0 rounded-[8px] mt-2 shadow-sm p-2 z-10 text-[14px]"
              style={{ background: "var(--color-bg-light-primary-300)" }}
            >
              <Item as={Link} children="Tài khoản" to="/" icon={<CiUser />} />
              <Item as={Link} children="Cài đặt" to="/" icon={<CiSettings />} />
              <Item as={Link} children="Đăng xuất" to="/" icon={<CiLogout />} />
            </Dropdown>
          </DropdownMotion>
        </div>
      </div>
    </header>
  );
}

export default Header;
