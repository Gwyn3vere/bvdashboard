// Libraries - Mock
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { mockPatients } from "../../mock/manage";
import { PATIENT_STATUS } from "../../constants/status";
// Styles - UI - Utils
import style from "../../styles/pages.module.css";
import { Item } from "../../components/ui";
import { formatDateVN } from "../../utils/format";

const cx = classNames.bind(style);

function PatientActivity() {
  return (
    <div
      className={cx("mt-5 bg-white rounded-[8px] p-6", "flex flex-col justify-between w-full h-[640px] min-h-0")}
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <Item as="strong" children="Hoạt động bệnh nhân" itemClassName={cx("text-[20px]")} />
        <Item
          as={Link}
          to="/quan-ly-benh-nhan"
          children="Xem chi tiết"
          itemClassName={cx("text-[14px] text-[var(--color-primary)] font-bold")}
        />
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="hidden-scrollbar h-full overflow-auto">
          {mockPatients.map((patient) => {
            const statusConfig = PATIENT_STATUS[patient.treatmentStatus];
            if (!statusConfig) return patient.treatmentStatus;
            return (
              <div key={patient.id} className="py-2">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <Item as="strong" children={`${patient.firstName} ${patient.lastName}`} />
                    <Item
                      as="span"
                      children={`Ngày sinh: ${formatDateVN(patient.birthday)}`}
                      itemClassName={cx("text-sm")}
                    />
                    <Item as="span" children={`Giới tính: ${patient.gender}`} itemClassName={cx("text-sm")} />
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Item as="span" children="Bệnh" itemClassName={cx("text-[var(--color-text-light-secondary)]")} />
                    <Item
                      as="span"
                      children={patient.disease}
                      itemClassName={cx("text-sm text-[var(--color-primary)] font-bold")}
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-end">
                    <Item
                      as="span"
                      children="Trạng thái"
                      itemClassName={cx("text-[var(--color-text-light-secondary)]")}
                    />
                    <Item
                      as="span"
                      children={`${statusConfig.label}`}
                      itemClassName={cx("text-sm font-bold")}
                      style={{ color: statusConfig.color }}
                    />
                    <Item
                      as="span"
                      children={formatDateVN(patient.dateAdded)}
                      itemClassName={cx("text-sm text-[var(--color-text-light-secondary)]")}
                    />
                  </div>
                </div>
                <hr className="border-gray-200 my-2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PatientActivity;
