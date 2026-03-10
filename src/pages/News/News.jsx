import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { ActionBar, Item, Button, Pagination, Image, Tooltip, Modal, EmptyState } from "../../components/ui";
import {
  LuSlidersHorizontal,
  LuLayoutDashboard,
  LuList,
  LuPlus,
  LuCircleCheckBig,
  LuSparkle,
  LuPen,
  LuFolder,
  LuEye,
  LuFileQuestion,
  LuSearch,
} from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";
import { NEWS_TOTAL_STATUS } from "../../mock/news";
import { NEWS_STATUS } from "../../constants/status";
import { EXPERTISE_COLOR_SYSTEM } from "../../constants/menu";
import { NEWS_STATUS_OPTION } from "../../constants/option";
import { useNewsStore } from "../../store/newsStore";
import { usePagination, useActive, useSearch } from "../../components/hooks";
import { formatDateVN } from "../../utils/format";
import { Skeleton, Category } from "./index";

const cx = classNames.bind(styles);

function News() {
  const { news, loading, fetchNews } = useNewsStore();
  useEffect(() => {
    fetchNews();
  }, []);
  const filteredNews = news.filter((n) => n.status !== "DRAFT");

  const [activeTab, setActiveTab] = useState("ALL");
  const [newsKeyword, setNewsKeyword] = useState("");

  // Lọc tầng 1
  const searchedNews = useSearch(filteredNews, newsKeyword, (news) =>
    [news.title, news.category?.name, news.author?.name].filter(Boolean).join(" "),
  );

  // Lọc tầng 2
  const tabbedNews = useMemo(() => {
    if (activeTab === "ALL") return searchedNews;
    if (activeTab === "PUBLISHED") return searchedNews.filter((n) => n.status === "PUBLISHED");
    if (activeTab === "PENDING") return searchedNews.filter((n) => n.status === "PENDING");
    if (activeTab === "ARCHIVED") return searchedNews.filter((n) => n.status === "ARCHIVED");
    return searchedNews;
  }, [searchedNews, activeTab]);

  const isEmptyData = tabbedNews.length === 0;
  const isEmptySearch = news.length > 0 && searchedNews.length === 0;

  const modal = {
    filter: useActive(),
    category: useActive(),
  };

  const handleClose = () => {
    if (modal.category.isActive) {
      modal.category.deactivate();
    } else {
      modal.filter.deactivate();
    }
  };

  return (
    <div className={cx(TWCSS.container)}>
      <div className="space-y-10">
        <Overview total={NEWS_TOTAL_STATUS} />
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
            featured={NEWS_STATUS_OPTION}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            placeholder="Tìm kiếm..."
          >
            <Tooltip content="Bộ lọc" position="top" className="order-2">
              <Button
                width={36}
                height={36}
                icon={<LuSlidersHorizontal />}
                className={cx(
                  " rounded-xl text-[var(--color-unavailable-700)]",
                  "bg-[var(--color-unavailable-100)] transition-all",
                  "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
                )}
              />
            </Tooltip>
            <Tooltip content="Duyệt bài viết" position="top" className="order-2">
              <Item
                as={Link}
                to={"/quan-ly-tin-tuc/duyet-bai"}
                icon={<LuList />}
                className={cx(
                  "flex items-center justify-center rounded-xl",
                  "bg-[var(--color-unavailable-100)] transition-all",
                  "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
                  "w-[36px] h-[36px] text-[var(--color-unavailable-700)]",
                )}
              />
            </Tooltip>
            <Tooltip content="Bài viết của bạn" position="top" className="order-2">
              <Item
                as={Link}
                to={"/quan-ly-tin-tuc/bai-viet-cua-toi"}
                icon={<LuPen />}
                className={cx(
                  "flex items-center justify-center rounded-xl",
                  "bg-[var(--color-unavailable-100)] transition-all",
                  "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
                  "w-[36px] h-[36px] text-[var(--color-unavailable-700)]",
                )}
              />
            </Tooltip>
            <Tooltip content="Danh mục bài viết" position="top" className="order-2">
              <Button
                width={36}
                height={36}
                icon={<LuFolder />}
                className={cx(
                  " rounded-xl text-[var(--color-unavailable-700)]",
                  "bg-[var(--color-unavailable-100)] transition-all",
                  "hover:bg-linear-[var(--color-ln-primary)] hover:text-white",
                )}
                onClick={modal?.category?.toggleActive}
              />
            </Tooltip>
          </ActionBar>
          <NewsList news={tabbedNews} loading={loading} isEmptyData={isEmptyData} isEmptySearch={isEmptySearch} />
        </div>
      </div>

      <Modal open={modal?.category?.isActive} onClose={handleClose} width="max-w-2xl">
        <Category onClose={handleClose} />
      </Modal>
    </div>
  );
}

export default News;

function Overview({ total }) {
  return (
    <div className={cx("grid gap-5 w-full", "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]")}>
      {total.map((item, idx) => {
        const iconColor = EXPERTISE_COLOR_SYSTEM[idx % EXPERTISE_COLOR_SYSTEM.length];

        return (
          <div key={idx} className={cx(TWCSS.overview)} style={{ boxShadow: "var(--shadow" }}>
            <Item
              as="span"
              children={item.title}
              itemClassName={cx("text-[11.5px] font-bold text-[var(--color-unavailable-700)]")}
            />
            <Item as="span" children={item.total} itemClassName={cx("text-[28px] font-black")} />
            <Item
              as="span"
              children={item.desc}
              itemClassName={cx("text-[11px] font-bold text-[var(--color-unavailable)]")}
            />
            <Item
              icon={item.icon}
              iconClassName={cx("text-[17px]")}
              className={cx(
                "absolute top-4 right-6",
                "rounded-xl",
                "w-[38px] h-[38px] flex items-center justify-center",
              )}
              style={{ color: iconColor.solid, backgroundColor: iconColor.light }}
            />
          </div>
        );
      })}
    </div>
  );
}

function NewsList({ news, loading, isEmptyData, isEmptySearch }) {
  const ITEMS_PER_PAGE = 6;
  const { currentPage, totalPages, pagedData, pages, setCurrentPage, nextPage, prevPage } = usePagination(
    news,
    ITEMS_PER_PAGE,
  );

  return (
    <div className={cx("px-6 py-4")}>
      <div>
        {isEmptyData ? (
          <EmptyState
            icon={LuFileQuestion}
            text={`Danh sách tin tức rỗng`}
            subText={`Hãy ấn vào nút "Thêm tin tức" để thêm vào danh sách`}
          />
        ) : isEmptySearch ? (
          <EmptyState
            icon={LuSearch}
            text={`Không tìm thấy tin tức nào`}
            subText={`Thử thay đổi bộ lọc hoặc từ khoá tìm kiếm`}
          />
        ) : loading ? (
          <div className={cx("grid grid-cols-1 md:grid-cols-3 gap-5 w-full")}>
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        ) : (
          <div className={cx("grid grid-cols-1 md:grid-cols-3 gap-5 w-full")}>
            {pagedData.map((news, idx) => {
              const statusMeta = NEWS_STATUS[news?.status] || {};

              return (
                <Item
                  as="a"
                  href={`/quan-ly-tin-tuc/${news.id}`}
                  key={news.id}
                  className={cx(
                    "fadeUp",
                    "group",
                    "bg-white rounded-2xl overflow-hidden",
                    "transition-all duration-300 ease-out",
                    "hover:shadow-2xl",
                    "outline outline-[var(--color-unavailable-300)]",
                  )}
                  style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
                >
                  {/* Thumbnail */}
                  <div className={cx("relative overflow-hidden max-h-70")}>
                    <Image
                      src={news.thumbnail}
                      alt="Ảnh đại diện"
                      className={cx("transition-transform duration-500 ease-out", "group-hover:scale-110")}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    <Item
                      icon={<LuCircleCheckBig />}
                      children={news?.category?.name || "Tên danh mục"}
                      className={cx(
                        "absolute z-10 bottom-2 left-2",
                        "flex items-center gap-2 rounded-full",
                        "text-[11px] font-bold text-[var(--color-primary-900)]",
                        "bg-white py-1 px-[10px]",
                      )}
                    />
                  </div>
                  <div className={cx("p-4 flex flex-col gap-[7px]")}>
                    {/* Status */}
                    <Item
                      icon={<LuSparkle />}
                      children={`${statusMeta?.label || "Trạng thái không xác định"}`}
                      iconClassName={cx("text-[11px]")}
                      itemClassName={cx("font-bold text-[11px]")}
                      className={cx("flex items-center gap-2")}
                      style={{
                        color: statusMeta?.color || "var(--color-unavailable-700)",
                      }}
                    />
                    {/* Title */}
                    <Item
                      children={news?.title || "Tiêu đề bài viết"}
                      itemClassName={cx("text-[14.5px] font-bold leading-[1.6] tracking-[-0.03em]")}
                    />
                    {/* Short Description */}
                    <Item
                      children={news?.shortDesc || "Chưa có mô tả ngắn gọn nào cho bài viết"}
                      itemClassName={cx(
                        "font-medium text-[12.5px] text-[var(--color-unavailable-900)] leading-[1.7]",
                        "line-clamp-2 pb-6 border-b border-[var(--color-unavailable-100)]",
                      )}
                    />
                    {/* Author and Date */}
                    <div className={cx("flex items-center justify-between")}>
                      <div className={cx("")}>
                        <Item
                          children={news?.author?.name}
                          itemClassName={cx("text-[12px] font-bold text-[var(--color-unavailable-900)]")}
                        />
                        <Item
                          children={news?.createdAt ? formatDateVN(news.createdAt) : "Ngày không xác định"}
                          itemClassName={cx("text-[11px] text-[var(--color-unavailable-700)]")}
                        />
                      </div>
                      {news?.status === "PUBLISHED" && (
                        <Item
                          icon={<LuEye />}
                          children={news?.view}
                          itemClassName={cx("font-bold text-[11.5px]")}
                          className={cx("flex items-center gap-1 text-[var(--color-unavailable-700)]")}
                        />
                      )}
                    </div>
                  </div>
                </Item>
              );
            })}
          </div>
        )}
      </div>
      {!loading && totalPages > 1 && (
        <Pagination
          pages={pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      )}
    </div>
  );
}
