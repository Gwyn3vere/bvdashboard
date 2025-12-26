// Libraries - Mock
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { mockDoctors, mockDoctorAppointmentStats, mockDoctorExperienceStats } from "../../mock/manage";
// Styles - UI - Motions
import style from "../../styles/pages.module.css";
import { Item, Avatar, Button } from "../../components/ui";
import { LuPhone, LuMail, LuFacebook } from "react-icons/lu";
import { HiMiniChevronRight, HiMiniChevronLeft } from "react-icons/hi2";
import { SliderMotion } from "../../motions";

const cx = classNames.bind(style);

function DoctorStatistics() {
  const doctorListData = mockDoctors.map((doctor) => ({
    ...doctor,
    experience: mockDoctorExperienceStats[doctor.id]?.yearsOfExperience ?? 0,
    appointments: mockDoctorAppointmentStats[doctor.id]?.appointments ?? 0
  }));
  const topDoctors = doctorListData.sort((a, b) => b.appointments - a.appointments).slice(0, 10);

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState("next");
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768) {
        setItemsPerPage(5);
      } else if (width >= 640) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(1);
      }
    };

    handleResize(); // Check ngay khi mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset về trang đầu khi itemsPerPage thay đổi
  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  const totalPages = Math.ceil(topDoctors.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDoctors = topDoctors.slice(startIndex, endIndex);

  const next = () => {
    setDirection("next");
    setCurrentPage((p) => Math.min(p + 1, totalPages - 1));
  };

  const prev = () => {
    setDirection("prev");
    setCurrentPage((p) => Math.max(p - 1, 0));
  };

  return (
    <div className={cx("relative mt-5 h-auto bg-white rounded-[8px] p-6")} style={{ boxShadow: "var(--shadow)" }}>
      <div className="flex items-center justify-between mb-6">
        <Item as="strong" children="Bác sĩ nổi bật" itemClassName={cx("text-[20px]")} />
        <Item
          as={Link}
          to="/quan-ly-bac-si"
          children="Xem chi tiết"
          itemClassName={cx("text-[14px] text-[var(--color-primary)] font-bold")}
        />
      </div>
      <SliderMotion page={currentPage} direction={direction}>
        <Doctors data={currentDoctors} />
      </SliderMotion>
      <div className={cx("absolute top-1/2 left-1/2 -translate-x-1/2 w-full", "px-2 flex justify-between mt-2")}>
        <Button
          icon={<HiMiniChevronLeft />}
          width={40}
          onClick={prev}
          className={cx(
            "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
            " hover:bg-[var(--color-primary)] hover:text-[var(--color-bg-light-primary-100)]"
          )}
        />
        <Button
          icon={<HiMiniChevronRight />}
          width={40}
          onClick={next}
          className={cx(
            "rounded-[8px] transition bg-[var(--color-bg-light-primary-300)]",
            " hover:bg-[var(--color-primary)] hover:text-[var(--color-bg-light-primary-100)]"
          )}
        />
      </div>
    </div>
  );
}

export default DoctorStatistics;

function Doctors({ data }) {
  return (
    <div className="grid sm:grid-cols-3 md:grid-cols-5 items-center justify-center md:justify-between gap-4">
      {data.map((doctor) => (
        <div className="flex flex-col items-center gap-1" key={doctor.id}>
          <Avatar src={doctor.avatarUrl} width={130} height={130} className="rounded-[8px]" />
          <Item as="strong" children={doctor.firstName + " " + doctor.lastName} itemClassName="text-[16px]" />
          <Item
            as="span"
            children={doctor.department}
            itemClassName="text-[16px] text-[var(--color-primary)] font-medium"
          />
          <Item
            as="span"
            children={`${doctor.experience} năm kinh nghiệm`}
            itemClassName="text-[14px] text-[var(--color-text-light-secondary)]"
          />
          <div className="flex items-center gap-2">
            <Item
              as={Link}
              to={`tel:+84${doctor.phone}`}
              icon={<LuPhone />}
              iconClassName={cx(
                "p-4 bg-[var(--color-bg-light-primary-300)] transition-all",
                "rounded-full text-[var(--color-primary)]",
                "hover:bg-[var(--color-primary)] hover:text-white"
              )}
            />
            <Item
              as={Link}
              to={`mailto:${doctor.email}`}
              icon={<LuMail />}
              iconClassName={cx(
                "p-4 bg-[var(--color-bg-light-primary-300)] transition-all",
                "rounded-full text-[var(--color-primary)]",
                "hover:bg-[var(--color-primary)] hover:text-white"
              )}
            />
            <Item
              as={Link}
              icon={<LuFacebook />}
              iconClassName={cx(
                "p-4 bg-[var(--color-bg-light-primary-300)] transition-all",
                "rounded-full text-[var(--color-primary)]",
                "hover:bg-[var(--color-primary)] hover:text-white"
              )}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
