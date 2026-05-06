"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Loader2,
  Trash2,
  Edit2,
  Save,
  X,
  Users,
  UserPlus,
  Search,
  Check,
  Mail,
} from "lucide-react";

export interface ContactGroup {
  id: string;
  name: string;
  description?: string | null;
  color?: string | null;
  _count?: { members: number };
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string | null;
  status: string;
  groups?: { group: { id: string; name: string; color?: string | null } }[];
}

interface GroupMember {
  groupId: string;
  subscriberId: string;
  subscriber: Subscriber;
}

interface Props {
  groups: ContactGroup[];
  subscribers: Subscriber[];
  loading: boolean;
  onChanged: () => void;
}

export default function GroupManager({ groups, subscribers, loading, onChanged }: Props) {
  const [editing, setEditing] = useState<Partial<ContactGroup> | null>(null);
  const [saving, setSaving] = useState(false);
  const [managingMembers, setManagingMembers] = useState<ContactGroup | null>(null);

  const handleSave = async () => {
    if (!editing?.name?.trim()) return;
    setSaving(true);
    try {
      const isNew = !editing.id;
      const res = await fetch(
        isNew ? "/api/admin/newsletter/groups" : `/api/admin/newsletter/groups/${editing.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editing),
        }
      );
      if (res.ok) {
        setEditing(null);
        onChanged();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save group");
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this group? Subscribers will not be removed.")) return;
    const res = await fetch(`/api/admin/newsletter/groups/${id}`, { method: "DELETE" });
    if (res.ok) onChanged();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Contact Groups</h2>
          <p className="text-xs text-slate-500">
            Organize subscribers into groups, then target newsletters at specific groups.
          </p>
        </div>
        <button
          onClick={() => setEditing({ name: "", description: "", color: "#0ea5e9" })}
          className="bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-dark transition-all flex items-center gap-2 shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Group
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-brand" />
        </div>
      ) : groups.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-16 text-center text-slate-400">
          No groups yet. Create your first group to start segmenting subscribers.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((g) => (
            <div
              key={g.id}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: (g.color || "#0ea5e9") + "20", color: g.color || "#0ea5e9" }}
                >
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditing(g)}
                    className="p-2 text-slate-400 hover:text-brand rounded-lg hover:bg-brand/5"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{g.name}</h3>
              {g.description && (
                <p className="text-xs text-slate-500 mb-3 line-clamp-2">{g.description}</p>
              )}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                <span className="text-xs text-slate-500 font-medium">
                  {g._count?.members ?? 0} {g._count?.members === 1 ? "member" : "members"}
                </span>
                <button
                  onClick={() => setManagingMembers(g)}
                  className="text-xs font-bold text-brand hover:text-brand-dark flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" /> Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <Modal title={editing.id ? "Edit Group" : "New Group"} onClose={() => setEditing(null)}>
          <div className="p-6 space-y-4">
            <Field label="Group Name">
              <input
                type="text"
                value={editing.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                placeholder="e.g. Care Home Owners"
                className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none text-sm"
              />
            </Field>
            <Field label="Description (optional)">
              <textarea
                rows={3}
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none text-sm"
              />
            </Field>
            <Field label="Color">
              <input
                type="color"
                value={editing.color || "#0ea5e9"}
                onChange={(e) => setEditing({ ...editing, color: e.target.value })}
                className="w-16 h-10 rounded-lg border border-slate-200 cursor-pointer"
              />
            </Field>
          </div>
          <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-3">
            <button
              onClick={() => setEditing(null)}
              className="px-6 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !editing.name?.trim()}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-brand text-white hover:bg-brand-dark flex items-center gap-2 disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save
            </button>
          </div>
        </Modal>
      )}

      {managingMembers && (
        <MembersModal
          group={managingMembers}
          allSubscribers={subscribers}
          onClose={() => setManagingMembers(null)}
          onChanged={onChanged}
        />
      )}
    </div>
  );
}

function MembersModal({
  group,
  allSubscribers,
  onClose,
  onChanged,
}: {
  group: ContactGroup;
  allSubscribers: Subscriber[];
  onClose: () => void;
  onChanged: () => void;
}) {
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [addNotice, setAddNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/admin/newsletter/groups/${group.id}`)
      .then((r) => r.json())
      .then((data) => {
        setMembers(data.members || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [group.id]);

  const memberIds = new Set(members.map((m) => m.subscriberId));

  const filtered = allSubscribers.filter((s) => {
    const text = (s.email + " " + (s.name || "")).toLowerCase();
    return text.includes(search.toLowerCase());
  });

  const addMember = async (subscriberId: string) => {
    setBusy(subscriberId);
    try {
      await fetch(`/api/admin/newsletter/groups/${group.id}/members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriberIds: [subscriberId] }),
      });
      const sub = allSubscribers.find((s) => s.id === subscriberId);
      if (sub) {
        setMembers((m) => [
          ...m,
          { groupId: group.id, subscriberId, subscriber: sub },
        ]);
      }
      onChanged();
    } finally {
      setBusy(null);
    }
  };

  const removeMember = async (subscriberId: string) => {
    setBusy(subscriberId);
    try {
      await fetch(`/api/admin/newsletter/groups/${group.id}/members`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriberIds: [subscriberId] }),
      });
      setMembers((m) => m.filter((x) => x.subscriberId !== subscriberId));
      onChanged();
    } finally {
      setBusy(null);
    }
  };

  const addManualEmail = async () => {
    setAddError(null);
    setAddNotice(null);
    const email = newEmail.trim().toLowerCase();
    const name = newName.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setAddError("Enter a valid email address.");
      return;
    }

    setAdding(true);
    try {
      const upsertRes = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: name || undefined }),
      });
      const subscriber: Subscriber = await upsertRes.json();
      if (!upsertRes.ok || !subscriber?.id) {
        setAddError("Failed to add subscriber.");
        return;
      }

      if (memberIds.has(subscriber.id)) {
        setAddNotice(`${email} is already in this group.`);
      } else {
        await fetch(`/api/admin/newsletter/groups/${group.id}/members`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subscriberIds: [subscriber.id] }),
        });
        setMembers((m) => [
          { groupId: group.id, subscriberId: subscriber.id, subscriber },
          ...m,
        ]);
        setAddNotice(`Added ${email} to ${group.name}.`);
      }
      setNewEmail("");
      setNewName("");
      onChanged();
    } catch {
      setAddError("Network error. Try again.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <Modal title={`Manage members – ${group.name}`} onClose={onClose}>
      <div className="p-6">
        {/* Manually add an email */}
        <div className="bg-brand/5 border border-brand/10 rounded-2xl p-4 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand/80 mb-3 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" /> Add by email
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_180px_auto] gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => {
                setNewEmail(e.target.value);
                setAddError(null);
                setAddNotice(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") addManualEmail();
              }}
              placeholder="email@example.com"
              className="bg-white border border-slate-200 focus:border-brand rounded-xl px-4 py-2.5 outline-none text-sm"
            />
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addManualEmail();
              }}
              placeholder="Name (optional)"
              className="bg-white border border-slate-200 focus:border-brand rounded-xl px-4 py-2.5 outline-none text-sm"
            />
            <button
              onClick={addManualEmail}
              disabled={adding || !newEmail.trim()}
              className="bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-dark transition-all flex items-center gap-2 disabled:opacity-50 justify-center"
            >
              {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Add
            </button>
          </div>
          {addError && (
            <p className="mt-2 text-xs text-rose-600 font-medium">{addError}</p>
          )}
          {addNotice && (
            <p className="mt-2 text-xs text-emerald-600 font-medium">{addNotice}</p>
          )}
          <p className="mt-2 text-[11px] text-slate-400">
            New emails are added to your subscriber list and immediately joined to this group. Existing subscribers are reused.
          </p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subscribers..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 focus:border-brand rounded-xl outline-none text-sm"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-brand" />
          </div>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto divide-y divide-slate-50 border border-slate-100 rounded-xl">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-400">No subscribers match.</div>
            ) : (
              filtered.map((s) => {
                const inGroup = memberIds.has(s.id);
                const isBusy = busy === s.id;
                return (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50/60"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-slate-800 truncate">
                        {s.name || s.email}
                      </p>
                      {s.name && <p className="text-xs text-slate-400 truncate">{s.email}</p>}
                    </div>
                    {inGroup ? (
                      <button
                        onClick={() => removeMember(s.id)}
                        disabled={isBusy}
                        className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {isBusy ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
                        Remove
                      </button>
                    ) : (
                      <button
                        onClick={() => addMember(s.id)}
                        disabled={isBusy}
                        className="text-xs font-bold text-brand bg-brand/10 hover:bg-brand/15 px-3 py-1.5 rounded-lg flex items-center gap-1.5 disabled:opacity-50"
                      >
                        {isBusy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                        Add
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex justify-between items-center">
        <span className="text-xs text-slate-500">
          {members.length} {members.length === 1 ? "member" : "members"} in this group
        </span>
        <button
          onClick={onClose}
          className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50"
        >
          Done
        </button>
      </div>
    </Modal>
  );
}

function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}
