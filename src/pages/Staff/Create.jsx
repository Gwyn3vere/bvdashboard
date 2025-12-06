// Libraries - Mock -Hooks
import classNames from "classnames/bind";
// Styles - UI
import styles from "../../styles/pages.module.css";
import { TiUserAdd, TiUser, TiStar, TiTimes } from "react-icons/ti";
import { Item, Form, Input, Button } from "../../components/ui";
import { IoIosMail, IoIosKey } from "react-icons/io";

const cx = classNames.bind(styles);

function Create({ onClose }) {
  return (
    <div className="relative">
      <div className="flex gap-2 items-center text-3xl font-bold">
        <TiUserAdd />
        <span>Thêm nhân sự</span>
      </div>
      <Button
        icon={<TiTimes />}
        width={40}
        height={40}
        className="absolute top-0 right-0 bg-white"
        style={{ boxShadow: "var(--shadow)" }}
        onClick={onClose}
      />
      <Item
        as="div"
        children="Điền đầy đủ thông tin nhân sự vào danh sách của bạn."
        width="auto"
        className="mb-5 mt-2"
        itemClassName="text-[14px] text-gray-500"
      />
      <Form id="staffForm" className="flex flex-col gap-2">
        {/* Main info */}
        <div className="flex justify-center bg-white p-5 rounded-[8px]" style={{ boxShadow: "var(--shadow)" }}>
          <div className="w-[150px] h-[150px] bg-gray-300 rounded-full flex items-center justify-center text-white">
            <TiUser size={100} />
          </div>
        </div>
        <div className="bg-white p-5 rounded-[8px]" style={{ boxShadow: "var(--shadow)" }}>
          <Item as="div" children="Thông tin nhân sự" width="auto" className="mb-5" itemClassName="font-bold" />
          <Input
            name="email"
            type="email"
            label="Email *"
            labelClassName="text-sm"
            icon={<IoIosMail />}
            placeholder="example@gmail.com"
            height={40}
            inputClassName="rounded-[8px] mt-1"
          />
          <div className="flex gap-2 justify-between">
            <Input
              name="firstname"
              type="text"
              label="Họ và tên đệm *"
              labelClassName="text-sm"
              icon={<TiUser />}
              placeholder=""
              height={40}
              className="w-full"
              inputClassName="rounded-[8px] mt-1"
            />
            <Input
              name="lastname"
              type="text"
              label="Tên *"
              labelClassName="text-sm"
              icon={<TiUser />}
              placeholder=""
              height={40}
              className="w-full"
              inputClassName="rounded-[8px] mt-1"
            />
          </div>
          <Input
            name="password"
            type="password"
            label="Password *"
            labelClassName="text-sm"
            icon={<IoIosKey />}
            placeholder="********"
            height={40}
            inputClassName="rounded-[8px] mt-1"
          />
        </div>
        <div className="bg-white p-5 rounded-[8px]" style={{ boxShadow: "var(--shadow)" }}>
          {/* Phần này UI mẫu, chưa build UI Component Quyền Hạn */}
          <Item as="div" children="Quyền hạn nhân sự" width="auto" className="mb-5" itemClassName="font-bold" />
          <Input
            name="text"
            type="text"
            label="Quyền hạn *"
            labelClassName="text-sm"
            icon={<TiStar />}
            placeholder=""
            height={40}
            inputClassName="rounded-[8px] mt-1"
          />
          <Item
            as="div"
            children="Các quyền được gán sẽ quyết định phạm vi thao tác của nhân sự trong hệ thống. Vui lòng kiểm tra kỹ trước khi xác nhận thay đổi."
            whitespace=""
            width="auto"
            className="mt-5"
            itemClassName="text-[14px]"
          />
        </div>
      </Form>
    </div>
  );
}

export default Create;
