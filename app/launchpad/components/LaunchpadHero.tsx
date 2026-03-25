"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Rocket, X, Send, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LaunchpadHero() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [formData, setFormData] = useState({ 
        fullName: "", 
        email: "", 
        startupName: "", 
        description: "",
        mobileNumber: "",
        category: ""
    });
    
    // Simple math captcha state
    const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, userSum: "" });
    const [captchaError, setCaptchaError] = useState(false);

    const generateCaptcha = () => {
        setCaptcha({ 
            num1: Math.floor(Math.random() * 10) + 1, 
            num2: Math.floor(Math.random() * 10) + 1, 
            userSum: "" 
        });
        setCaptchaError(false);
    };

    useEffect(() => {
        let isMounted = true;
        Promise.resolve().then(() => {
            if (isMounted) generateCaptcha();
        });
        return () => { isMounted = false; };
    }, []);

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
                    setIsModalOpen(false);
                    setStatus("idle");
                    setFormData({ 
                        fullName: "", 
                        email: "", 
                        startupName: "", 
                        description: "",
                        mobileNumber: "",
                        category: ""
                    });
                    generateCaptcha();
                }, 3000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section className="relative w-full bg-white pt-28 pb-8 md:pt-32 md:pb-10 border-b border-slate-100 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-white">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-slate-50 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-20 w-full min-h-[300px] py-10 flex items-center">
                <div className="w-full flex flex-col md:flex-row justify-between items-center h-full gap-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-left relative z-20 md:w-2/3"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-widest mb-6 border border-brand/20 shadow-sm">
                            <Rocket className="w-3 h-3" /> The 3Dots Signature Program
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 tracking-tight leading-[1.1] mb-6">
                            Turn Your Idea Into a Working <span className="font-bold ">  MVP in Just 15 Days.</span>
                        </h1>
                        
                        <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed mb-8 max-w-2xl">
                            Launchpad is our rapid product development program designed for founders who want to validate their ideas, build a functional MVP fast, and move closer to investors and real users.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-brand text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                Apply for Launchpad <ArrowRight className="w-4 h-4" />
                            </button>
                            <Link href="/contact" className="bg-white text-slate-800 px-8 py-3 rounded-full text-sm font-medium hover:bg-slate-50 transition-all shadow-md border border-slate-200 flex items-center justify-center gap-2">
                                Book a Founder Call
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="hidden lg:flex flex-col items-start bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/40 relative z-20 w-[300px]"
                    >
                        <span className="bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm mb-3">Process</span>
                        <h3 className="text-sm font-medium text-slate-800 mb-2 leading-snug">Design, Build, Launch</h3>
                        <p className="text-xs font-light text-slate-500 mb-4 line-clamp-2">Move faster with the team actively scaling major digital ecosystems.</p>
                        <button className="text-brand text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
                            View Framework <ArrowRight className="w-3 h-3" />
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-xl rounded-4xl shadow-2xl relative z-10 overflow-hidden border border-slate-100"
                        >
                            <div className="p-10">
                                <div className="flex justify-between items-center mb-8">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-slate-800">Apply for Launchpad</h2>
                                        <p className="text-slate-500 text-sm font-light mt-1">Tell us briefly about your vision.</p>
                                    </div>
                                    <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                                        <X className="w-6 h-6 text-slate-400" />
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
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Founder Name</label>
                                                <input 
                                                    required
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                                    placeholder="Jane Doe"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand transition-all text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Email</label>
                                                <input 
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    placeholder="jane@startup.co"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Startup Name</label>
                                            <input 
                                                required
                                                value={formData.startupName}
                                                onChange={(e) => setFormData({...formData, startupName: e.target.value})}
                                                placeholder="My Startup"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand transition-all text-sm"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Mobile Number</label>
                                                <input 
                                                    value={formData.mobileNumber}
                                                    onChange={(e) => setFormData({...formData, mobileNumber: e.target.value})}
                                                    placeholder="+1 234 567 890"
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand transition-all text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Category / Domain</label>
                                                <select 
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand transition-all text-sm appearance-none"
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
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">The Big Idea (Brief)</label>
                                            <textarea 
                                                required
                                                rows={4}
                                                value={formData.description}
                                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                placeholder="What are you building?"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 focus:outline-none focus:border-brand transition-all text-sm resize-none"
                                            />
                                        </div>

                                        <div className="space-y-1.5 pt-2">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                Verify you are human <span className="text-brand">What is {captcha.num1} + {captcha.num2}?</span>
                                            </label>
                                            <input 
                                                required
                                                type="number"
                                                value={captcha.userSum}
                                                onChange={(e) => setCaptcha({...captcha, userSum: e.target.value})}
                                                placeholder="Enter sum"
                                                className={`w-full bg-slate-50 border ${captchaError ? 'border-red-400 focus:border-red-500' : 'border-slate-100 focus:border-brand'} rounded-2xl px-5 py-4 focus:outline-none transition-all text-sm`}
                                            />
                                            {captchaError && <p className="text-[10px] text-red-500 pl-1 mt-1 font-medium">Incorrect sum. Please try again.</p>}
                                        </div>
                                        <button 
                                            disabled={status === "submitting"}
                                            className="w-full bg-brand text-white py-5 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 mt-4 disabled:opacity-50"
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
                )}
            </AnimatePresence>
        </section>
    );
}

import Link from "next/link";
