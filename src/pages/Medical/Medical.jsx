import { useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { List, Breadcrumb, Item, Search, Checkbox, Avatar, Button, Modal, Filter } from "../../components/ui";
import {
  LuLayoutDashboard,
  LuBuilding2,
  LuTestTubeDiagonal,
  LuZap,
  LuChevronRight,
  LuListFilter,
  LuGrid3X3,
  LuPlus
} from "react-icons/lu";
import { DEPARTMENTS_OPTIONS } from "../../constants/option";

const cx = classNames.bind(styles);

function Medical() {
  return (
    <div className={TWCSS.container}>
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <LuLayoutDashboard /> },
          { label: "Quản lý chuyên môn" }
        ]}
      />
      <Item as="strong" children="Quản lý chuyên môn" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Quản lý danh sách chuyên môn tại đây."
        itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
      />

      {/* Header */}
      <HeaderMedical totalGroups={3} totalDepartments={6} totalSpecialties={11} />

      {/* Groups dropdown */}
      <Groups />

      {/* Block component */}
    </div>
  );
}

export default Medical;

function HeaderMedical({ totalGroups, totalDepartments, totalSpecialties }) {
  return (
    <div className={cx("flex flex-col md:flex-row items-start md:items-end justify-between w-full gap-2 mb-4")}>
      <div className="flex items-center gap-5 w-full">
        <div className={cx("flex flex-col")}>
          <Item as="h3" children={totalGroups} itemClassName={cx("text-3xl font-bold text-[var(--color-primary)]")} />
          <Item as="span" children={"Khối"} itemClassName={cx("text-sm")} />
        </div>
        <div className={cx("flex flex-col")}>
          <Item
            as="h3"
            children={totalDepartments}
            itemClassName={cx("text-3xl font-bold text-[var(--color-primary)]")}
          />
          <Item as="span" children={"Khoa"} itemClassName={cx("text-sm")} />
        </div>
        <div className={cx("flex flex-col")}>
          <Item
            as="h3"
            children={totalSpecialties}
            itemClassName={cx("text-3xl font-bold text-[var(--color-primary)]")}
          />
          <Item as="span" children={"Chuyên khoa"} itemClassName={cx("text-sm")} />
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-2 w-full">
        <Search className={cx("rounded-[8px]")} />
        <div className="flex gap-2">
          <Button
            icon={<LuListFilter />}
            children="Bộ lọc"
            width="auto"
            iconClassName="text-[20px]"
            btnClassName={cx("hidden md:inline")}
            className={cx(
              "gap-2 text-[14px] px-3 rounded-[8px] font-medium",
              " border-2 border-[var(--color-bg-light-primary-300)] cursor-pointer"
            )}
          />
          <Button
            icon={<LuGrid3X3 />}
            children={"Dạng lưới"}
            width="auto"
            iconClassName="text-[20px]"
            btnClassName={cx("hidden md:inline")}
            className={cx(
              "gap-2 text-[14px] px-3 rounded-[8px] font-medium",
              " border-2 border-[var(--color-bg-light-primary-300)] cursor-pointer"
            )}
          />
        </div>
      </div>
    </div>
  );
}

function Groups({}) {
  return (
    <div className={cx("bg-[var(--color-primary)] p-6 text-white rounded-[8px]")}>
      <div className={cx("flex items-center justify-between")}>
        <div className={cx("flex items-center gap-5")}>
          <Button icon={<LuChevronRight />} width={50} height={50} />
          <Item
            as="div"
            icon={<LuBuilding2 />}
            className={cx(
              "p-3 bg-[var(--color-bg-light-primary-100)] rounded-[8px]",
              "text-[var(--color-primary)] text-2xl"
            )}
          />
          <div className={cx("")}>
            <Item as="strong" children={"Khối lâm sàng"} itemClassName={cx("text-lg")} />
            <Item as="div" children={"3 Khoa ● 7 Chuyên khoa"} itemClassName={cx("text-sm")} />
          </div>
        </div>

        <Button
          icon={<LuPlus />}
          children={"Thêm mới"}
          width={"auto"}
          className={cx(
            "px-3 py-2 bg-[var(--color-bg-light-primary-100)] text-[var(--color-primary)] font-semibold",
            "flex items-center gap-2"
          )}
        />
      </div>
    </div>
  );
}
