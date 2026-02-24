import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Search, Tooltip, Button, Modal, Filter } from "../../components/ui";
import { LuSlidersHorizontal, LuUserRoundPlus } from "react-icons/lu";

import { StaffForm } from "../Staff";

const cx = classNames.bind(styles);

function ActionBar({ modal, keyword, onChange, onClose, featured }) {
  return (
    <>
      <div
        className={cx("p-3 md:p-6 border-b border-[var(--color-primary-100)]")}
      >
        <div className="grid grid-cols-1fr xl:grid-cols-[auto_1fr] items-center gap-3">
          <div
            className={cx(
              "bg-[var(--color-unavailable-100)] rounded-xl",
              "flex items-center gap-2 px-4 h-[45px]",
            )}
          >
            {featured.map((item, idx) => (
              <Button
                width={"auto"}
                height={"auto"}
                key={idx}
                icon={
                  <div
                    className={cx(
                      "w-2 h-2 rounded-full",
                      item.value === "ALL" &&
                        "bg-linear-[var(--color-primary)]",
                      item.value === true && "bg-[var(--color-secondary)]",
                      item.value === false && "bg-[var(--color-error)]",
                      item.value === "ADMIN" && "bg-[var(--color-primary)]",
                    )}
                  />
                }
                children={item.name}
                className={cx(
                  "flex items-center gap-1 rounded-xl px-3 py-2 text-[12.5px]",
                  item.color,
                  "font-bold text-[var(--color-unavailable-700)] text-nowrap",
                )}
              />
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="flex flex-col md:flex-row gap-1">
              <Search
                value={keyword}
                onChange={onChange}
                width={"auto"}
                height={36}
                className={cx("rounded-xl w-[230px]")}
                placeholder="Tìm tên, email, chức vụ,..."
              />
              <Tooltip content="Bộ lọc" position="top">
                <Button
                  width={36}
                  height={36}
                  icon={<LuSlidersHorizontal />}
                  className={cx(
                    "font-medium",
                    "hover:bg-[var(--color-primary-100)]",
                  )}
                />
              </Tooltip>
            </div>

            {/* Create */}
            <Button
              icon={<LuUserRoundPlus />}
              children="Thêm nhân sự"
              width="auto"
              height={36}
              onClick={modal.staffForm.toggleActive}
              iconClassName="text-[20px]"
              className={cx(
                "gap-2 text-[13px] px-3 rounded-xl text-white font-bold",
                "bg-linear-[var(--color-ln-primary)] cursor-pointer ",
              )}
            />
          </div>
        </div>
      </div>

      <Modal
        open={modal.filter.isActive}
        onClose={() => modal.filter.toggleActive(false)}
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
        <Filter onClose={() => modal.filter.toggleActive(false)} />
      </Modal>
      <Modal
        open={modal.staffForm.isActive}
        onClose={onClose}
        backdrop={true}
        width="max-w-xl"
      >
        <StaffForm onClose={onClose} />
      </Modal>
    </>
  );
}

export default React.memo(ActionBar);
