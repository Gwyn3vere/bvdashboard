// Libraries - Hooks
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogin } from "../../components/hooks";
// Styles - UI - Icons
import style from "../../styles/pages.module.css";
import { Form, Input, Button, Logo, Item, Checkbox } from "../../components/ui";
import { LoginBackground } from ".";
import { IoIosMail, IoIosKey } from "react-icons/io";

const cx = classNames.bind(style);

function LoginForm() {
  const { form, errors, loading, handleChange, handleSubmit } = useLogin();

  return (
    <div className="flex h-screen">
      <div className="w-full xl:w-[600px] p-5">
        <div className="my-5 sm:my-15 flex items-center justify-center">
          <Logo height={100} width={100} />
        </div>
        <div className="flex flex-col items-center">
          <strong className="text-2xl pb-2">Chào mừng trở lại!</strong>
          <p className="text-[11px] text-[var(--color-text-light-secondary)]">Vui lòng đăng nhập để tiếp tục</p>
        </div>
        <Form className="sm:px-20 pt-10" onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            labelClassName="text-sm"
            icon={<IoIosMail />}
            placeholder="example@gmail.com"
            inputClassName="rounded-[8px] mt-1"
          />
          {errors.email && (
            <Item as="span" children={errors.email} width="w-auto" className="text-red-500 text-[14px] mt-1" />
          )}
          <Input
            name="password"
            type="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            labelClassName="text-sm"
            icon={<IoIosKey />}
            placeholder="********"
            inputClassName="rounded-[8px] mt-1"
            className="mt-5"
          />
          {errors.password && (
            <Item as="span" children={errors.password} width="w-auto" className="text-red-500 text-[14px] mt-1" />
          )}
          {errors.login && (
            <Item as="span" children={errors.login} width="w-auto" className="text-red-500 text-[14px] mt-1" />
          )}
          <div className="flex items-center justify-between mt-5">
            <Checkbox text="Nhớ tài khoản" className="text-[14px]" />
            <Item as={Link} to="/" children="Quên mật khẩu?" width="w-auto" className="text-blue-500 text-[14px]" />
          </div>
          <Button
            type="submit"
            disabled={loading}
            children="Đăng nhập"
            height={50}
            width="100%"
            className="bg-blue-500 mt-5 text-white font-bold"
          />
          <Item
            as={Link}
            to="/"
            children="Chính sách bảo mật của bệnh viện"
            width="w-full"
            itemClassName="text-blue-500 text-[14px] flex justify-center mt-5"
          />
        </Form>
      </div>
      <div className="hidden sm:flex flex-1 items-center justify-center bg-[var(--color-bg-light-primary-300)]">
        <LoginBackground />
      </div>
    </div>
  );
}

export default LoginForm;
