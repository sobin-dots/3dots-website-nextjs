"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Briefcase } from "lucide-react";

export default function CareersAdminPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/careers")
      .then((res) => res.json())
      .then((data) => {
        setJobs(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });
    if (res.ok) setJobs(jobs.filter((j) => j.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            Careers <span className="font-medium">Management</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">Manage job openings and tags.</p>
        </div>
        <button className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
          <Plus className="w-4 h-4" /> New Position
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-400 font-light italic">Loading positions...</div>
        ) : jobs.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400 font-light italic">No positions listed yet.</div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative">
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 bg-brand/5 rounded-2xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-brand" />
                </div>
                <div className="flex gap-1">
                  <button className="p-2 text-slate-400 hover:text-brand transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(job.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2 leading-tight">{job.title}</h3>
              <p className="text-brand text-[10px] font-bold tracking-widest uppercase mb-4">{job.tag}</p>
              <p className="text-slate-500 font-light text-sm line-clamp-3 mb-6">{job.description}</p>
              
              <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${job.active ? "text-emerald-500" : "text-slate-400"}`}>
                  {job.active ? "Accepting Applications" : "Closed"}
                </span>
                <span className="text-[10px] text-slate-300 font-medium">Applied: 0</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
