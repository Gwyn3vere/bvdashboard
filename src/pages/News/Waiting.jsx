import { useEffect, useState, useMemo, useRef } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import {
  Breadcrumb,
  Item,
  Search,
  Button,
  Image,
  Modal,
} from "../../components/ui";
import { MOCK_NEWS_CATEGORIES } from "../../mock/news";
import {
  LuLayoutDashboard,
  LuCircleCheckBig,
  LuCalendar,
  LuUser,
  LuEye,
  LuCheck,
  LuX,
  LuSparkle,
} from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";
import { useNewsStore } from "../../store/newsStore";
import { formatDateVN } from "../../utils/format";
import { NEWS_STATUS } from "../../constants/status";
import { useActive } from "../../components/hooks";
import { Article, Preview } from "./index";

const cx = classNames.bind(styles);

function Waiting() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const { news, loading, fetchNews } = useNewsStore();
  const waitingNews = useMemo(() => {
    return news.filter((item) => {
      if (item.status !== "WAITING") return false;
      if (selectedCategory !== "ALL" && item.category?.id !== selectedCategory)
        return false;
      return true;
    });
  }, [news, selectedCategory]);
  const allWaitingNews = useMemo(() => {
    return news.filter((item) => item.status === "WAITING");
  }, [news]);
  const waitingCountByCategory = useMemo(() => {
    const result = {};

    MOCK_NEWS_CATEGORIES.forEach((cate) => {
      result[cate.id] = news.filter(
        (item) => item.status === "WAITING" && item.category?.id === cate.id,
      ).length;
    });

    return result;
  }, [news]);

  const totalWaiting = allWaitingNews.length;

  useEffect(() => {
    fetchNews();
  }, []);
  return (
    <div className={cx(TWCSS.container, "space-y-5")}>
      <Breadcrumb
        className="mb-3"
        items={[
          {
            label: "Bảng điều khiển",
            href: "/bang-dieu-khien",
            icon: <LuLayoutDashboard />,
          },
          { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
          { label: "danh sách duyệt" },
        ]}
      />
      <Item as="strong" children="Duyệt Bài Viết" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Quản lý và phê duyệt các bài viết chờ xuất bản."
        itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
      />
      <ActionBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        totalWaiting={totalWaiting}
        waitingCountByCategory={waitingCountByCategory}
      />

      {waitingNews.length > 0 ? (
        waitingNews.map((news) => <NewsCard key={news?.id} news={news} />)
      ) : (
        <Item
          children={"Không có bài viết nào chờ duyệt"}
          className={cx("p-6 flex items-center justify-center w-full")}
        />
      )}
    </div>
  );
}

export default Waiting;

function ActionBar({
  selectedCategory,
  setSelectedCategory,
  totalWaiting,
  waitingCountByCategory,
}) {
  const scrollRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const handleMouseLeave = () => {
    setIsDown(false);
  };
  const handleMouseUp = () => {
    setIsDown(false);
  };
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  return (
    <div
      className={cx(
        "bg-white rounded-[8px] p-4 overflow-hidden w-full",
        "outline outline-[var(--color-unavailable-300)]",
      )}
    >
      <div
        className={cx(
          "grid grid-cols-1fr xl:grid-cols-[380px_1fr] gap-2 overflow-hidden",
        )}
      >
        <Search width={"auto"} height={45} className={cx("rounded-[8px]")} />
        <div className={cx("overflow-hidden min-w-0")}>
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={cx(
              "flex flex-nowrap gap-2 overflow-x-auto w-full",
              "hidden-scrollbar",
            )}
          >
            <Button
              width={"auto"}
              height={45}
              children={`Tất cả(${totalWaiting})`}
              onClick={() => setSelectedCategory("ALL")}
              btnClassName={cx("text-nowrap")}
              className={cx(
                TWCSS.button,
                selectedCategory === "ALL"
                  ? "bg-[var(--color-primary)] text-white border-transparent"
                  : "",
              )}
            />
            {MOCK_NEWS_CATEGORIES.map((cate) => (
              <Button
                key={cate.id}
                width={"auto"}
                height={45}
                children={`${cate.name} (${waitingCountByCategory[cate.id] || 0})`}
                onClick={() => setSelectedCategory(cate.id)}
                btnClassName={cx("text-nowrap")}
                className={cx(
                  TWCSS.button,
                  selectedCategory === cate.id
                    ? "bg-[var(--color-primary)] text-white border-transparent"
                    : "",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ news }) {
  const statusMeta = NEWS_STATUS[news?.status] || {};
  const preview = useActive();
  return (
    <>
      <div
        className={cx(
          "bg-white rounded-[8px] p-6",
          "transition-all duration-300 ease-out",
          "hover:-translate-y-1.3 hover:shadow-xl hover:scale-[1.01]",
          "outline outline-[var(--color-unavailable-300)]",
        )}
      >
        <div className={cx("grid lg:grid-cols-[300px_auto_300px] gap-10")}>
          {/* Thumbnail */}
          <div
            className={cx("relative rounded-[8px] overflow-hidden max-h-40")}
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
          <div className="space-y-2">
            <Item children={news?.title} itemClassName={cx("font-bold")} />
            <div className="flex items-center gap-5">
              <Item
                icon={<LuUser />}
                children={news?.author?.name}
                itemClassName={cx("font-semibold text-xs")}
                className={cx(
                  "flex items-center gap-2 text-[var(--color-unavailable-900)]",
                )}
              />
              <Item
                icon={<LuCalendar />}
                children={formatDateVN(news?.createdAt)}
                itemClassName={cx("font-semibold text-xs")}
                className={cx(
                  "flex items-center gap-2 text-[var(--color-unavailable-900)]",
                )}
              />
            </div>
            <Item
              children={news?.shortDesc}
              itemClassName={cx(
                "font-medium text-sm text-[var(--color-unavailable-900)] leading-[1.7]",
                "line-clamp-2",
              )}
            />
            <Item
              icon={<LuSparkle />}
              children={`${statusMeta?.label || "Trạng thái không xác định"}`}
              itemClassName={cx("font-semibold text-sm")}
              className={cx("flex items-center gap-2")}
              style={{
                color: statusMeta?.color || "var(--color-unavailable-700)",
              }}
            />
          </div>
          <div className="flex flex-col justify-between gap-2">
            <Button
              width={"100%"}
              height={50}
              icon={<LuEye />}
              onClick={preview.toggleActive}
              children={"Xem trước"}
              className={cx(
                "p-2 border border-[var(--color-unavailable)] gap-2",
                "text-sm hover:bg-[var(--color-unavailable-100)]",
              )}
            />
            <Button
              width={"100%"}
              height={50}
              icon={<LuCheck />}
              children={"Phê duyệt"}
              className={cx(
                "p-2 bg-[var(--color-primary)] gap-2",
                "text-sm text-white",
              )}
            />
            <Button
              width={"100%"}
              height={50}
              icon={<LuX />}
              children={"Từ chối"}
              className={cx(
                "p-2 bg-[var(--color-error)] gap-2",
                "text-sm text-white font-medium",
              )}
            />
          </div>
        </div>
      </div>
      <Modal
        open={preview.isActive}
        onClose={preview.deactivate}
        width={"max-w-5xl"}
      >
        <Article onClose={preview.deactivate} newsId={news?.id} />
      </Modal>
    </>
  );
}
