/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Plus, Twitter, Linkedin, MoreVertical } from "lucide-react";
import Pagination from "../components/Pagination";

export default function TeamCMSPage() {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    fetch("/api/team-cms")
      .then((res) => res.json())
      .then((data) => {
        setTeam(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            Team <span className="font-medium">Management</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">Manage the profiles of the 3Dots family.</p>
        </div>
        <button className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-400 font-light">Loading team...</div>
        ) : team.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400 font-light italic">No members added yet.</div>
        ) : (
          <>
            {(() => {
              const totalPages = Math.ceil(team.length / ITEMS_PER_PAGE);
              const paginatedTeam = team.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
              return (
                <>
                  {paginatedTeam.map((member) => (
            <div key={member.id} className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative text-center">
              <div className="absolute top-4 right-4">
                <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
              </div>
              <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 border-4 border-white shadow-md">
                 {/* Placeholder for member image */}
                 <div className="text-slate-300 font-bold text-2xl uppercase">{member.name.charAt(0)}</div>
              </div>
              <h3 className="font-semibold text-slate-800 text-lg mb-1">{member.name}</h3>
              <p className="text-brand text-[10px] font-bold tracking-widest uppercase mb-4">{member.role}</p>
              
              <div className="flex justify-center gap-3 pt-4 border-t border-slate-50">
                <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand/5 hover:text-brand transition-all mt-1">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-brand/5 hover:text-brand transition-all mt-1">
                  <Twitter className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          <div className="col-span-full">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        </>
      );
    })()}
  </>
)}
      </div>
    </div>
  );
}
