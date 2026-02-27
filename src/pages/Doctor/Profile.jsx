import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { SPECIALTIES_OPTIONS, DEPARTMENTS_OPTIONS, POSITION_OPTIONS } from "../../constants/option";
import { Avatar, Item, Button } from "../../components/ui";
import { useDoctorStore } from "../../store/doctorStore";
import {
  LuX,
  LuBookHeart,
  LuHeart,
  LuTags,
  LuLanguages,
  LuBriefcase,
  LuUserPen,
  LuBookText,
  LuMapPin,
  LuStethoscope,
  LuAward,
  LuGraduationCap,
  LuBookOpen,
} from "react-icons/lu";

const cx = classNames.bind(styles);

function Profile({ onClose, onEdit, doctorId, color }) {
  const tabs = ["Thông tin", "Chuyên môn", "Kinh nghiệm"];
  const [tab, setTab] = useState(0);

  const getDoctorById = useDoctorStore((s) => s.getDoctorById);

  const doctor = getDoctorById(doctorId);
  if (!doctor) return null;

  const specialtyConfig = SPECIALTIES_OPTIONS.find((item) => item.value === doctor.specialty);
  if (!specialtyConfig) return doctor.specialty;
  const departmentConfig = DEPARTMENTS_OPTIONS.find((item) => item.value === doctor.department);
  if (!departmentConfig) return doctor.department;
  const positionConfig = POSITION_OPTIONS.find((item) => item.value === doctor?.position);
  // if (!positionConfig) return doctor.position;
  return (
    <>
      <Header
        avatar={doctor.avatar}
        doctor={doctor}
        onClose={onClose}
        tabs={tabs}
        tab={tab}
        setTab={setTab}
        color={color}
        spec={specialtyConfig}
      />

      <div className="px-3 md:px-7 py-6 bg-white">
        {tab === 0 && <Information doctor={doctor} position={positionConfig} />}
        {tab === 1 && <Expertise doctor={doctor} spec={specialtyConfig} dept={departmentConfig} />}
        {tab === 2 && <Experience doctor={doctor} />}
      </div>

      <div className={cx("flex gap-2 bg-white px-3 md:px-7 pb-6")}>
        <Button
          icon={<LuX />}
          children={"Đóng"}
          onClick={onClose}
          width="100%"
          height={38}
          className={cx(
            "bg-[var(--color-unavailable-100)] gap-2",
            "text-[var(--color-unavailable-700)] font-bold text-[13px] rounded-xl",
          )}
        />
        <Button
          icon={<LuUserPen />}
          children={"Chỉnh sửa"}
          onClick={(e) => {
            onEdit();
            onClose();
          }}
          width="100%"
          height={38}
          className={cx("bg-linear-[var(--color-ln-primary)] gap-2", "text-white font-bold text-[13px] rounded-xl")}
        />
      </div>
    </>
  );
}

export default React.memo(Profile);

function Header({ avatar, doctor, onClose, tabs, tab, setTab, color, spec }) {
  const baseColor = color[doctor.title] || "var(--color-unavailable)";
  return (
    <div
      className={cx("relative", "bg-linear-[var(--color-ln-primary)] px-7 pt-7", "flex flex-col justify-center gap-3")}
    >
      <Button
        type="button"
        width={32}
        height={32}
        icon={<LuX />}
        iconClassName="text-[15px] text-white"
        onClick={onClose}
        className={cx("absolute top-0 right-0 m-4 md:m-6", "bg-white/20 rounded-full")}
      />
      <div className="flex items-center gap-2">
        <div>
          {avatar ? (
            <img src={avatar} alt="Preview" className="h-[72px] w-[72px] rounded-full object-cover" />
          ) : (
            <>
              <Avatar
                src={doctor?.avatarUrl}
                name={doctor?.name}
                className={cx("rounded-full", "border-3 border-[var(--color-bg-light-primary-100)]")}
                width={72}
                height={72}
              />
            </>
          )}
        </div>
        <div className={cx("")}>
          <div className="flex items-center gap-2">
            <Item
              children={doctor.title}
              itemClassName={cx("text-[11px] font-bold")}
              className={cx("px-2 py-0.5 rounded-full")}
              style={{
                backgroundColor: `color-mix(in srgb, ${baseColor} 20%, white)`,
                color: baseColor,
              }}
            />
            <Item
              as="div"
              icon={
                <div
                  className={cx(
                    "w-2 h-2 rounded-full",
                    doctor.featured ? "bg-[var(--color-secondary)]" : "bg-[var(--color-error)]",
                  )}
                />
              }
              children={doctor.featured ? "Đang làm việc" : "Tạm nghỉ"}
              className={cx(
                "px-2 py-0.5 text-[11px] rounded-full",
                "font-bold",
                doctor.featured
                  ? "bg-[var(--color-secondary-200)] text-[var(--color-secondary-900)]"
                  : "bg-[var(--color-error-100)] text-[var(--color-error-900)]",
                "flex items-center gap-1 inline-flex",
              )}
            />
          </div>
          <Item as="strong" children={doctor?.name} itemClassName={cx("text-[18px] text-white")} />
          <Item as="span" children={spec.name || doctor?.specialty} itemClassName={cx("text-[11px] text-white")} />
        </div>
      </div>
      {/* Tabs */}
      <div className={cx("flex items-center pt-[10px] w-full")}>
        {tabs.map((t, i) => (
          <Button
            key={i}
            onClick={() => setTab(i)}
            children={t}
            className={cx("flex-1 py-2 text-[12.5px] font-semibold bg-transparent")}
            style={{
              color: tab === i ? "#fff" : "rgba(255,255,255,.6)",
              borderBottom: tab === i ? "2.5px solid #fff" : "2.5px solid transparent",
              transition: "all .15s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function CardInfo({ icon: Icon, title, children, id }) {
  return (
    <div
      id={id}
      className={cx(
        "grid grid-cols-[36px_auto] gap-3 items-center py-3 px-4 rounded-xl",
        "bg-[var(--color-unavailable-100)]/30 border border-[var(--color-unavailable-300)]/50",
      )}
    >
      <Item
        as="div"
        icon={<Icon />}
        iconClassName={cx("text-[15px] text-[var(--color-primary)]")}
        className={cx("w-[36px] h-[36px] flex items-center justify-center")}
      />

      <div>
        <Item
          as="span"
          children={title}
          itemClassName={cx("text-[10.5px] font-semibold text-[var(--color-unavailable-700)]")}
        />
        {children}
      </div>
    </div>
  );
}

function Information({ doctor, position }) {
  return (
    <div className="flex flex-col gap-2.5">
      <CardInfo icon={LuBookText} title={"Bio"} id={"bio"}>
        <Item as="strong" children={doctor?.bio} itemClassName={cx("text-[13px]")} />
      </CardInfo>
      <CardInfo icon={LuBriefcase} title={"Chức vụ"} id={"position"}>
        <Item
          as="strong"
          children={position?.name || doctor?.position || "Chưa có"}
          itemClassName={cx("text-[13px]")}
        />
      </CardInfo>
      <CardInfo icon={LuMapPin} title={"Cơ sở công tác"} id={"facility"}>
        <Item as="strong" children={doctor?.facility} itemClassName={cx("text-[13px]")} className={"w-full"} />
      </CardInfo>
      <CardInfo icon={LuLanguages} title={"Ngôn ngữ"} id={"languages"}>
        <div className="flex flex-wrap gap-2 leading-4">
          {Array.isArray(doctor.languages) &&
            doctor.languages.map((language, index) => (
              <React.Fragment key={language}>
                <Item as="strong" children={language} itemClassName={cx("text-[13px] line-clamp-1")} />
                {index < doctor.languages.length - 1 && "-"}
              </React.Fragment>
            ))}
        </div>
      </CardInfo>
    </div>
  );
}

function Expertise({ doctor, spec, dept }) {
  return (
    <div className="flex flex-col gap-2.5">
      <CardInfo icon={LuBookHeart} title={"Khoa"} id={"department"}>
        <Item as="strong" children={dept.name || doctor?.department} itemClassName={cx("text-[13px] line-clamp-1")} />
      </CardInfo>
      <CardInfo icon={LuHeart} title={"Chuyên khoa"} id={"specialty"}>
        <Item as="strong" children={spec.name || doctor?.specialty} itemClassName={cx("text-[13px] line-clamp-1")} />
      </CardInfo>
      <CardInfo icon={LuTags} title={"Chuyên môn"} id={"tags"}>
        <div className="flex flex-wrap gap-2 leading-4">
          {Array.isArray(doctor.tags) &&
            doctor.tags.map((tag, index) => (
              <React.Fragment key={tag}>
                <Item as="strong" children={tag} itemClassName={cx("text-[13px] line-clamp-1")} />
                {index < doctor.tags.length - 1 && "-"}
              </React.Fragment>
            ))}
        </div>
      </CardInfo>
      <CardInfo icon={LuStethoscope} title={"Thế mạnh chuyên môn"} id={"expertise"}>
        <div className="space-y-2">
          {doctor?.expertise.map((item, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Item as="strong" children={item} itemClassName={cx("text-[13px]")} className={"w-full"} />
            </div>
          ))}
        </div>
      </CardInfo>
    </div>
  );
}

function Experience({ doctor }) {
  return (
    <div className="flex flex-col gap-2.5">
      <CardInfo icon={LuAward} title={"Kinh nghiệm"} id={"experienceYears"}>
        <Item as="strong" children={`${doctor?.experienceYears} năm`} itemClassName={cx("text-[13px]")} />
      </CardInfo>
      <CardInfo icon={LuGraduationCap} title={"Quá trình đào tạo"} id={"education"}>
        <div className="space-y-2">
          {doctor?.education.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Item as="strong" children={item} itemClassName={cx("text-[13px]")} className={"w-full"} />
            </div>
          ))}
        </div>
      </CardInfo>
      <CardInfo icon={LuBriefcase} title={"Quá trình công tác"} id={"experience"}>
        <div className="space-y-2">
          {doctor?.experience.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Item as="strong" children={item} itemClassName={cx("text-[13px]")} className={"w-full"} />
            </div>
          ))}
        </div>
      </CardInfo>
      <CardInfo icon={LuBookOpen} title={"Bài viết & Công trình nghiên cứu"} id={"publications"}>
        <div className="space-y-2">
          {doctor?.publications.map((item, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <Item as="strong" children={item} itemClassName={cx("text-[13px]")} className={"w-full"} />
            </div>
          ))}
        </div>
      </CardInfo>
    </div>
  );
}
