"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Mail,
  Trash2,
  Search,
  Download,
  Calendar,
  Loader2,
  AlertCircle,
  Users,
  FileText,
  Plus,
  Send,
  Edit2,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GroupManager, { ContactGroup, Subscriber } from "./components/GroupManager";
import NewsletterComposer, { NewsletterDraft } from "./components/NewsletterComposer";

interface NewsletterCampaign {
  id: string;
  title: string;
  subject: string;
  preheader?: string | null;
  content: string;
  status: string;
  sendToAll: boolean;
  recipientCount: number;
  successCount: number;
  failureCount: number;
  sentAt?: string | null;
  updatedAt: string;
  targetGroups: { group: { id: string; name: string; color?: string | null } }[];
}

type Tab = "subscribers" | "groups" | "newsletters";

export default function NewsletterAdmin() {
  const [tab, setTab] = useState<Tab>("subscribers");
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [groups, setGroups] = useState<ContactGroup[]>([]);
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [composing, setComposing] = useState<NewsletterDraft | null>(null);

  const fetchSubscribers = useCallback(async () => {
    setLoadingSubs(true);
    try {
      const res = await fetch("/api/admin/newsletter");
      const data = await res.json();
      if (res.ok) setSubscribers(data);
      else setError(data.error);
    } catch {
      setError("Failed to load subscribers.");
    } finally {
      setLoadingSubs(false);
    }
  }, []);

  const fetchGroups = useCallback(async () => {
    setLoadingGroups(true);
    try {
      const res = await fetch("/api/admin/newsletter/groups");
      const data = await res.json();
      if (res.ok) setGroups(data);
    } finally {
      setLoadingGroups(false);
    }
  }, []);

  const fetchCampaigns = useCallback(async () => {
    setLoadingCampaigns(true);
    try {
      const res = await fetch("/api/admin/newsletter/campaigns");
      const data = await res.json();
      if (res.ok) setCampaigns(data);
    } finally {
      setLoadingCampaigns(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscribers();
    fetchGroups();
    fetchCampaigns();
  }, [fetchSubscribers, fetchGroups, fetchCampaigns]);

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) setSubscribers((prev) => prev.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  const handleDeleteCampaign = async (id: string) => {
    if (!confirm("Delete this newsletter? Sent newsletters can be deleted but emails already sent cannot be recalled.")) return;
    const res = await fetch(`/api/admin/newsletter/campaigns/${id}`, { method: "DELETE" });
    if (res.ok) fetchCampaigns();
  };

  const filteredSubs = subscribers.filter((s) =>
    (s.email + " " + (s.name || "")).toLowerCase().includes(search.toLowerCase())
  );

  const downloadCSV = () => {
    const csv = [
      ["ID", "Email", "Name", "Status", "Groups", "Subscribed At"],
      ...subscribers.map((s) => [
        s.id,
        s.email,
        s.name || "",
        s.status,
        (s.groups || []).map((g) => g.group.name).join(" | "),
        new Date((s as Subscriber & { createdAt: string }).createdAt).toLocaleString(),
      ]),
    ]
      .map((e) => e.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const openNewCampaign = () => {
    setComposing({
      title: "",
      subject: "",
      preheader: "",
      content: "",
      sendToAll: false,
      groupIds: [],
    });
  };

  const openEditCampaign = (c: NewsletterCampaign) => {
    setComposing({
      id: c.id,
      title: c.title,
      subject: c.subject,
      preheader: c.preheader || "",
      content: c.content,
      sendToAll: c.sendToAll,
      groupIds: c.targetGroups.map((g) => g.group.id),
      status: c.status,
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Newsletter</h1>
          <p className="text-slate-500 mt-2">
            Manage subscribers, organize them into groups, and design custom newsletters.
          </p>
        </div>
        {tab === "subscribers" && (
          <button
            onClick={downloadCSV}
            className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
        {tab === "newsletters" && (
          <button
            onClick={openNewCampaign}
            className="bg-brand text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-dark transition-all flex items-center gap-2 shadow-sm shadow-brand/20"
          >
            <Plus className="w-4 h-4" /> Create Newsletter
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Mail className="w-5 h-5" />} label="Subscribers" value={subscribers.length} />
        <StatCard icon={<Users className="w-5 h-5" />} label="Contact Groups" value={groups.length} />
        <StatCard icon={<FileText className="w-5 h-5" />} label="Newsletters Sent" value={campaigns.filter((c) => c.status === "SENT").length} />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit">
        <TabButton icon={<Mail className="w-4 h-4" />} label="Subscribers" active={tab === "subscribers"} onClick={() => setTab("subscribers")} />
        <TabButton icon={<Users className="w-4 h-4" />} label="Groups" active={tab === "groups"} onClick={() => setTab("groups")} />
        <TabButton icon={<FileText className="w-4 h-4" />} label="Newsletters" active={tab === "newsletters"} onClick={() => setTab("newsletters")} />
      </div>

      {/* Subscribers tab */}
      {tab === "subscribers" && (
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by email or name..."
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
                  <th className="px-8 py-5">Groups</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5">Subscribed</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <AnimatePresence mode="popLayout">
                  {loadingSubs ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-brand mx-auto mb-4" />
                        <p className="text-slate-500 font-medium">Loading subscribers...</p>
                      </td>
                    </tr>
                  ) : filteredSubs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center text-slate-500">
                        <Mail className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        No subscribers found.
                      </td>
                    </tr>
                  ) : (
                    filteredSubs.map((s) => (
                      <motion.tr
                        key={s.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="px-8 py-5">
                          <div>
                            <p className="font-medium text-slate-700">{s.email}</p>
                            {s.name && <p className="text-xs text-slate-400">{s.name}</p>}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {(s.groups || []).length === 0 ? (
                              <span className="text-xs text-slate-300">—</span>
                            ) : (
                              s.groups!.map((g) => (
                                <span
                                  key={g.group.id}
                                  className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded"
                                  style={{
                                    backgroundColor: (g.group.color || "#0ea5e9") + "20",
                                    color: g.group.color || "#0ea5e9",
                                  }}
                                >
                                  {g.group.name}
                                </span>
                              ))
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase">
                            {s.status}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-slate-500 text-sm">
                            <Calendar className="w-4 h-4 text-slate-300" />
                            {new Date((s as Subscriber & { createdAt: string }).createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(s.id)}
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
      )}

      {/* Groups tab */}
      {tab === "groups" && (
        <GroupManager
          groups={groups}
          subscribers={subscribers}
          loading={loadingGroups || loadingSubs}
          onChanged={() => {
            fetchGroups();
            fetchSubscribers();
          }}
        />
      )}

      {/* Newsletters tab */}
      {tab === "newsletters" && (
        <CampaignsList
          campaigns={campaigns}
          loading={loadingCampaigns}
          onEdit={openEditCampaign}
          onDelete={handleDeleteCampaign}
        />
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl max-w-md mx-auto">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {composing && (
        <NewsletterComposer
          draft={composing}
          groups={groups}
          onClose={() => setComposing(null)}
          onSaved={() => {
            fetchCampaigns();
          }}
        />
      )}
    </div>
  );
}

function TabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
        active ? "bg-brand text-white shadow-md shadow-brand/20" : "text-slate-500 hover:bg-slate-50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="w-10 h-10 rounded-2xl bg-brand/5 text-brand flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h2 className="text-3xl font-bold text-slate-900 mt-1">{value}</h2>
    </div>
  );
}

function CampaignsList({
  campaigns,
  loading,
  onEdit,
  onDelete,
}: {
  campaigns: NewsletterCampaign[];
  loading: boolean;
  onEdit: (c: NewsletterCampaign) => void;
  onDelete: (id: string) => void;
}) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-16 text-center">
        <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
        <p className="text-slate-500 font-medium">No newsletters yet.</p>
        <p className="text-sm text-slate-400 mt-1">
          Click &quot;Create Newsletter&quot; to design your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {campaigns.map((c) => (
        <div
          key={c.id}
          className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col"
        >
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between mb-3">
              <CampaignStatus status={c.status} />
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onEdit(c)}
                  className="p-2 text-slate-400 hover:text-brand rounded-lg hover:bg-brand/5"
                  title={c.status === "SENT" ? "View" : "Edit"}
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(c.id)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1">{c.title}</h3>
            <p className="text-sm text-slate-500 truncate" title={c.subject}>
              {c.subject}
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.sendToAll ? (
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-emerald-50 text-emerald-600 rounded">
                  All subscribers
                </span>
              ) : c.targetGroups.length === 0 ? (
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-slate-100 text-slate-400 rounded">
                  No audience
                </span>
              ) : (
                c.targetGroups.map((g) => (
                  <span
                    key={g.group.id}
                    className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: (g.group.color || "#0ea5e9") + "20",
                      color: g.group.color || "#0ea5e9",
                    }}
                  >
                    {g.group.name}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="px-6 py-4 bg-slate-50/40 border-t border-slate-50 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-3">
              {c.status === "SENT" && (
                <>
                  <span className="flex items-center gap-1">
                    <Send className="w-3 h-3" />
                    {c.successCount}/{c.recipientCount} delivered
                  </span>
                  {c.failureCount > 0 && (
                    <span className="text-rose-500">{c.failureCount} failed</span>
                  )}
                </>
              )}
            </div>
            <span>
              {c.sentAt
                ? `Sent ${new Date(c.sentAt).toLocaleDateString()}`
                : `Updated ${new Date(c.updatedAt).toLocaleDateString()}`}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CampaignStatus({ status }: { status: string }) {
  const map: Record<string, { color: string; label: string; icon: React.ReactNode }> = {
    DRAFT: { color: "bg-slate-100 text-slate-500", label: "Draft", icon: <Clock className="w-3.5 h-3.5" /> },
    SENT: { color: "bg-emerald-50 text-emerald-600", label: "Sent", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    FAILED: { color: "bg-rose-50 text-rose-600", label: "Failed", icon: <XCircle className="w-3.5 h-3.5" /> },
  };
  const s = map[status] || map.DRAFT;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${s.color}`}
    >
      {s.icon}
      {s.label}
    </span>
  );
}
