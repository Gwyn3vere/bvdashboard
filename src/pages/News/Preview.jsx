import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";
import { TitleForm, Item, ArticleContent } from "../../components/ui";
import { LuCalendar, LuCircleCheckBig, LuEye, LuFileText, LuTag, LuUser } from "react-icons/lu";
import { generateTableOfContents } from "../../utils/helper";

const cx = classNames.bind(style);

function Preview({ onClose, previewData, previewThumbnail, user }) {
  const displayImage = previewThumbnail || previewData?.thumbnail;
  const tableOfContents = generateTableOfContents(previewData?.content);
  const dateNow = new Date().toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div>
      <TitleForm
        title={"Xem trước bài viết"}
        subTitle={"Bảng thông tin xem trước bài viết tin tức, blog của bạn."}
        onClose={onClose}
      />
      <div className={cx("py-15 px-5 md:px-10 mx-auto max-w-[760px]")}>
        <div className="inline-block">
          {/* Category */}
          <Item
            icon={<LuCircleCheckBig />}
            children={previewData?.category?.name || "Tên danh mục"}
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
          children={previewData?.title || "Tiêu đề bài viết"}
          itemClassName={cx("text-[40px] font-black leading-[1.2] tracking-[-0.03em]")}
          className={cx("mb-[24px]")}
        />
        {/* Author - Daytime - view */}
        <div
          className={cx(
            "flex flex-col md:flex-row md:items-center gap-2",
            "gap-5 text-[var(--color-unavailable-700)] py-4",
            "border-b border-gray-200",
            "transition-all mb-10",
          )}
        >
          {/* Author */}
          <Item
            icon={<LuUser />}
            children={previewData?.author?.name ? previewData?.author?.name : user?.name || "Tên tác giả"}
            itemClassName={cx("font-semibold text-sm hover:text-[var(--color-text-light-primary)]")}
            className={cx("flex items-center gap-2")}
          />

          {/* Daytime */}
          <Item
            icon={<LuCalendar />}
            children={dateNow}
            itemClassName={cx("font-semibold text-sm hover:text-[var(--color-text-light-primary)]")}
            className={cx("flex items-center gap-2")}
          />
          {/* View */}
          <Item
            icon={<LuEye />}
            children={`${previewData?.view} lượt xem`}
            itemClassName={cx("font-semibold text-sm hover:text-[var(--color-text-light-primary)]")}
            className={cx("flex items-center gap-2")}
          />
        </div>
        <div className={cx("space-y-10 border-b border-gray-200 pb-10")}>
          {/* Thumbnail */}
          <div className={cx("rounded-[12px] overflow-hidden")}>
            {displayImage ? (
              <img src={displayImage} alt="Ảnh đại diện" />
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
              children={previewData?.shortDesc || "Chưa có mô tả ngắn gọn nào cho bài viết"}
              itemClassName={cx("font-semibold text-[17px] text-[var(--color-unavailable-900)] leading-[1.7]")}
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
          <ArticleContent html={previewData?.content || "Chưa có nội dung nào được viết"} />
        </div>
        {/* Tags */}
        <div className={cx("flex flex-wrap items-center gap-2 py-10")}>
          {previewData?.tags.length > 0 ? (
            previewData?.tags.map((item, idx) => (
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
        {/* SEO PREVIEW (GOOGLE) */}
        <section className={cx("border-t border-gray-200 pt-10")}>
          <Item children={"SEO PREVIEW"} itemClassName={cx("font-bold")} />
          <div className="mt-2 max-w-xl">
            <Item
              children={previewData?.metaTitle || previewData?.title || "Chưa có tiêu đề SEO"}
              className="text-blue-700 text-lg leading-snug"
            />

            <Item
              children={previewData?.metaDesc || previewData?.shortDesc || "Chưa có mô tả SEO"}
              className="text-gray-600 text-sm"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Preview;
