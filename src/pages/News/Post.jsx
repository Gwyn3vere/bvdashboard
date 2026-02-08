import { useState, useRef } from "react";
import classNames from "classnames/bind";
import { useForm } from "../../components/hooks";
import style from "../../styles/pages.module.css";
import { TWCSS } from "../../styles/defineTailwindcss";
import {
  Checkbox,
  Item,
  Radio,
  Breadcrumb,
  TagInput,
  Input,
  TextArea,
  Button,
  RichTextEditor,
} from "../../components/ui";
import { LuLayoutDashboard, LuX } from "react-icons/lu";
import { NEWS_STATUS_PUBLISH, NEWS_CATEGORIES } from "../../constants/menu";
import { INITAL_NEWS } from "../../constants/field";

const cx = classNames.bind(style);

function Post() {
  const { values, setValues, setFieldValue, resetForm } = useForm({
    initialValues: INITAL_NEWS,
  });

  return (
    <div className={cx(TWCSS.container)}>
      <Breadcrumb
        className="mb-3"
        items={[
          {
            label: "Bảng điều khiển",
            href: "/bang-dieu-khien",
            icon: <LuLayoutDashboard />,
          },
          { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
          { label: "Đăng bài" },
        ]}
      />
      <Item as="strong" children="Đăng tin tức mới" itemClassName="text-3xl" />
      <Item
        as="span"
        children="Đăng tin tức, blog tại đây."
        itemClassName="text-[14px] text-gray-500 mb-5 mt-1"
      />
      <div className={cx(TWCSS.container, "max-w-[1400px] mx-auto")}>
        <div
          className={cx("grid grid-cols-1fr xl:grid-cols-[1fr_380px] gap-8")}
        >
          <Content
            value={values}
            setValue={setValues}
            setFieldValue={setFieldValue}
          />
          <Settings
            value={values}
            setValue={setValues}
            setFieldValue={setFieldValue}
          />
        </div>
      </div>
    </div>
  );
}

export default Post;

function Content({ value, setFieldValue }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

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
    URL.revokeObjectURL(preview);
    setFieldValue("thumbnail", null);
    setPreview(null);
    inputRef.current.value = "";
  };
  return (
    <div
      className={cx("bg-[var(--color-bg-light-primary-100)] rounded-[8px]")}
      style={{ boxShadow: "var(--shadow)" }}
    >
      <div className={cx("p-8 border-b border-gray-200")}>
        <Item
          editable={true}
          itemClassName={cx("text-2xl font-bold")}
          className={cx("py-4")}
          placeholder={"Tiêu đề bài viết..."}
          name="title"
          onEdit={(title) => setFieldValue("title", title)}
        />
      </div>
      <div className={cx("p-8 border-b border-gray-200")}>
        <Item
          children="Ảnh đại diện"
          itemClassName={cx("text-sm mb-[16px] uppercase font-medium")}
        />
        {!preview && (
          <div
            onClick={handleSelectImage}
            className={cx(
              "rounded-[12px] border-2 border-dashed border-[var(--color-primary-200)]",
              "p-15 text-center cursor-pointer transition-all bg-[var(--color-unavailable-100)]",
              "hover:border-[var(--color-primary)]",
            )}
          >
            <Item
              children="🖼️"
              itemClassName={cx("text-[48px] mb-[16px] opacity-[0.3]")}
            />
            <Item
              children="Kéo thả ảnh vào đây hoặc click để chọn"
              itemClassName={cx(
                "text-[14px] mb-[8px] text-[var(--color-unavailable-900)]",
              )}
            />
            <Item
              children="PNG, JPG, GIF tối đa 5MB"
              itemClassName={cx(
                "text-[12px] text-[var(--color-unavailable-700)]",
              )}
            />
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleChangeImage}
        />

        {preview && (
          <div className="relative mt-4 rounded-[12px] overflow-hidden">
            <img src={preview} alt="Preview" className="w-full h-auto block" />
            <Button
              width="40px"
              height="40px"
              icon={<LuX />}
              iconClassName={cx("text-white")}
              className={cx(
                "absolute top-[10px] right-[10px]",
                "p-4 bg-[var(--color-error)]",
              )}
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
        <Item
          children="Nội dung bài viết"
          itemClassName={cx("text-sm uppercase font-medium")}
          className={cx("p-8")}
        />
        <RichTextEditor
          content={value.content}
          onChange={(html) => setFieldValue("content", html)}
        />
      </div>
      <div className={cx("p-8 grid grid-cols-2 gap-5")}>
        <Button
          width={"auto"}
          type="button"
          children={"Xem trước"}
          className={cx(
            "bg-[var(--color-bg-light-primary-100)] p-6",
            "border-2 border-[var(--color-unavailable)] rounded-[8px]",
            "text-[var(--color-unavailable-900)] font-semibold text-md",
            "hover:bg-[var(--color-unavailable-100)] transition-all",
          )}
        />
        <Button
          width={"auto"}
          type="submit"
          children={"Xác nhận"}
          className={cx(
            "bg-[var(--color-primary)] p-6",
            "border-2 border-[var(--color-primary)] rounded-[8px]",
            "text-white font-semibold text-md",
          )}
        />
      </div>
    </div>
  );
}

function Card({ children, title }) {
  return (
    <div
      className={cx(
        "bg-[var(--color-bg-light-primary-100)] rounded-[8px] overflow-hidden",
      )}
      style={{ boxShadow: "var(--shadow)" }}
    >
      <Item
        children={title}
        itemClassName={cx("font-semibold text-white text-md")}
        className={cx("px-6 py-4 bg-[var(--color-primary)]")}
      />
      {children}
    </div>
  );
}

function Settings({ value, setFieldValue }) {
  return (
    <div className={cx("-order-1 xl:order-0 flex flex-col gap-5")}>
      {/* Status */}
      <Card title={"Trạng thái xuất bản"}>
        <div className={cx("p-6 flex flex-col gap-3")}>
          {NEWS_STATUS_PUBLISH.map((item) => (
            <Radio
              key={item.id}
              name={"status"}
              text={
                <div>
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <span className="text-[12px] text-gray-500">
                    {item.title}
                  </span>
                </div>
              }
              checked={value?.status === item.value}
              onChange={(status) =>
                setFieldValue("status", (status = item.value))
              }
              className={cx(
                "p-4 border-1 transition-all rounded-[8px]",
                value?.status === item.value
                  ? "bg-[var(--color-primary-100)] border-1 border-[var(--color-primary)]"
                  : " border-[var(--color-unavailable-300)]",
              )}
            />
          ))}
        </div>
      </Card>
      {/* Category */}
      <Card title={"Danh mục"}>
        <div className={cx("p-6")}>
          {NEWS_CATEGORIES.map((cate) => (
            <div
              key={cate.id}
              className={cx(
                "flex items-center justify-between py-2 border-b-1 last:border-b-0 border-gray-200",
              )}
            >
              <Checkbox
                text={cate.name}
                className={cx("text-sm")}
                style={{
                  "--size": "20px",
                }}
                checked={value.category.includes(cate.name)}
                onChange={(e) => {
                  const checked = e.target.checked;

                  setFieldValue(
                    "category",
                    checked
                      ? [...value.category, cate.name]
                      : value.category.filter((name) => name !== cate.name),
                  );
                }}
              />
              <Item
                children={cate.totalNews}
                itemClassName={cx(
                  "text-[11px] text-[var(--color-primary-500)]",
                )}
                className={cx(
                  "p-2 bg-[var(--color-primary-100)] rounded-[8px]",
                )}
              />
            </div>
          ))}
        </div>
      </Card>
      {/* Tags */}
      <Card title={"Thẻ tags"}>
        <div className={cx("p-6")}>
          <TagInput
            name="tags"
            values={value?.tags}
            onChange={(tags) => setFieldValue("tags", tags)}
          />
        </div>
      </Card>
      <Card title={"SEO & Meta"}>
        <div className="p-6 flex flex-col gap-3">
          <Input
            type="text"
            label="Tiêu đề meta"
            labelClassName={cx("text-sm")}
            className={cx("text-sm")}
            placeholder="Tiêu đề SEO..."
            name="metaTitle"
            value={value?.metaTitle}
            onChange={(val) => setFieldValue("metaTitle", val.target.value)}
          />
          <TextArea
            label="Mô tả meta"
            labelClassName={cx("text-sm")}
            placeholder="Mô tả SEO..."
            className={cx("text-sm")}
            name="metaDesc"
            value={value?.metaDesc}
            onChange={(val) => setFieldValue("metaDesc", val.target.value)}
          />
        </div>
      </Card>
    </div>
  );
}
