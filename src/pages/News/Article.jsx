import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Breadcrumb, Item, ArticleContent, Image, Avatar } from "../../components/ui";
import {
  LuLayoutDashboard,
  LuCalendar,
  LuEye,
  LuCircleCheckBig,
  LuFileText,
  LuTag,
  LuSparkle,
  LuUser,
} from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";
import { useNewsStore } from "../../store/newsStore";
import { useParams } from "react-router-dom";
import { generateTableOfContents } from "../../utils/helper";
import { formatDateVN } from "../../utils/format";
import { NEWS_STATUS } from "../../constants/status";

const cx = classNames.bind(styles);

function Article({ newsId }) {
  const { id } = useParams();
  const news = useNewsStore((state) => state.getNewsById(id || newsId));
  const tableOfContents = generateTableOfContents(news?.content);

  const statusMeta = NEWS_STATUS[news?.status] || {};

  return (
    <div className={cx(TWCSS.container, "w-full flex justify-center")}>
      <div className={cx("max-w-[720px]")}>
        {/* Category */}
        <div className="inline-block">
          <Item
            icon={<LuCircleCheckBig />}
            children={news?.category?.name || "Tên danh mục"}
            className={cx(
              "flex items-center gap-2 rounded-full",
              "text-[12px] font-bold text-[var(--color-primary-900)]",
              "bg-[var(--color-primary-100)] px-3 py-1 mb-5",
              "border border-[var(--color-primary-200)]",
            )}
          />
        </div>
        {/* Title */}
        <Item
          children={news?.title || "Tiêu đề bài viết"}
          itemClassName={cx("text-[36px] font-black leading-[1.2] tracking-[-0.03em]")}
          className={cx("mb-[20px]")}
        />
        {/* Author - Daytime - view */}
        <div
          className={cx(
            "flex flex-col md:flex-row md:items-center gap-2",
            "gap-5 text-[var(--color-unavailable-700)] pb-5",
            "border-b border-gray-200",
            "transition-all mb-10",
          )}
        >
          {/* Author */}
          <div className="flex items-center gap-2">
            <Avatar name={news?.author?.name} className="rounded-full" width={32} height={32} />
            <Item
              children={news?.author?.name || "Tên tác giả"}
              itemClassName={cx("font-bold text-[13px] hover:text-[var(--color-text-light-primary)]")}
              className={cx("flex items-center gap-2")}
            />
          </div>

          {/* Daytime */}
          <Item
            icon={<LuCalendar />}
            children={news?.createdAt ? formatDateVN(news?.createdAt) : "Ngày không xác định"}
            itemClassName={cx("font-bold text-[12.5px] hover:text-[var(--color-text-light-primary)]")}
            className={cx("flex items-center gap-2")}
          />
          {/* View */}
          <Item
            icon={<LuEye />}
            children={`${news?.view} lượt xem`}
            itemClassName={cx("font-bold text-[12.5px] hover:text-[var(--color-text-light-primary)]")}
            className={cx("flex items-center gap-2")}
          />
        </div>
        <div className={cx("space-y-7 border-b border-gray-200 pb-10")}>
          {/* Thumbnail */}
          <div className={cx("rounded-2xl overflow-hidden")}>
            {news?.thumbnail ? (
              <Image src={news?.thumbnail} alt="Ảnh đại diện" />
            ) : (
              <Item
                icon={"🖼️"}
                children={"Chưa có hình ảnh đại diện"}
                iconClassName={cx("text-[48px] mb-[16px] opacity-[0.3]")}
                itemClassName={cx("text-white font-bold")}
                className={cx(
                  "flex flex-col items-center justify-center",
                  "w-full h-[250px] bg-[var(--color-primary-300)]",
                )}
              />
            )}
          </div>
          {/* Short Description */}
          <div
            className={cx(
              "bg-[var(--color-primary-100)] px-5 py-4",
              "border-l-5 border-[var(--color-primary)]",
              "rounded-r-xl",
            )}
          >
            <Item
              children={news?.shortDesc || "Chưa có mô tả ngắn gọn nào cho bài viết"}
              itemClassName={cx("font-semibold text-[15.5px] text-[var(--color-unavailable-900)] leading-[1.7]")}
            />
          </div>
          {/* Summary list */}
          <div
            className={cx(
              "rounded-2xl transition-all duration-300",
              "bg-white",
              "hover:border-[var(--color-primary)] ",
            )}
            style={{ boxShadow: "var(--shadow)" }}
          >
            <Item
              icon={<LuFileText />}
              children={"Nội dung bài viết"}
              iconClassName={cx("text-[var(--color-primary)] text-[13px]")}
              itemClassName={cx("text-[11.5px] font-bold uppercase")}
              className={cx("flex items-center gap-3 px-4 py-3", "border-b border-[var(--color-unavailable-100)]")}
            />
            <ul className={cx("summary-list")}>
              {tableOfContents.length > 0 ? (
                tableOfContents.map((item, idx) => <li key={idx}>{item}</li>)
              ) : (
                <li>Chưa có nội dung</li>
              )}
            </ul>
          </div>
          {/* Content */}
          <ArticleContent html={news?.content || "Chưa có nội dung nào được viết"} />
        </div>
        {/* Tags */}
        <div className="py-10">
          <Item
            children={"Từ khoá"}
            itemClassName={cx("text-[11px] font-black uppercase ", "text-[var(--color-unavailable-700)]")}
            className={cx("mb-[12px]")}
          />
          <div className={cx("flex flex-wrap items-center gap-2")}>
            {news?.tags.length > 0 ? (
              news?.tags.map((item, idx) => (
                <Item
                  key={idx}
                  icon={<LuTag />}
                  children={item}
                  iconClassName={cx("font-bold text-white text-[12.5px]")}
                  itemClassName={cx("font-bold text-white text-[12.5px]")}
                  className={cx(
                    "py-1 px-3 rounded-full bg-linear-[var(--color-ln-primary)]",
                    "flex items-center gap-2 cursor-pointer",
                    "trasition-all duration-300 ease-out",
                    "hover:-translate-y-1.5 hover:shadow-xl hover:scale-[1.02]",
                  )}
                />
              ))
            ) : (
              <Item
                icon={<LuTag />}
                children={"Chưa có tags"}
                iconClassName={cx("font-bold text-white text-[12.5px]")}
                itemClassName={cx("font-bold text-white text-[12.5px]")}
                className={cx(
                  "py-1 px-3 rounded-full bg-linear-[var(--color-ln-primary)]",
                  "flex items-center gap-2 cursor-pointer",
                  "trasition-all duration-300 ease-out",
                  "hover:-translate-y-1.5 hover:shadow-xl hover:scale-[1.02]",
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
