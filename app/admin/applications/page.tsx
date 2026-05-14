"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Calendar as CalendarIcon, FileText, CheckCircle, XCircle, Clock, Link as LinkIcon, Briefcase, LayoutGrid, List, Eye, Download, CalendarPlus } from "lucide-react";
import Link from "next/link";
import Pagination from "../components/Pagination";
import AnalyticsDashboard from "./components/AnalyticsDashboard";
import BulkActionModal, { BulkActionData } from "./components/BulkActionModal";

interface JobApplication {
  id: string;
  jobId: string | null;
  fullName: string;
  email: string;
  phone: string | null;
  resumeUrl: string;
  coverLetter: string | null;
  additionalInfo: string | null;
  status: string;
  position: string | null;
  createdAt: string;
  isStudent?: boolean;
  currentCompany?: string | null;
  experienceYear?: string | null;
  yearOfStudy?: string | null;
  department?: string | null;
  course?: string | null;
  referredRole?: string | null;
  interviewStatus?: string;
  statusRemark?: string | null;
  job?: { id: string; title: string };
}

export default function ApplicationsAdminPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [jobs, setJobs] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [jobFilter, setJobFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState<"card" | "table">("table");
  
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkModalMode, setBulkModalMode] = useState<"update" | "schedule">("update");
  const ITEMS_PER_PAGE = 10;

  const fetchJobs = async () => {
    try {
      const res = await fetch("/api/careers");
      const data = await res.json();
      if (Array.isArray(data)) setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch("/api/admin/applications");
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    if (!confirm(`Change applicant status to ${newStatus}?`)) return;

    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;

    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete application", error);
    }
  };

  const handleBulkConfirm = async (data: BulkActionData) => {
    try {
      const res = await fetch("/api/admin/applications/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ids: selectedIds,
          ...data
        }),
      });

      if (res.ok) {
        alert(`Successfully updated ${selectedIds.length} applications.`);
        setSelectedIds([]);
        setIsBulkModalOpen(false);
        fetchApplications();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to perform bulk update");
      }
    } catch (error) {
      console.error("Bulk update failed", error);
      alert("Something went wrong");
    }
  };

  // Remove derived uniqueJobs since we now fetch all jobs from the API

  const filteredApplications = applications.filter((app) => {
    if (statusFilter !== "ALL" && app.status !== statusFilter) return false;
    if (jobFilter !== "ALL" && app.job?.title !== jobFilter) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedApplications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedApplications.map((app) => app.id));
    }
  };

  const handleDownloadCSV = () => {
    if (filteredApplications.length === 0) return;

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Position/Job Title",
      "Status",
      "Interview Status",
      "Applied Date",
      "Referred Role",
      "Profile Type",
      "Current Company / Institute",
      "Experience / Year of Study",
      "Department",
      "Course",
      "Cover Letter",
      "Additional Info"
    ];

    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = filteredApplications.map(app => [
      app.id,
      app.fullName,
      app.email,
      app.phone || "",
      app.job?.title || app.position || "General Application",
      app.status,
      app.interviewStatus || "NOT_SCHEDULED",
      new Date(app.createdAt).toLocaleString(),
      app.referredRole || "",
      app.isStudent ? "Student" : "Professional",
      app.currentCompany || "",
      app.isStudent ? (app.yearOfStudy || "") : (app.experienceYear || ""),
      app.department || "",
      app.course || "",
      app.coverLetter || "",
      app.additionalInfo || ""
    ]);

    const csvContent = [
      headers.map(escapeCsv).join(","),
      ...rows.map(row => row.map(escapeCsv).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `applications_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SHORTLISTED":
        return <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Shortlisted</span>;
      case "REJECTED":
        return <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-semibold flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>;
      case "REVIEWING":
        return <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Reviewing</span>;
      case "INTERVIEW_CONDUCTED":
        return <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Interview Conducted</span>;
      case "NOT_INTERESTED":
        return <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold flex items-center gap-1"><XCircle className="w-3 h-3" /> Not Interested</span>;
      case "BLACKLISTED":
        return <span className="px-3 py-1 bg-slate-800 text-slate-100 rounded-full text-xs font-semibold flex items-center gap-1"><XCircle className="w-3 h-3" /> Blacklisted</span>;
      case "NOT_QUALIFIED":
        return <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-semibold flex items-center gap-1"><XCircle className="w-3 h-3" /> Not Qualified</span>;
      case "FUTURE_REFERENCE":
        return <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Future Reference</span>;
      default:
        return <span className="px-3 py-1 bg-yellow-50 text-yellow-600 rounded-full text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
    }
  };

  const [activeTab, setActiveTab] = useState<"list" | "analytics">("list");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            Job <span className="font-medium">Applications</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">Review and manage candidate applications.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Tab Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 mr-2 shadow-inner">
            <button
              onClick={() => setActiveTab("list")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'list' ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              List View
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'analytics' ? 'bg-white text-brand shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Analytics
            </button>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-xl w-fit border border-slate-200 shadow-inner">
            <button 
              onClick={() => setViewMode("table")} 
              className={`p-2 rounded-lg transition-all flex items-center justify-center ${viewMode === 'table' ? 'bg-white shadow-sm text-brand font-medium' : 'text-slate-400 hover:text-slate-600'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("card")} 
              className={`p-2 rounded-lg transition-all flex items-center justify-center ${viewMode === 'card' ? 'bg-white shadow-sm text-brand font-medium' : 'text-slate-400 hover:text-slate-600'}`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>

          <select
            value={jobFilter}
            onChange={(e) => { setJobFilter(e.target.value); setCurrentPage(1); }}
            className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-brand/50 transition-colors"
          >
            <option value="ALL">All Jobs</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.title}>
                {job.title}
              </option>
            ))}
          </select>

          {activeTab === "list" && (
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 outline-none focus:border-brand/50 transition-colors"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="REVIEWING">Reviewing</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="INTERVIEW_CONDUCTED">Interview Conducted</option>
              <option value="NOT_QUALIFIED">Not Qualified</option>
              <option value="NOT_INTERESTED">Not Interested</option>
              <option value="REJECTED">Rejected</option>
              <option value="BLACKLISTED">Blacklisted</option>
              <option value="FUTURE_REFERENCE">Future Reference</option>
            </select>
          )}

          <button
            onClick={handleDownloadCSV}
            disabled={filteredApplications.length === 0}
            className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shrink-0"
            title="Download Filtered Applications as CSV"
          >
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {activeTab === "analytics" ? (
          <AnalyticsDashboard jobFilter={jobFilter} />
        ) : loading ? (
          <div className="py-20 text-center text-slate-400 font-light">Loading applications...</div>
        ) : filteredApplications.length === 0 ? (
          <div className="py-20 text-center text-slate-400 font-light">No applications match your filters.</div>
        ) : (
          <>
            {viewMode === "table" ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-5 w-10">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand"
                          checked={selectedIds.length === paginatedApplications.length && paginatedApplications.length > 0}
                          onChange={toggleSelectAll}
                        />
                      </th>
                      <th className="px-8 py-5">Applicant</th>
                      <th className="px-8 py-5">Job Title</th>
                      <th className="px-8 py-5">Contact</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Interview</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {paginatedApplications.map((item) => (
                      <tr key={item.id} className={`hover:bg-slate-50 transition-colors group ${selectedIds.includes(item.id) ? 'bg-brand/5' : ''}`}>
                        <td className="px-8 py-6">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand"
                            checked={selectedIds.includes(item.id)}
                            onChange={() => toggleSelect(item.id)}
                          />
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-sm shrink-0 border border-slate-200">
                              {item.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{item.fullName}</p>
                              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5"><CalendarIcon className="w-3 h-3" /> {new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded w-fit flex items-center gap-1.5 ${!item.jobId ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-brand/5 text-brand'}`}>
                              <Briefcase className="w-3 h-3" /> {item.job?.title || item.position || "General Application"}
                            </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-1.5">
                            <p className="text-[12px] text-slate-600 flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {item.email}</p>
                            {item.phone && <p className="text-[12px] text-slate-600 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {item.phone}</p>}
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          {getStatusBadge(item.status)}
                        </td>
                        <td className="px-8 py-6">
                           <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded">
                             {(item.interviewStatus || "NOT_SCHEDULED").replace(/_/g, " ")}
                           </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Link href={`/admin/applications/${item.id}`} className="p-2 text-slate-400 hover:text-brand transition-colors"><Eye className="w-4 h-4" /></Link>
                            <a href={item.resumeUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-400 hover:text-brand transition-colors"><FileText className="w-4 h-4" /></a>
                            <select 
                              className="text-xs px-2 py-1.5 bg-slate-100 border-none rounded-md outline-none text-slate-600 ml-2"
                              value={item.status}
                              onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                            >
                              <option value="PENDING">Pending</option>
                              <option value="REVIEWING">Reviewing</option>
                              <option value="SHORTLISTED">Shortlist</option>
                              <option value="INTERVIEW_CONDUCTED">Interview Conducted</option>
                              <option value="NOT_QUALIFIED">Not Qualified</option>
                              <option value="NOT_INTERESTED">Not Interested</option>
                              <option value="REJECTED">Reject</option>
                              <option value="BLACKLISTED">Blacklist</option>
                              <option value="FUTURE_REFERENCE">Future Reference</option>
                            </select>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><XCircle className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedApplications.map((item) => (
                  <div key={item.id} className={`bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-all group relative ${selectedIds.includes(item.id) ? 'border-brand ring-1 ring-brand/10' : ''}`}>
                    <div className="absolute top-6 left-6">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-slate-300 text-brand focus:ring-brand"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </div>
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/applications/${item.id}`} className="flex items-center gap-1.5 text-xs font-semibold text-brand bg-brand/5 hover:bg-brand/10 px-3 py-1.5 rounded-full transition-colors">
                        <Eye className="w-3.5 h-3.5" /> View Details
                      </Link>
                    </div>
                  <div className="flex-1 space-y-5 w-full">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-600 font-bold border border-slate-100">
                          {item.fullName.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 text-lg">{item.fullName}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <p className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded flex items-center gap-1.5 focus:outline-none flex-wrap ${!item.jobId ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-brand/5 text-brand'}`}>
                              <Briefcase className="w-3 h-3" /> {item.job?.title || item.position || "General Application"}
                            </p>
                            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <CalendarIcon className="w-3 h-3" /> {new Date(item.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 md:pt-0 flex flex-col items-end gap-2">
                        {getStatusBadge(item.status)}
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                          Interview: {(item.interviewStatus || "NOT_SCHEDULED").replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>

                    {item.coverLetter && (
                      <div className="bg-slate-50 p-6 rounded-2xl flex items-start gap-4">
                        <FileText className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-1">Cover Letter</p>
                          <p className="text-sm font-light text-slate-600 leading-relaxed whitespace-pre-wrap line-clamp-3">
                            {item.coverLetter}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {item.additionalInfo && (
                      <div className="bg-slate-50 p-6 rounded-2xl flex items-start gap-4">
                        <LinkIcon className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-slate-700 mb-1">Additional Link</p>
                          <a href={item.additionalInfo.startsWith("http") ? item.additionalInfo : `https://${item.additionalInfo}`} target="_blank" rel="noopener noreferrer" className="text-sm font-light text-brand hover:underline break-all">
                            {item.additionalInfo}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-64 space-y-4 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-2 md:pl-8">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        <span className="truncate">{item.email}</span>
                      </div>
                      {item.phone && (
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span>{item.phone}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <a
                        href={item.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-900 transition-all text-center"
                      >
                        <FileText className="w-4 h-4" /> View Resume
                      </a>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest text-center mb-3">Update Status</p>
                      <select 
                        className="w-full text-xs px-3 py-2 bg-slate-100 border-none rounded-lg outline-none text-slate-700"
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="REVIEWING">Reviewing</option>
                        <option value="SHORTLISTED">Shortlisted</option>
                        <option value="INTERVIEW_CONDUCTED">Interview Conducted</option>
                        <option value="NOT_QUALIFIED">Not Qualified</option>
                        <option value="NOT_INTERESTED">Not Interested</option>
                        <option value="REJECTED">Rejected</option>
                        <option value="BLACKLISTED">Blacklisted</option>
                        <option value="FUTURE_REFERENCE">Future Reference</option>
                      </select>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-full mt-2 py-2 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold rounded-lg transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            )}
            <div className="pt-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </>
        )}
      </div>
      <BulkActionModal 
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        selectedCount={selectedIds.length}
        onConfirm={handleBulkConfirm}
        mode={bulkModalMode}
      />

      {selectedIds.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-slate-900 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-8 border border-slate-700 backdrop-blur-md bg-opacity-95">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center font-bold text-lg shadow-inner">
                {selectedIds.length}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">Candidates Selected</span>
                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">Bulk Management Active</span>
              </div>
            </div>
            
            <div className="h-10 w-px bg-slate-700"></div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => { setBulkModalMode("schedule"); setIsBulkModalOpen(true); }}
                className="px-6 py-2.5 bg-[#5BA8A0] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#4d8e87] transition-all shadow-lg shadow-[#5BA8A0]/20 flex items-center gap-2"
              >
                <CalendarPlus className="w-3.5 h-3.5" /> Schedule Interview
              </button>
              <button 
                onClick={() => { setBulkModalMode("update"); setIsBulkModalOpen(true); }}
                className="px-6 py-2.5 bg-brand text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand/90 transition-all shadow-lg shadow-brand/20 flex items-center gap-2"
              >
                <CheckCircle className="w-3.5 h-3.5" /> Bulk Update
              </button>
              <button 
                onClick={() => setSelectedIds([])}
                className="px-6 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
