import React, { useRef, useEffect } from "react";
import { useActive, useClickOutsideManager } from "../hooks";
import classNames from "classnames/bind";
import style from "../../styles/ui.module.css";
import { Button } from "../ui";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import { RICH_TEXT_HIGHLIGHT_COLORS, RICH_TEXT_HEADINGS } from "../../constants/menu";
import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuStrikethrough,
  LuCode,
  LuHighlighter,
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
  LuRedo
} from "react-icons/lu";

const cx = classNames.bind(style);

const MenuBar = ({ editor }) => {
  const modal = {
    highlighter: useActive(),
    heading: useActive()
  };

  const clickOutside = useClickOutsideManager();
  const highlightRef = useRef(null);
  const headingRef = useRef(null);

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
  }, [modal.highlighter.isActive, modal.heading.isActive]);

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL ảnh:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
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
      isActive && "bg-[var(--color-primary-200)] text-[var(--color-primary-700)] "
    );

  return (
    <div
      className={cx(
        "p-6 flex items-center flex-wrap gap-1",
        "bg-[var(--color-unavailable-100)] border-b border-gray-200"
      )}
    >
      {/* Undo/Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={cx("p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-30")}
        title="Undo (Ctrl+Z)"
      >
        <LuUndo size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={cx("p-2 rounded hover:bg-gray-200 transition-colors disabled:opacity-30")}
        title="Redo (Ctrl+Y)"
      >
        <LuRedo size={18} />
      </button>
      <div className="w-px h-6 bg-gray-300 mx-1" />
      {/* Text formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        title="Bold (Ctrl+B)"
      >
        <LuBold size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        title="Italic (Ctrl+I)"
      >
        <LuItalic size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClass(editor.isActive("underline"))}
        title="Underline (Ctrl+U)"
      >
        <LuUnderline size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonClass(editor.isActive("strike"))}
        title="Strikethrough"
      >
        <LuStrikethrough size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={buttonClass(editor.isActive("code"))}
        title="Code"
      >
        <LuCode size={18} />
      </button>

      <div className="relative" ref={highlightRef}>
        <button
          onClick={modal.highlighter.toggleActive}
          className={buttonClass(editor.isActive("highlight"))}
          title="Highlight"
        >
          <LuHighlighter size={18} />
        </button>

        {modal.highlighter.isActive && (
          <div
            className={cx(
              "absolute -bottom-12 z-50",
              "mt-2 p-3 bg-white border rounded-[18px] shadow flex items-center gap-3",
              "border-[var(--color-unavailable-300)]"
            )}
          >
            {RICH_TEXT_HIGHLIGHT_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  editor.chain().focus().toggleHighlight({ color }).run();
                  setShowHighlightColors(false);
                }}
                className={cx(
                  "w-5 h-5 rounded-full cursor-pointer",
                  editor.isActive("highlight", { color }) && "outline outline-2 outline-offset-2"
                )}
                style={{ backgroundColor: color, outlineColor: color }}
                title={color}
              />
            ))}
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <button
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

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Headings */}

      <div className="relative" ref={headingRef}>
        <button
          onClick={modal.heading.toggleActive}
          className={buttonClass(editor.isActive("heading"))}
          title="Heading"
        >
          <LuHeading size={18} />
        </button>

        {modal.heading.isActive && (
          <div
            className={cx(
              "absolute top-7 z-50",
              "mt-2 p-3 bg-white border rounded-[18px] shadow flex flex-col items-center gap-3",
              "border-[var(--color-unavailable-300)]"
            )}
          >
            {RICH_TEXT_HEADINGS.map((item) => (
              <Button
                width={"100%"}
                key={item.level}
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level: item.level }).run();
                  modal.heading.deactivate();
                }}
                className={cx(
                  "text-sm rounded-[12px] cursor-pointer gap-2 text-[var(--color-unavailable-900)]",
                  "hover:bg-[var(--color-primary-100)] px-4 transition-all",
                  "hover:text-black",
                  editor.isActive("heading", { level: item.level }) && "bg-[var(--color-primary-100)] text-black"
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
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
        title="Bullet List"
      >
        <LuList size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
        title="Numbered List"
      >
        <LuListOrdered size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(editor.isActive("blockquote"))}
        title="Quote"
      >
        <LuQuote size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Alignment */}
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={buttonClass(editor.isActive({ textAlign: "left" }))}
        title="Align Left"
      >
        <LuAlignLeft size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={buttonClass(editor.isActive({ textAlign: "center" }))}
        title="Align Center"
      >
        <LuAlignCenter size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={buttonClass(editor.isActive({ textAlign: "right" }))}
        title="Align Right"
      >
        <LuAlignRight size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={buttonClass(editor.isActive({ textAlign: "justify" }))}
        title="Align Right"
      >
        <LuAlignJustify size={18} />
      </button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      {/* Media */}
      <button onClick={addImage} className={buttonClass(false)} title="Insert Image">
        <LuImage size={18} />
      </button>

      <button onClick={addLink} className={buttonClass(editor.isActive("link"))} title="Insert Link">
        <LuLink size={18} />
      </button>
    </div>
  );
};

function RichTextEditor({ content, onChange, placeholder = "Viết nội dung bài viết của bạn tại đây..." }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight.configure({
        multicolor: true
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty"
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg"
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline"
        }
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"]
      })
    ],
    content: content || null,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none p-6 focus:outline-none min-h-[400px]"
      }
    }
  });

  return (
    <div className="overflow-hidden bg-white">
      <MenuBar editor={editor} />
      <EditorContent className="content" editor={editor} />
    </div>
  );
}

export default React.memo(RichTextEditor);
