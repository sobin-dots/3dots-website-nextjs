"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  Loader2,
  Save,
  Send,
  X,
  Mail,
  Users,
  CheckCircle2,
  Eye,
} from "lucide-react";

const NewsletterEditor = dynamic(() => import("@/components/NewsletterEditor"), {
  ssr: false,
  loading: () => (
    <div className="border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
      <Loader2 className="w-6 h-6 animate-spin mx-auto" />
    </div>
  ),
});

export interface ContactGroup {
  id: string;
  name: string;
  color?: string | null;
  description?: string | null;
  _count?: { members: number };
}

export interface NewsletterDraft {
  id?: string;
  title: string;
  subject: string;
  preheader?: string | null;
  content: string;
  sendToAll: boolean;
  groupIds: string[];
  status?: string;
}

interface Props {
  draft: NewsletterDraft;
  groups: ContactGroup[];
  onClose: () => void;
  onSaved: () => void;
}

type Tab = "design" | "settings" | "preview";

export default function NewsletterComposer({ draft, groups, onClose, onSaved }: Props) {
  const [tab, setTab] = useState<Tab>("design");
  const [state, setState] = useState<NewsletterDraft>(draft);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showSendConfirm, setShowSendConfirm] = useState(false);
  const [testTo, setTestTo] = useState("");

  useEffect(() => {
    setState(draft);
  }, [draft.id]);

  const isSent = state.status === "SENT";

  const update = (patch: Partial<NewsletterDraft>) => setState((s) => ({ ...s, ...patch }));

  const toggleGroup = (id: string) => {
    setState((s) => ({
      ...s,
      groupIds: s.groupIds.includes(id) ? s.groupIds.filter((g) => g !== id) : [...s.groupIds, id],
    }));
  };

  const save = async (opts?: { silent?: boolean }) => {
    if (!state.title.trim() || !state.subject.trim()) {
      setFeedback("Title and subject are required.");
      return null;
    }
    setSaving(true);
    setFeedback(null);
    try {
      const isNew = !state.id;
      const res = await fetch(
        isNew ? "/api/admin/newsletter/campaigns" : `/api/admin/newsletter/campaigns/${state.id}`,
        {
          method: isNew ? "POST" : "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        setFeedback(data.error || "Failed to save");
        return null;
      }
      setState((s) => ({ ...s, id: data.id, status: data.status }));
      if (!opts?.silent) setFeedback("Saved");
      onSaved();
      return data;
    } catch {
      setFeedback("Network error while saving");
      return null;
    } finally {
      setSaving(false);
    }
  };

  const handleSendTest = async () => {
    if (!testTo.trim()) {
      setFeedback("Enter an email to receive the test");
      return;
    }
    const saved = await save({ silent: true });
    const id = saved?.id || state.id;
    if (!id) return;

    setSending(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/newsletter/campaigns/${id}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ testRecipient: testTo.trim() }),
      });
      const data = await res.json();
      setFeedback(data.success ? `Test sent to ${testTo}` : data.error || "Test failed");
    } catch {
      setFeedback("Network error");
    } finally {
      setSending(false);
    }
  };

  const handleSend = async () => {
    if (!state.sendToAll && state.groupIds.length === 0) {
      setFeedback("Choose at least one group, or enable Send to all subscribers.");
      return;
    }
    const saved = await save({ silent: true });
    const id = saved?.id || state.id;
    if (!id) return;

    setSending(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/newsletter/campaigns/${id}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeedback(data.error || "Send failed");
      } else {
        setFeedback(`Sent to ${data.sent} of ${data.total} recipients (${data.failed} failed)`);
        setShowSendConfirm(false);
        onSaved();
      }
    } catch {
      setFeedback("Network error while sending");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-stretch justify-stretch">
      <div className="bg-slate-50 w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-slate-100 px-8 py-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {state.id ? (isSent ? "Newsletter (sent)" : "Edit Newsletter") : "New Newsletter"}
              </h2>
              <p className="text-xs text-slate-500">
                {isSent ? "This newsletter has already been sent and is read-only." : "Design and send to your subscribers."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-slate-100 rounded-xl p-1">
              {(["design", "settings", "preview"] as Tab[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                    tab === t ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <button
              onClick={() => save()}
              disabled={saving || isSent}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-100 transition-all flex items-center gap-2 disabled:opacity-40"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Draft
            </button>

            <button
              onClick={() => setShowSendConfirm(true)}
              disabled={isSent}
              className="px-6 py-2.5 rounded-xl text-sm font-bold bg-brand text-white hover:bg-brand-dark transition-all flex items-center gap-2 shadow-sm disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
              Send Newsletter
            </button>
          </div>
        </div>

        {feedback && (
          <div className="bg-amber-50 border-b border-amber-100 text-amber-700 text-sm px-8 py-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            {feedback}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-8 space-y-6">
            {/* Always-visible meta */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-4">
              <Field label="Internal Title">
                <input
                  type="text"
                  value={state.title}
                  onChange={(e) => update({ title: e.target.value })}
                  placeholder="e.g. October Product Update"
                  disabled={isSent}
                  className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none text-sm disabled:opacity-60"
                />
              </Field>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Email Subject Line">
                  <input
                    type="text"
                    value={state.subject}
                    onChange={(e) => update({ subject: e.target.value })}
                    placeholder="What recipients see"
                    disabled={isSent}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none text-sm disabled:opacity-60"
                  />
                </Field>
                <Field label="Preheader (optional)">
                  <input
                    type="text"
                    value={state.preheader || ""}
                    onChange={(e) => update({ preheader: e.target.value })}
                    placeholder="Preview text shown after the subject"
                    disabled={isSent}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none text-sm disabled:opacity-60"
                  />
                </Field>
              </div>
            </div>

            {tab === "design" && (
              <NewsletterEditor
                content={state.content}
                onChange={(html) => !isSent && update({ content: html })}
              />
            )}

            {tab === "settings" && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand" /> Audience
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Pick which contact groups receive this newsletter.
                  </p>

                  <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer mb-4">
                    <input
                      type="checkbox"
                      checked={state.sendToAll}
                      onChange={(e) => update({ sendToAll: e.target.checked })}
                      disabled={isSent}
                      className="w-4 h-4"
                    />
                    <div>
                      <p className="text-sm font-bold text-slate-800">Send to all active subscribers</p>
                      <p className="text-xs text-slate-500">Bypass groups and send to every active subscriber.</p>
                    </div>
                  </label>

                  <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mb-2">
                    Or pick groups
                  </p>
                  {groups.length === 0 ? (
                    <div className="text-sm text-slate-400 italic">
                      No groups yet. Create one from the Groups tab first.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {groups.map((g) => {
                        const checked = state.groupIds.includes(g.id);
                        return (
                          <label
                            key={g.id}
                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                              checked
                                ? "border-brand bg-brand/5"
                                : "border-slate-100 bg-white hover:border-slate-200"
                            } ${state.sendToAll ? "opacity-50 pointer-events-none" : ""}`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleGroup(g.id)}
                              disabled={isSent || state.sendToAll}
                              className="w-4 h-4"
                            />
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {g.color && (
                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                              )}
                              <div className="min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate">{g.name}</p>
                                <p className="text-[11px] text-slate-400">{g._count?.members ?? 0} members</p>
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-6">
                  <h3 className="text-sm font-bold text-slate-800 mb-1">Send a test</h3>
                  <p className="text-xs text-slate-500 mb-3">
                    Send the newsletter to a single email to preview it in your inbox.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={testTo}
                      onChange={(e) => setTestTo(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none text-sm"
                    />
                    <button
                      onClick={handleSendTest}
                      disabled={sending || !testTo}
                      className="px-5 py-3 rounded-xl text-sm font-bold bg-slate-800 text-white hover:bg-slate-900 transition-all flex items-center gap-2 disabled:opacity-40"
                    >
                      {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                      Send Test
                    </button>
                  </div>
                </div>
              </div>
            )}

            {tab === "preview" && (
              <div className="bg-white rounded-2xl border border-slate-100 p-2 shadow-sm">
                <div className="px-4 py-3 border-b border-slate-100 text-xs text-slate-500 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Subject:&nbsp;
                  <span className="font-medium text-slate-800">{state.subject || "(no subject)"}</span>
                </div>
                <div className="bg-slate-50 p-8">
                  <div
                    className="bg-white max-w-[600px] mx-auto rounded-2xl shadow-sm border border-slate-100 p-10 prose prose-slate max-w-none"
                    dangerouslySetInnerHTML={{ __html: state.content || "<p style='color:#94a3b8'>Empty newsletter — switch to Design and start writing.</p>" }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Send confirmation modal */}
        {showSendConfirm && (
          <div className="absolute inset-0 bg-slate-900/60 z-10 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
              <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Send this newsletter?</h3>
              <p className="text-sm text-slate-500 mb-6">
                {state.sendToAll
                  ? "This will send to every active subscriber."
                  : `This will send to ${state.groupIds.length} group${state.groupIds.length === 1 ? "" : "s"}.`}{" "}
                You can&apos;t edit it after it sends.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowSendConfirm(false)}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold bg-brand text-white hover:bg-brand-dark flex items-center gap-2 disabled:opacity-50"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Send Now
                </button>
              </div>
            </div>
          </div>
        )}
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
