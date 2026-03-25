"use client";

import { useState, useEffect } from "react";
import { User, Lock, Mail, Phone, Loader2, ShieldCheck, Download, Server } from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
}

export default function SettingsAdminPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Profile Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState({ text: "", type: "" });

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [securitySaving, setSecuritySaving] = useState(false);
  const [securityMessage, setSecurityMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          setProfile(data);
          setName(data.name || "");
          setEmail(data.email || "");
          setPhone(data.phone || "");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setProfile(data);
        setProfileMessage({ text: "Profile updated successfully.", type: "success" });
      } else {
        setProfileMessage({ text: data.error || "Failed to update profile.", type: "error" });
      }
    } catch (error) {
      setProfileMessage({ text: "Network error occurred.", type: "error" });
    } finally {
      setProfileSaving(false);
      setTimeout(() => setProfileMessage({ text: "", type: "" }), 3000);
    }
  };

  const handleUpdateSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setSecurityMessage({ text: "New passwords do not match.", type: "error" });
      return;
    }
    if (newPassword.length < 6) {
      setSecurityMessage({ text: "New password must be at least 6 characters.", type: "error" });
      return;
    }

    setSecuritySaving(true);
    setSecurityMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setSecurityMessage({ text: "Password updated successfully.", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setSecurityMessage({ text: data.error || "Failed to update password.", type: "error" });
      }
    } catch (error) {
      setSecurityMessage({ text: "Network error occurred.", type: "error" });
    } finally {
      setSecuritySaving(false);
      setTimeout(() => setSecurityMessage({ text: "", type: "" }), 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-light text-slate-800 tracking-tight">
          System <span className="font-medium">Settings</span>
        </h1>
        <p className="text-slate-500 font-light text-sm mt-1">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Profile Card */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 border border-slate-100 font-bold text-xl">
                  {profile?.name?.charAt(0) || "A"}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800 tracking-tight">Personal Information</h2>
                  <p className="text-sm font-light text-slate-500 mt-1">Update your identifiable details.</p>
                </div>
              </div>
              <span className="bg-brand/10 text-brand px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-brand/20 shadow-sm flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> {profile?.role}
              </span>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" /> Full Name
                </label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm"
                  placeholder="e.g. Admin Director"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> Email Address
                  </label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm"
                    placeholder="admin@startup.co"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> Phone Number
                  </label>
                  <input 
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm"
                    placeholder="+1 234 567 890"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button 
                  type="submit" 
                  disabled={profileSaving}
                  className="bg-brand text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                  {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Changes"}
                </button>
                {profileMessage.text && (
                  <span className={`text-sm font-medium ${profileMessage.type === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
                    {profileMessage.text}
                  </span>
                )}
              </div>
            </form>
          </div>
          
          {profile?.role === "Admin" && (
            <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 border border-slate-100">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 tracking-tight">Super Admin Actions</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Global configuration triggers.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                    <button className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 text-white text-sm font-bold shadow-md hover:bg-slate-900 transition-all border border-slate-700">
                        <Download className="w-4 h-4" /> Download System Backup
                    </button>
                    <p className="text-xs font-light text-slate-500 leading-relaxed italic">
                        Note: Full database export triggers are restricted directly to authorized engineering staff via CLI due to Vercel/Neon deployment standards. The UI backup feature captures the current CMS blobs.
                    </p>
                </div>
            </div>
          )}

        </div>

        {/* Security Card */}
        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-100">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 tracking-tight">Security</h2>
              <p className="text-xs font-light text-slate-500 mt-1">Change your password.</p>
            </div>
          </div>

          <form onSubmit={handleUpdateSecurity} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Current Password</label>
              <input 
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 focus:border-rose-400 rounded-xl px-4 py-3 outline-none transition-all text-sm"
                placeholder="Enter current password"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">New Password</label>
              <input 
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                placeholder="Enter new password"
              />
            </div>
            
            <div className="space-y-2 pb-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Confirm New Password</label>
              <input 
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                placeholder="Confirm new password"
              />
            </div>

            <button 
              type="submit" 
              disabled={securitySaving}
              className="w-full bg-slate-800 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-md mt-2 disabled:opacity-50 text-sm"
            >
              {securitySaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update Password"}
            </button>
            {securityMessage.text && (
              <p className={`text-center text-xs font-medium mt-3 ${securityMessage.type === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
                {securityMessage.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
