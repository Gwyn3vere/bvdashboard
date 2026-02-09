import React, { useRef, useEffect, useState } from "react";
import { useActive, useClickOutsideManager } from "../hooks";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { Button } from "../ui";

import { useEditor, EditorContent } from "@tiptap/react";
import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import {
  RICH_TEXT_HIGHLIGHT_COLORS,
  RICH_TEXT_HEADINGS,
  RICH_TEXT_COLORS,
} from "../../constants/menu";
import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuStrikethrough,
  LuCode,
  LuHighlighter,
  LuPalette,
  LuBan,
  LuHeading,
  LuList,
  LuListOrdered,
  LuQuote,
  LuImage,
  LuLink,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuAlignJustify,
  LuUndo,
  LuRedo,
  LuChevronDown,
  LuUpload,
  LuX,
  LuFile,
} from "react-icons/lu";

const cx = classNames.bind(style);

const ImageUploadComponent = ({ node, editor, getPos }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const uniqueId = useRef(
    `image-upload-${Date.now()}-${Math.random()}`,
  ).current;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File không được vượt quá 5MB");
      return;
    }

    setFileName(file.name);
    setFileSize((file.size / 1024).toFixed(2) + " KB");
    setUploading(true);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setProgress(i);
    }

    // Convert to base64
    const reader = new FileReader();
    reader.onload = (e) => {
      const pos = getPos();
      // Xóa node upload và thay bằng image
      editor
        .chain()
        .deleteRange({ from: pos, to: pos + 1 })
        .insertContentAt(pos, {
          type: "image",
          attrs: { src: e.target.result },
        })
        .run();
    };
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    const pos = getPos();
    editor
      .chain()
      .deleteRange({ from: pos, to: pos + 1 })
      .run();
  };

  if (uploading) {
    return (
      <NodeViewWrapper className="my-4">
        <div className="border border-[var(--color-primary-500)] rounded-[12px] p-4 bg-[var(--color-unavailable-100)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-primary-500)] rounded-[12px] flex items-center justify-center">
              <LuFile size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-unavailable-900)]">
                {fileName}
              </p>
              <p className="text-xs text-[var(--color-unavailable-600)]">
                {fileSize}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-primary-600)] text-sm font-medium">
              {progress}%
            </span>
            <button
              onClick={handleCancel}
              className="text-[var(--color-unavailable-600)] hover:text-[var(--color-unavailable-900)] transition-colors"
            >
              <LuX size={18} />
            </button>
          </div>
        </div>
      </NodeViewWrapper>
    );
  }

  return (
    <NodeViewWrapper className="my-4">
      <div
        className={cx(
          "border-2 border-dashed rounded-[18px] p-8 text-center transition-all",
          isDragging
            ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)]"
            : "border-[var(--color-unavailable-300)] bg-[var(--color-unavailable-50)]",
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={uniqueId}
          className="hidden"
          accept="image/*"
          onChange={handleChange}
        />
        <label htmlFor={uniqueId} className="cursor-pointer">
          <div className="w-12 h-12 bg-[var(--color-primary-500)] rounded-[12px] mx-auto mb-3 flex items-center justify-center">
            <LuUpload size={24} className="text-white" />
          </div>
          <p className="text-[var(--color-unavailable-900)] mb-1">
            <span className="text-[var(--color-primary-600)] underline">
              Click vào để upload ảnh
            </span>{" "}
            hoặc kéo và thả ảnh vào đây
          </p>
          <p className="text-[var(--color-unavailable-600)] text-sm">
            Tối đa 3 files, và từ 5MB trở xuống.
          </p>
        </label>
      </div>
    </NodeViewWrapper>
  );
};

const ImageUploadExtension = Node.create({
  name: "imageUpload",

  group: "block",

  atom: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="image-upload"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "image-upload" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageUploadComponent);
  },
});

const MenuBar = ({ editor }) => {
  const modal = {
    highlighter: useActive(),
    heading: useActive(),
    color: useActive(),
  };

  const clickOutside = useClickOutsideManager();
  const highlightRef = useRef(null);
  const headingRef = useRef(null);
  const colorRef = useRef(null);

  useEffect(() => {
    if (modal.highlighter.isActive) {
      clickOutside.register(highlightRef, modal.highlighter.deactivate);
    } else {
      clickOutside.unregister(highlightRef);
    }

    if (modal.heading.isActive) {
      clickOutside.register(headingRef, modal.heading.deactivate);
    } else {
      clickOutside.unregister(headingRef);
    }

    if (modal.color.isActive) {
      clickOutside.register(colorRef, modal.color.deactivate);
    } else {
      clickOutside.unregister(colorRef);
    }
  }, [
    modal.highlighter.isActive,
    modal.heading.isActive,
    modal.color.isActive,
  ]);

  if (!editor) return null;

  const addImageUpload = () => {
    editor.chain().focus().insertContent({ type: "imageUpload" }).run();
  };

  const addLink = () => {
    const url = window.prompt("URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const buttonClass = (isActive) =>
    cx(
      "p-2 rounded-[8px] hover:bg-gray-200 transition-colors",
      isActive &&
        "bg-[var(--color-primary-200)] text-[var(--color-primary-700)] ",
    );

  return (
    <div
      className={cx(
        "p-6 flex items-center flex-wrap gap-1",
        "bg-[var(--color-unavailable-100)] border-b border-gray-200",
      )}
    >
      {/* Undo/Redo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={cx(
          "p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-30",
        )}
        title="Undo (Ctrl+Z)"
      >
        <LuUndo size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={cx(
          "p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-30",
        )}
        title="Redo (Ctrl+Y)"
      >
        <LuRedo size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Text formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        title="Bold (Ctrl+B)"
      >
        <LuBold size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        title="Italic (Ctrl+I)"
      >
        <LuItalic size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClass(editor.isActive("underline"))}
        title="Underline (Ctrl+U)"
      >
        <LuUnderline size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonClass(editor.isActive("strike"))}
        title="Strikethrough"
      >
        <LuStrikethrough size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={buttonClass(editor.isActive("code"))}
        title="Code"
      >
        <LuCode size={18} />
      </button>

      <div className="relative" ref={highlightRef}>
        <button
          type="button"
          onClick={modal.highlighter.toggleActive}
          className={buttonClass(editor.isActive("highlight"))}
          title="Highlight"
        >
          <LuHighlighter size={18} />
          <LuChevronDown
            className={cx(
              "absolute bottom-1/2 translate-y-1/2 right-0 text-[8px]",
              modal.highlighter.isActive
                ? "rotate-180 transition-transform"
                : "transition-transform",
            )}
          />
        </button>

        {modal.highlighter.isActive && (
          <div
            className={cx(
              "absolute -bottom-12 z-50",
              "mt-2 p-3 bg-white border rounded-[18px] shadow flex items-center gap-3",
              "border-[var(--color-unavailable-300)]",
            )}
          >
            {RICH_TEXT_HIGHLIGHT_COLORS.map((color) => (
              <button
                type="button"
                key={color}
                onClick={() => {
                  editor.chain().focus().toggleHighlight({ color }).run();
                }}
                className={cx(
                  "w-5 h-5 rounded-full cursor-pointer",
                  editor.isActive("highlight", { color }) &&
                    "outline outline-2 outline-offset-2",
                )}
                style={{ backgroundColor: color, outlineColor: color }}
                title={color}
              />
            ))}
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetHighlight().run();
              }}
              className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-100"
              title="Remove highlight"
            >
              <LuBan size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="relative" ref={colorRef}>
        <button
          type="button"
          onClick={modal.color.toggleActive}
          className={buttonClass(editor.isActive("color"))}
          title="Color"
        >
          <LuPalette size={18} />
          <LuChevronDown
            className={cx(
              "absolute bottom-1/2 translate-y-1/2 right-0 text-[8px]",
              modal.color.isActive
                ? "rotate-180 transition-transform"
                : "transition-transform",
            )}
          />
        </button>

        {modal.color.isActive && (
          <div
            className={cx(
              "grid grid-cols-5 gap-3 w-50",
              "absolute top-7 z-50",
              "mt-2 p-3 bg-white border rounded-[18px] shadow",
              "border-[var(--color-unavailable-300)]",
            )}
          >
            {RICH_TEXT_COLORS.map((color) => (
              <button
                type="button"
                key={color}
                onClick={() => {
                  editor.chain().focus().setColor(color).run();
                }}
                className={cx(
                  "w-5 h-5 rounded-full cursor-pointer",
                  editor.isActive("color", { color }) &&
                    "outline outline-2 outline-offset-2",
                )}
                style={{ backgroundColor: color, outlineColor: color }}
                title={color}
              />
            ))}
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetColor().run();
              }}
              className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-100"
              title="Remove color"
            >
              <LuBan size={16} />
            </button>
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Headings */}
      <div className="relative" ref={headingRef}>
        <button
          type="button"
          onClick={modal.heading.toggleActive}
          className={buttonClass(editor.isActive("heading"))}
          title="Heading"
        >
          <LuHeading size={18} />
          <LuChevronDown
            className={cx(
              "absolute bottom-1/2 translate-y-1/2 right-0 text-[8px]",
              modal.heading.isActive
                ? "rotate-180 transition-transform"
                : "transition-transform",
            )}
          />
        </button>

        {modal.heading.isActive && (
          <div
            className={cx(
              "absolute top-7 z-50",
              "mt-2 p-3 bg-white border rounded-[18px] shadow flex flex-col items-center gap-3",
              "border-[var(--color-unavailable-300)]",
            )}
          >
            {RICH_TEXT_HEADINGS.map((item) => (
              <Button
                type="button"
                width={"100%"}
                key={item.level}
                onClick={() => {
                  editor
                    .chain()
                    .focus()
                    .toggleHeading({ level: item.level })
                    .run();
                  modal.heading.deactivate();
                }}
                className={cx(
                  "text-sm rounded-[12px] cursor-pointer gap-2 text-[var(--color-unavailable-900)]",
                  "hover:bg-[var(--color-primary-100)] px-4 transition-all",
                  "hover:text-black",
                  editor.isActive("heading", { level: item.level }) &&
                    "bg-[var(--color-primary-100)] text-black",
                )}
                btnClassName={cx("whitespace-nowrap")}
                icon={item.icon}
                children={item.title}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
        title="Bullet List"
      >
        <LuList size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
        title="Numbered List"
      >
        <LuListOrdered size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(editor.isActive("blockquote"))}
        title="Quote"
      >
        <LuQuote size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Alignment */}
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={buttonClass(editor.isActive({ textAlign: "left" }))}
        title="Align Left"
      >
        <LuAlignLeft size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={buttonClass(editor.isActive({ textAlign: "center" }))}
        title="Align Center"
      >
        <LuAlignCenter size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={buttonClass(editor.isActive({ textAlign: "right" }))}
        title="Align Right"
      >
        <LuAlignRight size={18} />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={buttonClass(editor.isActive({ textAlign: "justify" }))}
        title="Align Justify"
      >
        <LuAlignJustify size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Media */}
      <button
        type="button"
        onClick={addImageUpload}
        className={buttonClass(false)}
        title="Insert Image"
      >
        <LuImage size={18} />
      </button>

      <button
        type="button"
        onClick={addLink}
        className={buttonClass(editor.isActive("link"))}
        title="Insert Link"
      >
        <LuLink size={18} />
      </button>
    </div>
  );
};

function RichTextEditor({
  content,
  onChange,
  placeholder = "Viết nội dung bài viết của bạn tại đây...",
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      ImageUploadExtension,
      Highlight.configure({
        multicolor: true,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: content || null,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none p-6 focus:outline-none min-h-[400px]",
      },
    },
  });

  return (
    <div className="overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <EditorContent className="" editor={editor} />
    </div>
  );
}

export default React.memo(RichTextEditor);
