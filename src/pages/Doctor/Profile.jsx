import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { SPECIALTIES_OPTIONS } from "../../constants/option";
import { TitleForm, Item, Button } from "../../components/ui";
import { useDoctorStore } from "../../store/doctorStore";
import { LuUser, LuMapPin, LuStethoscope, LuBriefcase, LuGraduationCap, LuBookOpen } from "react-icons/lu";

const cx = classNames.bind(styles);

function Profile({ onClose, doctorId }) {
  const getDoctorById = useDoctorStore((s) => s.getDoctorById);
  const [activeTabs, setActiveTabs] = useState("overview");

  const handleTabClick = (id) => {
    setActiveTabs(id);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  const doctor = getDoctorById(doctorId);
  if (!doctor) return null;
  return (
    <>
      <TitleForm
        onClose={onClose}
        title={"Hồ sơ bác sĩ"}
        subTitle={
          <span>
            Hồ sơ thông tin bác sĩ <span className="font-semibold text-[var(--color-primary)]">{doctor.name}</span>
          </span>
        }
      />

      <Avatar avatar={doctor.avatar} doctor={doctor} />
      <Tabs active={activeTabs} setActive={handleTabClick} />
      <Infomation doctor={doctor} />
    </>
  );
}

export default React.memo(Profile);

function Avatar({ avatar, doctor }) {
  const specialtyConfig = SPECIALTIES_OPTIONS.find((item) => item.value === doctor.specialty);
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start mb-6 gap-4 p-6">
      <div className="relative">
        {avatar ? (
          <img src={avatar} alt="Preview" className="h-[120px] w-[120px] rounded-full object-cover" />
        ) : (
          <>
            <div
              className={cx(
                "flex items-center justify-center cursor-pointer",
                "h-[120px] w-[120px] rounded-full bg-[var(--color-primary-300)]",
                "border-5 border-[var(--color-bg-light-primary-100)]"
              )}
              style={{ boxShadow: "var(--shadow)" }}
            >
              <LuUser className="text-white text-4xl" />
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col items-center md:items-start gap-2">
        <Item
          as="div"
          children={specialtyConfig ? specialtyConfig.name : doctor.specialty}
          className={cx(
            "font-semibold uppercase text-sm text-[var(--color-primary)]",
            "px-2 py-1 bg-[var(--color-primary-100)] rounded-[8px] inline-block"
          )}
        />
        <Item as="strong" children={doctor?.name} className={cx("text-2xl")} />
        <Item as="span" children={doctor?.title} className={cx("text-md font-medium")} />
        <Item as="span" icon={<LuMapPin />} children={doctor?.facility} className={cx("flex gap-2 text-sm")} />
        <div className="flex flex-wrap gap-2 mt-1">
          {Array.isArray(doctor?.tags) &&
            doctor?.tags.map((tag) => (
              <span
                key={tag}
                className={cx(
                  "px-2 py-1 text-xs rounded-full",
                  "bg-[var(--color-unavailable-100)] text-black font-medium"
                )}
              >
                {tag}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

function Tabs({ active, setActive }) {
  const sections = [
    { id: "overview", label: "Tổng quan" },
    { id: "expertise", label: "Chuyên môn" },
    { id: "experience", label: "Kinh nghiệm" },
    { id: "education", label: "Đào tạo" },
    { id: "publications", label: "Công trình nghiên cứu" }
  ];
  return (
    <div
      className={cx("sticky top-25 z-50 bg-white", "border-b border-t border-gray-200", "overflow-hidden w-full px-6")}
    >
      <div className={cx("flex gap-6 overflow-x-auto w-full px-2 py-4", TWCSS.scrollbarX)}>
        {sections.map((sect) => (
          <Button
            key={sect.id}
            children={sect.label}
            onClick={() => setActive(sect.id)}
            width={"auto"}
            className={cx(
              "text-sm font-semibold whitespace-nowrap",
              active === sect.id ? "text-[var(--color-primary)]" : "text-[var(--color-unavailable-700)]"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function CardInfo({ icon: Icon, title, children, id }) {
  return (
    <div id={id} className={cx("flex flex-col gap-6 scroll-mt-[180px]")}>
      <Item
        as="strong"
        icon={<Icon />}
        children={title}
        iconClassName={cx(
          "flex items-center justify-center text-2xl",
          "inline-block bg-[var(--color-primary-100)] rounded-full",
          "p-2 text-[var(--color-primary)] font-medium"
        )}
        itemClassName={cx("text-[18px]")}
        className={cx("flex items-center gap-4")}
      />
      {children}
    </div>
  );
}

function Infomation({ doctor }) {
  return (
    <div className="p-6 flex flex-col gap-20">
      <CardInfo icon={LuUser} title={"Tổng quan"} id={"overview"}>
        <Item as="div" children={doctor?.bio} itemClassName={cx("text-[15px]")} />
        <div className="md:grid grid-cols-2">
          <div className="flex gap-2 mb-2">
            <Item as="strong" children={"Ngôn ngữ:"} itemClassName={"text-sm"} />
            <Item as="span" children={doctor?.languages?.join(", ")} itemClassName={"text-sm"} />
          </div>
          <div className="flex gap-2 mb-2">
            <Item as="strong" children={"Kinh nghiệm:"} itemClassName={"text-sm"} />
            <Item as="span" children={`${doctor?.experienceYears} năm`} itemClassName={"text-sm"} />
          </div>
        </div>
      </CardInfo>
      <CardInfo icon={LuStethoscope} title={"Thế mạnh chuyên môn"} id={"expertise"}>
        <div className="md:grid grid-cols-2 gap-2">
          {doctor?.expertise.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-[var(--color-primary)]" />
              <Item as="div" children={item} itemClassName={cx("text-[15px]")} className={"w-full"} />
            </div>
          ))}
        </div>
      </CardInfo>
      <CardInfo icon={LuBriefcase} title={"Quá trình công tác"} id={"experience"}>
        <ul className="space-y-4">
          {doctor?.experience.map((item, idx) => (
            <li key={idx} className="flex gap-4 relative">
              <div
                className={cx(
                  "flex-shrink-0 w-3 h-3 rounded-full mt-1.5 z-10",
                  "bg-[var(--color-primary)]/20 border-2 border-[var(--color-primary)]"
                )}
              />
              {doctor.experience && idx !== doctor.experience.length - 1 && (
                <div className="absolute top-4 left-[5px] w-0.5 h-full bg-slate-100 -z-0" />
              )}
              <Item as="span" children={item} itemClassName={cx("text-[15px]")} className={"w-full"} />
            </li>
          ))}
        </ul>
      </CardInfo>
      <CardInfo icon={LuGraduationCap} title={"Quá trình đào tạo"} id={"education"}>
        <div className="flex flex-col gap-2">
          {doctor?.education.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-[var(--color-primary)]" />
              <Item as="div" children={item} itemClassName={cx("text-[15px]")} className={"w-full"} />
            </div>
          ))}
        </div>
      </CardInfo>
      <CardInfo icon={LuBookOpen} title={"Bài viết & Công trình nghiên cứu"} id={"publications"}>
        <div className="flex flex-col gap-2">
          {doctor?.publications.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-[var(--color-primary)]" />
              <Item as="div" children={item} itemClassName={cx("text-[15px]")} className={"w-full"} />
            </div>
          ))}
        </div>
      </CardInfo>
    </div>
  );
}
