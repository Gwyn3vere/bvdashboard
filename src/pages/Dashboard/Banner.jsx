import React from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Item } from "../../components/ui";

const cx = classNames.bind(style);

function Banner() {
  return (
    <section className={cx("bg-white rounded-2xl")} style={{ boxShadow: "var(--shadow)" }}>
      {/* Header */}
      <div className={cx("px-6 pt-5.5 flex items-center justify-between mb-[16px]")}>
        <div>
          <Item as="h2" children={"Trạng thái Banner"} itemClassName={cx("text-[15px] font-black leading-5")} />
          {/* <Item
            children={`${dateNow} • ${appointmentsToday.length ?? 0} lịch tổng cộng`}
            itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]/70 font-medium")}
            className={cx("mt-[2px] leading-3")}
          /> */}
        </div>
        {/* <Item
          as={Link}
          to={`/quan-ly-lich-hen/${today.date}`}
          children={"Xem tất cả"}
          itemClassName={cx("whitespace-nowrap")}
          className={cx(
            "text-[11px] text-[var(--color-primary)] font-bold",
            "flex items-center gap-1 rounded-full leading-4",
            "py-[4px] px-[10px] bg-[var(--color-primary-100)]/50",
            "border border-[var(--color-primary-300)]",
          )}
        /> */}
      </div>
    </section>
  );
}

export default React.memo(Banner);
