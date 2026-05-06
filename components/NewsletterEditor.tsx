/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent, Node, mergeAttributes, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { Color } from "@tiptap/extension-color";

import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Type,
  Baseline,
  Link as LinkIcon,
  MousePointerClick,
  Minus,
  Palette,
} from "lucide-react";
import { useRef, useState } from "react";

const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: any) =>
          chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }: any) =>
          chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run(),
    } as any;
  },
});

/**
 * Email-friendly button block. Renders as a centered block with anchor styling
 * that survives email clients (inline styles, no flex/grid).
 */
const ButtonBlock = Node.create({
  name: "buttonBlock",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      href: { default: "https://" },
      label: { default: "Click me" },
      bg: { default: "#0ea5e9" },
      color: { default: "#ffffff" },
      align: { default: "center" },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-button-block]",
        getAttrs: (el) => {
          const a = el.querySelector("a");
          return {
            href: a?.getAttribute("href") || "https://",
            label: a?.textContent || "Click me",
            bg: a?.getAttribute("data-bg") || "#0ea5e9",
            color: a?.getAttribute("data-color") || "#ffffff",
            align: el.getAttribute("data-align") || "center",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { href, label, bg, color, align } = HTMLAttributes as Record<string, string>;
    const wrapperStyle = `text-align:${align || "center"};margin:24px 0;`;
    const anchorStyle = `display:inline-block;background:${bg};color:${color};padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;font-size:14px;`;
    return [
      "div",
      mergeAttributes(
        { "data-button-block": "true", "data-align": align || "center", style: wrapperStyle }
      ),
      [
        "a",
        {
          href: href || "#",
          target: "_blank",
          rel: "noopener noreferrer",
          "data-bg": bg,
          "data-color": color,
          style: anchorStyle,
        },
        label || "Click me",
      ],
    ];
  },

  addCommands() {
    return {
      insertButton:
        (attrs: { href: string; label: string; bg?: string; color?: string; align?: string }) =>
        ({ chain }: any) =>
          chain()
            .focus()
            .insertContent({
              type: this.name,
              attrs: { align: "center", bg: "#0ea5e9", color: "#ffffff", ...attrs },
            })
            .run(),
    } as any;
  },
});

/**
 * Vertical spacer for email layouts.
 */
const Spacer = Node.create({
  name: "spacer",
  group: "block",
  atom: true,
  selectable: true,

  addAttributes() {
    return { height: { default: 24 } };
  },

  parseHTML() {
    return [{ tag: "div[data-spacer]", getAttrs: (el) => ({ height: Number(el.getAttribute("data-height")) || 24 }) }];
  },

  renderHTML({ HTMLAttributes }) {
    const h = Number(HTMLAttributes.height) || 24;
    return [
      "div",
      { "data-spacer": "true", "data-height": String(h), style: `height:${h}px;line-height:${h}px;font-size:1px;` },
      " ",
    ];
  },

  addCommands() {
    return {
      insertSpacer:
        (height: number = 24) =>
        ({ chain }: any) =>
          chain().focus().insertContent({ type: this.name, attrs: { height } }).run(),
    } as any;
  },
});

interface NewsletterEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const FONT_FAMILIES = [
  { value: "", label: "Default" },
  { value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", label: "System Sans" },
  { value: "Georgia, 'Times New Roman', serif", label: "Serif" },
  { value: "'Courier New', monospace", label: "Mono" },
  { value: "'Playfair Display', serif", label: "Playfair" },
];

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "32px", "40px"];

const PRESET_COLORS = [
  "#0f172a",
  "#475569",
  "#94a3b8",
  "#0ea5e9",
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#ef4444",
  "#f59e0b",
  "#10b981",
];

function MenuBar({ editor }: { editor: any }) {
  const [showColors, setShowColors] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [btnLabel, setBtnLabel] = useState("Get Started");
  const [btnUrl, setBtnUrl] = useState("https://");
  const [btnBg, setBtnBg] = useState("#0ea5e9");
  const [btnColor, setBtnColor] = useState("#ffffff");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const addImage = () => fileRef.current?.click();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) editor.chain().focus().setImage({ src: data.url, alt: file.name }).run();
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      e.target.value = "";
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Enter URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  const insertButton = () => {
    if (!btnLabel.trim() || !btnUrl.trim()) return;
    editor.chain().focus().insertButton({
      href: btnUrl.trim(),
      label: btnLabel.trim(),
      bg: btnBg,
      color: btnColor,
    }).run();
    setShowButton(false);
  };

  const btn = (active: boolean) =>
    `p-2 rounded-lg hover:bg-slate-100 transition-colors ${active ? "bg-brand/10 text-brand" : "text-slate-600"}`;

  return (
    <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 backdrop-blur p-3 rounded-t-2xl flex flex-wrap gap-1 items-center">
      <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

      {/* Font Family */}
      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200">
        <Type className="w-3.5 h-3.5 text-slate-400" />
        <select
          className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
          onChange={(e) => {
            if (e.target.value) editor.chain().focus().setFontFamily(e.target.value).run();
            else editor.chain().focus().unsetFontFamily().run();
          }}
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.label} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {/* Font Size */}
      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200">
        <Baseline className="w-3.5 h-3.5 text-slate-400" />
        <select
          className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer"
          onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
          defaultValue="16px"
        >
          {FONT_SIZES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="w-px h-6 bg-slate-200 mx-1" />

      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))} title="Bold">
        <Bold className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))} title="Italic">
        <Italic className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive("strike"))} title="Strikethrough">
        <Strikethrough className="w-4 h-4" />
      </button>

      {/* Color */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setShowColors((v) => !v);
            setShowButton(false);
          }}
          className={btn(false)}
          title="Text Color"
        >
          <Palette className="w-4 h-4" />
        </button>
        {showColors && (
          <div className="absolute left-0 top-full mt-2 z-20 bg-white border border-slate-200 rounded-xl p-3 shadow-lg w-56">
            <div className="grid grid-cols-5 gap-2 mb-3">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => {
                    editor.chain().focus().setColor(c).run();
                    setShowColors(false);
                  }}
                  className="w-7 h-7 rounded-lg border border-slate-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <input
              type="color"
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="w-full h-8 rounded cursor-pointer"
            />
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetColor().run();
                setShowColors(false);
              }}
              className="w-full mt-2 text-xs text-slate-500 hover:text-slate-800 py-1"
            >
              Clear color
            </button>
          </div>
        )}
      </div>

      <button type="button" onClick={setLink} className={btn(editor.isActive("link"))} title="Insert Link">
        <LinkIcon className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-200 mx-1" />

      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={btn(editor.isActive("heading", { level: 1 }))} title="Heading 1">
        <Heading1 className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))} title="Heading 2">
        <Heading2 className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))} title="Heading 3">
        <Heading3 className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-200 mx-1" />

      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))} title="Bullet List">
        <List className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))} title="Ordered List">
        <ListOrdered className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))} title="Quote">
        <Quote className="w-4 h-4" />
      </button>

      <div className="w-px h-6 bg-slate-200 mx-1" />

      <button type="button" onClick={addImage} className={btn(false)} title="Insert Image">
        <ImageIcon className="w-4 h-4" />
      </button>

      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn(false)} title="Horizontal Divider">
        <Minus className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().insertSpacer(24).run()}
        className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-lg text-slate-500 hover:bg-slate-100"
        title="Vertical spacer"
      >
        Spacer
      </button>

      {/* Button block */}
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setShowButton((v) => !v);
            setShowColors(false);
          }}
          className={btn(false)}
          title="Insert Button"
        >
          <MousePointerClick className="w-4 h-4" />
        </button>
        {showButton && (
          <div className="absolute right-0 top-full mt-2 z-20 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl w-72">
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">Insert Call-to-Action Button</p>
            <input
              type="text"
              value={btnLabel}
              onChange={(e) => setBtnLabel(e.target.value)}
              placeholder="Button label"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm mb-2 outline-none focus:border-brand"
            />
            <input
              type="url"
              value={btnUrl}
              onChange={(e) => setBtnUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm mb-2 outline-none focus:border-brand"
            />
            <div className="grid grid-cols-2 gap-2 mb-3">
              <label className="text-xs text-slate-500 flex items-center gap-2">
                <span>Bg</span>
                <input type="color" value={btnBg} onChange={(e) => setBtnBg(e.target.value)} className="w-full h-7 rounded cursor-pointer" />
              </label>
              <label className="text-xs text-slate-500 flex items-center gap-2">
                <span>Text</span>
                <input type="color" value={btnColor} onChange={(e) => setBtnColor(e.target.value)} className="w-full h-7 rounded cursor-pointer" />
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowButton(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={insertButton}
                className="px-4 py-1.5 text-xs font-bold bg-brand text-white rounded-lg hover:bg-brand-dark"
              >
                Insert
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1" />

      <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)} title="Undo">
        <Undo className="w-4 h-4" />
      </button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)} title="Redo">
        <Redo className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function NewsletterEditor({ content, onChange }: NewsletterEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Image.configure({
        HTMLAttributes: {
          style: "max-width:100%;height:auto;border-radius:8px;margin:16px 0;display:block;",
        },
      }),
      Link.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: "https",
        HTMLAttributes: {
          style: "color:#0ea5e9;text-decoration:underline;",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      ButtonBlock,
      Spacer,
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[420px] p-8 text-slate-700 leading-relaxed bg-white",
      },
    },
  });

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden shadow-sm">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
