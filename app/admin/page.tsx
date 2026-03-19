export default function AdminDashboardPage() {
  const stats = [
    { name: "Total Posts", value: "24", change: "+4.75%", changeType: "positive" },
    { name: "Active Jobs", value: "12", change: "+54.02%", changeType: "positive" },
    { name: "New Inquiries", value: "8", change: "-1.39%", changeType: "negative" },
    { name: "Pending Launchpad", value: "3", change: "+10.18%", changeType: "positive" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-light text-slate-800 tracking-tight mb-2">
          Dashboard <span className="font-medium text-brand">Overview</span>
        </h1>
        <p className="text-slate-500 font-light text-sm">
          Welcome back to the 3Dots management suite. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-slate-500 text-sm font-medium mb-1">{stat.name}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-800 tracking-tighter">{stat.value}</span>
              <span className={`text-xs font-medium ${
                stat.changeType === "positive" ? "text-emerald-500" : "text-rose-500"
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Recent Content</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-50 last:border-0">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-800">Draft: Growing your startup with 3Dots.</h4>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">Blog • Edited 2 hours ago</p>
                </div>
                <button className="text-xs font-medium text-brand hover:underline">Edit</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-medium text-slate-800 mb-6 tracking-tight">Expert Bookings</h2>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center shrink-0">
                   <Calendar className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-800 leading-tight">Consultation call</h4>
                  <p className="text-xs text-slate-400 mt-1">Tomorrow at 2:00 PM</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-500 hover:bg-slate-100 transition-colors">
            View All Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

import { Calendar, FileText } from "lucide-react";
