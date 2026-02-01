import React from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { Button } from "../../components/ui";
import { LuPlus, LuSquarePen, LuTrash2 } from "react-icons/lu";

const cx = classNames.bind(styles);

function EntityActionBar({ children, onDeptCreate, onGrEdit, onGrDel, setEdit, groupId, className }) {
  return (
    <div className={className}>
      {children}
      <div className="flex items-center">
        <Button
          width={40}
          height={40}
          iconClassName="text-sm font-bold"
          icon={<LuSquarePen />}
          onClick={() => {
            setEdit(groupId);
            onGrEdit();
          }}
        />
        <Button
          width={40}
          height={40}
          iconClassName="text-sm font-bold"
          icon={<LuTrash2 />}
          onClick={() => {
            setEdit(groupId);
            onGrDel();
          }}
        />
        <Button
          width={40}
          height={40}
          iconClassName="text-sm font-bold"
          icon={<LuPlus />}
          onClick={() => {
            setEdit(groupId);
            onDeptCreate();
          }}
        />
      </div>
    </div>
  );
}

export default React.memo(EntityActionBar);
