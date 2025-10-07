import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import CharacterCount from "@tiptap/extension-character-count";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";

export default function Sample({
  description, // existing HTML (for update)
  genAiHTMLdata, // AI-generated HTML to inject
  onhandleGetDescription, // (html) => void
  onSubmit, // () => void
  mode = "create", // "create" | "update"
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
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CharacterCount.configure(),
    ],
    content: description || "",
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onhandleGetDescription?.(html);
    },
  });

  // Keep editor in sync if `description` prop changes (e.g., open another item to edit)
  useEffect(() => {
    if (editor && description !== undefined) {
      editor.commands.setContent(description || "");
    }
  }, [description, editor]);

  // Inject AI HTML when it arrives
  useEffect(() => {
    if (editor && genAiHTMLdata) {
      editor.commands.setContent(genAiHTMLdata);
    }
  }, [genAiHTMLdata, editor]);

  if (!editor) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
    // Clear only in create mode
    if (mode === "create") {
      editor.commands.clearContent();
      onhandleGetDescription?.("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Simple toolbar (add/remove as you like) */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
        >
          ↶
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
        >
          ↷
        </button>

        <select
          className="px-2 py-1 border rounded text-sm bg-white"
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
            const v = e.target.value;
            if (v === "p") editor.chain().focus().setParagraph().run();
            else
              editor
                .chain()
                .focus()
                .toggleHeading({ level: parseInt(v[1]) })
                .run();
          }}
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`px-2 py-1 border rounded text-sm font-bold ${
            editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          B
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`px-2 py-1 border rounded text-sm italic ${
            editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          I
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`px-2 py-1 border rounded text-sm underline ${
            editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          U
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`px-2 py-1 border rounded text-sm line-through ${
            editor.isActive("strike") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          S
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          • List
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          1. List
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("left").run();
          }}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive({ textAlign: "left" })
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          ⬅
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("center").run();
          }}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive({ textAlign: "center" })
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          ⟷
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setTextAlign("right").run();
          }}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive({ textAlign: "right" })
              ? "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
        >
          ➡
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            const url = window.prompt("Enter a URL");
            if (url)
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({ href: url })
                .run();
          }}
          className={`px-2 py-1 border rounded text-sm ${
            editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-100"
          }`}
        >
          🔗
        </button>
      </div>

      <div className="border p-2 rounded-lg">
        <EditorContent editor={editor} className="min-h-[150px]" />
      </div>

      <button
        type="submit"
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Save
      </button>
    </form>
  );
}
