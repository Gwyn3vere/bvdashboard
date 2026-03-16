import { useEffect, useState, useMemo, useRef } from "react";
import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";
import { Link } from "react-router-dom";
import { NEWS_MY_POST_STATUS_OPTION } from "../../constants/option";
import { NEWS_STATUS } from "../../constants/status";
import { Item, Button, ActionBar, List, Modal, Avatar } from "../../components/ui";
import {
  LuPlus,
  LuTrash2,
  LuEye,
  LuSquarePen,
  LuFile,
  LuCheck,
  LuClock,
  LuArchive,
  LuArchiveRestore,
  LuTrash,
} from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";
import { useNewsStore } from "../../store/newsStore";
import { useAuthStore } from "../../store/authStore";
import { useActive, useSearch } from "../../components/hooks";
import { Reason, ConfirmAction } from "./index";
import { formatDateVN } from "../../utils/format";

const cx = classNames.bind(style);

function MyPost() {
  const {
    news,
    loading,
    fetchNews,
    getNewsById,
    setEditingNewsId,
    editingNewsId,
    archiveNews,
    restoreNews,
    deleteNews,
  } = useNewsStore();
  const newsById = getNewsById(editingNewsId);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const [newsKeyword, setNewsKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  const { user, initialized } = useAuthStore();
  const statusNews = useMemo(() => {
    return news.filter((item) => {
      if (item?.author?.id !== user?.id) return false;
      return true;
    });
  }, [news]);

  // Lọc tầng 1
  const searchedNews = useSearch(statusNews, newsKeyword, (news) =>
    [news.title, news.category?.name, news.author?.name].filter(Boolean).join(" "),
  );

  // Lọc tầng 2
  const tabbedNews = useMemo(() => {
    if (activeTab === "ALL") return searchedNews;
    if (activeTab === "PUBLISHED") return searchedNews.filter((n) => n.status === "PUBLISHED");
    if (activeTab === "PENDING") return searchedNews.filter((n) => n.status === "PENDING");
    if (activeTab === "DRAFT") return searchedNews.filter((n) => n.status === "DRAFT");
    if (activeTab === "ARCHIVED") return searchedNews.filter((n) => n.status === "ARCHIVED");
    if (activeTab === "REJECTED") return searchedNews.filter((n) => n.status === "REJECTED");

    return searchedNews;
  }, [searchedNews, activeTab]);

  const isEmptyData = news.length === 0;
  const isEmptySearch = news.length > 0 && searchedNews.length === 0;

  const modal = {
    archive: useActive(),
    restore: useActive(),
    delete: useActive(),
    filter: useActive,
    reason: useActive(),
  };

  const handleClose = () => {
    if (modal.delete.isActive) {
      modal.delete.deactivate();
    } else if (modal.archive.isActive) {
      modal.archive.deactivate();
    } else {
      modal.restore.deactivate();
    }
    setEditingNewsId(null);
  };

  const handleDelete = () => {
    if (!editingNewsId) return;

    deleteNews(editingNewsId);
    setEditingNewsId(null);
    handleClose();
  };

  const handleArchive = () => {
    if (!editingNewsId) return;

    archiveNews(editingNewsId);
    setEditingNewsId(null);
    handleClose();
  };

  const handleRestore = () => {
    if (!editingNewsId) return;

    restoreNews(editingNewsId);
    setEditingNewsId(null);
    handleClose();
  };

  return (
    <>
      <div className={cx(TWCSS.container, "flex flex-col gap-5")}>
        <Overview data={statusNews} />
        <div className={cx("bg-white rounded-2xl")} style={{ boxShadow: "var(--shadow)" }}>
          <ActionBar
            name="tin tức"
            onFilter={modal.filter}
            rightBtn={
              <Item
                as={Link}
                to={"/quan-ly-tin-tuc/dang-bai"}
                icon={<LuPlus />}
                children={"Đăng tin tức mới"}
                iconClassName={cx("text-[16px] text-white font-bold")}
                itemClassName={cx("text-[13px] text-white font-bold")}
                className={cx(
                  "flex items-center gap-2",
                  "bg-linear-[var(--color-ln-primary)] cursor-pointer",
                  "h-[36px] px-3 rounded-xl",
                )}
              />
            }
            keyword={newsKeyword}
            onChange={(e) => setNewsKeyword(e.target.value)}
            featured={NEWS_MY_POST_STATUS_OPTION}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            placeholder="Tìm kiếm..."
          ></ActionBar>
          <List
            name="tin tức"
            className={cx(TWCSS.list)}
            columns={[
              {
                key: "Index",
                label: "#",
                width: "3%",
                render: (row, idx) => (
                  <Item
                    children={idx}
                    itemClassName={cx("text-[12px] text-[var(--color-unavailable-700)]", "font-semibold")}
                  />
                ),
              },
              {
                key: "News",
                label: "Tiêu đề",
                width: "48%",
                render: (row) => (
                  <div className="">
                    <Item as="strong" children={row?.title} itemClassName={cx("text-[13.5px] line-clamp-1")} />
                    <div className={cx("flex items-center gap-[6px]")}>
                      <Avatar name={row?.author?.name} width={16} height={16} className="rounded-full text-[6.5px]" />
                      <Item
                        as="span"
                        children={row?.author?.name}
                        itemClassName={cx("text-[11.5px] text-[var(--color-unavailable-700)] font-medium")}
                      />
                      <Item
                        children={row?.createdAt ? formatDateVN(row?.createdAt) : "Ngày không xác định"}
                        itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]")}
                      />
                    </div>
                  </div>
                ),
              },
              {
                key: "Category",
                label: "Danh mục",
                width: "15%",
                render: (row) => (
                  <div className="inline-block">
                    <Item
                      icon={<div className={cx("w-2 h-2 rounded-full", "bg-[var(--color-primary-700)]")} />}
                      children={row?.category?.name}
                      itemClassName={cx("text-nowrap")}
                      className={cx(
                        "flex items-center gap-2 rounded-full",
                        "text-[11px] font-bold text-[var(--color-primary-900)]",
                        "bg-[var(--color-primary-100)] py-[4px] px-[10px]",
                        "border border-[var(--color-primary-200)]",
                      )}
                    />
                  </div>
                ),
              },
              {
                key: "Status",
                label: "Trạng thái",
                width: "15%",
                render: (row) => {
                  const statusConfig = NEWS_STATUS[row?.status];
                  if (!statusConfig) return row?.status;
                  return (
                    <div className="flex items-center">
                      <Item
                        icon={<div className={cx("w-2 h-2 rounded-full")} style={{ background: statusConfig.color }} />}
                        children={statusConfig?.label}
                        itemClassName={cx("text-nowrap")}
                        className={cx(
                          "flex items-center gap-2 rounded-full",
                          "text-[11px] font-bold",
                          "bg-[var(--color-primary-100)] py-[4px] px-[10px]",
                          "border border-[var(--color-primary-200)]",
                        )}
                        style={{
                          color: statusConfig.color,
                          background: `color-mix(in srgb, ${statusConfig.background} 10%, white)`,
                          border: `1px solid color-mix(in srgb, ${statusConfig.background} 40%, white)`,
                        }}
                      />
                      {row?.status === "REJECTED" && (
                        <Button
                          type="button"
                          children={"Xem lý do"}
                          className={cx("text-[10.5px] underline font-bold")}
                          style={{ color: statusConfig.color }}
                          onClick={() => {
                            setEditingNewsId(row.id);
                            modal.reason.toggleActive();
                          }}
                        />
                      )}
                    </div>
                  );
                },
              },
              {
                key: "View",
                label: "Lượt xem",
                width: "10%",
                render: (row) => (
                  <Item
                    icon={<LuEye />}
                    children={row?.view > 0 ? row?.view : "-"}
                    iconClassName={cx("text-[13px] text-[var(--color-unavailable-700)]")}
                    itemClassName={cx("text-nowrap text-[13px] font-bold")}
                    className={cx("flex items-center gap-2")}
                  />
                ),
              },
              {
                key: "Edit",
                label: "",
                width: "3%",
                render: (row) => (
                  <Item
                    as={Link}
                    to={`/quan-ly-tin-tuc/cap-nhat-bai-viet/${row.id}`}
                    icon={<LuSquarePen />}
                    iconClassName="text-sm font-bold"
                    className={cx(
                      "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)]",
                      "hover:bg-[var(--color-secondary)] hover:text-white",
                      "rounded-xl transition block flex items-center justify-center",
                    )}
                    style={{ width: "32px", height: "32px" }}
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
                      setEditingNewsId(row.id);
                      row?.status === "ARCHIVED" ? modal.restore.toggleActive() : modal.archive.toggleActive();
                    }}
                    width={32}
                    height={32}
                    disabled={row?.status !== "PUBLISHED" && row?.status !== "ARCHIVED"}
                    iconClassName="text-sm font-bold"
                    className={cx(
                      "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
                      "hover:bg-[var(--color-primary)] hover:text-white",
                      "rounded-xl transition",
                      row?.status !== "PUBLISHED" && row?.status !== "ARCHIVED" && "opacity-50 cursor-not-allowed",
                    )}
                    icon={row?.status === "ARCHIVED" ? <LuArchiveRestore /> : <LuArchive />}
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
                      setEditingNewsId(row.id);
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
            data={tabbedNews}
            isEmptyData={isEmptyData}
            isEmptySearch={isEmptySearch}
            animated
          />
        </div>
      </div>

      <Modal open={modal.reason.isActive} onClose={modal.reason.deactivate} width={"max-w-md"}>
        <Reason onClose={modal.reason.deactivate} id={editingNewsId} />
      </Modal>

      <Modal open={modal.delete.isActive} onClose={modal.delete.deactivate} width={"max-w-md"}>
        <ConfirmAction
          bannerId={editingNewsId}
          onClose={handleClose}
          title="Xoá bài viết?"
          description={
            <>
              Bạn có chắc muốn xoá <strong className="text-black">{newsById?.title}</strong>?
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

      <Modal open={modal.archive.isActive} onClose={handleClose} width="max-w-sm">
        <ConfirmAction
          bannerId={editingNewsId}
          onClose={handleClose}
          title="Lưu trữ bài viết?"
          description={
            <>
              Bài biết <strong className="text-black">{newsById?.title}</strong> sẽ được chuyển vào lưu trữ.
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

      <Modal open={modal.restore.isActive} onClose={handleClose} width="max-w-sm">
        <ConfirmAction
          newsId={editingNewsId}
          onClose={handleClose}
          title="Khôi phục bài viết này?"
          description={
            <>
              Bài viết <strong className="text-black">{newsById?.title}</strong> sẽ được kích hoạt lại và hiển thị trong
              danh sách đang hoạt động.
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
    </>
  );
}

export default MyPost;

function Overview({ data }) {
  const statistic = data.reduce((acc, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;

    acc.totalViews = (acc.totalViews || 0) + item.view;

    return acc;
  }, {});

  const cardMenu = [
    { id: 1, icon: <LuFile />, title: "Tổng bài viết", total: data?.length ?? 0, color: "var(--color-grd-primary)" },
    {
      id: 2,
      icon: <LuCheck />,
      title: "Đã xuất bản",
      total: statistic?.PUBLISHED ?? 0,
      color: "var(--color-grd-secondary)",
    },
    {
      id: 3,
      icon: <LuEye />,
      title: "Tổng lượt xem",
      total: statistic?.totalViews ?? 0,
      color: "var(--color-grd-purple)",
    },
    { id: 4, icon: <LuClock />, title: "Chờ duyệt", total: statistic?.PENDING ?? 0, color: "var(--color-grd-warning)" },
  ];

  return (
    <div className={cx("flex flex-col lg:flex-row gap-5")}>
      {cardMenu.map((item) => (
        <div
          key={item.id}
          className={cx("flex-1 flex items-center gap-5 bg-white rounded-2xl py-4 px-5")}
          style={{ boxShadow: "var(--shadow)" }}
        >
          <Item
            icon={item.icon}
            iconClassName={cx("text-[19px] text-white")}
            className={cx("w-[44px] h-[44px] rounded-xl", "flex items-center justify-center")}
            style={{ background: item.color }}
          />
          <div>
            <Item
              children={item.title}
              itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)] font-bold")}
            />
            <Item children={item.total} itemClassName={cx("text-[22px] font-bold")} />
          </div>
        </div>
      ))}
    </div>
  );
}
