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
import { LuAlignJustify, LuLogOut } from "react-icons/lu";
import { ROLE_OPTIONS } from "../../constants/option";
import { NAV_MENU } from "../../constants/menu";
import { useAuthStore } from "../../store/authStore";
import { TWCSS } from "../../styles/defineTailwindcss";
import { useLocation } from "react-router-dom";
import metaRoutes from "../../routes/metaRoutes";
import { Breadcrumb } from "./index";

const cx = classNames.bind(style);

function Header({ collapsed, toggle }) {
  const location = useLocation();
  const breadcrumbItems = metaRoutes[location.pathname]?.breadcrumb || [];
  const pageTitle = breadcrumbItems.at(-1)?.label || "";

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
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          icon={<LuAlignJustify />}
          width={40}
          height={40}
          iconClassName={cx("text-2xl font-bold")}
          className={cx(
            "text-[14px] text-[var(--color-primary)]",
            "cursor-pointer",
            "inline-flex justify-start transition-all duration-300 ease-in-out",
          )}
          onClick={toggle}
        />
        <div className={cx("")}>
          <Breadcrumb items={breadcrumbItems} />
          <Item children={pageTitle} itemClassName={cx("text-lg font-black")} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={cx(
            "w-auto h-[25px] px-4 bg-[var(--color-primary-100)] rounded-full ",
            "flex items-center justify-center font-medium gap-2",
            "border border-[var(--color-primary-300)]",
            "hidden md:inline-flex",
          )}
        >
          <div
            className={cx("w-2 h-2 rounded-full bg-[var(--color-primary)]")}
          />
          <Item
            children={dateNow}
            itemClassName="text-[11px] text-[var(--color-primary-900)] font-bold"
          />
        </div>
        {/* Notifications */}
        <Button
          height={40}
          width={40}
          className="hidden sm:flex bg-[var(--color-unavailable-100)]"
          icon={<CiBellOn />}
        />
        {/* Avatar with Dropdown */}
        <div
          className={cx(
            "relative bg-[var(--color-unavailable-100)] rounded-full p-0 md:py-2 md:px-3",
            "border border-[var(--color-unavailable-300)]",
          )}
          ref={avatarRef}
        >
          <Avatar
            width={30}
            height={30}
            className="rounded-full"
            onClick={avatar.toggleActive}
          >
            <div
              className={cx(
                "hidden sm:block h-[30px]",
                "flex flex-col items-center justify-center",
              )}
            >
              <Username
                children={user?.name || "Guest"}
                className="font-bold text-xs"
              />
              <Role
                children={
                  roleConfig ? roleConfig.name : user?.role || "Visitor"
                }
                className="text-small text-[11px]"
              />
            </div>
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
