"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Calendar as CalendarIcon, MessageSquare, LayoutGrid, List, Rocket } from "lucide-react";
import Pagination from "../components/Pagination";

interface LaunchpadApp {
  id: string;
  fullName: string;
  email: string;
  startupName: string;
  description: string;
  mobileNumber: string | null;
  category: string | null;
  status: string;
  createdAt: string;
}

export default function LaunchpadAdminPage() {
  const [applications, setApplications] = useState<LaunchpadApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"card" | "table">("table");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetch("/api/launchpad-cms")
      .then((res) => res.json())
      .then((data) => {
        setApplications(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const paginatedApplications = applications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            Launchpad <span className="font-medium">Applications</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">Review MVP and Product Build requests.</p>
        </div>
        
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
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-slate-400 font-light">Loading applications...</div>
        ) : applications.length === 0 ? (
          <div className="py-20 text-center text-slate-400 font-light">No applications yet.</div>
        ) : (
          <>
            {viewMode === "table" ? (
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-x-auto">
                <table className="w-full text-left min-w-[900px]">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest border-b border-slate-100">
                      <th className="px-8 py-5">Founder</th>
                      <th className="px-8 py-5">Startup Info</th>
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5">Description</th>
                      <th className="px-8 py-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {paginatedApplications.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm shrink-0">
                              {item.fullName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">{item.fullName}</p>
                              <div className="flex flex-col gap-1 mt-1">
                                <p className="text-[11px] text-slate-500 flex items-center gap-1.5"><Mail className="w-3 h-3 text-slate-400" /> {item.email}</p>
                                {item.mobileNumber && <p className="text-[11px] text-slate-500 flex items-center gap-1.5"><Phone className="w-3 h-3 text-slate-400" /> {item.mobileNumber}</p>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                            <h3 className="text-sm font-semibold text-slate-800">{item.startupName}</h3>
                            <p className="text-brand text-[10px] font-bold tracking-widest uppercase mt-1">
                                {item.category || "Uncategorized"}
                            </p>
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500 font-light whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6 text-sm text-slate-500 font-light max-w-sm">
                          <p className="truncate italic">&quot;{item.description}&quot;</p>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${item.status === 'NEW' ? 'text-brand' : 'text-slate-400'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'NEW' ? 'bg-brand' : 'bg-slate-300'}`}></span>
                              {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedApplications.map((item) => (
                  <div key={item.id} className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-all">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
                        <div className="w-12 h-12 bg-brand/5 rounded-2xl flex items-center justify-center text-brand font-bold shrink-0">
                          <Rocket className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl leading-tight font-semibold text-slate-800 mb-1">{item.startupName}</h3>
                          <div className="flex gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest">
                            <span className="text-brand">{item.category || "Uncategorized"}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold shrink-0 text-xs">
                          {item.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{item.fullName}</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-6 rounded-2xl">
                        <p className="text-sm font-light text-slate-600 leading-relaxed italic">
                          &quot;{item.description}&quot;
                        </p>
                      </div>
                    </div>
                    <div className="w-full md:w-64 space-y-3 shrink-0">
                      <div className="flex items-center gap-3 text-sm text-slate-600 group cursor-pointer hover:text-brand transition-colors">
                        <Mail className="w-4 h-4 text-slate-400 group-hover:text-brand" />
                        <span className="truncate">{item.email}</span>
                      </div>
                      {item.mobileNumber && (
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span>{item.mobileNumber}</span>
                        </div>
                      )}
                      <div className="pt-4 flex flex-col gap-2">
                        <button className="w-full py-2.5 bg-brand text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-all">
                          Contact Founder
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
    </div>
  );
}
