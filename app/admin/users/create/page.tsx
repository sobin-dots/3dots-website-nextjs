/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Camera, 
  Save, 
  Loader2, 
  User as UserIcon, 
  Mail, 
  Phone, 
  Briefcase, 
  Info,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Globe,
  Lock
} from "lucide-react";
import Image from "next/image";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  image: string | null;
  about: string;
  designation: string;
  employeeId: string;
  socials: Record<string, string>;
}

export default function CreateUserPage() {
  const router = useRouter();
  
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Content Team",
    image: null,
    about: "",
    designation: "",
    employeeId: "",
    socials: {
        linkedin: "",
        instagram: "",
        twitter: "",
        facebook: ""
    }
  });

  const [wordCount, setWordCount] = useState(0);
  const WORD_LIMIT = 300;

  useEffect(() => {
    if (formData.about) {
      const words = formData.about.trim().split(/\s+/).filter(w => w.length > 0).length;
      setWordCount(words);
    } else {
      setWordCount(0);
    }
  }, [formData.about]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      if (data.url) {
        setFormData({ ...formData, image: data.url });
      }
    } catch (err) {
      console.error("Upload error", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (wordCount > WORD_LIMIT) {
      setMessage({ type: 'error', text: "About section exceeds word limit." });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || data.error || "Failed to create user");
      }

      setMessage({ type: 'success', text: "User account created successfully!" });
      setTimeout(() => router.push("/admin/users"), 1500);
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

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
              Create <span className="font-medium">New User</span>
            </h1>
            <p className="text-slate-500 font-light text-sm mt-1">
              Onboard a new team member with full profile details.
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            {message && (
                <div className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 animate-in zoom-in-95 duration-300 ${
                    message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                }`}>
                    {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {message.text}
                </div>
            )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-center space-y-6">
            <div className="relative inline-block group">
              <div className="w-40 h-40 rounded-full bg-slate-50 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center relative">
                {formData.image ? (
                  <Image 
                    src={formData.image} 
                    alt="Preview" 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="text-slate-200">
                    <UserIcon className="w-20 h-20" />
                  </div>
                )}
                
                {uploading && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-brand animate-spin" />
                  </div>
                )}
              </div>
              
              <label className="absolute bottom-1 right-1 p-3 bg-brand text-white rounded-2xl shadow-lg cursor-pointer hover:bg-brand-dark transition-all hover:scale-110 active:scale-95">
                <Camera className="w-5 h-5" />
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-800">{formData.name || "New Team Member"}</h2>
              <p className="text-brand text-xs font-bold uppercase tracking-widest mt-1">{formData.role}</p>
            </div>

            <div className="pt-6 border-t border-slate-50 space-y-4">
                <p className="text-xs text-slate-400 font-light px-4">
                    Upload a high-quality headshot to personalize the user&apos;s presence across the platform.
                </p>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
            {/* Account Info */}
            <div className="space-y-6">
               <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                       <Lock className="w-4 h-4" />
                   </div>
                   <h3 className="text-lg font-medium text-slate-800">Account Credentials</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-3.5 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 text-sm transition-all"
                      placeholder="jane@3dots.co"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Initial Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-3.5 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 text-sm transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
               </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-6 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                       <UserIcon className="w-4 h-4" />
                   </div>
                   <h3 className="text-lg font-medium text-slate-800">Profile Details</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-3.5 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 text-sm transition-all"
                      placeholder="Jane Cooper"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Employee ID</label>
                  <div className="relative">
                    <Info className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="text" 
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-3.5 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 text-sm transition-all"
                      placeholder="EMP-001"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="text" 
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-3.5 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 text-sm transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Designation</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input 
                      type="text" 
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-3.5 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 text-sm transition-all"
                      placeholder="Lead Designer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">System Role</label>
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 text-sm transition-all appearance-none cursor-pointer"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Hr manager">HR Manager</option>
                    <option value="Content Manager">Content Manager</option>
                    <option value="Tech Manager">Tech Manager</option>
                    <option value="Ops manager">Ops Manager</option>
                    <option value="Content Team">Content Team</option>
                    <option value="Dev Team">Dev Team</option>
                    <option value="Branding Team">Branding Team</option>
                  </select>

                </div>
               </div>
            </div>

            {/* Socials */}
            <div className="space-y-6 pt-4 border-t border-slate-50">
               <div className="flex items-center gap-3 mb-2">
                   <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                       <Globe className="w-4 h-4" />
                   </div>
                   <h3 className="text-lg font-medium text-slate-800">Social Connections</h3>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', placeholder: 'https://linkedin.com/...' },
                  { key: 'twitter', icon: Twitter, label: 'Twitter / X', placeholder: 'https://twitter.com/...' },
                ].map((social) => (
                  <div key={social.key} className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">{social.label}</label>
                    <div className="relative">
                      <social.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      <input 
                        type="url" 
                        value={formData.socials[social.key]}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          socials: { ...formData.socials, [social.key]: e.target.value } 
                        })}
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-11 pr-5 py-3.5 focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/5 text-sm transition-all"
                        placeholder={social.placeholder}
                      />
                    </div>
                  </div>
                ))}
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                       <Info className="w-4 h-4" />
                   </div>
                   <h3 className="text-lg font-medium text-slate-800">About Section</h3>
               </div>
               <span className={`text-[10px] font-bold uppercase tracking-widest ${wordCount > WORD_LIMIT ? 'text-rose-500' : 'text-slate-400'}`}>
                 {wordCount} / {WORD_LIMIT} Words
               </span>
              </div>
              
              <div className="relative group">
                <textarea 
                  rows={4}
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                  className={`w-full bg-slate-50 border rounded-[30px] p-6 focus:outline-none focus:ring-4 text-sm transition-all resize-none ${
                    wordCount > WORD_LIMIT 
                    ? 'border-rose-200 focus:border-rose-300 focus:ring-rose-500/5' 
                    : 'border-slate-100 focus:border-brand focus:ring-brand/5'
                  }`}
                  placeholder="Short bio or professional background..."
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                disabled={submitting || uploading || wordCount > WORD_LIMIT}
                className="w-full bg-slate-900 text-white py-5 rounded-3xl font-semibold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 transition-all duration-300"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Create User Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
