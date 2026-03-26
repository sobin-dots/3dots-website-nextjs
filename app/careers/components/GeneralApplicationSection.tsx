"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";

export default function GeneralApplicationSection() {
    // Math Captcha State
    const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
    const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [fileName, setFileName] = useState("No file chosen");

    const generateCaptcha = useCallback(() => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
        setCaptchaAnswer("");
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("No file chosen");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (parseInt(captchaAnswer) !== num1 + num2) {
            setStatus("error");
            setErrorMessage("Incorrect math answer. Please try again.");
            generateCaptcha();
            return;
        }

        setStatus("submitting");
        
        try {
            const formData = new FormData(e.currentTarget);
            const file = formData.get("resume") as File;
            
            let uploadedResumeUrl = "";
            if (file && file.size > 0) {
                const uploadData = new FormData();
                uploadData.append("file", file);
                const uploadRes = await fetch("/api/upload", {
                    method: "POST",
                    body: uploadData,
                });
                
                if (!uploadRes.ok) throw new Error("Failed to upload resume.");
                
                const uploadJson = await uploadRes.json();
                uploadedResumeUrl = window.location.origin + uploadJson.url; 
            }

            const payload = {
                jobId: null, // General application
                fullName: formData.get("fullName") as string,
                email: formData.get("email") as string,
                phone: (formData.get("phone") as string) || null,
                position: (formData.get("position") as string) || "General Application",
                resumeUrl: uploadedResumeUrl,
                coverLetter: (formData.get("coverLetter") as string) || null,
                additionalInfo: (formData.get("additionalInfo") as string) || null,
            };

            const applyRes = await fetch("/api/careers/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!applyRes.ok) {
                throw new Error("Failed to submit. Please check your data.");
            }

            setStatus("success");
            setCaptchaAnswer("");
            setFileName("No file chosen");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
            setErrorMessage("An unexpected error occurred. Please try again.");
            generateCaptcha();
        }
    };

    return (
        <section className="py-24 px-6 bg-white border-t border-slate-100" id="general-apply">
            <div className="max-w-[1000px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Text Column */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-thin text-slate-800 tracking-tight mb-6">
                                Don&apos;t see the <br/>
                                <span className="font-semibold">perfect fit?</span>
                            </h2>
                            <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed max-w-md">
                                We are always on the lookout for talented individuals. Submit a general application and tell us how you can help us build the next big thing.
                            </p>
                            
                            <div className="space-y-4">
                               
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-700 font-medium">Modern tech stack & tools</span>
                                </div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <span className="text-slate-700 font-medium">Growth focused environment</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Form Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white border border-slate-100 p-8 sm:p-10 rounded-4xl shadow-2xl shadow-slate-200/50 relative overflow-hidden"
                    >
                        {status === "success" && (
                            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8">
                                <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-8 h-8 text-brand" />
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-800 mb-2">Application Received!</h3>
                                <p className="text-slate-500 font-light mb-6">We&apos;ll review your profile and get back to you if there&apos;s a match.</p>
                                <button 
                                    onClick={() => setStatus("idle")}
                                    className="text-brand font-semibold text-sm hover:underline"
                                >
                                    Send another application
                                </button>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="fullName"
                                        className="w-full bg-[#F4F6FB] border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-brand transition-all text-slate-800 text-sm"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        className="w-full bg-[#F4F6FB] border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-brand transition-all text-slate-800 text-sm"
                                        placeholder="you@email.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Position You&apos;re Interested In</label>
                                <input
                                    required
                                    type="text"
                                    name="position"
                                    className="w-full bg-[#F4F6FB] border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-brand transition-all text-slate-800 text-sm"
                                    placeholder="e.g. Senior Backend Engineer"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Resume (PDF/DOC)</label>
                                <div className="w-full bg-[#F4F6FB] border border-slate-200 rounded-2xl p-1.5 flex items-center transition-all">
                                    <label className="bg-white hover:bg-slate-50 text-slate-700 text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded-xl cursor-pointer transition-colors border border-slate-200 shrink-0 shadow-sm">
                                        Upload
                                        <input
                                            type="file"
                                            name="resume"
                                            className="hidden"
                                            required
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    <span className="ml-4 text-slate-500 text-xs truncate pr-2 font-light">
                                        {fileName}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">Little about you</label>
                                <textarea
                                    name="coverLetter"
                                    rows={2}
                                    className="w-full bg-[#F4F6FB] border border-slate-200 rounded-2xl px-5 py-3.5 focus:outline-none focus:border-brand transition-all text-slate-800 text-sm resize-none"
                                    placeholder="Portfolio link or summary..."
                                ></textarea>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex items-center gap-3 shrink-0">
                                    <div className="bg-white px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 shadow-inner">
                                        {num1} + {num2} =
                                    </div>
                                    <input
                                        required
                                        type="number"
                                        value={captchaAnswer}
                                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                                        className="w-16 bg-[#F4F6FB] border border-slate-200 rounded-xl px-2 py-2 focus:outline-none focus:border-brand text-center text-sm font-bold"
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={status === "submitting"}
                                    className="flex-1 w-full bg-brand text-white py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 disabled:opacity-50"
                                >
                                    {status === "submitting" ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Submit Application <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </div>
                            
                            {status === "error" && (
                                <p className="text-red-500 text-xs text-center mt-2">{errorMessage}</p>
                            )}
                        </form>
                    </motion.div>
                </div>

                {/* Disclaimer */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-20 text-center"
                >
                    <p className="text-[11px] text-slate-400 font-light max-w-md mx-auto leading-relaxed italic">
                        **By submitting, you agree to us storing your details to process your application. We won&apos;t share them with third parties.**
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
