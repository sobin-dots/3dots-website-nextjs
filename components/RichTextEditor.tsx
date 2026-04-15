/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent, Node, mergeAttributes, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";

import { 
    Bold, Italic, List, ListOrdered, Quote, 
    Undo, Redo, Image as ImageIcon, Heading1, Heading2,
    Code, Terminal, User, Type, Baseline
} from "lucide-react";


const Citation = Node.create({
    name: 'citation',
    group: 'block',
    content: 'inline*',
    parseHTML() {
        return [{ tag: 'cite' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['cite', mergeAttributes(HTMLAttributes, { 
            class: 'block text-right text-slate-500 italic mt-2 not-italic font-medium border-r-2 border-brand/20 pr-4' 
        }), 0];
    },
});

const FontSize = Extension.create({
    name: 'fontSize',
    addOptions() {
        return {
            types: ['textStyle'],
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ''),
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) {
                                return {};
                            }
                            return {
                                style: `font-size: ${attributes.fontSize}`,
                            };
                        },
                    },
                },
            },
        ];
    },

    addCommands() {
        return {
            setFontSize: (fontSize: string) => ({ chain }: any) => {
                return chain().setMark('textStyle', { fontSize }).run();
            },
            unsetFontSize: () => ({ chain }: any) => {
                return chain().setMark('textStyle', { fontSize: null }).removeEmptyTextStyle().run();
            },
        } as any;
    },
});



interface EditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const addImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = async () => {
            if (input.files?.length) {
                const file = input.files[0];
                const formData = new FormData();
                formData.append("file", file);

                try {
                    const res = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                    });
                    const data = await res.json();
                    if (data.url) {
                        editor.chain().focus().setImage({ src: data.url }).run();
                    }
                } catch (error) {
                    console.error("Upload failed", error);
                }
            }
        };
        input.click();
    };

    return (
        <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/90 backdrop-blur-md p-3 rounded-t-2xl flex flex-wrap gap-1 items-center shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
            {/* Font Control Section */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 mr-2 shadow-sm">
                <div className="flex items-center px-1 text-slate-400">
                    <Type className="w-4 h-4" />
                </div>
                <select 
                    className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer pr-2"
                    onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                >
                    <option value="Inter">Sans</option>
                    <option value="'Playfair Display', serif">Serif</option>
                    <option value="'Fira Code', monospace">Mono</option>
                    <option value="Quicksand">Rounded</option>
                </select>
                <div className="w-px h-4 bg-slate-100 mx-1" />
                <div className="flex items-center px-1 text-slate-400">
                    <Baseline className="w-3.5 h-3.5" />
                </div>
                <select 
                    className="bg-transparent text-xs font-medium text-slate-600 focus:outline-none cursor-pointer pr-1"
                    onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
                >
                    <option value="16px">16px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="24px">24px</option>
                    <option value="32px">32px</option>
                </select>
            </div>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("bold") ? "bg-slate-200 text-brand" : "text-slate-600"}`}
                title="Bold"
            >
                <Bold className="w-4 h-4" />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("italic") ? "bg-slate-200 text-brand" : "text-slate-600"}`}
            >
                <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-200 self-center mx-1" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-slate-200 text-brand" : "text-slate-600"}`}
            >
                <Heading1 className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-slate-200 text-brand" : "text-slate-600"}`}
            >
                <Heading2 className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-200 self-center mx-1" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("bulletList") ? "bg-slate-200 text-brand" : "text-slate-600"}`}
            >
                <List className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("orderedList") ? "bg-slate-200 text-brand" : "text-slate-600"}`}
            >
                <ListOrdered className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("blockquote") ? "bg-slate-200 text-brand" : "text-slate-600"}`}
                title="Quote"
            >
                <Quote className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().setNode('citation').run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("citation") ? "bg-slate-200 text-brand" : "text-slate-600"}`}
                title="By / Mention"
            >
                <User className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-200 self-center mx-1" />

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("code") ? "bg-slate-200 text-brand" : "text-slate-600"}`}
                title="Inline Code"
            >
                <Code className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("codeBlock") ? "bg-slate-200 text-brand" : "text-slate-600"}`}
                title="Code Block"
            >
                <Terminal className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-slate-200 self-center mx-1" />
            <button
                type="button"
                onClick={addImage}
                className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-600"
            >
                <ImageIcon className="w-4 h-4" />
            </button>
            <div className="flex-1" />
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-600"
            >
                <Undo className="w-4 h-4" />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded-lg hover:bg-slate-200 transition-colors text-slate-600"
            >
                <Redo className="w-4 h-4" />
            </button>
        </div>
    );
};

export default function RichTextEditor({ content, onChange, placeholder }: EditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                codeBlock: {
                    HTMLAttributes: {
                        class: 'bg-slate-900 text-slate-100 p-6 rounded-2xl my-8 font-mono text-sm leading-relaxed overflow-x-auto border border-slate-800',
                    },
                },
                code: {
                    HTMLAttributes: {
                        class: 'font-mono text-[0.9em]',
                    },
                },
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-2xl max-w-full h-auto my-8 border border-slate-100 shadow-sm',
                },
            }),
            Citation,
            TextStyle,
            FontFamily,
            FontSize,
        ],


        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-slate max-w-none focus:outline-none min-h-[300px] p-6 text-slate-700 font-light leading-relaxed',
            },
        },
    });

    return (
        <div className="border border-slate-200 rounded-2xl focus-within:border-brand transition-all relative">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
