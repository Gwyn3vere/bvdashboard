import { LuHeartPulse, LuStethoscope, LuCalendarHeart, LuHandHeart } from "react-icons/lu";

export const mockOverviewStats = [
  {
    id: 1,
    title: "Tổng bác sĩ",
    value: 241,
    icon: <LuStethoscope />,
    color: "linear-gradient(90deg, #ff9ab3ff 0%, #f7416fff 100%)"
  },
  {
    id: 2,
    title: "Tổng Bệnh nhân",
    value: 5234,
    icon: <LuHeartPulse />,
    color: "linear-gradient(90deg, #7dd69bff 0%, #19c953ff 100%)"
  },
  {
    id: 3,
    title: "Tổng lịch hẹn",
    value: 3601,
    icon: <LuCalendarHeart />,
    color: "linear-gradient(90deg, #61ADFF 0%, #268FFF 100%)"
  },
  {
    id: 4,
    title: "Ca khám hoàn thành",
    value: 4126,
    icon: <LuHandHeart />,
    color: "linear-gradient(90deg, #b161f7ff 0%, #8100F2 100%)"
  }
];

export const yearlyAppointmentStats = [
  {
    month: "Jan",
    attended: 240, // user đến khám
    noShow: 480 // user đăng ký nhưng không đến
  },
  {
    month: "Feb",
    attended: 360,
    noShow: 220
  },
  {
    month: "Mar",
    attended: 190,
    noShow: 590
  },
  {
    month: "Apr",
    attended: 280,
    noShow: 340
  },
  {
    month: "May",
    attended: 190,
    noShow: 680
  },
  {
    month: "Jun",
    attended: 510,
    noShow: 880
  },
  {
    month: "Jul",
    attended: 370,
    noShow: 730
  },
  {
    month: "Aug",
    attended: 760,
    noShow: 410
  },
  {
    month: "Sep",
    attended: 240,
    noShow: 590
  },
  {
    month: "Oct",
    attended: 510,
    noShow: 280
  },
  {
    month: "Nov",
    attended: 280,
    noShow: 410
  },
  {
    month: "Dec",
    attended: 890,
    noShow: 210
  }
];
