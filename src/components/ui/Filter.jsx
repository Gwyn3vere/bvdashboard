// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { Item, Button } from "../../components/ui";
import { LuListFilter } from "react-icons/lu";
import { TiTimes } from "react-icons/ti";

const cx = classNames.bind(style);

function Filter({ onClose }) {
  return (
    <div className="relative">
      <Item
        icon={<LuListFilter />}
        children="Bộ lọc danh sách"
        width="auto"
        className="flex items-center gap-2 text-3xl font-bold"
      />
      <Button
        icon={<TiTimes />}
        width={40}
        height={40}
        className="absolute top-0 right-0 bg-white"
        style={{ boxShadow: "var(--shadow)" }}
        onClick={onClose}
      />
      <Item
        as="div"
        children="Lọc danh sách nhân sự theo các tiêu chí khác nhau."
        width="auto"
        className="mb-5 mt-2"
        itemClassName="text-[14px] text-gray-500"
      />
    </div>
  );
}

export default Filter;
