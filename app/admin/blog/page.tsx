"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, ExternalLink, Filter, Calendar, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Pagination from "../components/Pagination";
import { blogCategories } from "../../blog/data";

interface Post {
  id: string;
  title: string;
  slug: string;
  category: string;
  authorName: string | null;
  published: boolean;
  date: string;
}

export default function BlogAdminPage() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [dateOrder, setDateOrder] = useState<"desc" | "asc">("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const authors = Array.from(new Set(posts.map(p => p.authorName || "Admin")));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "All" || post.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || 
                         (statusFilter === "Live" ? post.published : !post.published);
    const matchesAuthor = authorFilter === "All" || 
                         (authorFilter === "My Posts" ? (post.authorName === session?.user?.name) : post.authorName === authorFilter);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesAuthor;
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            Blog <span className="font-medium">Management</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">
            Create, edit, and manage your editorial content.
          </p>
        </div>
        <Link 
          href="/admin/blog/new" 
          className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {/* Toolbar & Filters */}
      <div className="space-y-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand text-sm transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category Filter */}
            <div className="relative group">
              <select 
                value={categoryFilter}
                onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-brand transition-all cursor-pointer"
              >
                <option value="All">All Categories</option>
                {blogCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative group">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-brand transition-all cursor-pointer"
              >
                <option value="All">All Status</option>
                <option value="Live">Live</option>
                <option value="Draft">Draft</option>
              </select>
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-400"></div>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Author Filter */}
            <div className="relative group">
              <select 
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2 text-sm focus:outline-none focus:border-brand transition-all cursor-pointer"
              >
                <option value="All">All Authors</option>
                <option value="My Posts">My Posts</option>
                <hr />
                {authors.map(author => (
                  <option key={author} value={author}>{author}</option>
                ))}
              </select>
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>

            {/* Date Sort */}
            <button 
              onClick={() => setDateOrder(prev => prev === "desc" ? "asc" : "desc")}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm hover:bg-slate-100 transition-all text-slate-600"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              {dateOrder === "desc" ? "Newest First" : "Oldest First"}
            </button>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-slate-400 font-light">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-20 text-center text-slate-400 font-light">No posts found. Create your first one above.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Title</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5">Date</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPosts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((post) => (
                <tr key={post.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="max-w-md">
                      <p className="text-sm font-semibold text-slate-800 line-clamp-1">{post.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-xs text-slate-400 font-light">/{post.slug}</p>
                        <span className="text-[10px] text-slate-300">•</span>
                        <p className="text-[10px] text-brand font-medium tracking-wider uppercase">{post.authorName || "Admin"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-light">
                    {new Date(post.date).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${
                      post.published ? "text-emerald-500" : "text-amber-500"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${post.published ? "bg-emerald-500" : "bg-amber-500"}`}></span>
                      {post.published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="p-2 text-slate-400 hover:text-brand transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <Link href={`/admin/blog/edit/${post.id}`} className="p-2 text-slate-400 hover:text-brand transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button onClick={() => handleDelete(post.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filteredPosts.length > 0 && !loading && (
          <div className="p-4 border-t border-slate-100">
            <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  );
}
