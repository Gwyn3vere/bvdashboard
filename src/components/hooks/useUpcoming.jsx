import { useMemo } from "react";

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

function useUpcoming({ appointments, doctors, patients }) {
  const upcomingAppointments = useMemo(() => {
    const now = new Date();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return appointments
      .map((appointment) => {
        const doctor = doctors.find((d) => d.id === appointment.doctorId);
        const patient = patients.find((p) => p.id === appointment.patientId);

        const dateTime = new Date(`${appointment.date}T${appointment.scheduled}`);

        return {
          ...appointment,
          doctorName: doctor ? `${doctor.firstName} ${doctor.lastName}` : "—",
          patientName: patient ? `${patient.firstName} ${patient.lastName}` : "—",
          patientPhone: patient ? patient.phone : null,
          patientEmail: patient ? patient.email : null,
          patientBirthday: patient ? patient.birthday : null,
          dateTime: new Date(`${appointment.date}T${appointment.scheduled}`),
          avatarDoctor: doctor ? doctor.avatarUrl : null,
          dateTime,
          isToday: isSameDay(dateTime, now)
        };
      })
      .filter((appointment) => appointment.status !== "COMPLETED" && new Date(appointment.date) >= today)
      .sort((a, b) => a.dateTime - b.dateTime);
  }, [appointments, doctors, patients]);

  return { upcomingAppointments };
}

export default useUpcoming;
