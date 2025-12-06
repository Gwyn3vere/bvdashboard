// Libraries
import classNames from "classnames/bind";
// Styles
import styles from ".././../styles/components.module.css";

const cx = classNames.bind(styles);

import { Sidebar, Header } from "../ui";

function dashboardLayout({ children }) {
  return (
    <main className="p-3 overflow-hidden h-screen min-h-screen bg-[var(--color-bg-light-primary-300)]">
      <div className="grid grid-cols-[auto_1fr] gap-2 h-full">
        <Sidebar />
        <div
          className={cx(
            "content",
            "flex flex-col w-full h-full overflow-hidden px-10 py-5 bg-[var(--color-bg-light-primary-100)] rounded-[8px]"
          )}
        >
          <Header />
          <div className="flex-1 overflow-hidden rounded-[8px]">
            <div className="hidden-scrollbar h-full overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default dashboardLayout;
