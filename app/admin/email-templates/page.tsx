"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Loader2,
  Mail,
  Save,
  X,
  Send,
  Link2,
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  description?: string | null;
  isActive?: boolean;
  updatedAt: string;
}

interface FormEvent {
  key: string;
  label: string;
  group: string;
  audience: "admin" | "user";
  description: string;
  variables: string[];
  mapping: {
    id: string;
    formKey: string;
    templateId: string;
    enabled: boolean;
    template: { id: string; name: string; subject: string; isActive: boolean };
  } | null;
}

interface EmailLog {
  id: string;
  formKey: string;
  to: string;
  subject: string;
  status: string;
  error?: string | null;
  messageId?: string | null;
  createdAt: string;
}

type Tab = "templates" | "mappings" | "logs";

export default function EmailTemplatesPage() {
  const [tab, setTab] = useState<Tab>("templates");

  // Templates state
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState<Partial<EmailTemplate> | null>(null);
  const [saving, setSaving] = useState(false);

  // Test send state
  const [testTemplate, setTestTemplate] = useState<EmailTemplate | null>(null);
  const [testTo, setTestTo] = useState("");
  const [testVarsText, setTestVarsText] = useState("{}");
  const [testSending, setTestSending] = useState(false);
  const [testFeedback, setTestFeedback] = useState<string | null>(null);

  // Mappings state
  const [events, setEvents] = useState<FormEvent[]>([]);
  const [loadingMappings, setLoadingMappings] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);

  // Logs state
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (tab === "mappings") fetchMappings();
    if (tab === "logs") fetchLogs();
  }, [tab]);

  const fetchTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const res = await fetch("/api/admin/email-templates");
      const data = await res.json();
      setTemplates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch templates", error);
    } finally {
      setLoadingTemplates(false);
    }
  };

  const fetchMappings = async () => {
    setLoadingMappings(true);
    try {
      const res = await fetch("/api/admin/form-mappings");
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error("Failed to fetch mappings", error);
    } finally {
      setLoadingMappings(false);
    }
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const res = await fetch("/api/admin/email-logs?limit=100");
      const data = await res.json();
      setLogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setLoadingLogs(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!editingTemplate?.name || !editingTemplate?.subject || !editingTemplate?.body) return;

    setSaving(true);
    const isNew = !editingTemplate.id;
    const url = isNew
      ? "/api/admin/email-templates"
      : `/api/admin/email-templates/${editingTemplate.id}`;
    const method = isNew ? "POST" : "PATCH";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingTemplate),
      });
      if (res.ok) {
        setEditingTemplate(null);
        fetchTemplates();
      }
    } catch (error) {
      console.error("Failed to save template", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTemplate = async (id: string) => {
    if (!confirm("Are you sure you want to delete this template?")) return;
    try {
      const res = await fetch(`/api/admin/email-templates/${id}`, { method: "DELETE" });
      if (res.ok) fetchTemplates();
    } catch (error) {
      console.error("Failed to delete template", error);
    }
  };

  const handleSaveMapping = async (
    formKey: string,
    templateId: string | null,
    enabled: boolean
  ) => {
    setSavingKey(formKey);
    try {
      if (!templateId) {
        await fetch(`/api/admin/form-mappings/${formKey}`, { method: "DELETE" });
      } else {
        await fetch("/api/admin/form-mappings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ formKey, templateId, enabled }),
        });
      }
      await fetchMappings();
    } catch (error) {
      console.error("Failed to save mapping", error);
    } finally {
      setSavingKey(null);
    }
  };

  const openTestSend = (template: EmailTemplate) => {
    const re = /\{\{\s*([\w.]+)\s*\}\}/g;
    const subjectVars = [...template.subject.matchAll(re)].map((m) => m[1]);
    const bodyVars = [...template.body.matchAll(re)].map((m) => m[1]);
    const all = Array.from(new Set([...subjectVars, ...bodyVars]));
    const sample: Record<string, string> = {};
    all.forEach((k) => (sample[k] = `Sample ${k}`));
    setTestTemplate(template);
    setTestTo("");
    setTestVarsText(JSON.stringify(sample, null, 2));
    setTestFeedback(null);
  };

  const handleTestSend = async () => {
    if (!testTemplate || !testTo) return;
    setTestSending(true);
    setTestFeedback(null);
    try {
      let variables: Record<string, string> = {};
      try {
        variables = testVarsText.trim() ? JSON.parse(testVarsText) : {};
      } catch {
        setTestFeedback("Variables must be valid JSON.");
        setTestSending(false);
        return;
      }
      const res = await fetch("/api/admin/email-templates/test-send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ templateId: testTemplate.id, to: testTo, variables }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTestFeedback(data.error || "Failed to send.");
      } else {
        setTestFeedback(`Sent! Message ID: ${data.messageId || "(none)"}`);
      }
    } catch (e) {
      setTestFeedback("Network error sending test email.");
    } finally {
      setTestSending(false);
    }
  };

  const groupedEvents = useMemo(() => {
    const groups: Record<string, FormEvent[]> = {};
    for (const event of events) {
      groups[event.group] = groups[event.group] || [];
      groups[event.group].push(event);
    }
    return groups;
  }, [events]);

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-light text-slate-800 tracking-tight">
            Email <span className="font-bold">Notifications</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">
            Manage templates, map them to forms, and track delivery via AWS SES.
          </p>
        </div>
        {tab === "templates" && (
          <button
            onClick={() =>
              setEditingTemplate({ name: "", subject: "", body: "", isActive: true })
            }
            className="bg-brand text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Template
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit">
        <TabButton
          icon={<Mail className="w-4 h-4" />}
          label="Templates"
          active={tab === "templates"}
          onClick={() => setTab("templates")}
        />
        <TabButton
          icon={<Link2 className="w-4 h-4" />}
          label="Form Mappings"
          active={tab === "mappings"}
          onClick={() => setTab("mappings")}
        />
        <TabButton
          icon={<Activity className="w-4 h-4" />}
          label="Activity"
          active={tab === "logs"}
          onClick={() => setTab("logs")}
        />
      </div>

      {/* TEMPLATES */}
      {tab === "templates" && (
        <>
          {loadingTemplates ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
          ) : templates.length === 0 ? (
            <EmptyState message="No templates yet. Create your first email template." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-brand/5 rounded-xl flex items-center justify-center text-brand">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        title="Test send"
                        onClick={() => openTestSend(template)}
                        className="p-2 text-slate-400 hover:text-brand rounded-lg hover:bg-brand/5"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                      <button
                        title="Edit"
                        onClick={() => setEditingTemplate(template)}
                        className="p-2 text-slate-400 hover:text-brand rounded-lg hover:bg-brand/5"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">{template.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-1 truncate">
                    {template.subject}
                  </p>
                  {template.description && (
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">
                      {template.description}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        template.isActive === false
                          ? "bg-slate-100 text-slate-500"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {template.isActive === false ? "Inactive" : "Active"}
                    </span>
                    <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* FORM MAPPINGS */}
      {tab === "mappings" && (
        <>
          {loadingMappings ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedEvents).map(([groupName, groupEvents]) => (
                <div key={groupName}>
                  <h2 className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 pl-1">
                    {groupName}
                  </h2>
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
                    {groupEvents.map((event) => (
                      <MappingRow
                        key={event.key}
                        event={event}
                        templates={templates}
                        saving={savingKey === event.key}
                        onSave={handleSaveMapping}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* LOGS */}
      {tab === "logs" && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {loadingLogs ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
          ) : logs.length === 0 ? (
            <EmptyState message="No emails have been sent yet." />
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-50/60 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Form</th>
                  <th className="px-6 py-4 text-left">Recipient</th>
                  <th className="px-6 py-4 text-left">Subject</th>
                  <th className="px-6 py-4 text-left">When</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/40">
                    <td className="px-6 py-4">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-6 py-4 text-slate-700 font-medium">{log.formKey}</td>
                    <td className="px-6 py-4 text-slate-500">{log.to}</td>
                    <td className="px-6 py-4 text-slate-500 max-w-xs truncate" title={log.subject}>
                      {log.subject}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Editor Modal */}
      {editingTemplate && (
        <TemplateEditorModal
          template={editingTemplate}
          onChange={setEditingTemplate}
          onSave={handleSaveTemplate}
          onClose={() => setEditingTemplate(null)}
          saving={saving}
        />
      )}

      {/* Test Send Modal */}
      {testTemplate && (
        <Modal title={`Test send: ${testTemplate.name}`} onClose={() => setTestTemplate(null)}>
          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <Field label="Recipient">
              <input
                type="email"
                value={testTo}
                onChange={(e) => setTestTo(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm"
              />
            </Field>
            <Field label="Variables (JSON)">
              <textarea
                rows={8}
                value={testVarsText}
                onChange={(e) => setTestVarsText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm font-mono"
              />
            </Field>
            {testFeedback && (
              <div className="text-sm bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-700">
                {testFeedback}
              </div>
            )}
          </div>
          <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-3">
            <button
              onClick={() => setTestTemplate(null)}
              className="px-8 py-4 rounded-full text-sm font-bold text-slate-500 hover:text-slate-700 transition-all"
            >
              Close
            </button>
            <button
              onClick={handleTestSend}
              disabled={testSending || !testTo}
              className="bg-brand text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center gap-2 disabled:opacity-50"
            >
              {testSending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Send Test
            </button>
          </div>
        </Modal>
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
        active
          ? "bg-brand text-white shadow-md shadow-brand/20"
          : "text-slate-500 hover:bg-slate-50"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 pl-1">
        {label}
      </label>
      {children}
    </div>
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
      <div className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-2xl flex items-center justify-center text-white">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function MappingRow({
  event,
  templates,
  saving,
  onSave,
}: {
  event: FormEvent;
  templates: EmailTemplate[];
  saving: boolean;
  onSave: (formKey: string, templateId: string | null, enabled: boolean) => void;
}) {
  const [templateId, setTemplateId] = useState(event.mapping?.templateId ?? "");
  const [enabled, setEnabled] = useState(event.mapping?.enabled ?? true);

  useEffect(() => {
    setTemplateId(event.mapping?.templateId ?? "");
    setEnabled(event.mapping?.enabled ?? true);
  }, [event.mapping?.templateId, event.mapping?.enabled]);

  const dirty =
    templateId !== (event.mapping?.templateId ?? "") ||
    enabled !== (event.mapping?.enabled ?? true);

  return (
    <div className="px-6 py-5 flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-bold text-slate-800">{event.label}</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
              event.audience === "admin"
                ? "bg-amber-50 text-amber-600"
                : "bg-blue-50 text-blue-600"
            }`}
          >
            {event.audience}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-2">{event.description}</p>
        <code className="text-[10px] text-slate-400 bg-slate-50 rounded px-2 py-0.5">
          {event.key}
        </code>
        {event.variables.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {event.variables.map((v) => (
              <span
                key={v}
                className="text-[10px] font-mono bg-brand/5 text-brand/80 px-2 py-0.5 rounded"
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 md:gap-3 md:w-[460px]">
        <select
          value={templateId}
          onChange={(e) => setTemplateId(e.target.value)}
          className="flex-1 bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-3 py-2.5 text-sm outline-none"
        >
          <option value="">— No template —</option>
          {templates.map((t) => (
            <option key={t.id} value={t.id} disabled={t.isActive === false}>
              {t.name}
              {t.isActive === false ? " (inactive)" : ""}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-600 select-none">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
          />
          On
        </label>
        <button
          disabled={!dirty || saving}
          onClick={() => onSave(event.key, templateId || null, enabled)}
          className="bg-brand text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-dark transition-all disabled:opacity-40 flex items-center gap-1.5"
        >
          {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { color: string; icon: React.ReactNode }> = {
    SENT: {
      color: "bg-emerald-50 text-emerald-600",
      icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    },
    FAILED: { color: "bg-red-50 text-red-600", icon: <XCircle className="w-3.5 h-3.5" /> },
    SKIPPED: { color: "bg-slate-100 text-slate-500", icon: <Clock className="w-3.5 h-3.5" /> },
  };
  const s = map[status] || map.SKIPPED;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${s.color}`}
    >
      {s.icon}
      {status}
    </span>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-16 text-center text-slate-400 text-sm">
      {message}
    </div>
  );
}

function TemplateEditorModal({
  template,
  onChange,
  onSave,
  onClose,
  saving,
}: {
  template: Partial<EmailTemplate>;
  onChange: (t: Partial<EmailTemplate>) => void;
  onSave: () => void;
  onClose: () => void;
  saving: boolean;
}) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [sampleVarsText, setSampleVarsText] = useState<string>("{}");

  const placeholders = useMemo(() => {
    const re = /\{\{\s*([\w.]+)\s*\}\}/g;
    const subj = [...(template.subject || "").matchAll(re)].map((m) => m[1]);
    const body = [...(template.body || "").matchAll(re)].map((m) => m[1]);
    return Array.from(new Set([...subj, ...body]));
  }, [template.subject, template.body]);

  useEffect(() => {
    const sample: Record<string, string> = {};
    placeholders.forEach((k) => (sample[k] = `[${k}]`));
    setSampleVarsText(JSON.stringify(sample, null, 2));
  }, [placeholders.join(",")]);

  const renderedSubject = useMemo(
    () => renderWithVars(template.subject || "", sampleVarsText),
    [template.subject, sampleVarsText]
  );
  const renderedBody = useMemo(
    () => renderWithVars(template.body || "", sampleVarsText),
    [template.body, sampleVarsText]
  );

  const insertSnippet = (snippet: string) => {
    onChange({ ...template, body: (template.body || "") + snippet });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-6xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand rounded-2xl flex items-center justify-center text-white">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              {template.id ? "Edit Template" : "Design New Template"}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
              <button
                onClick={() => setTab("edit")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tab === "edit" ? "bg-white text-slate-800 shadow" : "text-slate-500"
                }`}
              >
                Edit
              </button>
              <button
                onClick={() => setTab("preview")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  tab === "preview" ? "bg-white text-slate-800 shadow" : "text-slate-500"
                }`}
              >
                Preview
              </button>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Editor side */}
          {(tab === "edit" || true) && (
            <div className={`p-6 overflow-y-auto space-y-4 ${tab === "preview" ? "hidden lg:block" : ""}`}>
              <Field label="Template Name">
                <input
                  type="text"
                  value={template.name || ""}
                  onChange={(e) => onChange({ ...template, name: e.target.value })}
                  placeholder="e.g. Job Application Confirmation"
                  className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                />
              </Field>
              <Field label="Description (optional)">
                <input
                  type="text"
                  value={template.description || ""}
                  onChange={(e) => onChange({ ...template, description: e.target.value })}
                  placeholder="When should this template fire?"
                  className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                />
              </Field>
              <Field label="Email Subject">
                <input
                  type="text"
                  value={template.subject || ""}
                  onChange={(e) => onChange({ ...template, subject: e.target.value })}
                  placeholder="e.g. Your application for {{jobTitle}}"
                  className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                />
              </Field>

              <Field label="Quick Insert">
                <div className="flex flex-wrap gap-2">
                  {SNIPPETS.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => insertSnippet(s.html)}
                      className="text-[11px] font-bold uppercase tracking-wider bg-slate-50 hover:bg-brand/5 hover:text-brand text-slate-500 border border-slate-100 rounded-lg px-3 py-1.5 transition-all"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </Field>

              <Field label="Email Body (HTML)">
                <textarea
                  rows={14}
                  value={template.body || ""}
                  onChange={(e) => onChange({ ...template, body: e.target.value })}
                  placeholder="<p>Hi {{name}},</p>"
                  className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm font-mono"
                />
              </Field>

              {placeholders.length > 0 && (
                <div className="bg-brand/5 border border-brand/10 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand/80 mb-2">
                    Placeholders detected
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {placeholders.map((p) => (
                      <code
                        key={p}
                        className="text-[11px] font-mono bg-white text-brand px-2 py-0.5 rounded border border-brand/10"
                      >
                        {`{{${p}}}`}
                      </code>
                    ))}
                  </div>
                </div>
              )}

              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={template.isActive !== false}
                  onChange={(e) => onChange({ ...template, isActive: e.target.checked })}
                  className="w-4 h-4"
                />
                Active (uncheck to disable without deleting)
              </label>
            </div>
          )}

          {/* Preview side */}
          <div
            className={`bg-slate-100 p-6 overflow-y-auto border-l border-slate-100 ${
              tab === "edit" ? "hidden lg:block" : ""
            }`}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
              Live Preview
            </p>

            <div className="mb-3">
              <p className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">
                Sample variables (JSON)
              </p>
              <textarea
                rows={3}
                value={sampleVarsText}
                onChange={(e) => setSampleVarsText(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono outline-none"
              />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/40">
                <p className="text-[10px] uppercase tracking-widest text-slate-400">Subject</p>
                <p className="text-sm font-medium text-slate-800 mt-0.5">
                  {renderedSubject || <span className="text-slate-300">(empty)</span>}
                </p>
              </div>
              <div
                className="p-6 prose prose-sm max-w-none text-slate-700"
                dangerouslySetInnerHTML={{ __html: renderedBody }}
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-full text-sm font-bold text-slate-500 hover:text-slate-700 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="bg-brand text-white px-10 py-3 rounded-full text-sm font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}

const SNIPPETS = [
  { label: "Heading", html: "\n<h2>Heading</h2>\n" },
  { label: "Paragraph", html: "\n<p>Your message here.</p>\n" },
  { label: "Greeting", html: "\n<p>Hi {{fullName}},</p>\n" },
  {
    label: "Button",
    html:
      '\n<p><a href="{{url}}" style="display:inline-block;background:#0ea5e9;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:bold">Action</a></p>\n',
  },
  { label: "Divider", html: '\n<hr style="border:0;border-top:1px solid #eee;margin:20px 0">\n' },
  { label: "Sign-off", html: "\n<p>— The 3Dots Team</p>\n" },
];

function renderWithVars(template: string, varsJson: string): string {
  let vars: Record<string, string> = {};
  try {
    vars = JSON.parse(varsJson || "{}");
  } catch {
    /* ignore — just render raw */
  }
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const v = vars[key];
    return v === undefined ? `{{${key}}}` : String(v);
  });
}
