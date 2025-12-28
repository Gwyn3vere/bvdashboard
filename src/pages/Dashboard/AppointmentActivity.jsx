// Libraries - Mock - Contants - Hooks
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useUpcoming } from "../../components/hooks";
import { APPOINTMENT_STATUS } from "../../constants/status";
import { mockAppointments, mockDoctors, mockPatients } from "../../mock/manage";
// Styles - UI - Utils
import style from "../../styles/pages.module.css";
import { Avatar, Item } from "../../components/ui";
import { formatDateVN } from "../../utils/format";

const cx = classNames.bind(style);

function AppointmentActivity() {
  const { upcomingAppointments } = useUpcoming({
    appointments: mockAppointments,
    doctors: mockDoctors,
    patients: mockPatients
  });

  return (
    <div
      className={cx("mt-5  bg-white rounded-[8px] p-6", "flex flex-col justify-between w-full h-[400px] min-h-0")}
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div className="flex items-center justify-between">
        <Item as="strong" children="Hoạt động lịch khám" itemClassName={cx("text-[20px]")} />
        <Item
          as={Link}
          to="/quan-ly-benh-nhan"
          children="Xem chi tiết"
          itemClassName={cx("text-[14px] text-[var(--color-primary)] font-bold")}
        />
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <div className="hidden-scrollbar h-full overflow-auto">
          {upcomingAppointments.map((appt) => {
            const statusInfo = APPOINTMENT_STATUS[appt.status];
            if (!statusInfo) return null;
            return (
              <div
                key={appt.id}
                className={cx("h-[80px] w-full flex items-center justify-between", "border-b border-gray-200")}
              >
                <div className="flex items-center gap-2 w-[230px]">
                  <Avatar src={appt.avatarDoctor} width={50} height={50} className="hidden sm:block rounded-full" />
                  <div>
                    <Item
                      as="strong"
                      children={`Bs. ${appt.doctorName}`}
                      itemClassName={cx("text-[16px]")}
                      whitespace=""
                    />
                    <Item
                      as="span"
                      children={`${appt.timeStart} - ${appt.timeEnd}`}
                      itemClassName={cx("text-[12px] text-[var(--color-primary)]")}
                    />
                  </div>
                </div>
                <Item
                  as="span"
                  children={
                    appt.isToday ? (
                      <Item
                        as="span"
                        children="Hôm nay"
                        itemClassName={cx(
                          "text-[12px] bg-[var(--color-primary)]",
                          "py-1 px-2 rounded-[8px] text-white font-bold"
                        )}
                      />
                    ) : (
                      formatDateVN(appt.date)
                    )
                  }
                  className="w-[70px] flex justify-center"
                  itemClassName={cx("text-[12px]")}
                />
                <div className="flex flex-col items-end w-[170px]">
                  <Item
                    as="strong"
                    children={appt.patientName}
                    itemClassName={cx("text-[16px] text-end")}
                    whitespace=""
                  />
                  <Item
                    as="span"
                    children={statusInfo.label}
                    itemClassName={cx("text-[12px] uppercase font-bold")}
                    style={{ color: statusInfo.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default AppointmentActivity;
