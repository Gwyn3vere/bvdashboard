import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { useActive, useClickOutsideManager } from "../hooks";
import { Link } from "react-router-dom";
import { userService } from "../../services/auth.mock";
// import { userService } from "../../services/auth";
import style from "../../styles/ui.module.css";
import { Search, Button, Avatar, Dropdown, Item, Username, Role } from ".";
import { CiBellOn, CiLight, CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { LuAlignRight, LuAlignLeft, LuLogOut } from "react-icons/lu";
import { ROLE_OPTIONS } from "../../constants/option";
import { NAV_MENU } from "../../constants/menu";
import { useAuthStore } from "../../store/authStore";
import { TWCSS } from "../../styles/defineTailwindcss";

const cx = classNames.bind(style);

function Header({ collapsed, toggle }) {
  const { user, initialized, logout } = useAuthStore();

  if (!initialized) return null;

  const roleConfig = ROLE_OPTIONS.find((item) => item.value === user?.role);

  const dateNow = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const clickOutside = useClickOutsideManager();
  const avatar = useActive();
  const avatarRef = useRef(null);
  useEffect(() => {
    if (avatar.isActive) {
      clickOutside.register(avatarRef, avatar.deactivate);
    } else {
      clickOutside.unregister(avatarRef);
    }
  }, [avatar.isActive]);

  return (
    <header
      className={cx(
        "px-2 xl:px-10 pt-5 sticky top-0 z-10 w-full flex justify-between",
        TWCSS.container,
        "shadow-xs mb-5",
      )}
    >
      <div className="flex gap-2">
        <Button
          icon={collapsed ? <LuAlignLeft /> : <LuAlignRight />}
          width={40}
          height={40}
          iconClassName={cx("text-2xl font-bold")}
          className={cx(
            "text-[14px] text-[var(--color-primary)]",
            "cursor-pointer",
            "inline-flex justify-start transition-all duration-300 ease-in-out",
            collapsed ? "opacity-100 scale-100" : "opacity-80 scale-95",
          )}
          onClick={toggle}
        />
        {/* <Search className="rounded-full" /> */}
      </div>
      <div className="flex gap-2">
        {/* Theme mode */}
        <Button
          height={40}
          width={40}
          className="hidden sm:flex border-2 border-[var(--color-bg-light-primary-300)]"
          icon={<CiLight />}
        />
        {/* Notifications */}
        <Button
          height={40}
          width={40}
          className="hidden sm:flex border-2 border-[var(--color-bg-light-primary-300)]"
          icon={<CiBellOn />}
        />
        <div
          className={cx(
            "w-auto h-[40px] py-2 px-4 bg-[var(--color-primary-100)] rounded-[8px] ",
            "text-[14px] flex items-center justify-center font-medium gap-1",
          )}
        >
          <CiCalendar className="text-[18px]" />
          {dateNow}
        </div>
        {/* Avatar with Dropdown */}
        <div className="relative" ref={avatarRef}>
          <Avatar className="rounded-full" onClick={avatar.toggleActive}>
            <div className="hidden sm:block h-[40px]">
              <Username
                children={user?.name || "Guest"}
                className="font-bold text-[14px] uppercase"
              />
              <Role
                children={
                  roleConfig ? roleConfig.name : user?.role || "Visitor"
                }
                className="text-small text-[14px]"
              />
            </div>
            <IoIosArrowDown
              className={cx(
                "hidden sm:block text-[14px]",
                avatar.isActive
                  ? "rotate-180 transition-transform"
                  : "transition-transform",
              )}
            />
          </Avatar>
          <Dropdown
            open={avatar.isActive}
            minWidth="230px"
            className={cx(
              "absolute right-0 rounded-[8px]",
              "mt-2 shadow-sm p-3 z-10 text-[14px]",
              "border-1 border-gray-200",
              avatar.isActive ? "" : "hidden",
            )}
            style={{ background: "var(--color-bg-light-primary-100)" }}
          >
            {NAV_MENU.map((item) => (
              <Item
                key={item.id}
                as={Link}
                children={item.name}
                to="/"
                icon={item.icon}
                iconClassName={cx("text-lg")}
                itemClassName={cx("font-medium")}
                className={cx(
                  "flex gap-2 p-3 cursor-pointer rounded-[8px] ",
                  "hover:bg-[var(--color-primary-100)]",
                )}
              />
            ))}
            <hr className="border-1 border-gray-100 my-1" />
            <Item
              as="button"
              children={"Dăng xuất"}
              icon={<LuLogOut />}
              iconClassName={cx("text-lg")}
              itemClassName={cx("font-medium")}
              onClick={logout}
              className={cx(
                "flex gap-2 p-3 cursor-pointer rounded-[8px] ",
                "hover:bg-[var(--color-primary-100)] w-full",
              )}
            />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Header;
