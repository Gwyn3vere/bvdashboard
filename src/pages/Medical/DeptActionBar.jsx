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
  groupId,
  deptId,
  // Handle Group
  setGrEdit,
  // Handle Department
  onDeptEdit,
  setDeptEdit,
  onDeptDel,
  // Handle Specialty
  onSpecCreate
}) {
  return (
    <div className={className}>
      {children}
      <div className="flex items-center">
        <Button
          width={40}
          height={40}
          iconClassName={cx(
            "text-sm font-bold ",
            isMatched(deptName, keyword) ? "text-[var(--color-secondary-500)]" : "text-[var(--color-primary-500)]"
          )}
          icon={<LuSquarePen />}
          onClick={() => {
            setGrEdit(groupId);
            setDeptEdit(deptId);
            onDeptEdit();
          }}
        />
        <Button
          width={40}
          height={40}
          iconClassName={cx(
            "text-sm font-bold",
            isMatched(deptName, keyword) ? "text-[var(--color-secondary-500)]" : "text-[var(--color-primary-500)]"
          )}
          icon={<LuTrash2 />}
          onClick={() => {
            setGrEdit(groupId);
            setDeptEdit(deptId);
            onDeptDel();
          }}
        />
        <Button
          width={40}
          height={40}
          iconClassName={cx(
            "text-sm font-bold",
            isMatched(deptName, keyword) ? "text-[var(--color-secondary-500)]" : "text-[var(--color-primary-500)]"
          )}
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
