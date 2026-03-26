"use client";

import { useEffect, useState } from "react";
import { 
  Mail, 
  Trash2, 
  Search, 
  Download,
  Calendar,
  Loader2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Subscriber {
  id: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json();
      if (res.ok) {
        setSubscribers(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to load subscribers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;

    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setSubscribers(subscribers.filter(s => s.id !== id));
      }
    } catch (err) {
      alert("Failed to delete.");
    }
  };

  const filtered = subscribers.filter(s => 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const downloadCSV = () => {
    const csv = [
      ["ID", "Email", "Status", "Subscribed At"],
      ...subscribers.map(s => [s.id, s.email, s.status, new Date(s.createdAt).toLocaleString()])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Newsletter</h1>
          <p className="text-slate-500 mt-2">Manage your email community and export subscribers.</p>
        </div>
        <button 
          onClick={downloadCSV}
          className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-10 h-10 rounded-2xl bg-brand/5 text-brand flex items-center justify-center mb-4">
            <Mail className="w-5 h-5" />
          </div>
          <p className="text-slate-500 text-sm font-medium">Total Subscribers</p>
          <h2 className="text-3xl font-bold text-slate-900 mt-1">{subscribers.length}</h2>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-brand transition-all text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[13px] uppercase tracking-wider font-semibold border-b border-slate-50">
                <th className="px-8 py-5">Email Address</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Subscribed Date</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <Loader2 className="w-8 h-8 animate-spin text-brand mx-auto mb-4" />
                      <p className="text-slate-500 font-medium">Loading subscribers...</p>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-slate-500">
                      <Mail className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                      No subscribers found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((s) => (
                    <motion.tr 
                      key={s.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-slate-50/50 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <span className="font-medium text-slate-700">{s.email}</span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                          {s.status}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Calendar className="w-4 h-4 text-slate-300" />
                          {new Date(s.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => handleDelete(s.id)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl max-w-md mx-auto">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}
    </div>
  );
}
