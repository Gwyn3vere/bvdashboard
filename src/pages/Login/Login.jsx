// Libraries
import classNames from "classnames/bind";
// Styles - UI - Icons
import style from "../../styles/pages.module.css";
import { Form, Input, Button, Logo } from "../../components/ui";
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosMail, IoIosKey } from "react-icons/io";

const cx = classNames.bind(style);

function Login() {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[600px] p-5">
        <Button
          icon={<FaArrowLeft />}
          width={50}
          height={50}
          style={{ background: "var(--color-bg-light-primary-300)" }}
        />
        <div className="my-15 flex items-center justify-center">
          <Logo height={100} width={100} />
        </div>
        <div className="flex flex-col items-center">
          <strong className="text-2xl pb-2">Chào mừng trở lại!</strong>
          <p className="text-[11px] text-[var(--color-text-light-secondary)]">Vui lòng đăng nhập để tiếp tục</p>
        </div>
        <Form className="px-20 pt-10">
          <Input
            type="email"
            label="Email"
            labelClassName="text-sm"
            icon={<IoIosMail />}
            placeholder="example@gmail.com"
            inputClassName="rounded-[8px] mt-1"
          />
          <Input
            type="password"
            label="Password"
            labelClassName="text-sm"
            icon={<IoIosKey />}
            placeholder="********"
            inputClassName="rounded-[8px] mt-1"
            className="mt-5"
          />

          <Button children="Đăng nhập" height={50} width="100%" className="bg-blue-500 mt-5 text-white font-bold" />
        </Form>
      </div>
      <div className="flex-1 bg-[var(--color-bg-light-primary-300)]"></div>
    </div>
  );
}

export default Login;
