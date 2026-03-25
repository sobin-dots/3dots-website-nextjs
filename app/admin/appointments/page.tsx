/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Calendar, User, Clock, CheckCircle, XCircle } from "lucide-react";
import Pagination from "../components/Pagination";

export default function AppointmentsAdminPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-slate-800 tracking-tight">
          Expert <span className="font-medium">Bookings</span>
        </h1>
        <p className="text-slate-500 font-light text-sm mt-1">Manage scheduled consultations with experts.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="py-20 text-center text-slate-400 font-light">Loading appointments...</div>
        ) : appointments.length === 0 ? (
          <div className="py-20 text-center text-slate-400 font-light italic text-sm">No scheduled bookings found.</div>
        ) : (
          <>
            {(() => {
              const totalPages = Math.ceil(appointments.length / ITEMS_PER_PAGE);
              const paginatedAppointments = appointments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
              return (
                <>
                  {paginatedAppointments.map((apt) => (
            <div key={apt.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                  <Calendar className="w-6 h-6 text-slate-300" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-800">{apt.clientName}</h3>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">with {apt.expert.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-brand" /> {new Date(apt.date).toLocaleString()}</span>
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {apt.clientEmail}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 hover:text-white transition-all">
                  <CheckCircle className="w-3 h-3" /> Done
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-rose-500 hover:text-white transition-all">
                  <XCircle className="w-3 h-3" /> Cancel
                </button>
              </div>
            </div>
          ))}
          <div className="pt-2">
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
