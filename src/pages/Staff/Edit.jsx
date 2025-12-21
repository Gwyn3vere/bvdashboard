// Libraries - Mock - Hooks - Store - Constants
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { STAFF_ROLE_OPTIONS, STAFF_STATUS_OPTIONS } from "../../constants/option";
import { INITIAL_STAFF } from "../../constants/field";
import { useActive, useForm } from "../../components/hooks";
import { useStaffStore } from "../../store/staffStore";
// Styles - UI
import styles from "../../styles/pages.module.css";
import { Item, Form, Input, Button, Select } from "../../components/ui";
import { LuX, LuCamera } from "react-icons/lu";

const cx = classNames.bind(styles);

function Edit({ onClose }) {
  const editingStaffId = useStaffStore((s) => s.editingStaffId);
  const getStaffById = useStaffStore((s) => s.getStaffById);
  const staff = getStaffById(editingStaffId);

  const normalizeStaffForForm = (staff) => ({
    ...staff,
    status: String(staff.status ?? ""),
    role: String(staff.role ?? "")
  });

  const { values, setFieldValue } = useForm({
    initialValues: INITIAL_STAFF,
    editValues: staff,
    transformEditValues: normalizeStaffForForm
  });

  return (
    <div className="relative">
      <Item children="Cập nhật thông tin nhân sự" className="flex items-center gap-2 text-2xl font-bold" />
      <Button
        icon={<LuX />}
        width={40}
        height={40}
        className={cx("absolute top-0 right-0", "hover:bg-[var(--color-error)] hover:text-white")}
        iconClassName="text-[20px]"
        onClick={onClose}
      />
      <Item
        as="div"
        children="Điền đầy đủ thông tin nhân sự vào danh sách của bạn."
        className="mb-5 mt-1"
        itemClassName="text-[14px] text-gray-500"
      />
      <Form id="staffForm" className="flex flex-col gap-2">
        <AddAvatar data={values} setData={setFieldValue} />
        <StaffAccount data={values} setData={setFieldValue} />
        <hr className="mt-5 text-gray-300" />
        <StaffInfo data={values} setData={setFieldValue} />
      </Form>
    </div>
  );
}

export default Edit;

export function AddAvatar({ data, setData }) {
  return (
    <div>
      <div className="flex gap-5">
        <div className="relative w-auto h-full">
          <img src={data?.avatarUrl} alt="avatar" className="w-[100px] h-[100px] rounded-full" />
          <Item
            as="div"
            icon={<LuCamera />}
            className="flex items-center justify-center w-[30px] h-[30px] absolute bottom-0 right-0 bg-gray-200 rounded-full"
            iconClassName="text-[14px]"
          />
        </div>
        <div className="flex flex-col justify-between">
          <Item as="strong" children="Upload ảnh đại diện" itemClassName="text-[20px]" />
          <Item
            as="span"
            children="Ảnh không được vượt quá 4MB"
            itemClassName="text-[12px] text-[var(--color-text-light-secondary)]"
          />
          <div className="flex gap-2">
            <Button type="button" children="Chọn ảnh" className="bg-black border-2 border-gray-700 text-white" />
            <Button type="button" children="Xoá ảnh" className="border-2 border-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StaffAccount({ data, setData }) {
  return (
    <div className="mt-5">
      <div className={cx("mb-2 rounded-[8px]", "bg-[var(--color-primary)] p-1.5")}>
        <Item as="span" children="Thông tin tài khoản" itemClassName="text-[14px] text-white font-bold" />
      </div>
      <div className="flex justify-between gap-2">
        <Input
          label="Email *"
          name="email"
          type="email"
          value={data?.email}
          onChange={(e) => setData("email", e.target.value)}
          height={40}
          placeholder=""
          className="w-full"
          labelClassName="text-sm text-[var(--color-text-light-secondary)]"
          inputClassName="rounded-[8px] mt-1"
          required
        />
        <Input
          label="Mật khẩu *"
          name="password"
          type="password"
          value={data?.password}
          onChange={(e) => setData("password", e.target.value)}
          height={40}
          placeholder=""
          className="w-full"
          labelClassName="text-sm text-[var(--color-text-light-secondary)]"
          inputClassName="rounded-[8px] mt-1"
          required
        />
      </div>
      <div className="mt-2 flex justify-between gap-2">
        <Input
          label="Họ và tên đệm *"
          name="firstname"
          type="text"
          value={data?.firstname}
          onChange={(e) => setData("firstname", e.target.value)}
          height={40}
          placeholder=""
          className="w-full"
          labelClassName="text-sm text-[var(--color-text-light-secondary)]"
          inputClassName="rounded-[8px] mt-1"
          required
        />
        <Input
          label="Tên *"
          name="lastname"
          type="text"
          value={data?.lastname}
          onChange={(e) => setData("lastname", e.target.value)}
          height={40}
          placeholder=""
          className="w-full"
          labelClassName="text-sm text-[var(--color-text-light-secondary)]"
          inputClassName="rounded-[8px] mt-1"
          required
        />
      </div>
    </div>
  );
}

export function StaffInfo({ data, setData }) {
  const select = {
    status: useActive(),
    role: useActive()
  };
  return (
    <div className="mt-5">
      <div className={cx("mb-2 rounded-[8px]", "bg-[var(--color-primary)] p-1.5")}>
        <Item as="span" children="Thông tin bổ sung" itemClassName="text-[14px] text-white font-bold" />
      </div>
      <div className="flex justify-between gap-2 mb-2">
        <Input
          label="Số điện thoại"
          name="phone"
          type="tel"
          value={data?.phone}
          onChange={(e) => setData("phone", e.target.value)}
          height={40}
          placeholder=""
          className="w-full"
          labelClassName="text-sm text-[var(--color-text-light-secondary)]"
          inputClassName="rounded-[8px] mt-1"
        />
        <Input
          label="Chức vụ"
          name="position"
          type="text"
          value={data?.position}
          onChange={(e) => setData("position", e.target.value)}
          height={40}
          placeholder=""
          className="w-full"
          labelClassName="text-sm text-[var(--color-text-light-secondary)]"
          inputClassName="rounded-[8px] mt-1"
        />
        <Select
          label="Trạng thái"
          name="status"
          height={40}
          className="w-full"
          labelClassName="text-sm text-[var(--color-text-light-secondary)]"
          inputClassName="rounded-[8px] mt-1"
          data={STAFF_STATUS_OPTIONS}
          value={data?.status}
          onChange={(val) => setData("status", val)}
          active={select.status}
          required
        />
      </div>
      <Select
        label="Vai trò"
        name="role"
        height={40}
        className="w-full"
        labelClassName="text-sm text-[var(--color-text-light-secondary)]"
        inputClassName="rounded-[8px] mt-1"
        data={STAFF_ROLE_OPTIONS}
        value={data?.role}
        onChange={(val) => setData("role", val)}
        active={select.role}
        required
      />
    </div>
  );
}
