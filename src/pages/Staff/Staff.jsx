// Libraries - Mock
import classNames from "classnames/bind";
import { mockStaff } from "../../mock/account";
import { Link } from "react-router-dom";
// Styles - UI
import styles from "../../styles/pages.module.css";
import { List, Breadcrumb, Item, Search } from "../../components/ui";
import { HiMiniSquares2X2, HiOutlinePlus } from "react-icons/hi2";
import { LuListFilter } from "react-icons/lu";

const cx = classNames.bind(styles);

function Staff() {
  return (
    <div className="flex flex-col overflow-hidden w-full h-full">
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <HiMiniSquares2X2 /> },
          { label: "Quản lý nhân sự" }
        ]}
      />
      <Item as="strong" children="Quản lý nhân sự" itemClassName="text-3xl" width="100%" />
      <Item
        as="span"
        children="Quản lý thành viên nhóm của bạn và quyền tài khoản của họ ở đây."
        itemClassName="text-[14px] text-gray-500"
        className="mb-5 mt-1"
        width="100%"
      />
      <div className="flex justify-between items-end mb-5">
        <div className="flex gap-2">
          <Item as="strong" children="Tổng thành viên:" width="auto" />
          <span>20</span>
        </div>
        <div className="flex gap-2">
          <Search className="rounded-[8px]" />
          <Item
            as="div"
            icon={<LuListFilter />}
            children="Bộ lọc"
            width="auto"
            itemClassName="text-[14px]"
            className="border-2 px-3 rounded-[8px] border-[var(--color-bg-light-primary-300)] cursor-pointer"
          />
          <Item
            as={Link}
            icon={<HiOutlinePlus />}
            children="Thêm mới"
            width="auto"
            itemClassName="text-[14px]"
            className="px-3 rounded-[8px] bg-blue-500 cursor-pointer text-white font-bold"
          />
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <List
          columns={[
            { key: "name", label: "Tên" },
            { key: "email", label: "Email" },
            { key: "role", label: "Quyền" }
          ]}
          data={mockStaff}
          // loading={loading}
          emptyText="Không có nhân sự"
          onRowClick={(row) => navigate(`/staff/${row.id}`)}
        />
      </div>
    </div>
  );
}

export default Staff;
