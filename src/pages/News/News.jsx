import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import {
  Breadcrumb,
  Item,
  Button,
  Search,
  Pagination,
  Image,
  Tooltip,
  Modal,
} from "../../components/ui";
import {
  LuSlidersHorizontal,
  LuLayoutDashboard,
  LuList,
  LuPlus,
  LuCircleCheckBig,
  LuSparkle,
  LuPen,
  LuFolder,
} from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";
import { NEWS_TOTAL_STATUS } from "../../mock/news";
import { NEWS_STATUS } from "../../constants/status";
import { useNewsStore } from "../../store/newsStore";
import { usePagination, useActive, useSearch } from "../../components/hooks";
import { formatDateVN } from "../../utils/format";
import { Skeleton, Category } from "./index";

const cx = classNames.bind(styles);

function News() {
  const [newsKeyword, setNewsKeyword] = useState("");
  const category = useActive();
  const { news, loading, fetchNews } = useNewsStore();
  useEffect(() => {
    fetchNews();
  }, []);
  const filterNews = news.filter((n) => n.status !== "DRAFT");

  const searchNews = useSearch(filterNews, newsKeyword, (news) =>
    [news.title, news.category?.name, news.author?.name]
      .filter(Boolean)
      .join(" "),
  );

  return (
    <div className={cx(TWCSS.container)}>
      <Breadcrumb
        className="mb-3"
        items={[
          {
            label: "Bảng điều khiển",
            href: "/bang-dieu-khien",
            icon: <LuLayoutDashboard />,
          },
          { label: "Quản lý tin tức" },
        ]}
      />
      <Item as="strong" children="Quản lý tin tức" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Trang quản lý thống kê, danh sách tin tức tại đây."
        itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
      />

      <div className="space-y-10">
        <Overview total={NEWS_TOTAL_STATUS} />
        <ActionBar
          toggle={category.toggleActive}
          keyword={newsKeyword}
          onChange={(e) => setNewsKeyword(e.target.value)}
        />
        <NewsList news={searchNews} loading={loading} />
      </div>

      <Modal
        open={category.isActive}
        onClose={category.deactivate}
        width="max-w-2xl"
      >
        <Category onClose={category.deactivate} />
      </Modal>
    </div>
  );
}

export default News;

function Overview({ total }) {
  return (
    <div
      className={cx(
        "grid gap-5 w-full",
        "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
      )}
    >
      {total.map((item, idx) => (
        <div key={idx} className={cx(TWCSS.overview)}>
          <Item
            as="span"
            children={item.title}
            itemClassName={cx("text-[12px]")}
          />
          <Item
            as="span"
            children={item.total}
            itemClassName={cx("text-3xl font-bold")}
          />
          <Item
            as="span"
            children={item.desc}
            itemClassName={cx(
              "text-[12px] text-[var(--color-unavailable-700)]",
            )}
          />
          <Item
            icon={item.icon}
            iconClassName={cx("text-xl text-[var(--color-primary)]")}
            className={cx(
              "absolute top-6 right-6",
              "bg-[var(--color-primary-100)] rounded-[8px]",
              "w-10 h-10 flex items-center justify-center",
            )}
          />
        </div>
      ))}
    </div>
  );
}

function ActionBar({ toggle, keyword, onChange }) {
  return (
    <div
      className={cx(
        "bg-white rounded-[8px] p-4 outline outline-[var(--color-unavailable-300)]",
      )}
    >
      <div className={cx("grid grid-cols-1fr xl:grid-cols-[380px_1fr] gap-3")}>
        <Search
          value={keyword}
          onChange={onChange}
          width={"auto"}
          height={45}
          className={cx("rounded-[8px]")}
        />
        <div className={cx("flex flex-col md:flex-row justify-between gap-3")}>
          <div className="flex gap-1">
            <Tooltip content="Bộ lọc" position="top">
              <Button
                width={45}
                height={45}
                icon={<LuSlidersHorizontal />}
                className={cx(
                  "font-medium",
                  "hover:bg-[var(--color-primary-100)]",
                )}
              />
            </Tooltip>
            <Tooltip content="Duyệt bài viết" position="top">
              <Item
                as={Link}
                to={"/quan-ly-tin-tuc/duyet-bai"}
                icon={<LuList />}
                className={cx(
                  "flex items-center justify-center rounded-[8px]",
                  "hover:bg-[var(--color-primary-100)]",
                  "w-[45px] h-[45px]",
                )}
              />
            </Tooltip>
            <Tooltip content="Bài viết của bạn" position="top">
              <Item
                as={Link}
                to={"/quan-ly-tin-tuc/bai-viet-cua-toi"}
                width={"auto"}
                height={45}
                icon={<LuPen />}
                className={cx(
                  "flex items-center justify-center rounded-[8px]",
                  "hover:bg-[var(--color-primary-100)]",
                  "w-[45px] h-[45px]",
                )}
              />
            </Tooltip>
            <Tooltip content="Danh mục bài viết" position="top">
              <Button
                width={45}
                height={45}
                icon={<LuFolder />}
                className={cx(
                  "font-medium",
                  "hover:bg-[var(--color-primary-100)]",
                )}
                onClick={toggle}
              />
            </Tooltip>
          </div>
          <Item
            as={Link}
            to={"/quan-ly-tin-tuc/dang-bai"}
            icon={<LuPlus />}
            children={"Đăng tin tức mới"}
            iconClassName={cx("text-xl text-white font-semibold")}
            itemClassName={cx("text-sm text-white font-semibold")}
            className={cx(
              "bg-[var(--color-primary)] flex items-center gap-2 h-[45px] px-4 rounded-[8px]",
            )}
          />
        </div>
      </div>
    </div>
  );
}

function NewsList({ news, loading }) {
  const ITEMS_PER_PAGE = 6;
  const {
    currentPage,
    totalPages,
    pagedData,
    pages,
    setCurrentPage,
    nextPage,
    prevPage,
  } = usePagination(news, ITEMS_PER_PAGE);

  return (
    <div className={cx("")}>
      <div
        className={cx(
          "grid sm:grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5 w-full",
        )}
      >
        {loading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <Skeleton key={index} />
            ))
          : pagedData.length > 0
            ? pagedData.map((news) => {
                const statusMeta = NEWS_STATUS[news?.status] || {};

                return (
                  <Item
                    as="a"
                    href={`/quan-ly-tin-tuc/${news.id}`}
                    key={news.id}
                    className={cx(
                      "bg-white p-4 rounded-[8px]",
                      "transition-all duration-300 ease-out",
                      "hover:-translate-y-1.5 hover:shadow-xl hover:scale-[1.02]",
                      "outline outline-[var(--color-unavailable-300)]",
                    )}
                  >
                    <div className={cx("space-y-5")}>
                      {/* Thumbnail */}
                      <div
                        className={cx(
                          "relative rounded-[8px] overflow-hidden max-h-50",
                        )}
                      >
                        <Image src={news.thumbnail} alt="Ảnh đại diện" />
                        <Item
                          icon={<LuCircleCheckBig />}
                          children={news?.category?.name || "Tên danh mục"}
                          className={cx(
                            "absolute z-10 bottom-2 left-2",
                            "flex items-center gap-2 rounded-[8px]",
                            "text-sm font-semibold text-[var(--color-primary-900)]",
                            "bg-[var(--color-primary-100)] p-2",
                            "border border-[var(--color-primary-200)]",
                          )}
                        />
                      </div>
                      {/* Status */}
                      <Item
                        icon={<LuSparkle />}
                        children={`${statusMeta?.label || "Trạng thái không xác định"}`}
                        itemClassName={cx("font-semibold text-sm")}
                        className={cx("flex items-center gap-2")}
                        style={{
                          color:
                            statusMeta?.color || "var(--color-unavailable-700)",
                        }}
                      />
                      {/* Title */}
                      <Item
                        children={news?.title || "Tiêu đề bài viết"}
                        itemClassName={cx(
                          "text-md font-bold leading-[1.6] tracking-[-0.03em]",
                        )}
                      />
                      {/* Short Description */}
                      <Item
                        children={
                          news?.shortDesc ||
                          "Chưa có mô tả ngắn gọn nào cho bài viết"
                        }
                        itemClassName={cx(
                          "font-medium text-sm text-[var(--color-unavailable-900)] leading-[1.7]",
                          "line-clamp-2",
                        )}
                      />
                      {/* Author and Date */}
                      <div
                        className={cx("flex flex-col justify-between gap-2")}
                      >
                        <Item
                          children={news?.author?.name}
                          itemClassName={cx(
                            "text-sm font-bold text-[var(--color-unavailable-900)]",
                          )}
                        />
                        <Item
                          children={
                            news?.createdAt
                              ? formatDateVN(news.createdAt)
                              : "Ngày không xác định"
                          }
                          itemClassName={cx(
                            "text-xs text-[var(--color-unavailable-700)]",
                          )}
                        />
                      </div>
                    </div>
                  </Item>
                );
              })
            : 'Chưa có tin tức nào được đăng tải, hãy ấn nút "Đăng tin tức mới" để đăng bài'}
      </div>
      {!loading && pagedData.length > 0 && (
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
