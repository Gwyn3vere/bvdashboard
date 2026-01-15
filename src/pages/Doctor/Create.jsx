// Libraries - Mock - Hooks - Constants
import classNames from "classnames/bind";
import React, { useState } from "react";
import { STAFF_ROLE_OPTIONS, STAFF_STATUS_OPTIONS } from "../../constants/option";
import { useActive, useForm, usePagination } from "../../components/hooks";
import { INITIAL_DOCTOR } from "../../constants/field";
// Styles - UI
import styles from "../../styles/pages.module.css";
import { Item, Form, Input, Button, Select } from "../../components/ui";
import { LuX, LuCamera } from "react-icons/lu";

const cx = classNames.bind(styles);

const component = [
  {
    id: 1,
    component: <MainForm />
  },
  {
    id: 2,
    component: <InfoForm />
  }
];

function Create({ onClose }) {
  const { currentPage, totalPages, pagedData, pages, setCurrentPage, nextPage, prevPage } = usePagination(component, 1);
  const { values, setFieldValue } = useForm({
    initialValues: INITIAL_DOCTOR
  });

  return (
    <div className="relative">
      <TitleForm onClose={onClose} />

      {/* Content */}
      <Form id="doctorForm" className="flex flex-col gap-2 p-6">
        {pagedData !== 0 ? (
          pagedData.map((item) => <div key={item.id}>{item.component}</div>)
        ) : (
          <div>Không có dữ liệu</div>
        )}
      </Form>

      {/* Footer */}
      <div className="flex justify-between gap-2 p-6 border-t border-gray-200">
        <Button
          type="button"
          children={"Quay lại"}
          onClick={prevPage}
          disabled={currentPage === 1}
          width="100%"
          className={cx("bg-[var(--color-unavailable-100)] text-gray-700 font-semibold")}
        />
        <Button
          type={currentPage < totalPages ? "button" : "submit"}
          form={currentPage < totalPages ? "" : "doctorForm"}
          children={currentPage < totalPages ? "Tiếp theo" : "Xác nhận"}
          onClick={(e) => {
            if (currentPage < totalPages) {
              e.preventDefault();
              nextPage();
            }
          }}
          width="100%"
          className="bg-[var(--color-primary)] text-white font-semibold"
        />
      </div>
    </div>
  );
}

export default React.memo(Create);

function TitleForm({ onClose }) {
  return (
    <div
      className={cx(
        "sticky top-0 bg-white border-b border-gray-200",
        "p-6 flex items-center justify-between z-10 rounded-t-[8px]"
      )}
    >
      <div>
        <Item as="h3" children="Thêm bác sĩ" className="text-xl font-bold text-gray-900" />
        <Item
          as="div"
          children="Điền đầy đủ thông tin bác sĩ vào danh sách của bạn."
          className="text-sm text-gray-600 mt-1"
        />
      </div>
      <Button
        width={50}
        height={50}
        icon={<LuX />}
        iconClassName="text-2xl"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600"
      />
    </div>
  );
}

function MainForm() {
  return <div>MainForm</div>;
}

function InfoForm() {
  return <div>InfoForm</div>;
}
