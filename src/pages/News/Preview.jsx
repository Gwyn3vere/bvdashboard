import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";
import { TitleForm, Item, ArticleContent, Avatar } from "../../components/ui";
import { LuCalendar, LuCircleCheckBig, LuEye, LuFileText, LuTag, LuUser } from "react-icons/lu";
import { generateTableOfContents } from "../../utils/helper";
import { TWCSS } from "../../styles/defineTailwindcss";

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
    <>
      <TitleForm
        title={"Xem trước bài viết"}
        subTitle={"Bảng thông tin xem trước bài viết tin tức, blog của bạn."}
        onClose={onClose}
      />
      <div className={cx(TWCSS.container, "w-full flex justify-center py-10")}>
        <div className={cx("w-[720px]")}>
          <div className="inline-block">
            {/* Category */}
            <Item
              icon={<LuCircleCheckBig />}
              children={previewData?.category?.name || "Tên danh mục"}
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
            children={previewData?.title || "Tiêu đề bài viết"}
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
              <Avatar name={previewData?.author?.name} className="rounded-full" width={32} height={32} />
              <Item
                icon={<LuUser />}
                children={previewData?.author?.name ? previewData?.author?.name : user?.name || "Tên tác giả"}
                itemClassName={cx("font-bold text-[13px] hover:text-[var(--color-text-light-primary)]")}
                className={cx("flex items-center gap-2")}
              />
            </div>

            {/* Daytime */}
            <Item
              icon={<LuCalendar />}
              children={dateNow}
              itemClassName={cx("font-bold text-[12.5px] hover:text-[var(--color-text-light-primary)]")}
              className={cx("flex items-center gap-2")}
            />
            {/* View */}
            <Item
              icon={<LuEye />}
              children={`${previewData?.view} lượt xem`}
              itemClassName={cx("font-bold text-[12.5px] hover:text-[var(--color-text-light-primary)]")}
              className={cx("flex items-center gap-2")}
            />
          </div>
          <div className={cx("space-y-7 border-b border-gray-200 pb-10")}>
            {/* Thumbnail */}
            <div className={cx("rounded-2xl overflow-hidden")}>
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
                "bg-[var(--color-primary-100)] px-5 py-4",
                "border-l-5 border-[var(--color-primary)]",
                "rounded-r-xl",
              )}
            >
              <Item
                children={previewData?.shortDesc || "Chưa có mô tả ngắn gọn nào cho bài viết"}
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
            <ArticleContent html={previewData?.content || "Chưa có nội dung nào được viết"} />
          </div>
          {/* Tags */}
          <div className="py-10">
            <Item
              children={"Từ khoá"}
              itemClassName={cx("text-[11px] font-black uppercase ", "text-[var(--color-unavailable-700)]")}
              className={cx("mb-[12px]")}
            />
            <div className={cx("flex flex-wrap items-center gap-2")}>
              {previewData?.tags.length > 0 ? (
                previewData?.tags.map((item, idx) => (
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
    </>
  );
}

export default Preview;
