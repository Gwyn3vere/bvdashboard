import React from "react";
import classNames from "classnames/bind";
import { Button } from "../../components/ui";
import { LuPlus, LuTrash2, LuSquarePen } from "react-icons/lu";
import style from "../../styles/ui.module.css";

const cx = classNames.bind(style);

function SpecActionBar({
  children,
  className,
  groupId,
  deptId,
  specId,
  // Handle Group
  setGrEdit,
  // Handle Department
  setDeptEdit,
  // Handle Specialty
  onSpecEdit,
  setSpecEdit,
  onSpecDel,
}) {
  return (
    <div className={className}>
      {children}
      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          width={26}
          height={26}
          iconClassName={cx("text-[10px] font-bold ", "text-[var(--color-secondary)]")}
          className={cx("bg-[var(--color-secondary)]/10 rounded-lg")}
          icon={<LuSquarePen />}
          onClick={() => {
            setGrEdit(groupId);
            setDeptEdit(deptId);
            setSpecEdit(specId);
            onSpecEdit();
          }}
        />
        <Button
          width={26}
          height={26}
          iconClassName={cx("text-[10px] font-bold ", "text-[var(--color-error)]")}
          className={cx("bg-[var(--color-error)]/10 rounded-lg")}
          icon={<LuTrash2 />}
          onClick={() => {
            setGrEdit(groupId);
            setDeptEdit(deptId);
            setSpecEdit(specId);
            onSpecDel();
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(SpecActionBar);
