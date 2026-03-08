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

  const searchCate = useSearch(filteredCate, cateKeyword, (cate) => [cate.name].filter(Boolean).join(" "));

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
      <div className={cx("px-6 py-4 bg-white")}>
        <Search
          value={cateKeyword}
          onChange={(e) => setCateKeyword(e.target.value)}
          placeholder="Tìm kiếm danh mục..."
          className={cx("w-full rounded-xl")}
        />
      </div>
      {/* Main */}
      <div className={cx("px-6 pb-4 bg-white")}>
        <div className={cx("grid grid-cols-1 md:grid-cols-2 gap-3")}>
          {searchCate.map((category) => {
            const IconComponent = ICONS_CATE_MAP[category.icon] || LuBook;
            return (
              <div
                key={category.id}
                className={cx(
                  "p-4 border border-[var(--color-unavailable-300)] rounded-2xl cursor-pointer",
                  "hover:border-[var(--color-primary)] hover:shadow-xl",
                  "transition-colors duration-200 ",
                )}
              >
                <div className={cx("flex items-center gap-4")}>
                  <Item
                    icon={<IconComponent />}
                    className={cx("w-10 h-10 rounded-xl text-white", "inline-flex items-center justify-center")}
                    style={{ backgroundColor: category.color }}
                  />
                  <Item children={category.name} itemClassName={cx("text-[13px] font-bold")} />
                </div>
                <div className={cx("flex items-center justify-between w-full mt-2")}>
                  <Item
                    children={`${category.totalNews} Bài viết`}
                    itemClassName={cx("text-[12px] font-semibold text-[var(--color-unavailable-900)]")}
                  />
                  <div className="flex items-center gap-1">
                    <Button
                      width={28}
                      height={28}
                      iconClassName="text-[12px] font-bold text-[var(--color-primary)]"
                      icon={<LuSquarePen />}
                      onClick={() => {
                        setEditingCategoryId(category.id);
                        modal.cateForm.toggleActive();
                      }}
                      className={cx("bg-[var(--color-primary-100)] rounded-lg")}
                    />
                    <Button
                      width={28}
                      height={28}
                      iconClassName="text-[12px] font-bold text-[var(--color-error)]"
                      icon={<LuTrash2 />}
                      onClick={() => {
                        setEditingCategoryId(category.id);
                        modal.delete.toggleActive();
                      }}
                      className={cx("bg-[var(--color-error-100)] rounded-lg")}
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
          "sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4",
          "flex gap-3 items-center justify-between",
        )}
      >
        <Item
          children={`Tổng cộng ${MOCK_NEWS_CATEGORIES.length - 1} danh mục`}
          itemClassName={cx("text-[12px] text-[var(--color-unavailable-700)] font-bold")}
        />
        <div className="flex gap-2">
          <Button
            width={"auto"}
            height={"auto"}
            children={"Huỷ"}
            onClick={onClose}
            className={cx(
              "px-[18px] py-[9px] bg-[var(--color-unavailable-100)]",
              "text-[12.5px] font-bold rounded-xl text-[var(--color-unavailable-700)]",
              "hover:bg-[var(--color-unavailable-300)]",
            )}
          />
          <Button
            width={"auto"}
            height={"auto"}
            icon={<LuPlus />}
            children={"Thêm danh mục mới"}
            onClick={modal.cateForm.toggleActive}
            iconClassName={cx("text-[13px]")}
            className={cx(
              "px-[18px] py-[9px] bg-linear-[var(--color-ln-primary)] gap-2",
              "text-[12.5px] font-bold text-white rounded-xl",
            )}
          />
        </div>
      </div>
      <Modal open={modal.cateForm.isActive} onClose={handleClose} width="max-w-md">
        <CateForm onClose={handleClose} />
      </Modal>
      <Modal open={modal.delete.isActive} onClose={handleClose} width="max-w-md">
        <Delete type="category" id={editingCategoryId} onClose={handleClose} />
      </Modal>
    </>
  );
}

export default React.memo(Category);
