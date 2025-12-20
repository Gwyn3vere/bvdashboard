// Libraries
import classNames from "classnames/bind";
// Styles
import styles from ".././../styles/components.module.css";

const cx = classNames.bind(styles);

import { Sidebar, Header } from "../ui";

function dashboardLayout({ children }) {
  return (
    <main className="overflow-hidden h-screen min-h-screen bg-[var(--color-bg-light-primary-100)]">
      <div className="grid grid-cols-[auto_1fr] h-full">
        <Sidebar />
        <div
          className={cx(
            // "content",
            "flex flex-col w-full h-full overflow-hidden bg-[var(--color-bg-light-primary-200)] rounded-[8px]"
          )}
        >
          <Header />
          <div className="flex-1 overflow-hidden rounded-[8px]">
            <div className="hidden-scrollbar h-full overflow-auto max-w-[1800px] mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default dashboardLayout;
