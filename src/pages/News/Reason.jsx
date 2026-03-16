import React from "react";
import classNames from "classnames/bind";
import style from "../../styles/components.module.css";
import { useNewsStore } from "../../store/newsStore";
import { TitleForm, Button, Item } from "../../components/ui";
import { Link } from "react-router-dom";
import { LuSquarePen } from "react-icons/lu";

const cx = classNames.bind(style);

function Reason({ onClose, id }) {
  const getNewsById = useNewsStore((n) => n.getNewsById);
  const news = getNewsById(id) ?? null;
  return (
    <>
      <TitleForm
        title={"Lý do bị từ chối"}
        subTitle={"hản hồi từ người duyệt bài."}
        onClose={onClose}
        className="bg-linear-[var(--color-ln-error)]"
      />
      <div className={cx("p-3 md:p-6 bg-white")}>
        <Item
          children={"Bài viết"}
          itemClassName={cx("text-[12px] font-bold text-[var(--color-unavailable-700)]")}
          className={cx("mb-[8px]")}
        />
        <Item as="strong" children={news?.title} itemClassName={cx("text-[13px]")} className={cx("mb-[16px]")} />
        <Item
          children={"Phản hồi từ người duyệt bài"}
          itemClassName={cx("text-[12px] font-bold text-[var(--color-unavailable-700)]")}
          className={cx("mb-[8px]")}
        />
        <Item
          children={news?.rejectReason}
          itemClassName={cx("text-[13.5px] text-[var(--color-error-900)]")}
          className={cx(
            "py-[14px] px-[16px] bg-[var(--color-error-100)]/50 rounded-xl",
            "border border-[var(--color-error-300)]/50",
          )}
        />
      </div>

      <div className={cx("flex gap-3 w-full bg-white px-3 py-6 md:p-6", "border-t border-gray-200")}>
        <Button
          type={"button"}
          width="100%"
          height={38}
          children={"Huỷ"}
          onClick={onClose}
          className={cx(
            "text-[var(--color-unavailable-900)] font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]",
            "rounded-xl",
            "font-semibold text-[13px]",
          )}
        />
        <Item
          as={Link}
          to={`/quan-ly-tin-tuc/cap-nhat-bai-viet/${id}`}
          icon={<LuSquarePen />}
          children={"Chỉnh sửa và nộp lại"}
          className={cx(
            "bg-linear-[var(--color-ln-error)] rounded-xl",
            "text-white font-semibold text-[13px]",
            "w-full flex items-center justify-center gap-2",
          )}
        />
      </div>
    </>
  );
}

export default React.memo(Reason);
