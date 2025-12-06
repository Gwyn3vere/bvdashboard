// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { HiMiniChevronRight, HiMiniChevronLeft } from "react-icons/hi2";
import { Button } from "../ui";

const cx = classNames.bind(style);

function Pagination() {
  return (
    <div className="flex items-center justify-end gap-1.5 pt-2">
      <Button
        icon={<HiMiniChevronLeft />}
        width={30}
        height={30}
        className={cx(
          "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
          " hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]"
        )}
      />
      <Button
        children="1"
        width={30}
        height={30}
        className={cx(
          "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
          " hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]"
        )}
      />
      <Button
        children="2"
        width={30}
        height={30}
        className={cx(
          "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
          " hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]"
        )}
      />
      <Button
        children="3"
        width={30}
        height={30}
        className={cx(
          "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
          " hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]"
        )}
      />
      <span>...</span>
      <Button
        children="10"
        width={30}
        height={30}
        className={cx(
          "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
          " hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]"
        )}
      />
      <Button
        icon={<HiMiniChevronRight />}
        width={30}
        height={30}
        style={{ background: "var(--color-bg-light-primary-300)" }}
        className={cx(
          "rounded-[8px] transition hover:bg-[var(--color-text-light-primary)] hover:text-[var(--color-bg-light-primary-100)]"
        )}
      />
    </div>
  );
}

export default Pagination;
