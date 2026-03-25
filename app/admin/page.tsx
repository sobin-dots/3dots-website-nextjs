"use client";

import { useState, useEffect } from "react";
import { Calendar, FileText, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DashboardData {
  stats: { name: string; value: string }[];
  recentPosts: { id: string; title: string; updatedAt: string; category: string }[];
  recentAppointments: { id: string; clientName: string; date: string; reason: string | null; expert: { name: string } }[];
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then((res) => res.json())
      .then((d) => {
        if (!d.error) setData(d);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-brand animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-light text-slate-800 tracking-tight mb-2">
          Dashboard <span className="font-medium text-brand">Overview</span>
        </h1>
        <p className="text-slate-500 font-light text-sm">
          Welcome back to the 3Dots management suite. Here&apos;s what&apos;s happening across your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.name}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-800 tracking-tighter">{stat.value}</span>
              {/* Optional dynamic change indicators could be calculated here if last_week data was added to API */}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl -translate-y-1/2 translate-x-1/2 rounded-full"></div>
          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-xl font-medium text-slate-800 tracking-tight">Recent Content Updates</h2>
            <Link href="/admin/blog" className="text-xs text-brand hover:underline flex items-center gap-1 font-medium">
              View All Posts <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-4 relative z-10">
            {data?.recentPosts && data.recentPosts.length > 0 ? (
              data.recentPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 py-4 px-2 hover:bg-slate-50 rounded-2xl transition-colors border-b border-slate-50 last:border-0 group">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-slate-800 truncate">{post.title}</h4>
                    <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">{post.category} • Edited {new Date(post.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <Link href={`/admin/blog/edit/${post.id}`} className="text-[11px] font-bold text-slate-400 hover:text-brand uppercase tracking-tighter shadow-xs px-3 py-1 bg-white border border-slate-100 rounded-lg group-hover:border-brand/20 transition-all">Edit</Link>
                </div>
              ))
            ) : (
                <div className="py-12 text-center text-slate-400 font-light text-sm italic">
                    No recent content activity yet.
                </div>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm flex flex-col">
          <h2 className="text-xl font-medium text-slate-800 mb-8 tracking-tight">Upcoming Expert Bookings</h2>
          <div className="space-y-6 flex-1">
            {data?.recentAppointments && data.recentAppointments.length > 0 ? (
                data.recentAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-brand/5 rounded-2xl flex items-center justify-center shrink-0 border border-brand/10">
                            <Calendar className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-slate-800 leading-tight">{apt.clientName}</h4>
                            <p className="text-[11px] text-brand/70 font-medium mt-0.5">with {apt.expert.name}</p>
                            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-md w-fit italic">
                                {new Date(apt.date).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="h-40 flex flex-col items-center justify-center text-center opacity-40">
                    <Calendar className="w-8 h-8 mb-2" />
                    <p className="text-xs font-light">No upcoming bookings.</p>
                </div>
            )}
          </div>
          <Link href="/admin/appointments" className="w-full mt-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all text-center">
            Manage All Appointments
          </Link>
        </div>
      </div>
    </div>
  );
}

