import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Item, Search, Button } from "../../components/ui";
import { LuListFilter, LuGrid3X3, LuList, LuPlus } from "react-icons/lu";

const cx = classNames.bind(styles);

function HeaderMedical({
  totalGroups,
  totalDepartments,
  totalSpecialties,
  viewMode,
  onClick,
  onAdd,
  keyword,
  onChange
}) {
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
        <Search value={keyword} onChange={onChange} className={cx("rounded-[8px]")} />
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
            icon={viewMode === "grid" ? <LuList /> : <LuGrid3X3 />}
            children={viewMode === "grid" ? "Phân cấp" : "Dạng lưới"}
            width="auto"
            onClick={onClick}
            iconClassName="text-[20px]"
            btnClassName={cx("hidden md:inline")}
            className={cx(
              "gap-2 text-[14px] px-3 rounded-[8px] font-medium",
              " border-2 border-[var(--color-bg-light-primary-300)] cursor-pointer"
            )}
          />
          <Button
            width={"auto"}
            icon={<LuPlus />}
            children={"Thêm khối"}
            className={cx(
              "text-white font-semibold",
              "flex items-center justify-between gap-2",
              "bg-[var(--color-primary)] text-[14px] px-3"
            )}
            onClick={onAdd}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(HeaderMedical);
