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
      <Item icon={<TiUserAdd />} children="Thêm bác sĩ" className="flex items-center gap-2 text-3xl font-bold" />
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
        children="Điền đầy đủ thông tin bác sĩ vào danh sách của bạn."
        className="mb-5 mt-2"
        itemClassName="text-[14px] text-gray-500"
      />
      <Form id="staffForm" className="flex flex-col gap-2">
        
      </Form>
    </div>
  );
}

export default Create;
