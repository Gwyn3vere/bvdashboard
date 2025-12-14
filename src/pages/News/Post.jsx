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
import { Breadcrumb, Item, Button, Form, Input } from "../../components/ui";
import { HiMiniSquares2X2, HiMiniPhoto } from "react-icons/hi2";

const cx = classNames.bind(styles);

function Post() {
  return (
    <Form className="flex flex-col max-w-[1600px] mx-auto h-full overflow-hidden">
      <Breadcrumb
        className="mb-3"
        items={[
          { label: "Bảng điều khiển", href: "/bang-dieu-khien", icon: <HiMiniSquares2X2 /> },
          { label: "Quản lý tin tức", href: "/quan-ly-tin-tuc" },
          { label: "Đăng bài viết" }
        ]}
      />

      <div className="hidden-scrollbar flex-1 mx-auto  h-full overflow-auto">
        <div className="h-full min-h-0" style={{ width: "clamp(640px, 70vw, 760px)" }}>
          <NewsEditor />
        </div>
      </div>
      <div className="mx-auto mt-2" style={{ width: "clamp(640px, 70vw, 760px)" }}>
        <div className="flex justify-end gap-2">
          <Button
            type="submit"
            width="auto"
            className="px-3 py-2 rounded-[8px] bg-[var(--color-bg-light-primary-300)] font-bold"
          >
            Lưu bản nháp
          </Button>
          <Button type="submit" width="auto" className="px-3 py-2 rounded-[8px] bg-black text-white font-bold">
            Xuất bản
          </Button>
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
