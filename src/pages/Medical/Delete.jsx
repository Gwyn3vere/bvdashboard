import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TitleForm, Input, Button, Select, Form } from "../../components/ui";
import { useGroupStore } from "../../store/groupStore";

const cx = classNames.bind(styles);

function Delete({ onClose, title }) {
  const editingGroupId = useGroupStore((gr) => gr.editingGroupId);

  return (
    <>
      <TitleForm onClose={onClose} title={"Cảnh báo"} subTitle={title} />

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex gap-3">
        <Button
          type="button"
          children={"Huỷ"}
          onClick={onClose}
          width="100%"
          className={cx(
            "text-gray-700 font-semibold transition-all duration-200",
            "bg-[var(--color-unavailable-100)] hover:bg-[var(--color-unavailable-300)]"
          )}
        />
        <Button
          type={"button"}
          children={"Xác nhận"}
          width="100%"
          className="bg-[var(--color-error)] text-white font-semibold"
        />
      </div>
    </>
  );
}

export default React.memo(Delete);
