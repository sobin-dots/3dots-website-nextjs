/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Save, Image as ImageIcon, Loader2, AlertCircle, Upload, X, User, Tag, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { isManager } from "@/lib/rbac";
import RichTextEditor from "@/components/RichTextEditor";

export default function NewBlogPostPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    readTime: "5 min read",
    image: "/images/blog/default.jpg",
    thumbnail: "/images/blog/default.jpg",
    published: false,
    status: "DRAFT",
    authorName: "",
    authorRole: "",
    tags: [] as string[],
  });

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        authorName: session.user.name || "Admin",
        authorRole: session.user.role || "Editor"
      }));
    }
  }, [session]);


  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/blog/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
          if (data.length > 0) {
            setFormData(prev => ({ ...prev, category: data[0].name }));
          }
        }
      });
  }, []);

  const [tagInput, setTagInput] = useState("");

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tagToRemove) });
  };

  const [uploading, setUploading] = useState(false);

  const handleFeaturedImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, image: data.url }));
      }
    } finally {
      setUploading(false);
    }
  };
  
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    const formDataUpload = new FormData();
    formDataUpload.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, thumbnail: data.url }));
      }
    } catch (error) {
      console.error("Thumbnail upload failed", error);
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData({ 
      ...formData, 
      title, 
      slug: generateSlug(title) 
    });
  };

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setFieldErrors({});

    const isUserAManager = isManager(session?.user?.role);
    const finalStatus = isUserAManager 
      ? (formData.published ? "PUBLISHED" : "DRAFT")
      : "PENDING_REVIEW";

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          status: finalStatus,
          published: isUserAManager ? formData.published : false
        }),
      });


      const data = await res.json();

      if (res.ok) {
        router.push("/admin/blog");
      } else {
        if (data.error?.fieldErrors) {
          setFieldErrors(data.error.fieldErrors);
          setError("Please fix the validation errors below.");
        } else {
          const errorMsg = data.details || data.error || "Failed to save post";
          setError(errorMsg);
        }
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-800 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            New <span className="font-medium">Post</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">
            Write and publish a new article to your blog.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 flex items-center gap-4 text-rose-600 animate-in fade-in slide-in-from-top-4">
              <AlertCircle className="w-6 h-6 shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Article Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Enter title..."
                className={`w-full text-2xl font-medium bg-slate-50 border ${fieldErrors.title ? "border-rose-300 ring-1 ring-rose-100" : "border-slate-200"} rounded-2xl px-6 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand placeholder:text-slate-300 transition-all`}
              />
              {fieldErrors.title && (
                <p className="text-rose-500 text-xs font-medium pl-1">{fieldErrors.title[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Slug</label>
              <div className={`flex items-center gap-2 text-slate-400 text-sm font-light bg-slate-50 px-4 py-3 rounded-xl border ${fieldErrors.slug ? "border-rose-300 ring-1 ring-rose-100" : "border-slate-200"}`}>
                <span>/blog/</span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="bg-transparent border-none p-0 focus:ring-0 w-full text-slate-600"
                />
              </div>
              {fieldErrors.slug && (
                <p className="text-rose-500 text-xs font-medium pl-1">{fieldErrors.slug[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Excerpt (Description)</label>
              <RichTextEditor 
                content={formData.excerpt} 
                onChange={(excerpt) => {
                  setFormData({ ...formData, excerpt });
                  if (fieldErrors.excerpt) setFieldErrors(prev => ({ ...prev, excerpt: [] }));
                }} 
              />
              {fieldErrors.excerpt && (
                <p className="text-rose-500 text-xs font-medium pl-1">{fieldErrors.excerpt[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Content</label>
              <RichTextEditor 
                content={formData.content} 
                onChange={(content) => {
                  setFormData({ ...formData, content });
                  if (fieldErrors.content) setFieldErrors(prev => ({ ...prev, content: [] }));
                }} 
              />
              {fieldErrors.content && (
                <p className="text-rose-500 text-xs font-medium pl-1">{fieldErrors.content[0]}</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand appearance-none cursor-pointer text-sm"
                >
                  {categories.length === 0 && <option value="">Loading categories...</option>}
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Read Time</label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand text-sm"
                placeholder="e.g. 5 min read"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Thumbnail Image <span className="text-[10px] text-slate-400 font-light">(Listing view)</span></label>
              
              {formData.thumbnail && (
                <div className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 mb-3 w-32">
                  <Image src={formData.thumbnail} alt="Thumbnail Preview" fill className="object-cover" unoptimized={true} />
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, thumbnail: "" })}
                    className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand text-sm"
                    placeholder="Thumbnail URL..."
                  />
                </div>
                <label className={`flex items-center justify-center p-3 rounded-xl border border-slate-200 transition-all cursor-pointer hover:bg-slate-50 ${uploadingThumbnail ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {uploadingThumbnail ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Upload className="w-4 h-4 text-slate-600" />}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    disabled={uploadingThumbnail}
                    onChange={handleThumbnailUpload} 
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Featured Image <span className="text-[10px] text-slate-400 font-light">(Article view)</span></label>
              
              {formData.image && (
                <div className="relative group aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 mb-3">
                  <Image src={formData.image} alt="Preview" fill className="object-cover" unoptimized={true} />
                  <button 
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand text-sm"
                    placeholder="Image URL or upload..."
                  />
                </div>
                <label className={`flex items-center justify-center p-3 rounded-xl border border-slate-200 transition-all cursor-pointer hover:bg-slate-50 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin text-slate-400" /> : <Upload className="w-4 h-4 text-slate-600" />}
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    disabled={uploading}
                    onChange={handleFeaturedImageUpload} 
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <User className="w-4 h-4" /> Author Details
              </label>
              <input
                type="text"
                placeholder="Author Name"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand text-sm mb-2"
              />
              <input
                type="text"
                placeholder="Author Role"
                value={formData.authorRole}
                onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand text-sm"
              />
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add tag..."
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand text-sm"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all"
                >
                  <Plus className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium group">
                    {tag}
                    <button 
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-rose-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {isManager(session?.user?.role) ? (
              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Publish immediately</span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, published: !formData.published })}
                  className={`w-12 h-6 rounded-full transition-all relative ${
                    formData.published ? "bg-brand" : "bg-slate-200"
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                    formData.published ? "left-7" : "left-1"
                  }`} />
                </button>
              </div>
            ) : (
                <div className="pt-6 border-t border-slate-100 italic text-slate-400 text-xs">
                    Access Note: Managers will review and publish your post after submission.
                </div>
            )}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-white py-4 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {loading ? "Saving..." : isManager(session?.user?.role) ? "Save Post" : "Submit for Review"}
          </button>

        </div>
      </form>
    </div>
  );
}
