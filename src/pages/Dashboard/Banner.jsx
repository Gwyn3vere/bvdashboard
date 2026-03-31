import React, { useEffect } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Image, Item } from "../../components/ui";
import { useBannerStore } from "../../store/bannerStore";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);

function Banner() {
  const { banners, fetchBanners } = useBannerStore();

  const overviewBanners = banners.reduce(
    (acc, item) => {
      if (item.archive === 0) {
        if (item.isActive) {
          acc.active += 1;
        } else {
          acc.inactive += 1;
        }
      }

      return acc;
    },
    { active: 0, inactive: 0 },
  );
  const filterBanners = banners.filter((b) => b.archive === 0);

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <section className={cx("bg-white rounded-2xl px-6 py-5.5")} style={{ boxShadow: "var(--shadow)" }}>
      {/* Header */}
      <div className={cx(" flex items-center justify-between mb-[16px]")}>
        <div>
          <Item as="h2" children={"Trạng thái Banner"} itemClassName={cx("text-[15px] font-black leading-5")} />
          <Item
            children={"Danh sách banner đã sẵn sàng chạy"}
            itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]/70 font-medium")}
            className={cx("mt-[2px] leading-3")}
          />
        </div>
        <Item
          as={Link}
          to={`/quan-ly-banner`}
          children={"Xem tất cả"}
          itemClassName={cx("whitespace-nowrap")}
          className={cx(
            "text-[11px] text-[var(--color-primary)] font-bold",
            "flex items-center gap-1 rounded-full leading-4",
            "py-[4px] px-[10px] bg-[var(--color-primary-100)]/50",
            "border border-[var(--color-primary-300)]",
          )}
        />
      </div>
      {/* List */}
      <div className={cx("flex items-center gap-2 mb-[14px]")}>
        <Item
          icon={overviewBanners.active}
          children={"Đang hoạt động"}
          iconClassName={cx("text-[18px] font-bold text-[var(--color-primary-700)]")}
          itemClassName={cx("text-[9.5px] text-[var(--color-primary-700)]")}
          className={cx(
            "flex-1 flex flex-col items-center justify-center",
            "py-2 px-3.5 bg-[var(--color-primary-100)] rounded-xl",
          )}
        />
        <Item
          icon={overviewBanners.inactive}
          children={"Đang ẩn"}
          iconClassName={cx("text-[18px] font-bold text-[var(--color-error-700)]")}
          itemClassName={cx("text-[9.5px] text-[var(--color-error-700)]")}
          className={cx(
            "flex-1 flex flex-col items-center justify-center",
            "py-2 px-3.5 bg-[var(--color-error-100)] rounded-xl",
          )}
        />
      </div>
      <div className="space-y-2">
        {filterBanners.map((banner) => (
          <div
            key={banner.id}
            className={cx(
              "flex items-center gap-2 py-2.5 px-3.5",
              "bg-[var(--color-unavailable-100)]/50 rounded-xl",
              "border border-[var(--color-unavailable-300)]/50",
            )}
          >
            <div className="w-[36px] h-[36px] rounded-lg overflow-hidden">
              <Image src={banner?.imageUrl} alt={banner?.name} className="w-full h-full object-cover" />
            </div>

            <div className={cx("flex-1")}>
              <Item children={banner.name} itemClassName={cx("text-[12.5px] font-bold")} />
              <Item children={banner.url} itemClassName={cx("text-[10.5px] text-[var(--color-unavailable-700)]")} />
            </div>

            <Item
              as="div"
              icon={
                <div
                  className={cx(
                    "w-2 h-2 rounded-full",
                    banner.isActive ? "bg-[var(--color-secondary)]" : "bg-[var(--color-error)]",
                  )}
                />
              }
              children={banner.isActive ? "Đang hoạt động" : "Đang ẩn"}
              className={cx(
                "px-2 py-1 text-[11px] rounded-full",
                "font-bold",
                banner.isActive
                  ? "bg-[var(--color-secondary-200)]/40 text-[var(--color-secondary-900)]"
                  : "bg-[var(--color-error-100)] text-[var(--color-error-900)]",
                "flex items-center gap-1 inline-flex",
              )}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default React.memo(Banner);
