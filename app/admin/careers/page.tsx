"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Briefcase, Eye, LayoutGrid, List } from "lucide-react";
import Link from "next/link";
import JobForm from "./components/JobForm";
import Pagination from "../components/Pagination";

interface JobData {
  id: string;
  title: string;
  tag: string;
  type: string;
  location: string;
  about: string | null;
  description: string;
  active: boolean;
  sections?: { title: string; points: string[] }[];
  applications?: { id: string }[];
}

export default function CareersAdminPage() {
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState<JobData | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "table">("table");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const fetchJobs = () => {
    fetch("/api/careers")
      .then((res) => res.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });
    if (res.ok) setJobs(jobs.filter((j) => j.id !== id));
  };

  const handleEdit = (job: JobData) => {
    setEditingJob(job);
    setIsFormOpen(true);
  };

  const handleAddNew = () => {
    setEditingJob(null);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    setIsFormOpen(false);
    fetchJobs();
  };

  if (isFormOpen) {
    return (
      <div className="pb-12">
        <JobForm job={editingJob} onSave={handleSave} onCancel={() => setIsFormOpen(false)} />
      </div>
    );
  }

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const paginatedJobs = jobs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            Careers <span className="font-medium">Management</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">Manage job openings and tags.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1.5 rounded-xl w-fit border border-slate-200 shadow-inner">
            <button 
              onClick={() => setViewMode("table")} 
              className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'table' ? 'bg-white shadow-sm text-brand font-medium' : 'text-slate-400 hover:text-slate-600'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("card")} 
              className={`p-2.5 rounded-lg transition-all flex items-center justify-center ${viewMode === 'card' ? 'bg-white shadow-sm text-brand font-medium' : 'text-slate-400 hover:text-slate-600'}`}
              title="Card View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={handleAddNew}
            className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
          >
            <Plus className="w-4 h-4" /> New Position
          </button>
        </div>
      </div>

      <div className={viewMode === "card" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-400 font-light italic">Loading positions...</div>
        ) : jobs.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400 font-light italic">No positions listed yet.</div>
        ) : (
          <>
            {viewMode === "table" ? (
              <div className="col-span-full">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
                  <table className="w-full text-left min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                        <th className="px-8 py-5">Position</th>
                        <th className="px-8 py-5">Location</th>
                        <th className="px-8 py-5">Type</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {paginatedJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-brand/5 rounded-2xl flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-brand" />
                              </div>
                              <div>
                                <h3 className="text-sm font-semibold text-slate-800">{job.title}</h3>
                                <p className="text-brand text-[10px] font-bold tracking-widest uppercase mt-1">{job.tag}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-500 font-light">
                            {job.location}
                          </td>
                          <td className="px-8 py-6 text-sm text-slate-500 font-light">
                            {job.type}
                          </td>
                          <td className="px-8 py-6">
                            <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${job.active ? "text-emerald-500" : "text-slate-400"}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${job.active ? "bg-emerald-500" : "bg-slate-300"}`}></span>
                              {job.active ? "Accepting" : "Closed"}
                            </span>
                            <div className="text-[10px] text-slate-400 font-medium mt-1">
                              Applied: {job.applications?.length || 0}
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                              <Link href={`/admin/careers/${job.id}`} className="p-2 text-slate-400 hover:text-brand transition-colors"><Eye className="w-4 h-4" /></Link>
                              <button onClick={() => handleEdit(job)} className="p-2 text-slate-400 hover:text-brand transition-colors"><Edit2 className="w-4 h-4" /></button>
                              <button onClick={() => handleDelete(job.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <>
                {paginatedJobs.map((job) => (
                  <div key={job.id} className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 bg-brand/5 rounded-2xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-brand" />
                      </div>
                      <div className="flex gap-1">
                        <Link href={`/admin/careers/${job.id}`} className="p-2 text-slate-400 hover:text-brand transition-colors"><Eye className="w-4 h-4" /></Link>
                        <button onClick={() => handleEdit(job)} className="p-2 text-slate-400 hover:text-brand transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(job.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2 leading-tight">{job.title}</h3>
                    <p className="text-brand text-[10px] font-bold tracking-widest uppercase mb-4">{job.tag}</p>
                    <div className="flex gap-2 text-xs font-semibold text-slate-500 mb-4 uppercase tracking-widest">
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>
                    <p className="text-slate-500 font-light text-sm line-clamp-3 mb-6">{job.description}</p>
                    
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${job.active ? "text-emerald-500" : "text-slate-400"}`}>
                        {job.active ? "Accepting Applications" : "Closed"}
                      </span>
                      <span className="text-[10px] text-slate-300 font-medium">Applied: {job.applications?.length || 0}</span>
                    </div>
                  </div>
                ))}
              </>
            )}
            <div className="col-span-full pt-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
