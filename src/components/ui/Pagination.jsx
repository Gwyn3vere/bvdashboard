import classNames from "classnames/bind";

import style from "../../styles/ui.module.css";
import { TWCSS } from "../../styles/defineTailwindcss.jsx";

import { HiMiniChevronRight, HiMiniChevronLeft } from "react-icons/hi2";
import { Button } from "../ui";

const cx = classNames.bind(style);

function Pagination({ pages = [], currentPage, setCurrentPage, nextPage, prevPage }) {
  return (
    <div className="flex items-center justify-center gap-1.5 text-[14px] pt-5 py-2">
      <Button
        icon={<HiMiniChevronLeft />}
        width={30}
        height={30}
        onClick={prevPage}
        className={TWCSS.paginationButton.join(" ")}
      />
      {pages.length !== 0 &&
        pages.map((page) => (
          <Button
            key={page}
            children={page}
            width={30}
            height={30}
            onClick={() => setCurrentPage(page)}
            className={cx(
              TWCSS.paginationButton.join(" "),
              currentPage === page && "bg-[var(--color-primary)] text-[var(--color-bg-light-primary-100)]"
            )}
          />
        ))}

      <Button
        icon={<HiMiniChevronRight />}
        width={30}
        height={30}
        onClick={nextPage}
        className={TWCSS.paginationButton.join(" ")}
      />
    </div>
  );
}

export default Pagination;
