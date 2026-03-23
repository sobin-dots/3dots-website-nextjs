"use client";

import { useState, useEffect } from "react";
import { Mail, Phone, Calendar as CalendarIcon, MessageSquare } from "lucide-react";

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/inquiries")
      .then((res) => res.json())
      .then((data) => {
        setInquiries(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-light text-slate-800 tracking-tight">
          Contact <span className="font-medium">Inquiries</span>
        </h1>
        <p className="text-slate-500 font-light text-sm mt-1">Track and respond to website leads.</p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-slate-400 font-light">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="py-20 text-center text-slate-400 font-light">No inquiries yet. Keep marketing!</div>
        ) : (
          inquiries.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-all">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center text-brand font-bold">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{item.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                      <CalendarIcon className="w-3 h-3" /> {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-2xl">
                  <p className="text-sm font-light text-slate-600 leading-relaxed italic">
                    &quot;{item.message}&quot;
                  </p>
                </div>
              </div>
              <div className="w-full md:w-64 space-y-3 shrink-0">
                <div className="flex items-center gap-3 text-sm text-slate-600 group cursor-pointer hover:text-brand transition-colors">
                  <Mail className="w-4 h-4 text-slate-400 group-hover:text-brand" />
                  <span className="truncate">{item.email}</span>
                </div>
                {item.phone && (
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{item.phone}</span>
                  </div>
                )}
                <div className="pt-4">
                  <button className="w-full py-2.5 bg-brand/5 text-brand rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-brand hover:text-white transition-all">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
