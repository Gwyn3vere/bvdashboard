import classNames from "classnames/bind";
import React from "react";
import styles from "../../styles/pages.module.css";
import { TitleForm, Button } from "../../components/ui";
import { useCategoryStore } from "../../store/categoryStore";
import { useNewsStore } from "../../store/newsStore";

const cx = classNames.bind(styles);

function Delete({ onClose, type, id }) {
  const getCategoryById = useCategoryStore((c) => c.getCategoryById);
  const deleteCategory = useCategoryStore((c) => c.deleteCategory);
  const setEditingCategoryId = useCategoryStore((c) => c.setEditingCategoryId);

  const getNewsById = useNewsStore((n) => n.getNewsById);
  const deleteNews = useNewsStore((n) => n.deleteNews);
  const setEditingNewsId = useNewsStore((n) => n.setEditingNewsId);

  // 🎯 Resolve data theo type
  const category = type === "category" ? getCategoryById(id) : null;
  const news = type === "news" ? getNewsById(id) : null;

  // Guard clause
  if (type === "category" && !category) return null;
  if (type === "news" && !news) return null;

  const handleConfirmDelete = () => {
    if (type === "category") {
      deleteCategory(id);
      setEditingCategoryId(null);
    }

    if (type === "news") {
      deleteNews(id);
      setEditingNewsId(null);
    }

    onClose();
  };

  return (
    <>
      <TitleForm
        onClose={onClose}
        title="Cảnh báo"
        subTitle={
          type === "category" ? (
            <span>
              Hành động này sẽ xoá vĩnh viễn thông tin danh mục{" "}
              <span className="font-semibold text-[var(--color-error)]">
                {category?.name}
              </span>{" "}
              khỏi hệ thống!
              <br />
              <br />
              Tất cả bài viết, tin tức,... thuộc danh mục này sẽ đưa về danh mục{" "}
              <span className="font-semibold text-[var(--color-unavailable-900)]">
                Không xác định
              </span>
              .
              <br />
              <br />
              Bạn có muốn tiếp tục?
            </span>
          ) : (
            <span>
              Hành động này sẽ xoá vĩnh viễn bài viết{" "}
              <span className="font-semibold text-[var(--color-error)]">
                {news?.title}
              </span>{" "}
              khỏi hệ thống! Bạn có muốn tiếp tục?
            </span>
          )
        }
      />

      <div className="sticky bottom-0 p-6 flex gap-3">
        <Button
          type="button"
          onClick={onClose}
          width="100%"
          className={cx(
            "text-gray-700 font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]",
          )}
        >
          Huỷ
        </Button>

        <Button
          type="button"
          onClick={handleConfirmDelete}
          width="100%"
          className="bg-[var(--color-error)] text-white font-semibold"
        >
          Xác nhận
        </Button>
      </div>
    </>
  );
}

export default React.memo(Delete);
