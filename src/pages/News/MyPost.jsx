import { useEffect, useState, useMemo, useRef } from "react";
import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";
import { Link } from "react-router-dom";
import { NEWS_STATUS_PUBLISH } from "../../constants/menu";
import { NEWS_MY_POST_STATUS_OPTION } from "../../constants/option";
import { NEWS_STATUS } from "../../constants/status";
import { Breadcrumb, Item, Button, ActionBar, List, Tooltip, Modal } from "../../components/ui";
import {
  LuSlidersHorizontal,
  LuLayoutDashboard,
  LuPlus,
  LuEllipsisVertical,
  LuTrash2,
  LuCircleCheckBig,
  LuEye,
  LuSquarePen,
} from "react-icons/lu";
import { TWCSS } from "../../styles/defineTailwindcss";
import { useNewsStore } from "../../store/newsStore";
import { useAuthStore } from "../../store/authStore";
import { useActive, useSearch } from "../../components/hooks";
import { Article, Delete } from "./index";

const cx = classNames.bind(style);

function MyPost() {
  const { news, loading, fetchNews, setEditingNewsId, editingNewsId } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const [newsKeyword, setNewsKeyword] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");

  const { user, initialized } = useAuthStore();
  const statusNews = useMemo(() => {
    return news.filter((item) => {
      if (item?.author?.id !== user?.id) return false;
      return true;
    });
  }, [news]);

  // Lọc tầng 1
  const searchedNews = useSearch(statusNews, newsKeyword, (news) =>
    [news.title, news.category?.name, news.author?.name].filter(Boolean).join(" "),
  );

  // Lọc tầng 2
  const tabbedNews = useMemo(() => {
    if (activeTab === "ALL") return searchedNews;
    if (activeTab === "PUBLISHED") return searchedNews.filter((n) => n.status === "PUBLISHED");
    if (activeTab === "PENDING") return searchedNews.filter((n) => n.status === "PENDING");
    if (activeTab === "DRAFT") return searchedNews.filter((n) => n.status === "DRAFT");
    if (activeTab === "ARCHIVED") return searchedNews.filter((n) => n.status === "ARCHIVED");
    if (activeTab === "REJECTED") return searchedNews.filter((n) => n.status === "REJECTED");

    return searchedNews;
  }, [searchedNews, activeTab]);

  const isEmptyData = news.length === 0;
  const isEmptySearch = news.length > 0 && searchedNews.length === 0;

  const modal = {
    preview: useActive(),
    delete: useActive(),
    filter: useActive,
  };

  return (
    <>
      <div className={cx(TWCSS.container)}>
        <div className={cx("bg-white rounded-2xl")} style={{ boxShadow: "var(--shadow)" }}>
          <ActionBar
            name="tin tức"
            onFilter={modal.filter}
            rightBtn={
              <Item
                as={Link}
                to={"/quan-ly-tin-tuc/dang-bai"}
                icon={<LuPlus />}
                children={"Đăng tin tức mới"}
                iconClassName={cx("text-[16px] text-white font-bold")}
                itemClassName={cx("text-[13px] text-white font-bold")}
                className={cx(
                  "flex items-center gap-2",
                  "bg-linear-[var(--color-ln-primary)] cursor-pointer",
                  "h-[36px] px-3 rounded-xl",
                )}
              />
            }
            keyword={newsKeyword}
            onChange={(e) => setNewsKeyword(e.target.value)}
            featured={NEWS_MY_POST_STATUS_OPTION}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            placeholder="Tìm kiếm..."
          ></ActionBar>
          <List
            name="tin tức"
            className={cx(TWCSS.list)}
            columns={[
              { key: "Index", label: "#", width: "10%", render: (row) => row.id },
              {
                key: "News",
                label: "Tiêu đề",
                width: "40%",
                render: (row) => (
                  <div className="">
                    <Item as="strong" children={row?.title} itemClassName={cx("line-clamp-1")} />
                    <Item as="span" children={`Tác giả: ${row?.author?.name}`} itemClassName={cx("text-sm")} />
                  </div>
                ),
              },
              {
                key: "Category",
                label: "Danh mục",
                width: "16%",
                render: (row) => (
                  <div className="inline-block">
                    <Item
                      icon={<LuCircleCheckBig />}
                      children={row?.category?.name}
                      itemClassName={cx("text-nowrap")}
                      className={cx(
                        "flex items-center gap-2 rounded-[8px]",
                        "text-xs font-semibold text-[var(--color-primary-900)]",
                        "bg-[var(--color-primary-100)] p-2",
                        "border border-[var(--color-primary-200)]",
                      )}
                    />
                  </div>
                ),
              },
              {
                key: "Status",
                label: "Trạng thái",
                width: "15%",
                render: (row) => {
                  const statusConfig = NEWS_STATUS[row?.status];
                  if (!statusConfig) return row?.status;
                  return (
                    <div className="inline-block">
                      <Item
                        icon={<LuCircleCheckBig />}
                        children={statusConfig?.label}
                        itemClassName={cx("text-nowrap")}
                        className={cx(
                          "flex items-center gap-2 rounded-full p-2",
                          `text-xs font-semibold text-[${statusConfig?.color}]`,
                          `border border-[${statusConfig?.color}]  group-hover:text-white`,
                        )}
                      />
                    </div>
                  );
                },
              },
              {
                key: "View",
                label: "Lượt xem",
                width: "10%",
                render: (row) => (
                  <Item
                    icon={<LuEye />}
                    children={row?.view}
                    itemClassName={cx("text-nowrap text-sm")}
                    className={cx("flex items-center gap-2")}
                  />
                ),
              },
              {
                key: "Edit",
                label: "",
                width: "3%",
                render: (row) => (
                  <Item
                    as={Link}
                    to={`/quan-ly-tin-tuc/cap-nhat-bai-viet/${row.id}`}
                    icon={<LuSquarePen />}
                    iconClassName="text-sm font-bold"
                    className={cx(
                      "bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)]",
                      "hover:bg-[var(--color-secondary)] hover:text-white",
                      "rounded-xl transition block flex items-center justify-center",
                    )}
                    style={{ width: "32px", height: "32px" }}
                  />
                ),
              },
              {
                key: "Delete",
                label: "",
                width: "3%",
                render: (row) => (
                  <Button
                    onClick={() => {
                      setEditingNewsId(row.id);
                      modal.delete.toggleActive();
                    }}
                    width={32}
                    height={32}
                    iconClassName="text-sm font-bold"
                    className={cx(
                      "bg-[var(--color-error-100)] text-[var(--color-error-700)]",
                      "hover:bg-[var(--color-error)] hover:text-white",
                      "rounded-xl transition",
                    )}
                    icon={<LuTrash2 />}
                  />
                ),
              },
              {
                key: "Preview",
                label: "",
                width: "3%",
                render: (row) => (
                  <Button
                    onClick={() => {
                      setEditingNewsId(row.id);
                      modal.preview.toggleActive();
                    }}
                    width={32}
                    height={32}
                    iconClassName="text-sm font-bold"
                    className={cx(
                      "bg-[var(--color-primary-100)] text-[var(--color-primary-700)]",
                      "hover:bg-[var(--color-primary)] hover:text-white",
                      "rounded-xl transition",
                    )}
                    icon={<LuEye />}
                  />
                ),
              },
            ]}
            data={tabbedNews}
            isEmptyData={isEmptyData}
            isEmptySearch={isEmptySearch}
            animated
          />
        </div>
      </div>
      <Modal open={modal.delete.isActive} onClose={modal.delete.deactivate} width={"max-w-md"}>
        <Delete onClose={modal.delete.deactivate} type="news" id={editingNewsId} />
      </Modal>
      <Modal open={modal.preview.isActive} onClose={modal.preview.deactivate} width={"max-w-5xl"}>
        <Article onClose={modal.preview.deactivate} newsId={editingNewsId} />
      </Modal>
    </>
  );
}

export default MyPost;
