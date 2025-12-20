// Libraries - Mock
import classNames from "classnames/bind";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Area } from "recharts";
import { yearlyAppointmentStats } from "../../mock/overview";
// Styles - UI
import style from "../../styles/pages.module.css";
import { Item } from "../../components/ui";

const cx = classNames.bind(style);

export default function AppointmentLineChart() {
  return (
    <div className="p-5 rounded-[8px] bg-[var(--color-bg-light-primary-100)]" style={{ boxShadow: "var(--shadow)" }}>
      <div className="mb-5">
        <Item as="Strong" children="Thống kê lịch hẹn theo năm" />
      </div>
      <div style={{ height: 360 }}>
        <ResponsiveContainer>
          <LineChart data={yearlyAppointmentStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="noShow"
              name="No-show Users"
              stroke="#ff6b6b"
              strokeWidth={2}
              dot={{ r: 4 }}
            />

            <Line
              type="monotone"
              dataKey="attended"
              name="Attended Users"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
