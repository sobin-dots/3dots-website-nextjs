"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  User as UserIcon, 
  Mail, 
  Phone, 
  Briefcase, 
  Info,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Globe,
  Edit2,
  Calendar
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface UserData {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  role: string;
  image: string | null;
  about: string | null;
  designation: string | null;
  employeeId: string | null;
  socials: Record<string, string> | null;
  createdAt: string;
}


export default function UserViewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      const res = await fetch(`/api/admin/users/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin"></div>
        <p className="text-slate-400 font-light tracking-wide">Retrieving profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-20 text-center space-y-4">
        <p className="text-slate-500">User not found.</p>
        <button onClick={() => router.back()} className="text-brand hover:underline">Go back</button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-brand hover:border-brand/30 transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-light text-slate-800 tracking-tight">
              User <span className="font-medium">Details</span>
            </h1>
            <p className="text-slate-500 font-light text-sm mt-1">
              View accurate profile information for this team member.
            </p>
          </div>
        </div>
        
        <Link 
          href={`/admin/users/${id}/edit`}
          className="bg-brand text-white px-6 py-3 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
        >
          <Edit2 className="w-4 h-4" /> Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-center space-y-6">
            <div className="w-40 h-40 rounded-full bg-slate-50 border-4 border-white shadow-xl overflow-hidden mx-auto relative mb-4">
              {user.image ? (
                <Image 
                  src={user.image} 
                  alt={user.name || "Avatar"} 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-200">
                  <UserIcon className="w-20 h-20" />
                </div>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-slate-800">{user.name || "Unnamed User"}</h2>
              <p className="text-brand text-xs font-bold uppercase tracking-widest mt-1 mb-4">{user.designation || user.role}</p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                {user.phone && (
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex justify-center gap-4">
               {user.socials?.linkedin && (
                 <a href={user.socials.linkedin} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-2xl transition-all">
                   <Linkedin className="w-5 h-5" />
                 </a>
               )}
               {user.socials?.twitter && (
                 <a href={user.socials.twitter} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-2xl transition-all">
                   <Twitter className="w-5 h-5" />
                 </a>
               )}
               {user.socials?.instagram && (
                 <a href={user.socials.instagram} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-2xl transition-all">
                   <Instagram className="w-5 h-5" />
                 </a>
               )}
               {user.socials?.facebook && (
                 <a href={user.socials.facebook} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:text-brand hover:bg-brand/5 rounded-2xl transition-all">
                   <Facebook className="w-5 h-5" />
                 </a>
               )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-light">Employee ID</span>
                    <span className="text-slate-600 font-mono text-xs">{user.employeeId || "Not assigned"}</span>
                </div>
              <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-light flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Joined
                  </span>
                  <span className="text-slate-600 font-medium">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-light flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> System Role
                  </span>
                  <span className="text-slate-600 font-medium">{user.role}</span>
              </div>
          </div>
        </div>

        {/* Right Column: Detailed View */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm min-h-[400px]">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                   <Info className="w-4 h-4" />
               </div>
               <h3 className="text-lg font-medium text-slate-800">Professional Background</h3>
            </div>

            <div className="prose prose-slate max-w-none">
                {user.about ? (
                  <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{user.about}</p>
                ) : (
                  <p className="text-slate-400 italic">No biographical information has been provided for this team member yet.</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
