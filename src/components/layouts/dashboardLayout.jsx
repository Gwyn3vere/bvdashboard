// Libraries
import classNames from "classnames/bind";
import { useState, useCallback, useEffect, use } from "react";
// Styles
import styles from ".././../styles/components.module.css";
import { Sidebar, Header } from "../ui";

const cx = classNames.bind(styles);

function dashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((p) => !p);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setIsCollapsed(true); // Đóng sidebar nếu < xl
      }
    };

    handleResize(); // Check ngay khi component mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="relative overflow-hidden h-screen min-h-screen">
      <div className="flex h-full">
        <Sidebar collapsed={isCollapsed} setCollapsed={setIsCollapsed} />
        <div
          className={cx(
            "flex flex-col w-full h-full overflow-hidden bg-[var(--color-bg-light-primary-200)] rounded-[8px]"
          )}
        >
          <Header collapsed={isCollapsed} toggle={toggleSidebar} />
          <div className="flex-1 overflow-hidden rounded-[8px]">
            <div className="hidden-scrollbar h-full overflow-auto max-w-[1800px] mx-auto">{children}</div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default dashboardLayout;
