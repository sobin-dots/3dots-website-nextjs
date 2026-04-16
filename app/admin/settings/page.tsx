"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Loader2, 
  ShieldCheck, 
  Download, 
  Server, 
  Camera, 
  Globe, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook,
  Briefcase,
  Fingerprint,
  Info
} from "lucide-react";
import Image from "next/image";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  image: string | null;
  about: string | null;
  designation: string | null;
  employeeId: string | null;
  socials: Record<string, string> | null;
  createdAt?: string;
}

export default function SettingsAdminPage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Profile Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [designation, setDesignation] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [image, setImage] = useState("");
  const [socials, setSocials] = useState({
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
    website: ""
  });
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
          setAbout(data.about || "");
          setDesignation(data.designation || "");
          setEmployeeId(data.employeeId || "");
          setImage(data.image || "");
          if (data.socials) {
            setSocials({
              linkedin: data.socials.linkedin || "",
              twitter: data.socials.twitter || "",
              instagram: data.socials.instagram || "",
              facebook: data.socials.facebook || "",
              website: data.socials.website || ""
            });
          }
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setImage(data.url);
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          about, 
          designation, 
          employeeId, 
          socials, 
          image 
        }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setProfile(data);
        setProfileMessage({ text: "Profile updated successfully.", type: "success" });
        setIsEditing(false);
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
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-light text-slate-800 tracking-tight">
            Account <span className="font-bold">Profile</span>
          </h1>
          <p className="text-slate-500 font-light text-sm mt-1">Manage architectural control over your identity.</p>
        </div>
        <div className="flex items-center gap-3">
            <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm flex items-center gap-2 ${
                    isEditing 
                    ? "bg-slate-100 text-slate-600 hover:bg-slate-200" 
                    : "bg-brand text-white hover:bg-brand-dark"
                }`}
            >
                {isEditing ? "View Profile" : "Edit Profile"}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: Photo & Stats */}
        <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-brand/10 to-transparent"></div>
                
                <div className="relative z-10">
                    <div className="relative w-32 h-32 mx-auto mb-6 group">
                        <div className="w-full h-full rounded-full bg-slate-50 border-4 border-white shadow-xl overflow-hidden relative">
                            {image ? (
                                <Image src={image} alt={name} fill className="object-cover"  unoptimized={true}/>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-200">
                                    <User className="w-16 h-16" />
                                </div>
                            )}
                        </div>
                        {isEditing && (
                            <label className="absolute bottom-0 right-0 w-10 h-10 bg-brand text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-brand-dark transition-all scale-90 group-hover:scale-100 border-2 border-white">
                                <Camera className="w-5 h-5" />
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                            </label>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800">{profile?.name}</h2>
                    <p className="text-brand text-xs font-bold uppercase tracking-widest mt-1 mb-6 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> {profile?.role}
                    </p>

                    <div className="flex justify-center gap-3 pt-4 border-t border-slate-50">
                        {socials.linkedin && (
                            <a href={socials.linkedin} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:text-brand rounded-2xl transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}
                        {socials.twitter && (
                            <a href={socials.twitter} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:text-brand rounded-2xl transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                        )}
                        {socials.website && (
                            <a href={socials.website} target="_blank" className="p-3 bg-slate-50 text-slate-400 hover:text-brand rounded-2xl transition-all">
                                <Globe className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-light flex items-center gap-2">
                        <Fingerprint className="w-4 h-4" /> Employee ID
                    </span>
                    <span className="text-slate-600 font-mono font-medium">{profile?.employeeId || "—"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400 font-light flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> Designation
                    </span>
                    <span className="text-slate-600 font-medium">{profile?.designation || "—"}</span>
                </div>
                {profile?.createdAt && (
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400 font-light flex items-center gap-2">
                            <Info className="w-4 h-4" /> Member Since
                        </span>
                        <span className="text-slate-600 font-medium">
                            {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                )}
            </div>
        </div>

        {/* Main Section */}
        <div className="lg:col-span-8 space-y-8">
            {isEditing ? (
                <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
                            <User className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">Edit Profile Information</h2>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                                <input 
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm"
                                    placeholder="Your full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Designation</label>
                                <input 
                                    type="text"
                                    value={designation}
                                    onChange={(e) => setDesignation(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm"
                                    placeholder="e.g. Senior Content Writer"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Employee ID</label>
                                <input 
                                    type="text"
                                    value={employeeId}
                                    onChange={(e) => setEmployeeId(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm"
                                    placeholder="e.g. 3DOTS-001"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                                <input 
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm"
                                    placeholder="email@address.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Phone Number</label>
                                <input 
                                    type="text"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm"
                                    placeholder="+1 234 567 890"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">About / Bio</label>
                            <textarea 
                                rows={4}
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-2xl px-5 py-4 outline-none transition-all text-sm resize-none"
                                placeholder="Tell us about yourself..."
                            />
                        </div>

                        <div className="pt-6 border-t border-slate-50">
                            <h3 className="text-sm font-bold text-slate-800 mb-6 uppercase tracking-wider">Social Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                                        <Linkedin className="w-3 h-3" /> LinkedIn URL
                                    </label>
                                    <input 
                                        type="text"
                                        value={socials.linkedin}
                                        onChange={(e) => setSocials({...socials, linkedin: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                                        placeholder="https://linkedin.com/in/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                                        <Twitter className="w-3 h-3" /> Twitter URL
                                    </label>
                                    <input 
                                        type="text"
                                        value={socials.twitter}
                                        onChange={(e) => setSocials({...socials, twitter: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                                        placeholder="https://twitter.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                                        <Instagram className="w-3 h-3" /> Instagram URL
                                    </label>
                                    <input 
                                        type="text"
                                        value={socials.instagram}
                                        onChange={(e) => setSocials({...socials, instagram: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                                        <Facebook className="w-3 h-3" /> Facebook URL
                                    </label>
                                    <input 
                                        type="text"
                                        value={socials.facebook}
                                        onChange={(e) => setSocials({...socials, facebook: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                                        <Globe className="w-3 h-3" /> Portfolio/Website
                                    </label>
                                    <input 
                                        type="text"
                                        value={socials.website}
                                        onChange={(e) => setSocials({...socials, website: e.target.value})}
                                        className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                                        placeholder="https://yourportfolio.com"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-10 flex items-center gap-4">
                            <button 
                                type="submit" 
                                disabled={profileSaving}
                                className="bg-brand text-white px-10 py-4 rounded-full text-sm font-bold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center gap-3 disabled:opacity-50"
                            >
                                {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Profile Changes"}
                            </button>
                            {profileMessage.text && (
                                <span className={`text-sm font-semibold animate-in fade-in duration-300 ${profileMessage.type === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
                                    {profileMessage.text}
                                </span>
                            )}
                        </div>
                    </form>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm min-h-[300px]">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-brand/10 rounded-2xl flex items-center justify-center text-brand">
                                <Info className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Professional Background</h2>
                        </div>
                        <div className="prose prose-slate max-w-none">
                            {profile?.about ? (
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg font-light">
                                    {profile.about}
                                </p>
                            ) : (
                                <p className="text-slate-400 italic font-light">No biographical information has been shared yet.</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 border border-rose-100">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800 tracking-tight">Security</h2>
                                    <p className="text-xs font-light text-slate-500">Update your account password.</p>
                                </div>
                            </div>
                            <form onSubmit={handleUpdateSecurity} className="space-y-4 relative z-10">
                                <input 
                                    type="password"
                                    required
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-rose-400 rounded-xl px-4 py-3 outline-none transition-all text-sm"
                                    placeholder="Current Password"
                                />
                                <input 
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                                    placeholder="New Password"
                                />
                                <input 
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-100 focus:border-brand rounded-xl px-4 py-3 outline-none transition-all text-sm"
                                    placeholder="Confirm New Password"
                                />
                                <button 
                                    type="submit" 
                                    disabled={securitySaving}
                                    className="w-full bg-slate-800 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all shadow-md mt-2 disabled:opacity-50 text-xs uppercase tracking-widest"
                                >
                                    {securitySaving ? <Loader2 className="w-3 h-3 animate-spin" /> : "Update Password"}
                                </button>
                                {securityMessage.text && (
                                    <p className={`text-center text-[10px] font-bold uppercase tracking-widest mt-2 ${securityMessage.type === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
                                        {securityMessage.text}
                                    </p>
                                )}
                            </form>
                         </div>

                         {profile?.role === "Admin" && (
                            <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm relative overflow-hidden flex flex-col justify-center">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-800 border border-slate-100">
                                        <Server className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">System Actions</h3>
                                </div>
                                <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-50 text-slate-600 text-[10px] font-bold uppercase tracking-widest shadow-sm hover:bg-slate-100 transition-all border border-slate-100">
                                    <Download className="w-4 h-4" /> Export System Audit
                                </button>
                            </div>
                         )}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
