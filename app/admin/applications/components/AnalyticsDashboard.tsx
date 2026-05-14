"use client";

import { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";
import { 
  Users, CheckCircle, XCircle, Clock, Calendar, MapPin, 
  GraduationCap, Briefcase, TrendingUp, Filter
} from "lucide-react";

interface AnalyticsData {
  total: number;
  statusCounts: Record<string, number>;
  interviewStatusCounts: Record<string, number>;
  locationCounts: Record<string, number>;
  instituteCounts: Record<string, number>;
  experienceCounts: Record<string, number>;
}

const COLORS = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b", "#8b5cf6", "#06b6d4", "#ec4899"];

export default function AnalyticsDashboard({ jobFilter }: { jobFilter: string }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/applications/analytics?jobId=${jobFilter}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, [jobFilter]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
        <p className="text-slate-500 font-light animate-pulse">Calculating insights...</p>
      </div>
    );
  }

  if (!data) return null;

  // Prepare chart data
  const statusData = Object.entries(data.statusCounts).map(([name, value]) => ({ name, value }));
  const interviewData = Object.entries(data.interviewStatusCounts).map(([name, value]) => ({ 
    name: name.replace(/_/g, " "), 
    value 
  }));
  const locationData = Object.entries(data.locationCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
  
  const expData = Object.entries(data.experienceCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const StatCard = ({ title, value, icon: Icon, color, subtext }: any) => (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
          {subtext && <p className="text-[11px] text-slate-400 mt-1 font-light">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-2xl ${color} transition-transform group-hover:scale-110`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Applications" 
          value={data.total} 
          icon={Users} 
          color="bg-blue-50 text-blue-600" 
          subtext="Overall candidate pool"
        />
        <StatCard 
          title="Shortlisted" 
          value={data.statusCounts["SHORTLISTED"] || 0} 
          icon={CheckCircle} 
          color="bg-green-50 text-green-600"
          subtext={`${((data.statusCounts["SHORTLISTED"] || 0) / data.total * 100 || 0).toFixed(1)}% conversion rate`}
        />
        <StatCard 
          title="Scheduled Interviews" 
          value={data.interviewStatusCounts["SCHEDULED"] || 0} 
          icon={Calendar} 
          color="bg-purple-50 text-purple-600"
          subtext="Active recruitment stage"
        />
        <StatCard 
          title="Rejections" 
          value={data.statusCounts["REJECTED"] || 0} 
          icon={XCircle} 
          color="bg-red-50 text-red-600"
          subtext="Candidates not moving forward"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Status Distribution */}
        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand" /> Application Funnel
            </h4>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Interview Status Breakdown */}
        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" /> Interview Pipeline
            </h4>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={interviewData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  fontSize={10} 
                  tick={{ fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Location Breakdown */}
        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500" /> Geographic Distribution
            </h4>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  fontSize={10} 
                  tick={{ fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis fontSize={10} tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                   cursor={{ fill: '#f8fafc' }}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Experience/Education Breakdown */}
        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-blue-500" /> Experience Distribution
            </h4>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={150} 
                  fontSize={10} 
                  tick={{ fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={15} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Institutes Table */}
      <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between">
          <h4 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-brand" /> Top Institutes / Companies
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-4">Source Name</th>
                <th className="px-8 py-4">Applications</th>
                <th className="px-8 py-4">Percentage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {Object.entries(data.instituteCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([name, count], index) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-5 text-sm font-medium text-slate-700">{name}</td>
                    <td className="px-8 py-5 text-sm text-slate-600">{count}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-brand" 
                            style={{ width: `${(count / data.total * 100).toFixed(1)}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">{(count / data.total * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
