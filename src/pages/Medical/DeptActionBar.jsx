import React from "react";
import classNames from "classnames/bind";
import { Button } from "../../components/ui";
import { LuPlus, LuTrash2, LuSquarePen } from "react-icons/lu";
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function DeptActionBar({
  isMatched = null,
  deptName = "",
  keyword = "",
  children,
  className,
  style = {},
  groupId,
  deptId,
  // Handle Group
  setGrEdit,
  // Handle Department
  onDeptEdit,
  setDeptEdit,
  onDeptDel,
  // Handle Specialty
  onSpecCreate,
  ...props
}) {
  return (
    <div className={className} style={{ ...style }} {...props}>
      {children}
      <div className="flex items-center gap-1">
        <Button
          width={26}
          height={26}
          iconClassName={cx(
            "text-[10px] font-bold ",
            isMatched(deptName, keyword) ? "text-[var(--color-secondary-500)]" : "text-[var(--color-secondary)]",
          )}
          className={cx("bg-[var(--color-secondary)]/10 rounded-lg")}
          icon={<LuSquarePen />}
          onClick={() => {
            setGrEdit(groupId);
            setDeptEdit(deptId);
            onDeptEdit();
          }}
        />
        <Button
          width={26}
          height={26}
          iconClassName={cx(
            "text-[10px] font-bold",
            isMatched(deptName, keyword) ? "text-[var(--color-secondary-500)]" : "text-[var(--color-error)]",
          )}
          className={cx("bg-[var(--color-error)]/10 rounded-lg")}
          icon={<LuTrash2 />}
          onClick={() => {
            setGrEdit(groupId);
            setDeptEdit(deptId);
            onDeptDel();
          }}
        />
        <Button
          width={26}
          height={26}
          iconClassName={cx(
            "text-[10px] font-bold",
            isMatched(deptName, keyword) ? "text-[var(--color-secondary-500)]" : "text-[var(--color-primary)]",
          )}
          className={cx("bg-[var(--color-primary)]/10 rounded-lg")}
          icon={<LuPlus />}
          onClick={() => {
            setGrEdit(groupId);
            setDeptEdit(deptId);
            onSpecCreate();
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(DeptActionBar);
