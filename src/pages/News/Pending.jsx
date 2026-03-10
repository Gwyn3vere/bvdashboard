import React, { useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { Button, Image, Item } from "../../components/ui";
import { useNewsStore } from "../../store/newsStore";
import { LuChevronRight } from "react-icons/lu";
import { Article } from "./index";
import { NEWS_STATUS } from "../../constants/status";

const cx = classNames.bind(styles);

function Waiting() {
  const { news, fetchNews, setEditingNewsId, getNewsById, editingNewsId } = useNewsStore();

  const detailNews = useMemo(() => {
    if (!editingNewsId) return null;
    return getNewsById(editingNewsId);
  }, [editingNewsId, getNewsById]);
  const filteredNews = useMemo(() => {
    return news.filter((n) => n.status !== "DRAFT" && n.status !== "ARCHIVED");
  }, [news]);

  const { groupNews, totalNews } = useMemo(() => {
    const result = {
      groupNews: { processing: [], processed: [] },
      totalNews: {},
    };

    for (const n of filteredNews) {
      result.totalNews[n.status] = (result.totalNews[n.status] || 0) + 1;

      if (n.status === "PENDING") {
        result.groupNews.processing.push(n);
      } else {
        result.groupNews.processed.push(n);
      }
    }

    return result;
  }, [filteredNews]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);
  useEffect(() => {
    if (groupNews.processing.length > 0 && !editingNewsId) {
      setEditingNewsId(groupNews.processing[0].id);
    }
  }, [groupNews, editingNewsId, setEditingNewsId]);

  return (
    <div className={cx(TWCSS.container, "h-full overflow-hidden")}>
      <div className={cx("flex h-full")}>
        <Content news={detailNews} />
        <div className={cx("h-full")}>
          <Menu
            setNewsId={setEditingNewsId}
            editingNewsId={editingNewsId}
            totalNews={totalNews}
            groupNews={groupNews}
          />
        </div>
      </div>
    </div>
  );
}

export default Waiting;

function Content({ news }) {
  return (
    <div className={cx("overflow-y-auto h-full w-full", "flex justify-center", "hidden-scrollbar")}>
      <div className={cx("fadeUp", "rounded-2xl")}>
        <Article newsId={news?.id} />
      </div>
    </div>
  );
}

const Card = React.memo(function Card({ news, editingNewsId, setNewsId }) {
  const statusConfig = NEWS_STATUS[news?.status];
  if (!statusConfig) return null;
  return (
    <Button
      width={"auto"}
      height={"auto"}
      btnClassName={cx(
        "flex items-center gap-2 py-3 px-4",
        "hover:bg-[var(--color-primary-100)]/30 transition-all",
        "border-l-2",
        editingNewsId === news?.id
          ? "bg-[var(--color-primary-100)] border-[var(--color-primary)]"
          : "border-transparent",
      )}
      onClick={() => setNewsId(news?.id)}
    >
      <div className={cx("h-[40px] w-[40px]")}>
        <Image
          width={40}
          height={40}
          src={news?.thumbnail}
          alt="Ảnh đại diện"
          className={cx(
            "border-2 border-transparent rounded-xl",
            "transition-ease duration-[0.2]",
            "bg-[var(--color-unavailable-300)]/50",
          )}
        />
      </div>
      <div>
        <Item
          children={news?.title}
          itemClassName={cx("text-[12px] text-start font-bold line-clamp-1")}
          className={cx("mb-[4px]")}
        />
        <div className={cx("flex items-center gap-2")}>
          <Item
            as="span"
            children={news?.status === NEWS_STATUS.PENDING ? news?.author?.name : statusConfig?.label}
            itemClassName={cx("text-[11px] font-bold")}
            style={{ color: statusConfig?.color }}
          />
        </div>
      </div>
      <LuChevronRight className="text-[13px]" />
    </Button>
  );
});

function Menu({ setNewsId, editingNewsId, totalNews, groupNews }) {
  const statistic = [
    {
      name: "Duyệt",
      background: "var(--color-primary)",
      color: "var(--color-primary-900)",
      total: totalNews?.PUBLISHED ?? 0,
    },
    {
      name: "Từ chối",
      background: "var(--color-error)",
      color: "var(--color-error-900)",
      total: totalNews?.REJECTED ?? 0,
    },
    {
      name: "Còn lại",
      background: "var(--color-warning)",
      color: "var(--color-warning-900)",
      total: totalNews?.PENDING ?? 0,
    },
  ];

  return (
    <div
      className={cx("bg-white rounded-2xl flex flex-col h-full w-[300px] min-w-[260px]")}
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div className={cx("px-4 pt-4 flex items-center justify-between")}>
        <Item as="strong" children={"Hàng chờ duyệt"} itemClassName={cx("text-[13px]")} />
        <Item
          children={`${totalNews?.PENDING ?? 0} bài`}
          itemClassName={cx("text-[11px] font-bold text-white")}
          className={cx("inline-block rounded-full", "px-2 py-[2px] bg-linear-[var(--color-ln-primary)]")}
        />
      </div>
      {/* Statistic */}
      <div className={cx("p-4 flex gap-2 border-b border-[var(--color-unavailable-100)]")}>
        {statistic.map((item) => (
          <Item
            key={item.name}
            icon={item.total}
            children={item.name}
            iconClassName={cx("text-[18px] font-bold")}
            itemClassName={cx("text-[9.5px] font-medium")}
            className={cx("flex-1 px-2 py-1 flex flex-col items-center rounded-xl")}
            style={{ color: item.color, background: `color-mix(in srgb, ${item.background} 30%, white)` }}
          />
        ))}
      </div>
      {/* Menu */}
      <Item
        as="span"
        children={"Chờ xử lý"}
        itemClassName={cx("text-[9.5px] uppercase font-bold text-[var(--color-unavailable)]")}
        className={cx("px-4 py-2")}
      />
      <div className={cx("flex flex-col")}>
        {groupNews.processing.length !== 0 &&
          groupNews.processing.map((news) => (
            <Card key={news.id} news={news} editingNewsId={editingNewsId} setNewsId={setNewsId} />
          ))}
        {groupNews.processing.length === 0 && <Item children="Không có bài chờ duyệt" />}
      </div>
      <Item
        as="span"
        children={"Đã xử lý"}
        itemClassName={cx("text-[9.5px] uppercase font-bold text-[var(--color-unavailable)]")}
        className={cx("px-4 py-2")}
      />
      <div className={cx("flex flex-col")}>
        {groupNews.processed.length !== 0 &&
          groupNews.processed.map((news) => (
            <Card key={news.id} news={news} editingNewsId={editingNewsId} setNewsId={setNewsId} />
          ))}
      </div>
    </div>
  );
}
