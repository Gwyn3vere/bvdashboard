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
  onSpecDel
}) {
  return (
    <div className={className}>
      {children}
      <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          width={40}
          height={40}
          iconClassName="text-sm font-bold text-[var(--color-secondary)]"
          icon={<LuSquarePen />}
          onClick={() => {
            setGrEdit(groupId);
            setDeptEdit(deptId);
            setSpecEdit(specId);
            onSpecEdit();
          }}
        />
        <Button
          width={40}
          height={40}
          iconClassName="text-sm font-bold text-[var(--color-error)]"
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
