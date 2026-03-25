"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit2, Trash2, MapPin, Clock, Tag, FileText, Users, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import JobForm from "../components/JobForm";

export default function CareerDetailAdminPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  interface JobApplication {
    id: string;
    jobId: string;
    fullName: string;
    email: string;
    status: string;
    resumeUrl: string;
  }

  interface JobSection {
    title: string;
    points: string[];
  }

  interface JobData {
    id: string;
    title: string;
    tag: string;
    type: string;
    location: string;
    about: string | null;
    description: string;
    active: boolean;
    sections: JobSection[];
  }

  const [job, setJob] = useState<JobData | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [jobRes, appsRes] = await Promise.all([
        fetch(`/api/careers/${id}`),
        fetch(`/api/admin/applications`)
      ]);
      const jobData = await jobRes.json();
      const appsData = await appsRes.json();
      
      setJob(jobData);
      if (Array.isArray(appsData)) {
        setApplications(appsData.filter(app => app.jobId === jobData.id));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job? This cannot be undone.")) return;
    try {
      const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/careers");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStatus = async (appId: string, newStatus: string) => {
    if (!confirm(`Change applicant status to ${newStatus}?`)) return;
    try {
      const res = await fetch(`/api/admin/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications(prev => prev.map(app => app.id === appId ? { ...app, status: newStatus } : app));
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-slate-400 font-light">Loading job details...</div>;
  }

  if (!job) {
    if (!loading) {
      return <div className="py-20 text-center text-slate-400 font-light">Job not found.</div>;
    }
    return null;
  }

  if (isEditing) {
    return (
      <div className="pb-12 space-y-8">
        <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 text-slate-500 hover:text-brand transition-colors text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to details
        </button>
        <JobForm job={job} onSave={() => { setIsEditing(false); fetchData(); }} onCancel={() => setIsEditing(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Link href="/admin/careers" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand transition-colors text-sm font-medium mb-4">
            <ArrowLeft className="w-4 h-4" /> Back to Careers
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-light text-slate-800 tracking-tight">
              {job.title}
            </h1>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${job.active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
              {job.active ? "Active" : "Closed"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm"
          >
            <Edit2 className="w-4 h-4" /> Edit Job
          </button>
          <button 
            onClick={handleDelete}
            className="bg-red-50 text-red-600 px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-red-100 transition-all"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Job Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-8">
            <div className="flex flex-wrap gap-6 border-b border-slate-50 pb-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Tag className="w-4 h-4 text-brand" /> <span className="font-medium text-slate-800">{job.tag}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-brand" /> <span className="font-medium text-slate-800">{job.type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-brand" /> <span className="font-medium text-slate-800">{job.location}</span>
              </div>
            </div>

            {job.about && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">About the Role</h3>
                <div className="text-slate-600 font-light leading-relaxed whitespace-pre-wrap">{job.about}</div>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Description</h3>
              <div className="text-slate-600 font-light leading-relaxed whitespace-pre-wrap">{job.description}</div>
            </div>

            {job.sections && Array.isArray(job.sections) && job.sections.map((sec: JobSection, idx: number) => (
              <div key={idx} className="space-y-3 pt-6 border-t border-slate-50">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">{sec.title}</h3>
                <ul className="space-y-2">
                  {sec.points?.map((point: string, pIdx: number) => (
                    <li key={pIdx} className="flex items-start gap-3 text-slate-600 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand/40 mt-2 shrink-0"></span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Applications Summary */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                <Users className="w-4 h-4 text-brand" /> Applicants
              </h3>
              <span className="bg-brand/10 text-brand py-1 px-3 rounded-full text-xs font-bold">
                {applications.length} Total
              </span>
            </div>

            <div className="space-y-4">
              {applications.length === 0 ? (
                <p className="text-center text-slate-400 font-light italic py-4">No applications yet.</p>
              ) : (
                applications.slice(0, 5).map(app => (
                  <div key={app.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{app.fullName}</p>
                        <p className="text-xs text-slate-500 mb-1">{app.email}</p>
                      </div>
                      {app.status === "SHORTLISTED" && <CheckCircle className="w-4 h-4 text-green-500" />}
                      {app.status === "REJECTED" && <XCircle className="w-4 h-4 text-red-500" />}
                      {app.status === "REVIEWING" && <Clock className="w-4 h-4 text-blue-500" />}
                      {app.status === "PENDING" && <Clock className="w-4 h-4 text-yellow-500" />}
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-wider text-brand hover:underline flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Resume
                      </a>
                      <select 
                        className="text-[10px] bg-white border border-slate-200 rounded px-2 py-1 outline-none font-medium h-6"
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="REVIEWING">Reviewing</option>
                        <option value="SHORTLISTED">Shortlist</option>
                        <option value="REJECTED">Reject</option>
                      </select>
                    </div>
                  </div>
                ))
              )}

              {applications.length > 5 && (
                <Link href="/admin/applications" className="block w-full py-3 bg-slate-50 text-slate-600 text-center rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-100 transition-colors">
                  View All Applicants
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
