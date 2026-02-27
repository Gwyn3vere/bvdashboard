import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Search, Button, Modal, Filter } from ".";
import { LuUserRoundPlus } from "react-icons/lu";

const cx = classNames.bind(styles);

function ActionBar({
  name,
  onForm,
  formModal,
  onFilter,
  keyword,
  onChange,
  onClose,
  featured,
  activeTab,
  onTabChange,
  children,
}) {
  return (
    <>
      <div className={cx("p-3 md:p-6 border-b border-[var(--color-primary-100)]")}>
        <div className="grid grid-cols-1fr xl:grid-cols-[auto_1fr] items-center gap-3 overflow-hidden">
          <div
            className={cx(
              "bg-[var(--color-unavailable-100)] rounded-2xl",
              "flex items-center gap-2 p-1.5 overflow-auto",
            )}
          >
            {featured.map((item, idx) => (
              <Button
                width={"auto"}
                height={"auto"}
                key={idx}
                onClick={() => onTabChange(item.value)}
                icon={<div className={cx("w-2 h-2 rounded-full", item.name && `bg-[var(${item.dot})]`)} />}
                children={item.name}
                className={cx(
                  "flex items-center gap-1 rounded-xl px-3 py-2 text-[12.5px]",
                  "font-bold text-[var(--color-unavailable-700)] text-nowrap",
                )}
                style={{
                  background: activeTab === item.value ? item.activeGrd : "transparent",
                  color: activeTab === item.value ? "#ffffff" : "",
                }}
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="flex gap-1">
              {children}

              <Search
                value={keyword}
                onChange={onChange}
                width={"100%"}
                height={36}
                className={cx("rounded-xl w-full md:w-[230px]", "order-2 md:order-1")}
                placeholder="Tìm tên, email, chức vụ,..."
              />
            </div>

            {/* Create */}
            <Button
              icon={<LuUserRoundPlus />}
              children={`Thêm ${name}`}
              width="auto"
              height={36}
              onClick={onForm.toggleActive}
              iconClassName="text-[20px]"
              className={cx(
                "gap-2 text-[13px] px-3 rounded-xl text-white font-bold",
                "bg-linear-[var(--color-ln-primary)] cursor-pointer",
              )}
            />
          </div>
        </div>
      </div>

      <Modal
        open={onFilter.isActive}
        onClose={() => onFilter.toggleActive(false)}
        backdrop={true}
        style={{ boxShadow: "var(--shadow)" }}
        className="bg-[var(--color-bg-light-primary-300)]"
        footer={
          <Button
            form="staffForm"
            type="submit"
            children="Xác nhận"
            width="100%"
            height={40}
            className="px-4 py-2 font-bold"
            style={{
              background: "var(--color-text-light-primary)",
              color: "var(--color-bg-light-primary-100)",
            }}
          />
        }
      >
        <Filter onClose={() => onFilter.toggleActive(false)} />
      </Modal>
      <Modal open={onForm.isActive} onClose={onClose} backdrop={true} width="max-w-[550px]">
        {formModal}
      </Modal>
    </>
  );
}

export default React.memo(ActionBar);
