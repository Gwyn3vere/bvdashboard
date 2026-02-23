import { useEffect, useState, useMemo, useRef } from "react";
import classNames from "classnames/bind";
import style from "../../styles/pages.module.css";
import { Link } from "react-router-dom";
import { NEWS_STATUS_PUBLISH } from "../../constants/menu";
import { NEWS_STATUS } from "../../constants/status";
import {
  Breadcrumb,
  Item,
  Button,
  Search,
  List,
  Tooltip,
  Modal,
} from "../../components/ui";
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
  const modal = {
    preview: useActive(),
    delete: useActive(),
  };
  const [newsKeyword, setNewsKeyword] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const { news, loading, fetchNews, setEditingNewsId, editingNewsId } =
    useNewsStore();
  const { user, initialized } = useAuthStore();
  const statusNews = useMemo(() => {
    return news.filter((item) => {
      if (item?.author?.id !== user?.id) return false;
      if (selectedStatus !== "ALL" && item?.status !== selectedStatus)
        return false;
      return true;
    });
  }, [news, selectedStatus]);

  const searchNews = useSearch(statusNews, newsKeyword, (news) =>
    [news.title, news.category?.name, news.author?.name]
      .filter(Boolean)
      .join(" "),
  );

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      <div className={cx(TWCSS.container)}>
        <Breadcrumb
          className="mb-3"
          items={[
            {
              label: "Bảng điều khiển",
              href: "/bang-dieu-khien",
              icon: <LuLayoutDashboard />,
            },
            { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
            { label: "Bài viết của bạn" },
          ]}
        />
        <Item
          as="strong"
          children="Bài viết của bạn"
          itemClassName="text-3xl"
        />
        <Item
          as="span"
          children="Quản lý và xuất bản bài viết của bạn."
          itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
        />

        <ActionBar
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          keyword={newsKeyword}
          onChange={(e) => setNewsKeyword(e.target.value)}
        />

        <List
          className={cx(TWCSS.list, "mt-5")}
          columns={[
            { key: "Index", label: "#", width: "10%", render: (row) => row.id },
            {
              key: "News",
              label: "Tiêu đề",
              width: "40%",
              render: (row) => (
                <div className="">
                  <Item
                    as="strong"
                    children={row?.title}
                    itemClassName={cx("line-clamp-1")}
                  />
                  <Item
                    as="span"
                    children={`Tác giả: ${row?.author?.name}`}
                    itemClassName={cx("text-sm")}
                  />
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
                <div
                  className={cx(
                    "hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg-light-primary-100)]",
                    "rounded-full transition w-[40px] h-[40px] flex items-center justify-center",
                  )}
                >
                  <Item
                    as={Link}
                    to={`/quan-ly-tin-tuc/cap-nhat-bai-viet/${row.id}`}
                    icon={<LuSquarePen />}
                    iconClassName={cx("text-[20px]")}
                  />
                </div>
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
                  width={40}
                  height={40}
                  iconClassName="text-[20px] font-bold"
                  className={cx(
                    "hover:bg-[var(--color-error)] hover:text-[var(--color-bg-light-primary-100)]",
                    "rounded-full transition",
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
                  width={40}
                  height={40}
                  iconClassName="text-[20px] font-bold"
                  className={cx(
                    "hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg-light-primary-100)]",
                    "rounded-full transition",
                  )}
                  icon={<LuEye />}
                />
              ),
            },
          ]}
          data={searchNews}
        />
      </div>
      <Modal
        open={modal.delete.isActive}
        onClose={modal.delete.deactivate}
        width={"max-w-md"}
      >
        <Delete
          onClose={modal.delete.deactivate}
          type="news"
          id={editingNewsId}
        />
      </Modal>
      <Modal
        open={modal.preview.isActive}
        onClose={modal.preview.deactivate}
        width={"max-w-5xl"}
      >
        <Article onClose={modal.preview.deactivate} newsId={editingNewsId} />
      </Modal>
    </>
  );
}

export default MyPost;

function ActionBar({ selectedStatus, setSelectedStatus, keyword, onChange }) {
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
        "bg-white rounded-[8px] p-4 outline outline-[var(--color-unavailable-300)]",
      )}
    >
      <div className={cx("grid grid-cols-1fr xl:grid-cols-[380px_1fr] gap-3")}>
        <Search
          value={keyword}
          onChange={onChange}
          width={"auto"}
          height={45}
          className={cx("rounded-[8px]")}
        />
        <div className={cx("flex flex-col md:flex-row justify-between gap-3")}>
          <div className="flex gap-1">
            <Tooltip content="Bộ lọc" position="top">
              <Button
                width={45}
                height={45}
                icon={<LuSlidersHorizontal />}
                className={cx(
                  "font-medium",
                  "hover:bg-[var(--color-primary-100)]",
                )}
              />
            </Tooltip>
          </div>
          <Item
            as={Link}
            to={"/quan-ly-tin-tuc/dang-bai"}
            icon={<LuPlus />}
            children={"Đăng tin tức mới"}
            iconClassName={cx("text-xl text-white font-semibold")}
            itemClassName={cx("text-sm text-white font-semibold")}
            className={cx(
              "bg-[var(--color-primary)] flex items-center gap-2 h-[45px] px-4 rounded-[8px]",
            )}
          />
        </div>
      </div>

      <div
        className={cx(
          "mt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3",
        )}
      >
        <div className={cx("flex items-center gap-2")}>
          <Item
            children={"Trạng thái:"}
            itemClassName={cx(
              "text-sm text-[var(--color-unavailable-900)] font-semibold",
            )}
            className={cx("hidden md:block")}
          />
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
                height={30}
                children={`Tất cả`}
                onClick={() => setSelectedStatus("ALL")}
                btnClassName={cx("text-nowrap")}
                className={cx(
                  TWCSS.button,
                  "rounded-full",
                  selectedStatus === "ALL"
                    ? "bg-[var(--color-primary)] text-white border-transparent"
                    : "",
                )}
              />
              {NEWS_STATUS_PUBLISH.map((status) => (
                <Button
                  key={status.id}
                  width={"auto"}
                  height={30}
                  children={`${status.name}`}
                  onClick={() => setSelectedStatus(status.value)}
                  btnClassName={cx("text-nowrap")}
                  className={cx(
                    TWCSS.button,
                    "rounded-full",
                    selectedStatus === status.value
                      ? "bg-[var(--color-primary)] text-white border-transparent"
                      : "",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
