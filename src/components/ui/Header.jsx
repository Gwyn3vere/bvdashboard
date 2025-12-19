// Libraries - Hooks - Motions - Services
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useActive, useLogin } from "../hooks";
import { DropdownMotion } from "../../motions";
import { Link } from "react-router-dom";
import { userService, logoutService } from "../../services/auth";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { Search, Button, Avatar, Dropdown, Item, Username, Role } from ".";
import { CiBellOn, CiLight, CiCalendar, CiLogout, CiUser, CiSettings } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

const cx = classNames.bind(style);

function Header() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { handleLogout } = useLogin();

  const username = user?.name || "Guest";
  const role = user?.roles || "Visitor";
  const avatar = useActive(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await userService();

        if (res.success) {
          setUser(res.user);
        } else {
          setError(res.errors.user);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="px-10 pt-5 sticky top-0 w-full flex justify-between mb-5 max-w-[1800px] mx-auto">
      <Search className="rounded-full" />
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
              <Username children={username} className="font-bold text-[14px] uppercase" />
              <Role children={role} className="text-small text-[14px]" />
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
              <Item
                as={Link}
                children="Tài khoản"
                to="/"
                icon={<CiUser />}
                className={cx(
                  "flex gap-2 px-3 py-2 cursor-pointer rounded-[8px] ",
                  "hover:bg-[var(--color-bg-light-primary-200)]"
                )}
              />
              <Item
                as={Link}
                children="Cài đặt"
                to="/"
                icon={<CiSettings />}
                className={cx(
                  "flex gap-2 px-3 py-2 cursor-pointer rounded-[8px] ",
                  "hover:bg-[var(--color-bg-light-primary-200)]"
                )}
              />
              <Item
                as="button"
                onClick={handleLogout}
                children="Đăng xuất"
                icon={<CiLogout />}
                className={cx(
                  "flex gap-2 px-3 py-2 cursor-pointer rounded-[8px] w-full",
                  "hover:bg-[var(--color-bg-light-primary-200)]"
                )}
              />
            </Dropdown>
          </DropdownMotion>
        </div>
      </div>
    </header>
  );
}

export default Header;
