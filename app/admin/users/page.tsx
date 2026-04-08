"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Loader2, Eye } from "lucide-react";
import Link from "next/link";
import Pagination from "../components/Pagination";

interface User {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  image: string | null;
  designation: string | null;
  createdAt: string;
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

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
        <Link 
          href="/admin/users/create"
          className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
        >
          <Plus className="w-4 h-4" /> Add User
        </Link>
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
                      <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm shrink-0 overflow-hidden relative">
                        {user.image ? (
                          <img src={user.image} alt={user.name || ""} className="w-full h-full object-cover" />
                        ) : (
                          user.name?.charAt(0) || user.email.charAt(0).toUpperCase()
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{user.name || "—"}</p>
                        <p className="text-[10px] text-brand font-bold uppercase tracking-widest leading-none mb-1">{user.designation}</p>
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
                      <Link 
                        href={`/admin/users/${user.id}`}
                        className="p-2 text-slate-400 hover:text-brand transition-colors"
                        title="View Profile"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link 
                        href={`/admin/users/${user.id}/edit`}
                        className="p-2 text-slate-400 hover:text-brand transition-colors"
                        title="Edit Profile"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        title="Delete User"
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
    </div>
  );
}
