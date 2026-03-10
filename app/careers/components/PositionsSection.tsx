"use client";

import { useState, useEffect, useRef } from "react";
import { X, Upload, CheckCircle2 } from "lucide-react";

export default function PositionsSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");

    // Math Captcha State
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [fileName, setFileName] = useState("No file chosen");

    const positions = [
        {
            title: "Full-stack Developer",
            tag: "ENGINEERING • FULL-TIME",
            desc: "Build MVPs with modern stacks. You'll work across frontend and backend, ship fast, and work directly with founders."
        },
        {
            title: "Product Designer",
            tag: "DESIGN • FULL-TIME",
            desc: "Shape product experiences from concept to launch. You'll own design for multiple MVPs and work closely with engineering."
        },
        {
            title: "General Application",
            tag: "ANY ROLE",
            desc: "Have skills we haven't listed? Tell us what you do best. We're always open to the right person."
        }
    ];

    useEffect(() => {
        if (isModalOpen && status === "idle") {
            generateCaptcha();
        }
    }, [isModalOpen, status]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isModalOpen]);

    const generateCaptcha = () => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
        setCaptchaAnswer("");
    };

    const openModal = (role: string) => {
        setSelectedRole(role);
        setIsModalOpen(true);
        setStatus("idle");
        setErrorMessage("");
        setFileName("No file chosen");
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setStatus("idle");
        }, 300);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("No file chosen");
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (parseInt(captchaAnswer) !== num1 + num2) {
            setStatus("error");
            setErrorMessage("Incorrect math answer. Please try again.");
            generateCaptcha();
            return;
        }

        setStatus("submitting");
        // Simulate API request
        setTimeout(() => {
            setStatus("success");
        }, 1500);
    };

    return (
        <section className="py-32 px-6 bg-[#F4F6FB] relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1000px] mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 tracking-tight mb-4">
                        Open Positions
                    </h2>
                    <p className="text-slate-600 font-light text-[17px]">
                        Find a role that fits. Don't see one? Apply anyway and tell us what you'd love to do.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {positions.map((pos, i) => (
                        <div
                            key={i}
                            className="bg-white border border-slate-200 rounded-[2rem] p-10 flex flex-col justify-between hover:shadow-xl hover:border-brand/30 transition-all duration-300 group"
                        >
                            <div>
                                <h3 className="text-2xl font-semibold text-slate-800 mb-2 tracking-tight">{pos.title}</h3>
                                <div className="text-brand text-xs font-semibold tracking-widest uppercase mb-6">
                                    {pos.tag}
                                </div>
                                <p className="text-slate-600 font-light leading-relaxed mb-10 text-[15px]">
                                    {pos.desc}
                                </p>
                            </div>
                            <div className="flex">
                                <button
                                    onClick={() => openModal(pos.title)}
                                    className="bg-brand text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-brand-dark transition-all shadow-[0_0_15px_rgba(0,85,255,0.3)] group-hover:shadow-[0_0_20px_rgba(0,85,255,0.4)]"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Application Modal (Light Theme) */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                        onClick={closeModal}
                    ></div>

                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-[2rem] shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-200 custom-scrollbar">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 border-b border-slate-100 px-6 py-5 flex items-center justify-between">
                            <h3 className="text-xl font-medium text-slate-800 tracking-tight">Apply for Position</h3>
                            <button
                                onClick={closeModal}
                                className="text-slate-400 hover:text-slate-600 transition-colors bg-slate-50 hover:bg-slate-100 p-2 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 sm:p-8">
                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-800">
                                    <div className="w-20 h-20 bg-brand/10 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="w-10 h-10 text-brand" />
                                    </div>
                                    <h3 className="text-3xl font-medium mb-3 tracking-tight">Application Submitted</h3>
                                    <p className="text-slate-500 font-light max-w-md">
                                        Thank you for applying to 3Dots. Our team will review your application and get back to you shortly.
                                    </p>
                                    <button
                                        onClick={closeModal}
                                        className="mt-8 bg-brand text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition-all shadow-[0_0_15px_rgba(0,85,255,0.3)]"
                                    >
                                        Close Window
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="text-slate-500 font-light text-[15px] mb-8 text-center max-w-sm mx-auto">
                                        Send us your details and resume. We'll get back to you soon.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {/* Full Name */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Full name <span className="text-brand">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Email <span className="text-brand">*</span></label>
                                            <input
                                                type="email"
                                                required
                                                className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400"
                                                placeholder="you@example.com"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Phone</label>
                                            <input
                                                type="tel"
                                                className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400"
                                                placeholder="+1 (234) 567-8900"
                                            />
                                        </div>

                                        {/* Position */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Position applying for <span className="text-brand">*</span></label>
                                            <select
                                                required
                                                value={selectedRole}
                                                onChange={(e) => setSelectedRole(e.target.value)}
                                                className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Select a role</option>
                                                {positions.map((p, i) => (
                                                    <option key={i} value={p.title}>{p.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Resume Upload */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Resume <span className="text-brand">*</span></label>
                                            <div className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl p-1.5 flex items-center focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-all">
                                                <label className="bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer transition-colors border border-slate-200 flex-shrink-0 shadow-sm">
                                                    Choose File
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        required
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                                <span className="ml-4 text-slate-500 text-sm truncate pr-2 font-light">
                                                    {fileName}
                                                </span>
                                            </div>
                                            <p className="text-xs text-slate-400 mt-1">PDF or DOC, max 5MB</p>
                                        </div>

                                        {/* Cover Letter */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Cover letter or portfolio link</label>
                                            <textarea
                                                rows={3}
                                                className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400 resize-none"
                                                placeholder="A few lines about you, or a link to your portfolio..."
                                            ></textarea>
                                        </div>

                                        {/* Anything else */}
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Anything else?</label>
                                            <textarea
                                                rows={2}
                                                className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400 resize-none"
                                                placeholder="Optional"
                                            ></textarea>
                                        </div>

                                        {/* Math Captcha */}
                                        <div className="pt-4 border-t border-slate-100">
                                            <label className="text-sm font-medium text-slate-700 block mb-3">Verify you are human <span className="text-brand">*</span></label>
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                <div className="bg-slate-50 px-6 py-4 rounded-xl text-lg font-medium text-slate-800 flex items-center justify-center min-w-[120px] shadow-inner border border-slate-200">
                                                    {num1} + {num2} = ?
                                                </div>
                                                <input
                                                    type="number"
                                                    required
                                                    value={captchaAnswer}
                                                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                                                    className="flex-1 bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-medium text-lg text-slate-800 transition-all"
                                                    placeholder="Your answer"
                                                />
                                            </div>
                                            {status === "error" && (
                                                <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
                                            )}
                                        </div>

                                        {/* Submit Button & Consent */}
                                        <div className="pt-4 flex flex-col items-center gap-6">
                                            <button
                                                type="submit"
                                                disabled={status === "submitting"}
                                                className="bg-brand text-white px-10 py-4 rounded-full text-base font-medium hover:bg-brand-dark transition-all shadow-[0_0_15px_rgba(0,85,255,0.3)] disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
                                            >
                                                {status === "submitting" ? "Submitting..." : "Submit application"}
                                            </button>

                                            <p className="text-xs text-slate-500 text-center max-w-sm font-light">
                                                By submitting, you agree to us storing your details to process your application. We won't share them with third parties.
                                            </p>
                                        </div>

                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
