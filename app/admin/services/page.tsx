/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Boxes, Zap, ArrowRight } from "lucide-react";
import Pagination from "../components/Pagination";

export default function ServicesCMSPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    fetch("/api/services-cms")
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-slate-800 tracking-tight">
            Services <span className="font-medium">Management</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">Define and detail your service offerings.</p>
        </div>
        <button className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full py-20 text-center text-slate-400 font-light">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="col-span-full py-20 text-center text-slate-400 font-light">No services listed yet.</div>
        ) : (
          <>
            {services.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((service) => (
              <div key={service.id} className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-md transition-all group flex gap-8">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-brand/5 transition-colors">
                <Boxes className="w-10 h-10 text-slate-300 group-hover:text-brand" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{service.title}</h3>
                  <p className="text-xs text-brand/60 font-medium tracking-wider uppercase mt-1">/{service.slug}</p>
                </div>
                <p className="text-slate-500 font-light text-sm line-clamp-2 leading-relaxed">
                  {service.shortDescription}
                </p>
                <div className="flex items-center gap-6 pt-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <Zap className="w-3 h-3 text-brand" /> {service.features?.length || 0} Features
                  </div>
                  <button className="text-[10px] font-bold text-slate-400 hover:text-brand uppercase tracking-widest flex items-center gap-1 transition-colors">
                    Edit Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="col-span-full">
            <Pagination currentPage={currentPage} totalPages={Math.ceil(services.length / ITEMS_PER_PAGE)} onPageChange={setCurrentPage} />
          </div>
        </>
      )}
    </div>
    </div>
  );
}
