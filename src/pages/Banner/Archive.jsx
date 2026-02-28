import classNames from "classnames/bind";
import React from "react";
import styles from "../../styles/pages.module.css";
import { Item, Button } from "../../components/ui";
import { useBannerStore } from "../../store/bannerStore";
import { LuArchive } from "react-icons/lu";
const cx = classNames.bind(styles);

function Archive({ onClose, bannerId }) {
  const getBannerById = useBannerStore((b) => b.getBannerById);
  const deleteBanner = useBannerStore((b) => b.deleteBanner);
  const setEditingBannerId = useBannerStore((b) => b.setEditingBannerId);

  const banner = getBannerById(bannerId);
  if (!banner) return null;

  const handleConfirmDelete = () => {
    if (!bannerId) return;

    deleteBanner(bannerId);
    setEditingBannerId(null);
    onClose();
  };
  return (
    <div className={cx("bg-white px-8 py-7 flex flex-col items-center")}>
      <Button
        width={56}
        height={56}
        icon={<LuArchive />}
        iconClassName={cx("text-[24px] text-[var(--color-primary)]")}
        className={cx("bg-[var(--color-primary)]/20 rounded-2xl mx-auto mb-[16px]")}
      />

      <Item children={"Lưu trữ banner này?"} itemClassName={cx("text-[17px] font-bold")} />
      <Item
        children={
          <span>
            Banner <strong className="text-black">{banner?.name}</strong> sẽ được chuyển sang trạng thái lưu trữ.
            <br />
            <span>Dữ liệu sẽ không bị xoá và có thể tái sử dụng khi cần.</span>
          </span>
        }
        itemClassName={cx("text-[13px] text-[var(--color-unavailable-700)]")}
        className={cx("text-center mt-2 mb-7")}
      />

      <div className="flex gap-3 w-full">
        <Button
          type="button"
          children={"Huỷ"}
          onClick={onClose}
          width="100%"
          className={cx(
            "text-[var(--color-unavailable-900)] font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]",
            "rounded-xl",
            "font-semibold text-[13px]",
          )}
        />
        <Button
          type={"button"}
          children={"Lưu trữ"}
          onClick={handleConfirmDelete}
          width="100%"
          className={cx("bg-linear-[var(--color-ln-primary)] rounded-xl", "text-white font-semibold text-[13px]")}
        />
      </div>
    </div>
  );
}

export default React.memo(Archive);
