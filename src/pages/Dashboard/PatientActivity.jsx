// Libraries - Mock
import classNames from "classnames/bind";
// Styles - UI
import style from "../../styles/pages.module.css";
import { Item } from "../../components/ui";

const cx = classNames.bind(style);

function PatientActivity() {
  return (
    <div className={cx("mt-5 h-[500px] bg-white rounded-[8px] p-6")} style={{ boxShadow: "var(--shadow)" }}>
      <Item as="strong" children="Hoạt động bệnh nhân" itemClassName={cx("text-[20px]")} />
    </div>
  );
}

export default PatientActivity;
