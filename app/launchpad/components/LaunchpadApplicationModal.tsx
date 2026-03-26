"use client";

import { useState } from "react";
import { Rocket, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LaunchpadApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function LaunchpadModalContent({ onClose }: { onClose: () => void }) {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({ 
        fullName: "", 
        email: "", 
        startupName: "", 
        description: "",
        mobileNumber: "",
        category: ""
    });
    
    // Simple math captcha state initialized lazily
    const [captcha, setCaptcha] = useState(() => ({ 
        num1: Math.floor(Math.random() * 10) + 1, 
        num2: Math.floor(Math.random() * 10) + 1, 
        userSum: "" 
    }));
    const [captchaError, setCaptchaError] = useState(false);

    const generateCaptcha = () => {
        setCaptcha({ 
            num1: Math.floor(Math.random() * 10) + 1, 
            num2: Math.floor(Math.random() * 10) + 1, 
            userSum: "" 
        });
        setCaptchaError(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate Captcha
        const expectedSum = captcha.num1 + captcha.num2;
        if (parseInt(captcha.userSum, 10) !== expectedSum) {
            setCaptchaError(true);
            generateCaptcha();
            return;
        }

        setStatus("submitting");

        try {
            const res = await fetch("/api/launchpad-cms", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    onClose();
                }, 3000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden border border-slate-100"
            >
                <div className="p-10">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Apply for Launchpad</h2>
                            <p className="text-slate-500 text-sm font-light mt-1">Tell us briefly about your vision.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                            <X className="w-6 h-6 text-slate-400" strokeWidth={1.5} />
                        </button>
                    </div>

                    {status === "success" ? (
                        <div className="py-12 text-center space-y-4">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Rocket className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-semibold text-slate-800">Application Received!</h3>
                            <p className="text-slate-500 font-light max-w-xs mx-auto">We&apos;ll review your idea and get back to you within 24 hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] pl-1">Founder Name</label>
                                    <input 
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        placeholder="Jane Doe"
                                        className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand focus:bg-white transition-all text-sm placeholder:text-slate-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] pl-1">Email</label>
                                    <input 
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="jane@startup.co"
                                        className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand focus:bg-white transition-all text-sm placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] pl-1">Startup Name</label>
                                <input 
                                    required
                                    value={formData.startupName}
                                    onChange={(e) => setFormData({...formData, startupName: e.target.value})}
                                    placeholder="My Startup"
                                    className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand focus:bg-white transition-all text-sm placeholder:text-slate-300"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] pl-1">Mobile Number</label>
                                    <input 
                                        value={formData.mobileNumber}
                                        onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                                        placeholder="+1 234 567 890"
                                        className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand focus:bg-white transition-all text-sm placeholder:text-slate-300"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] pl-1">Category / Domain</label>
                                    <div className="relative">
                                        <select 
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand focus:bg-white transition-all text-sm appearance-none placeholder:text-slate-300"
                                        >
                                            <option value="">Select Domain</option>
                                            <option value="Fintech">Fintech</option>
                                            <option value="Healthtech">Healthtech</option>
                                            <option value="SaaS">SaaS</option>
                                            <option value="E-commerce">E-commerce</option>
                                            <option value="EdTech">EdTech</option>
                                            <option value="Web3/Crypto">Web3 / Crypto</option>
                                            <option value="AI/ML">AI / ML</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] pl-1">The Big Idea (Brief)</label>
                                <textarea 
                                    required
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="What are you building?"
                                    className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand focus:bg-white transition-all text-sm resize-none placeholder:text-slate-300"
                                />
                            </div>

                            <div className="space-y-2 pt-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] pl-1 flex items-center gap-2">
                                    Verify you are human <span className="text-brand font-black">WHAT IS {captcha.num1} + {captcha.num2}?</span>
                                </label>
                                <input 
                                    required
                                    type="number"
                                    value={captcha.userSum}
                                    onChange={(e) => setCaptcha({...captcha, userSum: e.target.value})}
                                    placeholder="Enter sum"
                                    className={`w-full bg-slate-50/50 border ${captchaError ? 'border-red-400 focus:border-red-500' : 'border-slate-100 focus:border-brand'} rounded-2xl px-5 py-4 focus:outline-none focus:bg-white transition-all text-sm placeholder:text-slate-300`}
                                />
                                {captchaError && <p className="text-[10px] text-red-500 pl-1 mt-1 font-medium">Incorrect sum. Please try again.</p>}
                            </div>
                            <button 
                                disabled={status === "submitting"}
                                className="w-full bg-brand text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 mt-4 disabled:opacity-50"
                            >
                                {status === "submitting" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                                {status === "submitting" ? "Submitting..." : "Send Application"}
                            </button>
                            {status === "error" && (
                                <p className="text-center text-red-500 text-xs font-medium">Something went wrong. Please try again.</p>
                            )}
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default function LaunchpadApplicationModal({ isOpen, onClose }: LaunchpadApplicationModalProps) {
    return (
        <AnimatePresence>
            {isOpen && <LaunchpadModalContent onClose={onClose} />}
        </AnimatePresence>
    );
}
