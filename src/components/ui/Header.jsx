import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useActive, useLogin } from "../hooks";
import { DropdownMotion } from "../../motions";
import { Link } from "react-router-dom";
import { userService } from "../../services/auth";
import style from "../../styles/ui.module.css";
import { Search, Button, Avatar, Dropdown, Item, Username, Role } from ".";
import { CiBellOn, CiLight, CiCalendar, CiLogout, CiUser, CiSettings } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowBack } from "react-icons/io";
import { LuAlignRight, LuAlignLeft, LuLogOut } from "react-icons/lu";
import { ROLE_OPTIONS } from "../../constants/option";
import { NAV_MENU } from "../../constants/menu";

const cx = classNames.bind(style);

function Header({ collapsed, toggle }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { handleLogout } = useLogin();

  const username = user?.name || "Guest";
  const role = user?.role || "Visitor";
  const avatar = useActive(false);

  const roleConfig = ROLE_OPTIONS.find((item) => item.value === role);

  const dateNow = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await userService();

        if (res.success) {
          setUser(res?.user?.data);
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
    <header
      className={cx("px-2 xl:px-10 pt-5 sticky top-0 z-10 w-full flex justify-between mb-5 max-w-[1800px] mx-auto")}
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
            collapsed ? "opacity-100 scale-100" : "opacity-80 scale-95"
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
            "text-[14px] flex items-center justify-center font-medium gap-1"
          )}
        >
          <CiCalendar className="text-[18px]" />
          {dateNow}
        </div>
        {/* Avatar with Dropdown */}
        <div className="relative">
          <Avatar className="rounded-full" onClick={avatar.toggleActive}>
            <div className="hidden sm:block h-[40px]">
              <Username children={username} className="font-bold text-[14px] uppercase" />
              <Role children={roleConfig ? roleConfig.name : role} className="text-small text-[14px]" />
            </div>
            <IoIosArrowDown
              className={cx(
                "hidden sm:block text-[14px]",
                avatar.isActive ? "rotate-180 transition-transform" : "transition-transform"
              )}
            />
          </Avatar>
          <Dropdown
            minWidth="230px"
            className={cx(
              "absolute right-0 rounded-[8px]",
              "mt-2 shadow-sm p-3 z-10 text-[14px]",
              "border-1 border-gray-200",
              avatar.isActive ? "" : "hidden"
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
                className={cx("flex gap-2 p-3 cursor-pointer rounded-[8px] ", "hover:bg-[var(--color-primary-100)]")}
              />
            ))}
            <hr className="border-1 border-gray-100 my-1" />
            <Item
              as="button"
              children={"Dăng xuất"}
              icon={<LuLogOut />}
              iconClassName={cx("text-lg")}
              itemClassName={cx("font-medium")}
              onClick={handleLogout}
              className={cx(
                "flex gap-2 p-3 cursor-pointer rounded-[8px] ",
                "hover:bg-[var(--color-primary-100)] w-full"
              )}
            />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default Header;
