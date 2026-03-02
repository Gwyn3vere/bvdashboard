import { useState, useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import { useActive, useSearch } from "../../components/hooks";
import styles from "../../styles/pages.module.css";
import { ActionBar, Item, List, Modal, Button, Image } from "../../components/ui";
import { LuTrash2, LuLink, LuPen, LuArchive, LuArchiveRestore, LuTrash } from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";
import { BANNER_FEATURED_OPTION } from "../../constants/option";
import { useBannerStore } from "../../store/bannerStore";
import { BannerForm, ConfirmAction } from "./index";

const cx = classNames.bind(styles);

function Banner() {
  const banners = useBannerStore((b) => b.banners);
  const fetchBanners = useBannerStore((b) => b.fetchBanners);
  const getBannerById = useBannerStore((b) => b.getBannerById);
  const editingBannerId = useBannerStore((b) => b.editingBannerId);
  const setEditingBannerId = useBannerStore((b) => b.setEditingBannerId);

  const deleteBanner = useBannerStore((b) => b.deleteBanner);
  const archiveBanner = useBannerStore((b) => b.archiveBanner);
  const restoreBanner = useBannerStore((b) => b.restoreBanner);
  const banner = getBannerById(editingBannerId);

  const handleDelete = () => {
    if (!editingBannerId) return;

    deleteBanner(editingBannerId);
    setEditingBannerId(null);
    onClose();
  };

  const handleArchive = () => {
    if (!editingBannerId) return;

    archiveBanner(editingBannerId);
    setEditingBannerId(null);
    onClose();
  };

  const handleRestore = () => {
    if (!editingBannerId) return;

    restoreBanner(editingBannerId);
    setEditingBannerId(null);
    onClose();
  };

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  const [bannerKeyword, setBannerKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  // Lọc tầng 1
  const searchedBanner = useSearch(banners, bannerKeyword, (banner) => [banner.name].filter(Boolean).join(" "));

  // Lọc tầng 2
  const tabbedBanner = useMemo(() => {
    if (activeTab === "ALL") return searchedBanner;
    if (activeTab === true) return searchedBanner.filter((b) => b.isActive === true);
    if (activeTab === false) return searchedBanner.filter((b) => b.isActive === false && b.archive === 0);
    if (activeTab === 1) return searchedBanner.filter((b) => b.archive === 1);
    return searchedBanner;
  }, [searchedBanner, activeTab]);

  const isEmptyData = banners.length === 0;
  const isEmptySearch = banners.length > 0 && searchedBanner.length === 0;

  const modal = {
    filter: useActive(),
    bannerForm: useActive(),
    delete: useActive(),
    archive: useActive(),
    restore: useActive(),
  };

  const handleClose = () => {
    if (modal.bannerForm.isActive) {
      modal.bannerForm.deactivate();
    } else if (modal.delete.isActive) {
      modal.delete.deactivate();
    } else if (modal.archive.isActive) {
      modal.archive.deactivate();
    } else {
      modal.restore.deactivate();
    }
    setEditingBannerId(null);
  };
  return (
    <div className={cx(TWCSS.container)}>
      <div className={cx("bg-white rounded-2xl")} style={{ boxShadow: "var(--shadow)" }}>
        <ActionBar
          name="banner"
          onFilter={modal.filter}
          onForm={modal.bannerForm}
          formModal={<BannerForm onClose={handleClose} />}
          keyword={bannerKeyword}
          onChange={(e) => setBannerKeyword(e.target.value)}
          onClose={handleClose}
          featured={BANNER_FEATURED_OPTION}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          placeholder="Tìm tiêu đề, URL..."
        ></ActionBar>

        <List
          name="banner"
          className={TWCSS.list}
          columns={[
            {
              key: "Index",
              label: "#",
              width: "3%",
              render: (row, idx) => (
                <Item
                  children={idx + 1}
                  itemClassName={cx("text-[12px] text-[var(--color-unavailable-700)]", "font-semibold")}
                />
              ),
            },
            {
              key: "Banner",
              label: "Banner",
              width: "43%",
              render: (row) => {
                return (
                  <div className={cx("flex items-center gap-3")}>
                    {row?.imageUrl ? (
                      <div className={cx("w-[80px] h-[48px] overflow-hidden rounded-xl")}>
                        <Image src={row?.imageUrl} alt={row?.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className={cx("w-[80px] h-[48px] overflow-hidden rounded-xl")}></div>
                    )}

                    <div>
                      <Item as="strong" children={row?.name} itemClassName={cx("text-[13.5px]")} />
                      <Item
                        as="span"
                        children={`ID #${row?.id}`}
                        itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]")}
                      />
                    </div>
                  </div>
                );
              },
            },
            {
              key: "View Order",
              label: "Thứ tự",
              width: "5%",
              render: (row) => (
                <div
                  className={cx(
                    "flex items-center justify-center text-[13px] font-bold",
                    "w-[28px] h-[28px] rounded-lg bg-[var(--color-unavailable-100)]",
                  )}
                >
                  {row.viewOrder}
                </div>
              ),
            },
            {
              key: "Active",
              label: "Active",
              width: "13%",
              render: (row) => (
                <Item
                  as="div"
                  icon={
                    <div
                      className={cx(
                        "w-2 h-2 rounded-full",
                        row?.archive === 0
                          ? row.isActive
                            ? "bg-[var(--color-secondary)]"
                            : "bg-[var(--color-error)]"
                          : "bg-[var(--color-unavailable)]",
                      )}
                    />
                  }
                  children={row?.archive === 0 ? (row.isActive ? "Đang hoạt động" : "Đang ẩn") : "Lưu trữ"}
                  className={cx(
                    "px-2 py-1 text-[11px] rounded-full",
                    "font-bold",
                    row?.archive === 0
                      ? row.isActive
                        ? "bg-[var(--color-secondary-200)]/40 text-[var(--color-secondary-900)]"
                        : "bg-[var(--color-error-100)] text-[var(--color-error-900)]"
                      : "bg-[var(--color-unavailable-100)] text-[var(--color-unavailable-900)]",
                    "flex items-center gap-1 inline-flex",
                  )}
                />
              ),
            },
            {
              key: "Url",
              label: "Url",
              width: "27%",
              render: (row) => (
                <Item
                  icon={<LuLink />}
                  children={row?.url}
                  iconClassName={cx("text-[12px] text-[var(--color-unavailable-700)]")}
                  itemClassName={cx("text-[12px] text-[var(--color-unavailable-700)]")}
                  className={cx("flex items-center gap-2")}
                />
              ),
            },
            {
              key: "Edit",
              label: "",
              width: "3%",
              render: (row) => (
                <Button
                  onClick={() => {
                    setEditingBannerId(row.id);
                    modal.bannerForm.toggleActive();
                  }}
                  width={32}
                  height={32}
                  disabled={row?.archive === 1}
                  iconClassName="text-sm font-bold"
                  className={cx(
                    "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)]",
                    "hover:bg-[var(--color-secondary)] hover:text-white",
                    "rounded-xl transition",
                    row?.archive === 1 && "opacity-50 cursor-not-allowed",
                  )}
                  icon={<LuPen />}
                />
              ),
            },
            {
              key: "Archive",
              label: "",
              width: "3%",
              render: (row) => (
                <Button
                  onClick={() => {
                    setEditingBannerId(row.id);
                    row?.archive === 1 ? modal.restore.toggleActive() : modal.archive.toggleActive();
                  }}
                  width={32}
                  height={32}
                  iconClassName="text-sm font-bold"
                  className={cx(
                    "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
                    "hover:bg-[var(--color-primary)] hover:text-white",
                    "rounded-xl transition",
                  )}
                  icon={row?.archive === 1 ? <LuArchiveRestore /> : <LuArchive />}
                />
              ),
            },
            {
              key: "Delete",
              label: "",
              width: "3%",
              render: (row) => (
                <Button
                  onClick={() => {
                    setEditingBannerId(row.id);
                    modal.delete.toggleActive();
                  }}
                  width={32}
                  height={32}
                  iconClassName="text-sm font-bold"
                  className={cx(
                    "bg-[var(--color-error-100)] text-[var(--color-error-700)]",
                    "hover:bg-[var(--color-error)] hover:text-white",
                    "rounded-xl transition",
                  )}
                  icon={<LuTrash2 />}
                />
              ),
            },
          ]}
          data={tabbedBanner}
          isEmptyData={isEmptyData}
          isEmptySearch={isEmptySearch}
          animated
        />
      </div>

      <Modal open={modal.restore.isActive} onClose={handleClose} backdrop={true} width="max-w-sm">
        <ConfirmAction
          bannerId={editingBannerId}
          onClose={handleClose}
          title="Khôi phục banner này?"
          description={
            <>
              Banner <strong className="text-black">{banner?.name}</strong> sẽ được kích hoạt lại và hiển thị trong danh
              sách đang hoạt động.
              <br />
              Bạn có thể chỉnh sửa hoặc lưu trữ lại bất cứ lúc nào.
            </>
          }
          confirmText="Khôi phục"
          onConfirm={handleRestore}
          icon={<LuArchiveRestore />}
          iconClass="text-[24px] text-[var(--color-primary)]"
          iconLayoutClass="bg-[var(--color-primary)]/20 rounded-2xl mx-auto mb-[16px]"
          confirmClassName={cx(
            "bg-linear-[var(--color-ln-primary)] rounded-xl",
            "text-white font-semibold text-[13px]",
          )}
        />
      </Modal>

      <Modal open={modal.archive.isActive} onClose={handleClose} backdrop={true} width="max-w-sm">
        <ConfirmAction
          bannerId={editingBannerId}
          onClose={handleClose}
          title="Lưu trữ banner?"
          description={
            <>
              Banner <strong className="text-black">{banner?.name}</strong> sẽ được chuyển vào lưu trữ.
              <br />
              Bạn có thể khôi phục lại sau.
            </>
          }
          confirmText="Lưu trữ"
          onConfirm={handleArchive}
          icon={<LuArchive />}
          iconClass="text-[24px] text-[var(--color-primary)]"
          iconLayoutClass="bg-[var(--color-primary)]/20 rounded-2xl mx-auto mb-[16px]"
          confirmClassName={cx(
            "bg-linear-[var(--color-ln-primary)] rounded-xl",
            "text-white font-semibold text-[13px]",
          )}
        />
      </Modal>

      <Modal open={modal.delete.isActive} onClose={handleClose} backdrop={true} width="max-w-sm">
        <ConfirmAction
          bannerId={editingBannerId}
          onClose={handleClose}
          title="Xoá banner?"
          description={
            <>
              Bạn có chắc muốn xoá <strong className="text-black">{banner?.name}</strong>?
              <br />
              Hành động này không thể hoàn tác.
            </>
          }
          confirmText="Xoá"
          onConfirm={handleDelete}
          icon={<LuTrash />}
          iconClass="text-[24px] text-[var(--color-error)]"
          iconLayoutClass="bg-[var(--color-error)]/20 rounded-2xl mx-auto mb-[16px]"
          confirmClassName={cx("bg-linear-[var(--color-ln-error)] rounded-xl", "text-white font-semibold text-[13px]")}
        />
      </Modal>
    </div>
  );
}

export default Banner;
