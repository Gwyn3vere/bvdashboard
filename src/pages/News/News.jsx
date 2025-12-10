// Libraries - Mock -Hooks
import { useState } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useActive } from "../../components/hooks";
import { mockNews } from "../../mock/news";
// Styles - UI - Motions
import styles from "../../styles/pages.module.css";
import { Breadcrumb, Item, Button, Search, Avatar } from "../../components/ui";
import { HiMiniSquares2X2, HiMiniChevronRight, HiMiniChevronLeft, HiBookmark } from "react-icons/hi2";
import { LuListFilter } from "react-icons/lu";
import { SliderMotion } from "../../motions";

const cx = classNames.bind(styles);

function News() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState("next");

  const itemsPerPage = 8;
  const totalPages = Math.ceil(mockNews.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = mockNews.slice(startIndex, endIndex);

  const next = () => {
    setDirection("next");
    setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  };

  const prev = () => {
    setDirection("prev");
    setCurrentPage((p) => Math.max(p - 1, 0));
  };

  const modal = {
    filter: useActive(),
    add: useActive(),
    edit: useActive(),
    delete: useActive()
  };
  return (
    <div className="xl:grid grid-cols-[1200px_auto] h-auto gap-5">
      <div>
        <Breadcrumb
          className="mb-3"
          items={[
            { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <HiMiniSquares2X2 /> },
            { label: "Quản lý tin tức" }
          ]}
        />
        <div className="flex flex-col justify-between w-full h-[250px] rounded-[8px] bg-blue-500 p-5">
          <div className="text-white">
            <Item as="strong" children="Tổng quan tin tức" itemClassName={cx("text-[25px]")} />
            <Item
              as="div"
              children="Nơi bạn có thể theo dõi hiệu suất bài viết, tình trạng biên tập và các hoạt động liên quan đến tin tức trong hệ thống."
              className={cx("mt-2 w-[600px]")}
              whitespace=""
            />
          </div>
          <Item
            as={Link}
            to="/dang-bai"
            children="Đăng tin tức mới"
            className={cx("flex justify-center w-[200px] px-4 py-2 bg-white rounded-full")}
            itemClassName={cx("font-bold text-blue-500")}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Item as="strong" children="Tổng bài đăng:" />
            <span>{mockNews.length}</span>
          </div>
          <div className="flex gap-2 my-5">
            <Button
              icon={<HiMiniChevronLeft />}
              width={40}
              onClick={prev}
              className={cx(
                "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
                " hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]"
              )}
            />
            <Button
              icon={<HiMiniChevronRight />}
              width={40}
              onClick={next}
              className={cx(
                "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
                " hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]"
              )}
            />
            <Search className="rounded-[8px]" />
            <Button
              icon={<LuListFilter />}
              children="Bộ lọc"
              width="auto"
              onClick={modal.filter.toggleActive}
              className="text-[14px] border-2 px-3 rounded-[8px] border-[var(--color-bg-light-primary-300)] cursor-pointer"
            />
          </div>
        </div>

        <SliderMotion page={currentPage} direction={direction}>
          <NewsTable items={currentNews} />
        </SliderMotion>
      </div>

      <div>
        <Item as="strong" children="Bài đăng mới nhất" className="h-[20px]" itemClassName={cx("text-sm mb-3")} />
        {mockNews.slice(0, 4).map((item, index) => (
          <NewsCard key={index} news={item} />
        ))}
        <hr className="my-5 text-gray-300" />
        <div className="flex items-center justify-between my-3">
          <Item as="strong" children="Những người đóng góp" className="h-[20px]" itemClassName={cx("text-sm")} />
          <Item
            as={Link}
            to="/quan-ly-tin-tuc/nguoi-dong-gop"
            children="Xem tất cả"
            className={cx("text-sm text-blue-500")}
          />
        </div>
        <Author />
      </div>
    </div>
  );
}

export default News;

export function NewsTable({ items }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((news) => (
        <div key={news.id} className="">
          <div className="bg-gray-300 w-auto h-[150px] rounded-[8px]" />
          <Item as="strong" children={news.title} itemClassName="text-md mt-2 truncate " />
          <div className="text-sm text-gray-500 mt-1">
            {/* <span>Tác giả: {news.author}</span> */}
            {/* <br /> */}
            <span>Ngày đăng: {news.date}</span> <br />
            <div>
              <div>
                Trạng thái:{" "}
                <span className={cx("font-bold", news.status === "Đã xuất bản" ? "text-green-500" : "text-red-500")}>
                  {news.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function NewsCard({ news }) {
  return (
    <div className={cx("grid grid-cols-[150px_auto] gap-2 mb-2 h-[100px]")}>
      <div className="h-[100px] bg-gray-300 rounded-[8px]" />
      <div className="flex flex-col justify-between w-auto">
        <Item as="strong" children={news.title} itemClassName="text-md mt-2" whitespace="" />
        <div className="flex items-end justify-between">
          <span>{news.date}</span>
          <span>
            <HiBookmark />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Author() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Avatar className="rounded-full" width={50} height={50} />
        <div>
          <span className="font-bold">Author Name</span>
          <p className="text-sm opacity-70">author@example.com</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Avatar className="rounded-full" width={50} height={50} />
        <div>
          <span className="font-bold">Author Name</span>
          <p className="text-sm opacity-70">author@example.com</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Avatar className="rounded-full" width={50} height={50} />
        <div>
          <span className="font-bold">Author Name</span>
          <p className="text-sm opacity-70">author@example.com</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Avatar className="rounded-full" width={50} height={50} />
        <div>
          <span className="font-bold">Author Name</span>
          <p className="text-sm opacity-70">author@example.com</p>
        </div>
      </div>
    </div>
  );
}
