/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { 
    Bold, Italic, List, ListOrdered, Quote, 
    Undo, Redo, Image as ImageIcon, Heading1, Heading2,
    Code, Terminal 
} from "lucide-react";

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
        <div className="border border-slate-200 bg-slate-50 p-2 rounded-t-2xl flex flex-wrap gap-1">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-lg hover:bg-slate-200 transition-colors ${editor.isActive("bold") ? "bg-slate-200 text-brand" : "text-slate-600"}`}
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
            >
                <Quote className="w-4 h-4" />
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
        <div className="border border-slate-200 rounded-2xl overflow-hidden focus-within:border-brand transition-all">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
