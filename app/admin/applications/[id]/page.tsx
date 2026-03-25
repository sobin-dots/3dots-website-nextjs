"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Calendar as CalendarIcon, FileText, CheckCircle, XCircle, Clock, Link as LinkIcon, Briefcase, Download, Trash2 } from "lucide-react";
import Link from "next/link";

interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  resumeUrl: string;
  coverLetter: string | null;
  additionalInfo: string | null;
  status: string;
  createdAt: string;
  job?: { id: string; title: string; tag: string; location: string; type: string };
}

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [app, setApp] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/applications/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setApp(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleUpdateStatus = async (newStatus: string) => {
    if (!app || !confirm(`Change applicant status to ${newStatus}?`)) return;

    try {
      const res = await fetch(`/api/admin/applications/${app.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApp({ ...app, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async () => {
    if (!app || !confirm("Are you sure you want to permanently delete this application?")) return;

    try {
      const res = await fetch(`/api/admin/applications/${app.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/applications");
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <XCircle className="w-12 h-12 text-slate-300 mb-4" />
        <h2 className="text-xl font-medium text-slate-800">Application Not Found</h2>
        <Link href="/admin/applications" className="text-brand hover:underline mt-2">Return to list</Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return <span className="px-4 py-1.5 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Shortlisted</span>;
      case "REJECTED":
        return <span className="px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"><XCircle className="w-4 h-4" /> Rejected</span>;
      case "REVIEWING":
        return <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"><Clock className="w-4 h-4" /> Reviewing</span>;
      default:
        return <span className="px-4 py-1.5 bg-yellow-50 text-yellow-600 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5"><Clock className="w-4 h-4" /> Pending</span>;
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      <Link href="/admin/applications" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand transition-colors mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Applications
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-400 font-light text-3xl shadow-sm border border-slate-100">
            {app.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight leading-tight">
              {app.fullName}
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <p className="text-xs text-brand font-bold uppercase tracking-widest flex items-center gap-1.5 bg-brand/5 px-3 py-1.5 rounded-lg border border-brand/10">
                <Briefcase className="w-3.5 h-3.5" /> {app.job?.title || "Unknown Job"}
              </p>
              <p className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5" /> Applied on {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 self-start">
          {getStatusBadge(app.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {app.coverLetter ? (
            <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-8 h-8 rounded-xl bg-brand/5 flex items-center justify-center text-brand">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Cover Letter</h3>
              </div>
              <p className="text-[15px] leading-loose text-slate-600 whitespace-pre-wrap font-light relative z-10">
                {app.coverLetter}
              </p>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-light">No cover letter provided.</p>
            </div>
          )}

          {app.additionalInfo && (
            <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                  <LinkIcon className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">Additional Portfolio / Links</h3>
              </div>
              <a href={app.additionalInfo.startsWith("http") ? app.additionalInfo : `https://${app.additionalInfo}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand hover:underline break-all p-4 bg-brand/5 rounded-2xl w-full border border-brand/10">
                <LinkIcon className="w-4 h-4 shrink-0" /> {app.additionalInfo}
              </a>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {/* Action Card */}
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Application Actions</h3>
            
            <a
              href={app.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4 bg-slate-800 text-white rounded-2xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-900 transition-all text-center mb-8"
            >
              <Download className="w-4 h-4" /> Download Resume
            </a>

            <div className="space-y-3 border-t border-slate-100 pt-6">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Update Status</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleUpdateStatus("REVIEWING")}
                  className={`py-3 text-xs font-semibold rounded-xl border transition-all ${app.status === 'REVIEWING' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                >
                  Reviewing
                </button>
                <button
                  onClick={() => handleUpdateStatus("SHORTLISTED")}
                  className={`py-3 text-xs font-semibold rounded-xl border transition-all ${app.status === 'SHORTLISTED' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                >
                  Shortlist
                </button>
                <button
                  onClick={() => handleUpdateStatus("REJECTED")}
                  className={`py-3 text-xs font-semibold rounded-xl border transition-all ${app.status === 'REJECTED' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleUpdateStatus("PENDING")}
                  className={`py-3 text-xs font-semibold rounded-xl border transition-all ${app.status === 'PENDING' ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                >
                  Reset Pending
                </button>
              </div>
            </div>

            <div className="border-t border-red-50 mt-6 pt-6">
              <button
                onClick={handleDelete}
                className="w-full py-3 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 text-xs font-bold rounded-xl transition-all"
              >
                <Trash2 className="w-4 h-4" /> Delete Application
              </button>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6">Contact Info</h3>
            <div className="space-y-5">
              <a href={`mailto:${app.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold uppercase text-slate-400 mb-0.5">Email Address</p>
                  <p className="text-sm font-medium text-slate-700 truncate group-hover:text-brand transition-colors">{app.email}</p>
                </div>
              </a>
              {app.phone && (
                <a href={`tel:${app.phone}`} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 mb-0.5">Phone Number</p>
                    <p className="text-sm font-medium text-slate-700 group-hover:text-brand transition-colors">{app.phone}</p>
                  </div>
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
