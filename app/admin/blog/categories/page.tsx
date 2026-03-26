"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, ChevronLeft, Loader2, AlertCircle, Check, X } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal/Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", slug: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/blog/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      // Error is caught
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({ 
      ...formData, 
      name, 
      slug: generateSlug(name) 
    });
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", slug: "" });
    setError("");
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, slug: category.slug });
    setError("");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setError("");

    const url = editingCategory 
      ? `/api/blog/categories/${editingCategory.id}` 
      : "/api/blog/categories";
    const method = editingCategory ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setIsModalOpen(false);
        fetchCategories();
      } else {
        setError(data.error || "Failed to save category");
      }
    } catch {
        setError("An unexpected error occurred");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This might affect existing blog posts using this category.")) return;
    
    try {
      const res = await fetch(`/api/blog/categories/${id}`, { method: "DELETE" });
      if (res.ok) {
        setCategories(categories.filter((c) => c.id !== id));
      }
    } catch {
      alert("Failed to delete category");
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-slate-800 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-3xl font-light text-slate-800 tracking-tight">
              Blog <span className="font-medium">Categories</span>
            </h1>
            <p className="text-slate-500 font-light text-sm mt-1">
              Manage taxonomies for your editorial content.
            </p>
          </div>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand text-sm transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-slate-400 font-light flex items-center justify-center gap-3">
            <Loader2 className="w-5 h-5 animate-spin" /> Fetching categories...
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-20 text-center text-slate-400 font-light">
            No categories found. Create your first one above.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Name</th>
                <th className="px-8 py-5">Slug</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="text-sm font-semibold text-slate-800">{cat.name}</p>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs text-slate-500 font-light">/{cat.slug}</p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => openEditModal(cat)}
                        className="p-2 text-slate-400 hover:text-brand transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white w-full max-w-md rounded-4xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingCategory ? "Edit Category" : "Add Category"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {error && (
                <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-xs mb-6 flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Category Name</label>
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="e.g. Engineering"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-brand transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">URL Slug</label>
                  <input 
                    required
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. engineering"
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:outline-none focus:border-brand transition-all text-sm"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 border border-slate-100 text-slate-500 rounded-xl font-medium text-sm hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 py-3 bg-brand text-white rounded-xl font-bold text-sm hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center justify-center gap-2"
                  >
                    {formLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    {editingCategory ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
