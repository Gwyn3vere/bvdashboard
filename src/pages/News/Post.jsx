import { useState, useRef } from "react";
import classNames from "classnames/bind";
import { useForm, useActive, useScrollIndicator } from "../../components/hooks";
import style from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import { Select, Item, TagInput, Input, TextArea, Button, RichTextEditor, Modal, Form } from "../../components/ui";
import { LuArrowDown, LuEye, LuFile, LuSend, LuX } from "react-icons/lu";
import { NEWS_STATUS_PUBLISH } from "../../constants/menu";
import { INITAL_NEWS } from "../../constants/field";
import { NEWS_STATUS_ROLE, STAFF_ROLE } from "../../constants/role";
import { Preview } from "./index";
import { useAuthStore } from "../../store/authStore";
import { useNewsStore } from "../../store/newsStore";
import { useCategoryStore } from "../../store/categoryStore";
import { useParams } from "react-router-dom";

const cx = classNames.bind(style);

function Post() {
  const [preview, setPreview] = useState(null);
  const scrollA = useScrollIndicator();
  const scrollB = useScrollIndicator();

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
        <Form spellCheck={false} className={cx(" w-full pb-2")}>
          <div className={cx("grid h-full grid-cols-1fr w-full xl:grid-cols-[1fr_300px]")}>
            <div
              ref={scrollA.ref}
              onScroll={scrollA.handleScroll}
              className={cx(
                "bg-white rounded-2xl  max-w-[720px]",
                "mx-auto overflow-y-auto h-full rounded-xl",
                "hidden-scrollbar",
              )}
              style={{ boxShadow: "var(--shadow)" }}
            >
              <Content
                value={values}
                setValue={setValues}
                setFieldValue={setFieldValue}
                preview={preview}
                setPreview={setPreview}
              />

              <Button
                type="button"
                width={26}
                height={26}
                onClick={scrollA.scrollTo}
                icon={<LuArrowDown />}
                hidden={scrollA.isBottom}
                className={cx(
                  "rounded-full bg-[var(--color-primary)] shadow-lg",
                  "absolute bottom-12 right-2 text-white",
                )}
              />
            </div>
            <div
              ref={scrollB.ref}
              onScroll={scrollB.handleScroll}
              className={cx("relative bg-white rounded-2xl h-full overflow-y-auto", "hidden-scrollbar")}
              style={{ boxShadow: "var(--shadow)" }}
            >
              <Settings
                value={values}
                setValue={setValues}
                setFieldValue={setFieldValue}
                user={user}
                togglePreview={previewModal.toggleActive}
                leadCount={values?.shortDesc.length}
              />

              <Button
                type="button"
                width={26}
                height={26}
                onClick={scrollB.scrollTo}
                icon={<LuArrowDown />}
                hidden={scrollB.isBottom}
                className={cx("rounded-full bg-[var(--color-primary)] shadow-lg", "fixed bottom-3 right-2 text-white")}
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
    <div className={cx("relative")}>
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

function Settings({ value, setFieldValue, user, togglePreview, leadCount }) {
  const categories = useCategoryStore((c) => c.categories);
  const filteredCate = categories.filter((fc) => fc.id !== "uncategorized");
  const allowedStatus = NEWS_STATUS_PUBLISH.filter((item) => NEWS_STATUS_ROLE[user.role].includes(item.value));

  const metaTitleCount = value?.metaTitle?.length || 0;
  const tagsCount = value?.tags?.length || 0;
  const metaDescCount = value?.metaDesc?.length || 0;

  const seoRules = [
    {
      valid: metaTitleCount >= 20 && metaTitleCount <= 80,
      message: () => {
        if (metaTitleCount < 20) return `Tiêu đề quá ngắn (${metaTitleCount} ký tự)`;
        if (metaTitleCount > 80) return `Tiêu đề quá dài (${metaTitleCount} ký tự)`;
        return "Tiêu đề đủ độ dài (20–80 ký tự)";
      },
    },
    {
      valid: leadCount >= 80 && leadCount <= 200,
      message: () => {
        if (leadCount < 80) return `Lead chưa đủ (${leadCount} ký tự)`;
        if (leadCount > 200) return `Lead quá dài (${leadCount} ký tự)`;
        return "Mô tả lead hợp lệ (80–200 ký tự)";
      },
    },
    {
      valid: tagsCount >= 2,
      message: () => {
        return tagsCount >= 2 ? "Có từ khoá / thẻ tag" : "Cần ít nhất 2 thẻ tag";
      },
    },
    {
      valid: metaDescCount >= 120 && metaDescCount <= 160,
      message: () => {
        if (metaDescCount < 120) return `Meta description quá ngắn (${metaDescCount} ký tự)`;
        if (metaDescCount > 160) return `Meta description quá dài (${metaDescCount} ký tự)`;
        return "Meta description hợp lệ (120–160 ký tự)";
      },
    },
  ];

  const score = seoRules.filter((r) => r.valid).length;
  const metaRate = score === 4 ? "good" : score === 3 ? "fair" : "improvement";

  const roleConfig = STAFF_ROLE[user?.role];
  if (!roleConfig) return user?.role;

  return (
    <div className={cx("-order-1 xl:order-0 flex flex-col")}>
      <div className={cx("px-4 pt-4")}>
        <div
          className={cx("p-2 rounded-lg", "flex items-center justify-between")}
          style={{ background: roleConfig?.background }}
        >
          <Item
            icon={<div className={cx("w-2 h-2 rounded-full")} style={{ background: roleConfig?.color }} />}
            children={`Quyền hạn: ${roleConfig.label}`}
            itemClassName={cx("text-[11.5px] font-bold")}
            className={cx("flex items-center gap-2")}
            style={{ color: roleConfig?.color }}
          />
          <Item
            as="span"
            children={user?.role === "ADMIN" ? "Xuất bản" : "Gửi duyệt"}
            itemClassName={cx("text-[10.5px]")}
            style={{ color: roleConfig?.color }}
          />
        </div>
      </div>
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
          labelClassName={cx("text-[13px] font-bold")}
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
        <div className={cx("flex items-center justify-between")}>
          <Item as="strong" children={"SEO & Meta"} itemClassName={cx("text-[13px]")} />
          <Item
            as="div"
            icon={
              <div
                className={cx(
                  "w-2 h-2 rounded-full",
                  metaRate === "good"
                    ? "bg-[var(--color-primary)]"
                    : metaRate === "fair"
                      ? "bg-[var(--color-warning)]"
                      : "bg-[var(--color-error)]",
                )}
              />
            }
            children={metaRate === "good" ? "Tốt" : metaRate === "fair" ? "Khá" : "Cần cải thiện"}
            className={cx(
              "px-2 py-1 text-[11px] rounded-full",
              "font-bold",
              metaRate === "good"
                ? "bg-[var(--color-primary-100)] text-[var(--color-primary-900)]"
                : metaRate === "fair"
                  ? "bg-[var(--color-warning-100)] text-[var(--color-warning-900)]"
                  : "bg-[var(--color-error-100)] text-[var(--color-error-900)]",
              "flex items-center gap-1 inline-flex",
            )}
          />
        </div>
        <div className={cx("")}>
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
            inputClassName={cx("rounded-xl")}
          />
          <Item
            children={
              <span
                className={cx(
                  metaTitleCount < 60 ? "text-[var(--color-unavailable-700)]" : "text-[var(--color-primary)]",
                )}
              >
                {metaTitleCount}/60
              </span>
            }
            itemClassName={cx("text-[10.5px]")}
            className={cx("flex justify-end mt-1")}
          />
        </div>
        <div className={cx("")}>
          <TextArea
            label="Mô tả meta"
            placeholder="Mô tả SEO..."
            name="metaDesc"
            minHeight={80}
            value={value?.metaDesc}
            onChange={(val) => setFieldValue("metaDesc", val.target.value)}
            className={cx("w-full rounded-xl")}
            labelClassName={cx("text-[11.5px] font-bold")}
            inputClassName={cx("rounded-xl")}
          />
          <Item
            children={
              <span
                className={cx(
                  metaDescCount < 160 ? "text-[var(--color-unavailable-700)]" : "text-[var(--color-primary)]",
                )}
              >
                {metaDescCount}/160
              </span>
            }
            itemClassName={cx("text-[10.5px]")}
            className={cx("flex justify-end mt-1 my-2")}
          />
        </div>

        <div
          className={cx(
            "bg-[var(--color-unavailable-100)]/40 rounded-xl",
            "border border-[var(--color-unavailable-300)]",
          )}
        >
          <div className={cx("p-3 flex flex-col gap-[7px]")}>
            {seoRules.map((rule, i) => (
              <Item
                key={i}
                icon={
                  <div
                    className={cx(
                      "w-2 h-2 rounded-full",
                      rule.valid ? "bg-[var(--color-primary)]" : "bg-[var(--color-unavailable)]",
                    )}
                  />
                }
                children={
                  <span className={cx(rule.valid ? "text-[var(--color-unavailable-900)]" : "")}>{rule.message()}</span>
                }
                itemClassName="text-[var(--color-unavailable-700)] text-[11.5px]"
                className="flex items-center gap-2"
              />
            ))}
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
