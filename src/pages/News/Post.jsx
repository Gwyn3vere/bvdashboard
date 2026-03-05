import { useState, useRef } from "react";
import classNames from "classnames/bind";
import { useForm, useActive } from "../../components/hooks";
import style from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import {
  Select,
  Item,
  Radio,
  Breadcrumb,
  TagInput,
  Input,
  TextArea,
  Button,
  RichTextEditor,
  Modal,
  Form,
} from "../../components/ui";
import { LuEye, LuFile, LuLayoutDashboard, LuSend, LuX } from "react-icons/lu";
import { NEWS_STATUS_PUBLISH, NEWS_CATEGORIES } from "../../constants/menu";
import { INITAL_NEWS } from "../../constants/field";
import { NEWS_STATUS_ROLE } from "../../constants/role";
import { Preview } from "./index";
import { useAuthStore } from "../../store/authStore";
import { useNewsStore } from "../../store/newsStore";
import { useCategoryStore } from "../../store/categoryStore";
import { useParams } from "react-router-dom";

const cx = classNames.bind(style);

function Post() {
  const [preview, setPreview] = useState(null);
  const { id } = useParams();
  const { user } = useAuthStore();
  const { getNewsById } = useNewsStore();

  const news = id ? getNewsById(id) : null;

  const previewModal = useActive();
  const { values, setValues, setFieldValue, resetForm } = useForm({
    initialValues: {
      ...INITAL_NEWS,
      authorId: user?.id,
    },
    editValues: news,
  });

  return (
    <>
      <div className={cx(TWCSS.container, "flex justify-between overflow-hidden w-full h-full")}>
        <Form spellCheck={false} className={cx("w-full")}>
          <div className={cx("grid h-full grid-cols-1fr w-full xl:grid-cols-[1fr_300px]")}>
            <div className={cx("flex justify-center overflow-y-auto h-full rounded-xl", "hidden-scrollbar")}>
              <Content
                value={values}
                setValue={setValues}
                setFieldValue={setFieldValue}
                preview={preview}
                setPreview={setPreview}
              />
            </div>
            <div className={cx("bg-white rounded-xl h-full")} style={{ boxShadow: "var(--shadow)" }}>
              <Settings
                value={values}
                setValue={setValues}
                setFieldValue={setFieldValue}
                user={user}
                togglePreview={previewModal.toggleActive}
              />
            </div>
          </div>
        </Form>
      </div>
      <Modal open={previewModal.isActive} onClose={previewModal.deactivate} width={"max-w-5xl"}>
        <Preview onClose={previewModal.deactivate} previewData={values} previewThumbnail={preview} user={user} />
      </Modal>
    </>
  );
}

export default Post;

function Content({ value, setFieldValue, preview, setPreview }) {
  const inputRef = useRef(null);
  const displayImage = preview || value?.thumbnail;

  const handleSelectImage = () => {
    inputRef.current?.click();
  };
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File quá lớn (tối đa 5MB)");
      return;
    }

    setFieldValue("thumbnail", file);

    const url = URL.createObjectURL(file);
    setPreview(url);
  };
  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFieldValue("thumbnail", null);
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <div className={cx("bg-white rounded-xl", "max-w-[1020px]")} style={{ boxShadow: "var(--shadow)" }}>
      <div className={cx("p-8 border-b border-gray-200")}>
        <Item
          editable={true}
          itemClassName={cx("text-2xl font-bold")}
          className={cx("py-4")}
          placeholder={"Tiêu đề bài viết..."}
          name="title"
          value={value?.title}
          onEdit={(title) => setFieldValue("title", title)}
        />
      </div>
      <div className={cx("p-8 border-b border-gray-200")}>
        <Item children="Ảnh đại diện" itemClassName={cx("text-sm mb-[16px] uppercase font-medium")} />
        {!displayImage && (
          <div
            onClick={handleSelectImage}
            className={cx(
              "rounded-[12px] border-2 border-dashed border-[var(--color-primary-200)]",
              "p-15 text-center cursor-pointer transition-all bg-[var(--color-unavailable-100)]",
              "hover:border-[var(--color-primary)]",
            )}
          >
            <Item children="🖼️" itemClassName={cx("text-[48px] mb-[16px] opacity-[0.3]")} />
            <Item
              children="Kéo thả ảnh vào đây hoặc click để chọn"
              itemClassName={cx("text-[14px] mb-[8px] text-[var(--color-unavailable-900)]")}
            />
            <Item
              children="PNG, JPG, GIF tối đa 5MB"
              itemClassName={cx("text-[12px] text-[var(--color-unavailable-700)]")}
            />
          </div>
        )}

        <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChangeImage} />

        {displayImage && (
          <div className="relative mt-4 rounded-[12px] overflow-hidden">
            <img src={displayImage} alt="Preview" className="w-full h-auto block" />
            <Button
              width="40px"
              height="40px"
              icon={<LuX />}
              iconClassName={cx("text-white")}
              className={cx("absolute top-[10px] right-[10px]", "p-4 bg-[var(--color-error)]")}
              onClick={handleRemoveImage}
            />
          </div>
        )}
      </div>
      <div className={cx("p-8 border-b border-gray-200")}>
        <TextArea
          label="Mô tả ngắn"
          labelClassName={cx("text-sm")}
          placeholder="Nhập mô tả ngắn gọn về bài viết (hiển thị trong danh sách tin tức)..."
          className={cx("text-sm")}
          name="shortDesc"
          value={value?.shortDesc}
          onChange={(val) => setFieldValue("shortDesc", val.target.value)}
        />
      </div>
      <div className={cx("")}>
        <Item children="Nội dung bài viết" itemClassName={cx("text-sm uppercase font-medium")} className={cx("p-8")} />
        <RichTextEditor content={value?.content} onChange={(html) => setFieldValue("content", html)} />
      </div>
    </div>
  );
}

function Settings({ value, setFieldValue, user, togglePreview }) {
  const categories = useCategoryStore((c) => c.categories);
  const filteredCate = categories.filter((fc) => fc.id !== "uncategorized");
  const allowedStatus = NEWS_STATUS_PUBLISH.filter((item) => NEWS_STATUS_ROLE[user.role].includes(item.value));

  return (
    <div className={cx("-order-1 xl:order-0 flex flex-col")}>
      {/* Status */}
      <div className={cx("p-4 grid grid-cols-2 gap-2")}>
        {allowedStatus.map((item, idx) => (
          <Button
            key={item.id}
            width={"auto"}
            height={"auto"}
            icon={item.value === "PUBLISHED" || item.value === "WAITING" ? <LuSend /> : <LuFile />}
            children={item.name}
            className={cx(
              "text-[13.5px] font-bold gap-2  rounded-xl p-[11px]",
              idx === 0 && "col-span-2",
              item.value === "PUBLISHED" || item.value === "WAITING"
                ? "bg-linear-[var(--color-ln-primary)] text-white"
                : "bg-[var(--color-unavailable-100)] text-[var(--color-unavailable-900)]",
            )}
          />
        ))}
        <Button
          type="button"
          width={"auto"}
          height={"auto"}
          icon={<LuEye />}
          children={"Xem trước"}
          className={cx(
            "text-[13.5px] font-bold gap-2  rounded-xl p-[11px]",
            "bg-[var(--color-unavailable-100)] text-[var(--color-unavailable-900)]",
          )}
          onClick={togglePreview}
        />
      </div>
      {/* Category */}
      <div className={cx("p-4 border-t border-[var(--color-unavailable-100)]")}>
        <Select
          label={"Danh mục"}
          name="department"
          data={filteredCate}
          // value={value?.department}
          // onChange={handleChangeDepartment}
          // onBlur={() => handleBlur("department")}
          // error={getFieldError("department")}
          // placeholder="Chọn khoa"
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("font-bold text-[13px]")}
          inputClassName={cx("rounded-xl")}
          itemClassName={cx("text-[13px]")}
        />
      </div>
      {/* Tags */}
      <div className={cx("p-4 border-t border-[var(--color-unavailable-100)]")}>
        <TagInput
          label={"Tags"}
          name="tags"
          values={value?.tags}
          onChange={(tags) => setFieldValue("tags", tags)}
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl mb-2")}
        />
        <Item
          as="span"
          children={"Nhấn Enter để thêm thẻ"}
          itemClassName={cx("text-[10.5px] text-[var(--color-unavailable)]")}
        />
      </div>
      {/* SEO */}
      <div className="p-4 border-t border-[var(--color-unavailable-100)]">
        <Input
          type="text"
          label="Tiêu đề meta"
          placeholder="Tiêu đề SEO..."
          name="metaTitle"
          value={value?.metaTitle}
          onChange={(val) => setFieldValue("metaTitle", val.target.value)}
          required
          width={"100%"}
          height={"auto"}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl mb-[12px]")}
        />
        <TextArea
          label="Mô tả meta"
          placeholder="Mô tả SEO..."
          name="metaDesc"
          minHeight={80}
          value={value?.metaDesc}
          onChange={(val) => setFieldValue("metaDesc", val.target.value)}
          className={cx("w-full rounded-xl mb-[12px]")}
          labelClassName={cx("text-[11.5px] font-bold")}
          inputClassName={cx("rounded-xl")}
        />

        <div
          className={cx(
            "bg-[var(--color-unavailable-100)]/40 rounded-xl",
            "border border-[var(--color-unavailable-300)]",
          )}
        >
          <div className={cx("p-3 flex flex-col gap-[7px]")}>
            <Item
              icon={<div className="w-2 h-2 rounded-full bg-[var(--color-unavailable)]" />}
              children={`Tiêu đề quá ngắn (0 ký tự)`}
              itemClassName={cx("text-[var(--color-unavailable-700)] text-[11.5px]")}
              className={cx("flex items-center gap-2")}
            />
            <Item
              icon={<div className="w-2 h-2 rounded-full bg-[var(--color-unavailable)]" />}
              children={`Lead chưa đủ (0 ký tự)`}
              itemClassName={cx("text-[var(--color-unavailable-700)] text-[11.5px]")}
              className={cx("flex items-center gap-2")}
            />
            <Item
              icon={<div className="w-2 h-2 rounded-full bg-[var(--color-unavailable)]" />}
              children={`Cần ít nhất 2 thẻ tag`}
              itemClassName={cx("text-[var(--color-unavailable-700)] text-[11.5px]")}
              className={cx("flex items-center gap-2")}
            />
          </div>
        </div>
      </div>
      {/* statistic */}
      <div className="p-4 border-t border-[var(--color-unavailable-100)]">
        <div className={cx("text-[11.5px] font-bold mb-[12px]")}>Thống kê</div>
        <div>
          <Item
            children={
              <div className="flex items-center justify-between">
                <span>Số từ</span>
                <span>
                  <strong>0</strong> từ
                </span>
              </div>
            }
            itemClassName={cx(" text-[12px] text-[var(--color-unavailable-900)]")}
            className={cx("py-[7px]")}
          />
          <Item
            children={
              <div className="flex items-center justify-between">
                <span>Ký tự tiêu đề</span>
                <span>
                  <strong>0</strong> ký tự
                </span>
              </div>
            }
            itemClassName={cx(" text-[12px] text-[var(--color-unavailable-900)]")}
            className={cx("py-[7px]")}
          />
          <Item
            children={
              <div className="flex items-center justify-between">
                <span>Thẻ tag</span>
                <span>
                  <strong>0</strong> thẻ
                </span>
              </div>
            }
            itemClassName={cx(" text-[12px] text-[var(--color-unavailable-900)]")}
            className={cx("py-[7px]")}
          />
        </div>
      </div>
    </div>
  );
}
