// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/ui.module.css";
import { HiMiniChevronRight } from "react-icons/hi2";

const cx = classNames.bind(style);

function Breadcrumb({
  items = [],
  separator = <HiMiniChevronRight className="text-gray-400 text-sm" />,
  className,
  textStyle,
}) {
  return (
    <nav className={cx(className)}>
      <ol className="flex items-center flex-wrap gap-1 text-[9px] md:text-xs text-gray-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Tag = item.href ? "a" : "button";

          return (
            <li key={index} className="flex items-center gap-1">
              <Tag
                href={item.href}
                onClick={item.onClick}
                disabled={item.disabled}
                className={classNames(
                  "flex items-center gap-1 transition",
                  item.disabled
                    ? "text-gray-400 cursor-not-allowed"
                    : item.href || item.onClick
                      ? "hover:text-black"
                      : "text-[var(--color-primary-900)]/80 font-bold",
                )}
              >
                {item.icon && <span className={textStyle}>{item.icon}</span>}
                <span className={textStyle}>{item.label}</span>
              </Tag>

              {!isLast && <span className="mx-1 select-none">{separator}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
