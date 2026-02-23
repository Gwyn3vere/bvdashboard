import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { Item, TitleForm, Search, Button, Modal } from "../../components/ui";
import { MOCK_NEWS_CATEGORIES } from "../../mock/news";
import { LuBook, LuSquarePen, LuTrash2, LuPlus } from "react-icons/lu";
import { ICONS_CATE_MAP } from "../../constants/icon";
import { useActive, useSearch } from "../../components/hooks";
import { CateForm, Delete } from "./index";
import { useCategoryStore } from "../../store/categoryStore";

const cx = classNames.bind(style);

function Category({ onClose }) {
  const [cateKeyword, setCateKeyword] = useState("");
  const categories = useCategoryStore((c) => c.categories);
  const filteredCate = categories.filter((fc) => fc.id !== "uncategorized");

  const editingCategoryId = useCategoryStore((c) => c.editingCategoryId);
  const setEditingCategoryId = useCategoryStore((c) => c.setEditingCategoryId);

  const searchCate = useSearch(filteredCate, cateKeyword, (cate) =>
    [cate.name].filter(Boolean).join(" "),
  );

  const modal = {
    cateForm: useActive(),
    delete: useActive(),
  };
  const handleClose = () => {
    if (modal.cateForm.isActive) {
      modal.cateForm.deactivate();
    } else if (modal.delete.isActive) {
      modal.delete.deactivate();
    }
    setEditingCategoryId(null);
  };
  return (
    <>
      <TitleForm
        title={"Quản lý danh mục"}
        subTitle={"Bảng thông tin quản lý danh mục tin tức, blog của bạn."}
        onClose={onClose}
      />
      <div className={cx("p-6 border-b border-[var(--color-unavailable-300)]")}>
        <Search
          value={cateKeyword}
          onChange={(e) => setCateKeyword(e.target.value)}
          placeholder="Tìm kiếm danh mục..."
          className={cx("w-full rounded-[8px]")}
        />
      </div>
      {/* Main */}
      <div className={cx("p-6")}>
        <div className={cx("grid grid-cols-1 md:grid-cols-2 gap-4")}>
          {searchCate.map((category) => {
            const IconComponent = ICONS_CATE_MAP[category.icon] || LuBook;
            return (
              <div
                key={category.id}
                className={cx(
                  "p-4 border border-[var(--color-unavailable-300)] rounded-[8px] cursor-pointer",
                  "hover:border-[var(--color-primary)] hover:shadow-xl",
                  "transition-colors duration-200 ",
                )}
              >
                <div className={cx("flex items-center gap-4")}>
                  <Item
                    icon={<IconComponent />}
                    className={cx(
                      "w-10 h-10 rounded-[8px] text-white",
                      "inline-flex items-center justify-center",
                    )}
                    style={{ backgroundColor: category.color }}
                  />
                  <Item
                    children={category.name}
                    itemClassName={cx("text-sm font-semibold")}
                  />
                </div>
                <div
                  className={cx(
                    "flex items-center justify-between w-full",
                    "border-t border-[var(--color-unavailable-300)] mt-2",
                  )}
                >
                  <Item
                    children={`${category.totalNews} Bài viết`}
                    itemClassName={cx(
                      "text-xs text-[var(--color-unavailable-900)]",
                    )}
                  />
                  <div className="flex items-center">
                    <Button
                      width={40}
                      height={40}
                      iconClassName="text-sm font-bold text-[var(--color-secondary)]"
                      icon={<LuSquarePen />}
                      onClick={() => {
                        setEditingCategoryId(category.id);
                        modal.cateForm.toggleActive();
                      }}
                    />
                    <Button
                      width={40}
                      height={40}
                      iconClassName="text-sm font-bold text-[var(--color-error)]"
                      icon={<LuTrash2 />}
                      onClick={() => {
                        setEditingCategoryId(category.id);
                        modal.delete.toggleActive();
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        className={cx(
          "sticky bottom-0 bg-white border-t border-gray-200 p-6",
          "flex gap-3 items-center justify-between",
        )}
      >
        <Item
          children={`Tổng cộng ${MOCK_NEWS_CATEGORIES.length} danh mục`}
          itemClassName={cx("text-sm")}
        />
        <div className="flex gap-2">
          <Button
            children={"Huỷ"}
            onClick={onClose}
            className={cx(
              "p-2 bg-[var(--color-unavailable-100)]",
              "text-sm font-semibold",
              "hover:bg-[var(--color-unavailable-300)]",
            )}
          />
          <Button
            width={"auto"}
            icon={<LuPlus />}
            children={"Thêm danh mục mới"}
            onClick={modal.cateForm.toggleActive}
            className={cx(
              "p-2 bg-[var(--color-primary)] gap-2",
              "text-sm font-semibold text-white",
            )}
          />
        </div>
      </div>
      <Modal
        open={modal.cateForm.isActive}
        onClose={handleClose}
        width="max-w-md"
      >
        <CateForm onClose={handleClose} />
      </Modal>
      <Modal
        open={modal.delete.isActive}
        onClose={handleClose}
        width="max-w-md"
      >
        <Delete type="category" id={editingCategoryId} onClose={handleClose} />
      </Modal>
    </>
  );
}

export default React.memo(Category);
