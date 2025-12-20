// Libraries - Mock -Hooks
import classNames from "classnames/bind";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState, useRef, useEffect } from "react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading,
  FontSize,
  FontColor,
  FontBackgroundColor,
  Alignment,
  Indent,
  IndentBlock,
  List,
  Link,
  Image,
  ImageToolbar,
  ImageStyle,
  ImageResize,
  ImageUpload,
  MediaEmbed,
  Table,
  TableToolbar,
  BlockQuote,
  RemoveFormat,
  Undo
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
// Styles - UI - Motions
import styles from "../../styles/pages.module.css";
import { Breadcrumb, Item, Button, Form, Avatar, Username, Role } from "../../components/ui";
import {
  HiMiniSquares2X2,
  HiMiniPhoto,
  HiOutlineDocument,
  HiOutlineCalendarDays,
  HiOutlineCalendar,
  HiOutlineSquare2Stack
} from "react-icons/hi2";

const cx = classNames.bind(styles);

function Post() {
  return (
    <Form className="px-10 pb-5 flex flex-col h-full">
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <HiMiniSquares2X2 /> },
          { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
          { label: "Đăng bài viết" }
        ]}
      />

      <div className="flex justify-center flex-1 min-h-0">
        <div className="flex flex-col xl:flex-row min-h-0 gap-3">
          <div className="min-h-0 overflow-y-auto w-full xl:w-[760px]">
            <NewsEditor />
          </div>

          <div className="xl:shrink-0">
            <div className="xl:sticky xl:top-4">
              <NewsAuther />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default Post;

export function NewsEditor({ value, onChange }) {
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Xoá preview cũ nếu có
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old);
      return URL.createObjectURL(file);
    });
  };

  // Cleanup khi unmount (phòng trường hợp đặc biệt)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  return (
    <div>
      <div className="relative">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="opacity-0 absolute inset-0 w-full h-full z-10 cursor-pointer"
        />
        <div
          className={cx(
            "flex items-center justify-center",
            "w-auto h-[300px] bg-[var(--color-bg-light-primary-300)] rounded-[8px]"
          )}
        >
          {preview ? (
            <img src={preview} alt="preview" className="w-full h-full object-cover rounded-[8px]" />
          ) : (
            <HiMiniPhoto className="text-gray-300 text-[200px]" />
          )}
        </div>
      </div>
      <Item
        editable
        placeholder="Nhập tiêu đề bài viết..."
        itemClassName="text-2xl font-bold leading-snug py-2"
        whitespace="whitespace-normal"
        // onEdit={(value) => setTitle(value)}
      />
      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",

          plugins: [
            Essentials,
            Paragraph,
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Heading,
            FontSize,
            FontColor,
            FontBackgroundColor,
            Alignment,
            Indent,
            IndentBlock,
            List,
            Link,
            Image,
            ImageToolbar,
            ImageStyle,
            ImageResize,
            ImageUpload,
            MediaEmbed,
            Table,
            TableToolbar,
            BlockQuote,
            RemoveFormat,
            Undo
          ],

          toolbar: {
            items: [
              "undo",
              "redo",
              "|",
              "heading",
              "|",
              "fontSize",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "|",
              "alignment",
              "|",
              "bulletedList",
              "numberedList",
              "|",
              "outdent",
              "indent",
              "|",
              "link",
              "imageUpload",
              "mediaEmbed",
              "insertTable",
              "|",
              "blockQuote",
              "|",
              "removeFormat"
            ],
            shouldNotGroupWhenFull: true
          },

          fontSize: {
            options: [
              { title: "10", model: "10px" },
              { title: "12", model: "12px" },
              { title: "14", model: "14px" },
              { title: "16", model: "16px" },
              { title: "18", model: "18px" },
              { title: "20", model: "20px" },
              { title: "24", model: "24px" },
              { title: "32", model: "32px" }
            ],
            supportAllValues: true
          },

          image: {
            toolbar: [
              "imageStyle:inline",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "toggleImageCaption",
              "imageTextAlternative"
            ]
          },

          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
          },

          mediaEmbed: {
            previewsInData: true
          }
        }}
        onChange={(event, editor) => {
          onChange?.(editor.getData());
        }}
      />
    </div>
  );
}

export function NewsAuther() {
  const role = "admin"; // admin | editor
  return (
    <div className="flex flex-col gap-5 border-3 border-[var(--color-bg-light-primary-300)] rounded-[8px] p-4">
      <Item as="div" children="Thông tin bổ sung" itemClassName="font-bold" />
      <div className="flex flex-col gap-2">
        <Item as="div" itemClassName="flex items-center gap-2">
          <Item as="span" icon={<HiOutlineDocument />} children="Trạng thái:" className="flex items-center gap-1" />
          <Item as="span" children="Bản nháp" itemClassName="font-bold" />
        </Item>
        <Item as="div" itemClassName="flex items-center gap-2">
          <Item as="span" icon={<HiOutlineCalendar />} children="Đặt lịch đăng:" className="flex items-center gap-1" />
          <Item as="span" children="Tắt" itemClassName="font-bold" />
        </Item>
        <Item as="div" itemClassName="flex items-center gap-2">
          <Item as="span" icon={<HiOutlineSquare2Stack />} children="Khuôn mẫu:" className="flex items-center gap-1" />
          <Item as="span" children="Mặc định" itemClassName="font-bold" />
        </Item>
        <Item as="div" itemClassName="flex items-center gap-2">
          <Item
            as="span"
            icon={<HiOutlineCalendarDays />}
            children="Dự kiến xuất bản:"
            className="flex items-center gap-1"
          />
          <Item as="span" children="5/12/2025" itemClassName="font-bold" />
        </Item>
      </div>
      <div className="flex gap-2">
        <Button
          type="submit"
          width="auto"
          className="px-3 py-2 rounded-[8px] border-2 border-[var(--color-bg-light-primary-300)] font-bold text-red-500"
        >
          Xoá bài viết
        </Button>
        <Button
          type="submit"
          width="auto"
          className="px-3 py-2 rounded-[8px] bg-[var(--color-bg-light-primary-300)] font-bold"
        >
          Lưu bản nháp
        </Button>
        <Button
          type="submit"
          width="auto"
          className="px-3 py-2 rounded-[8px] bg-[var(--color-primary)] text-white font-bold"
        >
          Xuất bản
        </Button>
      </div>
    </div>
  );
}
