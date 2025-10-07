import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";

import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";

export default function Sample({
  onhandleGetDescription,
  genAiHTMLdata,
  description,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        heading: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Heading,
      Underline,
      Link,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CharacterCount.configure(),
    ],
    Placeholder: "Start",
    content: "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onhandleGetDescription(html); // auto-send to parent on every change
    },
  });

  // 🧠 Inject AI HTML content when genAiHTMLdata changes
  useEffect(() => {
    if (editor && genAiHTMLdata) {
      editor.commands.setContent(genAiHTMLdata);
    }
  }, [genAiHTMLdata, editor]);

  if (!editor) return null;

  if (!editor) return null;
  // function handleGiveHtmlData() {
  //   const htmlData = editor.getHTML();
  //   onhandleGetDescription(htmlData);
  //   console.log(htmlData);
  // }

  return (
    <div className="rounded border border-gray-300 p-4 space-y-3 ">
      {/* Toolbar */}
      <div className="flex items-center justify-between transition-all">
        <div className="flex flex-wrap items-center gap-2">
          {/* Undo / Redo */}
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
          >
            ↶
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
          >
            ↷
          </button>

          {/* Paragraph / Heading Dropdown */}
          <select
            value={
              editor.isActive("heading", { level: 1 })
                ? "h1"
                : editor.isActive("heading", { level: 2 })
                ? "h2"
                : editor.isActive("heading", { level: 3 })
                ? "h3"
                : "p"
            }
            onChange={(e) => {
              const value = e.target.value;
              if (value === "p") editor.chain().focus().setParagraph().run();
              else
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: parseInt(value[1]) })
                  .run();
            }}
            className="px-2 py-1 border rounded text-sm bg-white"
          >
            <option value="p">Paragraph</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
          </select>

          {/* Text Format Buttons */}
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`px-2 py-1 border rounded text-sm font-bold ${
              editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            B
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`px-2 py-1 border rounded text-sm italic ${
              editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            I
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`px-2 py-1 border rounded text-sm underline ${
              editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            U
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`px-2 py-1 border rounded text-sm line-through ${
              editor.isActive("strike") ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            S
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`px-2 py-1 border rounded text-sm font-mono ${
              editor.isActive("code") ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            {"</>"}
          </button>

          {/* Lists */}
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`px-2 py-1 border rounded text-sm ${
              editor.isActive("bulletList")
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            • List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`px-2 py-1 border rounded text-sm ${
              editor.isActive("orderedList")
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            1. List
          </button>

          {/* Text Align */}
          <button
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`px-2 py-1 border rounded text-sm ${
              editor.isActive({ textAlign: "left" })
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            ⬅
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`px-2 py-1 border rounded text-sm ${
              editor.isActive({ textAlign: "center" })
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            ⬌
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`px-2 py-1 border rounded text-sm ${
              editor.isActive({ textAlign: "right" })
                ? "bg-gray-200"
                : "hover:bg-gray-100"
            }`}
          >
            ➡
          </button>

          {/* Add Link */}
          <button
            onClick={() => {
              const url = window.prompt("Enter a URL");
              if (url) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .setLink({ href: url })
                  .run();
              }
            }}
            className={`px-2 py-1 border rounded text-sm ${
              editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
          >
            🔗
          </button>
        </div>
        {/* <button
          onClick={handleGiveHtmlData}
          className="py-2 px-5 bg-blue-100 text-blue-500 font-medium duration-300 cursor-pointer rounded-xl hover:bg-blue-500 hover:text-gray-50"
        >
          Save
        </button> */}
      </div>

      {/* Editor Content */}
      <EditorContent editor={editor} className="h-96 overflow-y-scroll" />
      {/* <div>{editor.getHTML()}</div> */}
      {/* Character Count */}
      {/* <div className="text-sm text-right text-gray-500">
        {editor.storage.characterCount.characters()} characters
      </div> */}
    </div>
  );
}
