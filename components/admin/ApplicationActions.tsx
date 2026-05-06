"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Send,
  CalendarPlus,
  MessageSquarePlus,
  Loader2,
  X,
  Mail,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface Template {
  id: string;
  name: string;
  subject: string;
  body: string;
  isActive?: boolean;
}

interface ApplicationActionsProps {
  applicationId: string;
  applicantEmail: string;
  applicantName: string;
  jobTitle: string;
  status: string;
}

type Feedback = { type: "success" | "error"; message: string } | null;

export default function ApplicationActions({
  applicationId,
  applicantEmail,
  applicantName,
  jobTitle,
  status,
}: ApplicationActionsProps) {
  const [openModal, setOpenModal] = useState<"inform" | "interview" | "custom" | null>(null);

  return (
    <>
      <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">
          Communicate with Applicant
        </h3>
        <div className="space-y-3">
          <ActionButton
            icon={<Send className="w-4 h-4" />}
            label="Inform Applicant"
            description={`Send the ${status.toLowerCase()} email based on current status.`}
            onClick={() => setOpenModal("inform")}
            primary
          />
          <ActionButton
            icon={<CalendarPlus className="w-4 h-4" />}
            label="Schedule Interview"
            description="Send an interview invite with date, time, and details."
            onClick={() => setOpenModal("interview")}
          />
          <ActionButton
            icon={<MessageSquarePlus className="w-4 h-4" />}
            label="Custom Reply"
            description="Write a one-off message or pick any template."
            onClick={() => setOpenModal("custom")}
          />
        </div>
      </div>

      {openModal === "inform" && (
        <InformModal
          applicationId={applicationId}
          applicantEmail={applicantEmail}
          applicantName={applicantName}
          jobTitle={jobTitle}
          status={status}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === "interview" && (
        <ScheduleInterviewModal
          applicationId={applicationId}
          applicantEmail={applicantEmail}
          applicantName={applicantName}
          jobTitle={jobTitle}
          onClose={() => setOpenModal(null)}
        />
      )}
      {openModal === "custom" && (
        <CustomReplyModal
          applicationId={applicationId}
          applicantEmail={applicantEmail}
          applicantName={applicantName}
          jobTitle={jobTitle}
          onClose={() => setOpenModal(null)}
        />
      )}
    </>
  );
}

function ActionButton({
  icon,
  label,
  description,
  onClick,
  primary,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 ${
        primary
          ? "bg-brand text-white border-brand hover:bg-brand-dark shadow-lg shadow-brand/20"
          : "bg-white border-slate-100 hover:border-brand/30 hover:bg-brand/[0.02]"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
          primary ? "bg-white/15 text-white" : "bg-brand/5 text-brand"
        }`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className={`text-sm font-bold ${primary ? "text-white" : "text-slate-800"}`}>
          {label}
        </p>
        <p className={`text-xs mt-0.5 ${primary ? "text-white/80" : "text-slate-500"}`}>
          {description}
        </p>
      </div>
    </button>
  );
}

/* ---------------- Inform Applicant Modal ---------------- */

const STATUS_TO_FORM_KEY: Record<string, string> = {
  SHORTLISTED: "job_application_shortlist",
  REJECTED: "job_application_reject",
  REVIEWING: "job_application_reviewing",
};

function InformModal({
  applicationId,
  applicantEmail,
  applicantName,
  jobTitle,
  status,
  onClose,
}: {
  applicationId: string;
  applicantEmail: string;
  applicantName: string;
  jobTitle: string;
  status: string;
  onClose: () => void;
}) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"preset" | "custom">("preset");
  const [templateId, setTemplateId] = useState<string>("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const presetFormKey = STATUS_TO_FORM_KEY[status];

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch("/api/admin/email-templates").then((r) => r.json()),
      fetch("/api/admin/form-mappings").then((r) => r.json()),
    ])
      .then(([tmpls, mappings]) => {
        if (cancelled) return;
        setTemplates(Array.isArray(tmpls) ? tmpls : []);
        const mapping = mappings.events?.find(
          (e: { key: string }) => e.key === presetFormKey
        )?.mapping;
        if (mapping?.template) {
          setTemplateId(mapping.template.id);
          const tmpl = (tmpls as Template[]).find((t) => t.id === mapping.template.id);
          if (tmpl) {
            setSubject(renderPreview(tmpl.subject, applicantName, jobTitle));
            setBody(renderPreview(tmpl.body, applicantName, jobTitle));
          }
        } else {
          // No mapping; preload sensible default
          setSubject(`Update on your application — ${jobTitle}`);
          setBody(
            `<p>Hi ${applicantName},</p>\n<p>Thanks for applying for the <strong>${jobTitle}</strong> role.</p>\n<p>— 3Dots Talent Team</p>`
          );
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [applicantName, jobTitle, presetFormKey]);

  const handleTemplateChange = (id: string) => {
    setTemplateId(id);
    const tmpl = templates.find((t) => t.id === id);
    if (tmpl) {
      setSubject(renderPreview(tmpl.subject, applicantName, jobTitle));
      setBody(renderPreview(tmpl.body, applicantName, jobTitle));
    }
  };

  const handleSend = async () => {
    setSending(true);
    setFeedback(null);
    try {
      // If using preset and the user hasn't edited subject/body, send via formKey path
      // (uses the admin-mapped template directly + logs under the form key).
      // Otherwise send custom subject+body so admin edits are honored.
      const useFormKey = mode === "preset" && presetFormKey;
      const payload = useFormKey
        ? { formKey: presetFormKey }
        : { templateId: templateId || undefined, customSubject: subject, customBody: body };

      const res = await fetch(`/api/admin/applications/${applicationId}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: "success", message: `Email sent to ${applicantEmail}.` });
      } else {
        setFeedback({ type: "error", message: data.error || "Failed to send email" });
      }
    } catch (e) {
      setFeedback({ type: "error", message: "Network error sending email" });
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal
      title={`Inform ${applicantName}`}
      subtitle={`Will be sent to ${applicantEmail}`}
      onClose={onClose}
    >
      <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs text-slate-600 flex items-start gap-3">
          <Mail className="w-4 h-4 text-brand mt-0.5" />
          <div>
            Current status: <strong className="text-slate-800">{status}</strong>.
            {presetFormKey ? (
              <> The preset email below uses the template mapped to <code>{presetFormKey}</code>.</>
            ) : (
              <> No preset template for this status — pick one or write a custom message.</>
            )}
          </div>
        </div>

        <ModeToggle mode={mode} onChange={setMode} />

        {mode === "custom" && (
          <Field label="Choose Template (optional)">
            <select
              value={templateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand"
            >
              <option value="">— Custom message —</option>
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </Field>
        )}

        <Field label="Subject">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={mode === "preset"}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand disabled:opacity-60"
          />
        </Field>
        <Field label="Body (HTML)">
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={mode === "preset"}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-brand disabled:opacity-60"
          />
        </Field>

        {!loading && body && <PreviewCard html={body} />}
        {feedback && <FeedbackBox feedback={feedback} />}
      </div>

      <ModalFooter
        onClose={onClose}
        onSubmit={handleSend}
        sending={sending}
        submitLabel="Send Email"
        submitIcon={<Send className="w-4 h-4" />}
      />
    </Modal>
  );
}

/* ---------------- Schedule Interview Modal ---------------- */

function ScheduleInterviewModal({
  applicationId,
  applicantEmail,
  applicantName,
  jobTitle,
  onClose,
}: {
  applicationId: string;
  applicantEmail: string;
  applicantName: string;
  jobTitle: string;
  onClose: () => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [mode, setMode] = useState<"VIDEO" | "IN_PERSON" | "PHONE">("VIDEO");
  const [location, setLocation] = useState("");
  const [interviewerName, setInterviewerName] = useState("");
  const [requirements, setRequirements] = useState("");
  const [notes, setNotes] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const formattedDate = useMemo(() => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [date]);

  const valid = date && time;

  const handleSend = async () => {
    if (!valid) return;
    setSending(true);
    setFeedback(null);
    try {
      const res = await fetch(
        `/api/admin/applications/${applicationId}/schedule-interview`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: formattedDate,
            time,
            mode,
            location: location || null,
            interviewerName: interviewerName || null,
            requirements: requirements || null,
            notes: notes || null,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setFeedback({
          type: "success",
          message: `Interview invitation sent to ${applicantEmail}.`,
        });
      } else {
        setFeedback({ type: "error", message: data.error || "Failed to send invitation" });
      }
    } catch (e) {
      setFeedback({ type: "error", message: "Network error sending invitation" });
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal
      title={`Schedule Interview with ${applicantName}`}
      subtitle={`For ${jobTitle} — invite will be sent to ${applicantEmail}`}
      onClose={onClose}
    >
      <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Date">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </Field>
          <Field label="Time">
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand"
            />
          </Field>
        </div>

        <Field label="Mode">
          <div className="grid grid-cols-3 gap-2">
            {(["VIDEO", "IN_PERSON", "PHONE"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`py-2.5 text-xs font-bold rounded-xl border transition-all ${
                  mode === m
                    ? "bg-brand/10 text-brand border-brand/30"
                    : "bg-white text-slate-500 border-slate-100 hover:bg-slate-50"
                }`}
              >
                {m === "IN_PERSON" ? "In-Person" : m === "VIDEO" ? "Video Call" : "Phone"}
              </button>
            ))}
          </div>
        </Field>

        <Field
          label={mode === "VIDEO" ? "Meeting Link" : mode === "IN_PERSON" ? "Location" : "Phone Number"}
        >
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder={
              mode === "VIDEO"
                ? "https://meet.google.com/..."
                : mode === "IN_PERSON"
                ? "Office address"
                : "+91 ..."
            }
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </Field>

        <Field label="Interviewer (optional)">
          <input
            type="text"
            value={interviewerName}
            onChange={(e) => setInterviewerName(e.target.value)}
            placeholder="Name of the interviewer"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </Field>

        <Field label="Requirements (what to prepare)">
          <textarea
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            placeholder="e.g. Bring a portfolio, prepare a 5-minute project walkthrough..."
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </Field>

        <Field label="Additional Notes">
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything else the candidate should know"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </Field>

        {feedback && <FeedbackBox feedback={feedback} />}
      </div>

      <ModalFooter
        onClose={onClose}
        onSubmit={handleSend}
        sending={sending}
        disabled={!valid}
        submitLabel="Send Interview Invite"
        submitIcon={<CalendarPlus className="w-4 h-4" />}
      />
    </Modal>
  );
}

/* ---------------- Custom Reply Modal ---------------- */

function CustomReplyModal({
  applicationId,
  applicantEmail,
  applicantName,
  jobTitle,
  onClose,
}: {
  applicationId: string;
  applicantEmail: string;
  applicantName: string;
  jobTitle: string;
  onClose: () => void;
}) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    fetch("/api/admin/email-templates")
      .then((r) => r.json())
      .then((data) => Array.isArray(data) && setTemplates(data))
      .catch(() => {});
  }, []);

  const handleTemplateChange = (id: string) => {
    setTemplateId(id);
    const tmpl = templates.find((t) => t.id === id);
    if (tmpl) {
      setSubject(renderPreview(tmpl.subject, applicantName, jobTitle));
      setBody(renderPreview(tmpl.body, applicantName, jobTitle));
    } else {
      setSubject("");
      setBody("");
    }
  };

  const handleSend = async () => {
    if (!subject || !body) return;
    setSending(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/applications/${applicationId}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customSubject: subject, customBody: body }),
      });
      const data = await res.json();
      if (res.ok) setFeedback({ type: "success", message: `Email sent to ${applicantEmail}.` });
      else setFeedback({ type: "error", message: data.error || "Failed to send" });
    } catch (e) {
      setFeedback({ type: "error", message: "Network error" });
    } finally {
      setSending(false);
    }
  };

  return (
    <Modal
      title={`Custom Reply to ${applicantName}`}
      subtitle={`Will be sent to ${applicantEmail}`}
      onClose={onClose}
    >
      <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
        <Field label="Choose Template (optional)">
          <select
            value={templateId}
            onChange={(e) => handleTemplateChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand"
          >
            <option value="">— Custom message —</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Subject">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand"
          />
        </Field>
        <Field label="Body (HTML)">
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm font-mono outline-none focus:border-brand"
          />
        </Field>
        {body && <PreviewCard html={body} />}
        {feedback && <FeedbackBox feedback={feedback} />}
      </div>
      <ModalFooter
        onClose={onClose}
        onSubmit={handleSend}
        sending={sending}
        disabled={!subject || !body}
        submitLabel="Send Email"
        submitIcon={<Send className="w-4 h-4" />}
      />
    </Modal>
  );
}

/* ---------------- Shared bits ---------------- */

function renderPreview(template: string, name: string, jobTitle: string): string {
  return template
    .replace(/\{\{\s*fullName\s*\}\}/g, name)
    .replace(/\{\{\s*name\s*\}\}/g, name)
    .replace(/\{\{\s*jobTitle\s*\}\}/g, jobTitle)
    .replace(/\{\{\s*position\s*\}\}/g, jobTitle);
}

function Modal({
  title,
  subtitle,
  children,
  onClose,
}: {
  title: string;
  subtitle?: string;
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
            <div>
              <h2 className="text-xl font-bold text-slate-800">{title}</h2>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
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

function ModalFooter({
  onClose,
  onSubmit,
  sending,
  submitLabel,
  submitIcon,
  disabled,
}: {
  onClose: () => void;
  onSubmit: () => void;
  sending: boolean;
  submitLabel: string;
  submitIcon: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-3">
      <button
        onClick={onClose}
        className="px-8 py-4 rounded-full text-sm font-bold text-slate-500 hover:text-slate-700 transition-all"
      >
        Cancel
      </button>
      <button
        onClick={onSubmit}
        disabled={sending || disabled}
        className="bg-brand text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : submitIcon}
        {submitLabel}
      </button>
    </div>
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

function ModeToggle({
  mode,
  onChange,
}: {
  mode: "preset" | "custom";
  onChange: (m: "preset" | "custom") => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
      <button
        onClick={() => onChange("preset")}
        className={`py-2.5 text-xs font-bold rounded-lg transition-all ${
          mode === "preset" ? "bg-white text-slate-800 shadow" : "text-slate-500"
        }`}
      >
        Use Preset Template
      </button>
      <button
        onClick={() => onChange("custom")}
        className={`py-2.5 text-xs font-bold rounded-lg transition-all ${
          mode === "custom" ? "bg-white text-slate-800 shadow" : "text-slate-500"
        }`}
      >
        Edit / Custom
      </button>
    </div>
  );
}

function PreviewCard({ html }: { html: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 pl-1">
        Preview
      </p>
      <div
        className="bg-white border border-slate-100 rounded-2xl p-5 text-sm text-slate-700 max-h-64 overflow-auto prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function FeedbackBox({ feedback }: { feedback: NonNullable<Feedback> }) {
  return (
    <div
      className={`p-4 rounded-2xl flex items-center gap-3 text-sm ${
        feedback.type === "success"
          ? "bg-green-50 text-green-700 border border-green-100"
          : "bg-red-50 text-red-700 border border-red-100"
      }`}
    >
      {feedback.type === "success" ? (
        <CheckCircle2 className="w-4 h-4 shrink-0" />
      ) : (
        <AlertCircle className="w-4 h-4 shrink-0" />
      )}
      {feedback.message}
    </div>
  );
}
