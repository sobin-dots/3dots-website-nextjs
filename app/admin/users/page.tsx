"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Loader2 } from "lucide-react";
import Pagination from "../components/Pagination";

interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  createdAt: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Content Team",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const roles = ["Admin", "Content Team", "Lead Management"];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (user: User | null = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "", // Don't show password
        role: user.role || "Content Team",
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "Content Team",
      });
    }
    setIsModalOpen(true);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const url = editingUser ? `/api/admin/users/${editingUser.id}` : "/api/admin/users";
    const method = editingUser ? "PATCH" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || "Something went wrong");
      }

      setIsModalOpen(false);
      fetchUsers();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save user");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers(users.filter((u) => u.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            User <span className="font-medium">Management</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">
            Manage admin access and roles for your team.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-brand text-sm transition-all"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-20 text-center text-slate-400 font-light flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Loading users...
          </div>
        ) : users.length === 0 ? (
          <div className="p-20 text-center text-slate-400 font-light">No users found. Create your first one above.</div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">User</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Phone</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm shrink-0">
                        {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{user.name || "—"}</p>
                        <p className="text-xs text-slate-400 font-light">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                      user.role === 'Admin' ? 'bg-brand/10 text-brand' : 
                      user.role === 'Content Team' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-500 font-light">
                    {user.phone || "—"}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenModal(user)}
                        className="p-2 text-slate-400 hover:text-brand transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
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
        {users.length > 0 && !loading && (
          <div className="p-4 border-t border-slate-100">
            <Pagination currentPage={currentPage} totalPages={Math.ceil(users.length / ITEMS_PER_PAGE)} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          {/* Modal Container */}
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-1">Administration</p>
                <h3 className="text-2xl font-light text-slate-800 tracking-tight">
                  {editingUser ? "Edit" : "Add"} <span className="font-medium">User</span>
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-3 bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {error && (
                <div className="p-4 bg-rose-50 text-rose-600 text-sm rounded-2xl font-medium border border-rose-100">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-brand text-sm transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Phone</label>
                  <input 
                    type="text" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-brand text-sm transition-all"
                    placeholder="+91 ..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-brand text-sm transition-all"
                  placeholder="john@3dots.in"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">
                  Password {editingUser && "(Optional)"}
                </label>
                <input 
                  type="password" 
                  required={!editingUser}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 focus:outline-none focus:border-brand text-sm transition-all"
                  placeholder={editingUser ? "••••••••" : "Create a secure password"}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-2">Role Permissions</label>
                <div className="grid grid-cols-1 gap-2">
                  {roles.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setFormData({ ...formData, role })}
                      className={`flex items-center justify-between px-5 py-3 rounded-2xl border text-sm transition-all ${
                        formData.role === role 
                        ? 'bg-brand/5 border-brand text-brand font-medium' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      {role}
                      {formData.role === role && <div className="w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_rgba(37,140,123,0.5)]"></div>}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-col gap-3">
                <button 
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand text-white py-4 rounded-2xl font-semibold hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 disabled:opacity-50"
                >
                  {submitting ? "Saving Changes..." : editingUser ? "Update User" : "Create Account"}
                </button>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-800 transition-colors py-2"
                >
                  Dismiss
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
