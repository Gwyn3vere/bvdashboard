import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Button } from "../../components/ui";
import { LuPlus, LuSquarePen, LuTrash2 } from "react-icons/lu";

const cx = classNames.bind(styles);

function EntityActionBar({
  children,
  onDeptCreate,
  onGrEdit,
  onGrDel,
  setEdit,
  setDeptEdit,
  groupId,
  className,
  ...props
}) {
  return (
    <div className={className} {...props}>
      {children}
      <div className="flex items-center gap-1">
        <Button
          width={26}
          height={26}
          icon={<LuSquarePen />}
          onClick={() => {
            setEdit(groupId);
            onGrEdit();
          }}
          iconClassName="text-[10px] font-bold"
          className={cx("bg-white/20 rounded-lg border border-white/40")}
        />
        <Button
          width={26}
          height={26}
          icon={<LuTrash2 />}
          onClick={() => {
            setEdit(groupId);
            onGrDel();
          }}
          iconClassName="text-[10px] font-bold"
          className={cx("bg-white/20 rounded-lg border border-white/40")}
        />
        <Button
          width={26}
          height={26}
          icon={<LuPlus />}
          onClick={() => {
            setEdit(groupId);
            setDeptEdit(null);
            onDeptCreate();
          }}
          iconClassName="text-[10px] font-bold"
          className={cx("bg-white/20 rounded-lg border border-white/40")}
        />
      </div>
    </div>
  );
}

export default React.memo(EntityActionBar);
