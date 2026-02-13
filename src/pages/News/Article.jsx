import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Breadcrumb, Item, ArticleContent, Image } from "../../components/ui";
import {
  LuLayoutDashboard,
  LuCalendar,
  LuEye,
  LuCircleCheckBig,
  LuFileText,
  LuTag,
  LuSparkle,
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
    <div className={cx(TWCSS.container)}>
      {!newsId && (
        <Breadcrumb
          className="mb-3"
          items={[
            {
              label: "Bảng điều khiển",
              href: "/bang-dieu-khien",
              icon: <LuLayoutDashboard />,
            },
            { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
            { label: "Chi tiết bài viết" },
          ]}
        />
      )}

      <div className={cx("py-15 px-5 md:px-10 mx-auto max-w-[720px]")}>
        {/* Category */}
        <div className="inline-block">
          <Item
            icon={<LuCircleCheckBig />}
            children={news?.category?.name || "Tên danh mục"}
            className={cx(
              "flex items-center gap-2 rounded-[8px]",
              "text-sm font-semibold text-[var(--color-primary-900)]",
              "bg-[var(--color-primary-100)] p-2 mb-5",
              "border border-[var(--color-primary-200)]",
            )}
          />
        </div>
        {/* Title */}
        <Item
          children={news?.title || "Tiêu đề bài viết"}
          itemClassName={cx(
            "text-[40px] font-black leading-[1.2] tracking-[-0.03em]",
          )}
          className={cx("mb-[24px]")}
        />
        {/* Author - Daytime - view */}
        <div
          className={cx(
            "grid md:grid-cols-4 grid-cols-2 items-center",
            "gap-5 text-[var(--color-unavailable-700)] py-4",
            "border-b border-gray-200",
            "transition-all mb-10",
          )}
        >
          {/* Author */}
          <div className={cx("flex items-center gap-3")}>
            <div
              className={cx(
                "p-2 rounded-full bg-[var(--color-primary)]",
                "text-white font-bold w-7 h-7 text-sm",
                "flex items-center justify-center",
              )}
            >
              NA
            </div>
            <Item
              children={news?.author?.name || "Tên tác giả"}
              itemClassName={cx(
                "font-semibold text-sm hover:text-[var(--color-text-light-primary)]",
              )}
            />
          </div>
          {/* Daytime */}
          <Item
            icon={<LuCalendar />}
            children={
              news?.createdAt
                ? formatDateVN(news?.createdAt)
                : "Ngày không xác định"
            }
            itemClassName={cx(
              "font-semibold text-sm hover:text-[var(--color-text-light-primary)]",
            )}
            className={cx("flex items-center gap-2")}
          />
          {/* View */}
          <Item
            icon={<LuEye />}
            children={`${news?.view} lượt xem`}
            itemClassName={cx(
              "font-semibold text-sm hover:text-[var(--color-text-light-primary)]",
            )}
            className={cx("flex items-center gap-2")}
          />
          {/* Status */}
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
        <div className={cx("space-y-10 border-b border-gray-200 pb-10")}>
          {/* Thumbnail */}
          <div className={cx("rounded-[12px] overflow-hidden")}>
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
              "bg-[var(--color-primary-100)] p-6 rounded-[12px]",
              "border-l-5 border-[var(--color-primary)]",
            )}
          >
            <Item
              children={
                news?.shortDesc || "Chưa có mô tả ngắn gọn nào cho bài viết"
              }
              itemClassName={cx(
                "font-semibold text-[17px] text-[var(--color-unavailable-900)] leading-[1.7]",
              )}
            />
          </div>
          {/* Summary list */}
          <div
            className={cx(
              "p-6 rounded-[12px] transition-all duration-300",
              "border-2 border-[var(--color-primary-200)]",
              "hover:border-[var(--color-primary)] ",
            )}
          >
            <Item
              icon={<LuFileText />}
              children={"Tóm tắt nội dung"}
              iconClassName={cx("text-[var(--color-primary)] text-xl")}
              itemClassName={cx("text-sm font-bold")}
              className={cx("flex items-end gap-3 mb-5")}
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
          <ArticleContent
            html={news?.content || "Chưa có nội dung nào được viết"}
          />
        </div>
        {/* Tags */}
        <div className={cx("flex flex-wrap items-center gap-2 py-10")}>
          {news?.tags.length > 0 ? (
            news?.tags.map((item, idx) => (
              <Item
                key={idx}
                icon={<LuTag />}
                children={item}
                iconClassName={cx("font-semibold text-white text-sm")}
                itemClassName={cx("font-semibold text-white text-sm")}
                className={cx(
                  "py-1 px-3 rounded-full bg-[var(--color-primary)]",
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
              iconClassName={cx("font-semibold text-white text-sm")}
              itemClassName={cx("font-semibold text-white text-sm")}
              className={cx(
                "py-1 px-3 rounded-full bg-[var(--color-primary)]",
                "flex items-center gap-2 cursor-pointer",
                "trasition-all duration-300 ease-out",
                "hover:-translate-y-1.5 hover:shadow-xl hover:scale-[1.02]",
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Article;
