/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, CheckCircle2, Mail, X } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = typeof params?.slug === 'string' ? params.slug : '';
    
    const [jobData, setJobData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState("");
    const [positions, setPositions] = useState<any[]>([]);

    // Math Captcha State
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [fileName, setFileName] = useState("No file chosen");

    useEffect(() => {
        if (!slug) return;

        // Fetch the specific job detail
        fetch(`/api/careers/${slug}`)
            .then(res => {
                if (!res.ok) throw new Error("Not found");
                return res.json();
            })
            .then(data => {
                setJobData(data);
                setSelectedRole(data.title);
                setIsLoading(false);
            })
            .catch(() => {
                // Redirect back to careers if not found
                router.push("/careers");
            });
    }, [slug, router]);

    useEffect(() => {
        // Fetch all positions for the modal dropdown
        fetch("/api/careers")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setPositions(data);
                }
            })
            .catch(() => {});
    }, []);

    const generateCaptcha = useCallback(() => {
        setNum1(Math.floor(Math.random() * 10) + 1);
        setNum2(Math.floor(Math.random() * 10) + 1);
        setCaptchaAnswer("");
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isModalOpen]);

    const openModal = () => {
        setIsModalOpen(true);
        setStatus("idle");
        setErrorMessage("");
        setFileName("No file chosen");
        generateCaptcha();
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
                // We construct the full absolute URL for Zod .url() validation rules
                uploadedResumeUrl = window.location.origin + uploadJson.url; 
            }

            const matchedJob = positions.find((p) => p.title === selectedRole) || jobData;

            const payload = {
                jobId: matchedJob.id,
                fullName: formData.get("fullName") as string,
                email: formData.get("email") as string,
                phone: (formData.get("phone") as string) || null,
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
        } catch (error) {
            console.error(error);
            setStatus("error");
            setErrorMessage("An unexpected error occurred uploading your application. Please try again.");
            generateCaptcha();
        }
    };

    if (isLoading || !jobData) {
        return (
            <main className="min-h-screen bg-[#F4F6FB] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F4F6FB] text-slate-800 pb-20">
            <Navbar />

            {/* Header Content */}
            <div className="pt-32 pb-16 px-6 bg-white border-b border-slate-200">
                <div className="max-w-[1100px] mx-auto">
                    <Link href="/careers" className="inline-flex items-center text-sm font-medium text-brand hover:text-brand-dark transition-colors mb-8 group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Careers
                    </Link>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="text-brand text-xs font-bold tracking-widest uppercase mb-4">
                            {jobData.tag}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-semibold text-slate-800 tracking-tight mb-6">
                            {jobData.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-slate-500 font-light text-sm">
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4 text-brand" />
                                {jobData.type || "Full-Time"}
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-brand" />
                                {jobData.location || "Remote / Hybrid"}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Body */}
            <div className="py-20 px-6">
                <div className="max-w-[1100px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                        
                        <div className="lg:col-span-8 space-y-16">
                            {/* About the Role */}
                            {jobData.about && (
                                <motion.section
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <h3 className="text-2xl font-semibold text-slate-800 tracking-tight mb-6">About the Role</h3>
                                    <p className="text-slate-600 font-light leading-relaxed text-[17px]">
                                        {jobData.about}
                                    </p>
                                </motion.section>
                            )}

                            {/* Dynamic Sections */}
                            {Array.isArray(jobData.sections) && jobData.sections.map((section: any, idx: number) => (
                                <motion.section
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 * idx }}
                                    className="pt-8 border-t border-slate-200"
                                >
                                    <h3 className="text-2xl font-semibold text-slate-800 tracking-tight mb-6">{section.title}</h3>
                                    <ul className="space-y-4">
                                        {Array.isArray(section.items) && section.items.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start text-slate-600 font-light text-[16px] leading-relaxed">
                                                <div className="mt-1.5 mr-4 shrink-0">
                                                    <CheckCircle2 className="w-4 h-4 text-brand opacity-80" />
                                                </div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.section>
                            ))}

                            {/* How to Apply */}
                            <motion.section
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="pt-8 border-t border-slate-200"
                            >
                                <h3 className="text-2xl font-semibold text-slate-800 tracking-tight mb-6">How to Apply</h3>
                                <p className="text-slate-600 font-light leading-relaxed text-[16px] mb-6">
                                    Please send your resume, portfolio link, and breakdown of your best work to <a href="mailto:careers@picstol.com" className="font-semibold text-brand hover:underline">careers@picstol.com</a>. Your portfolio should demonstrate your modeling, texturing, and lighting capabilities across various styles and subjects. Include wireframes and process breakdowns where possible.
                                </p>
                                <div className="p-6 bg-brand/5 rounded-2xl border border-brand/10">
                                    <p className="text-brand-dark font-medium text-sm">
                                        Note: Portfolio submission with technical breakdowns is required for consideration.
                                    </p>
                                </div>
                            </motion.section>
                        </div>

                        {/* Sticky Sidebar */}
                        <div className="lg:col-span-4 mt-8 lg:mt-0 relative">
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="sticky top-32 bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50"
                            >
                                <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center mb-6">
                                    <Mail className="w-8 h-8 text-brand" />
                                </div>
                                <h4 className="text-xl font-semibold text-slate-800 mb-3 tracking-tight">Apply for this role</h4>
                                <p className="text-slate-500 font-light text-[15px] leading-relaxed mb-8">
                                    Submit your application directly through our portal. Make sure to include all required portfolio attachments and breakdowns.
                                </p>
                                
                                <button 
                                    onClick={openModal}
                                    className="block w-full text-center bg-brand text-white px-6 py-4 rounded-full text-base font-medium hover:bg-brand-dark transition-all shadow-[0_0_15px_rgba(37,140,123,0.3)] hover:shadow-[0_0_20px_rgba(37,140,123,0.4)]"
                                >
                                    Apply Now
                                </button>

                                <div className="mt-8 pt-6 border-t border-slate-100">
                                    <p className="text-sm text-slate-500 text-center font-light">
                                        We look forward to reviewing your application!
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                            onClick={closeModal}
                        ></motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-4xl shadow-2xl flex flex-col custom-scrollbar"
                        >
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
                                            className="mt-8 bg-brand text-white px-8 py-3 rounded-full font-medium hover:bg-brand-dark transition-all shadow-[0_0_15px_rgba(37,140,123,0.3)]"
                                        >
                                            Close Window
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <p className="text-slate-500 font-light text-[15px] mb-8 text-center max-w-sm mx-auto">
                                            Send us your details and resume. We&apos;ll get back to you soon.
                                        </p>

                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Full Name */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Full name <span className="text-brand">*</span></label>
                                                <input
                                                    type="text"
                                                    name="fullName"
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
                                                    name="email"
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
                                                    name="phone"
                                                    className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400"
                                                    placeholder="+1 (234) 567-8900"
                                                />
                                            </div>

                                            {/* Position */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Position applying for <span className="text-brand">*</span></label>
                                                <select
                                                    required
                                                    name="role"
                                                    value={selectedRole}
                                                    onChange={(e) => setSelectedRole(e.target.value)}
                                                    className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all appearance-none cursor-pointer"
                                                >
                                                    <option value="" disabled>Select a role</option>
                                                    {positions.map((p, index) => (
                                                        <option key={p.id || index} value={p.title}>{p.title}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Resume Upload */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Resume <span className="text-brand">*</span></label>
                                                <div className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl p-1.5 flex items-center focus-within:border-brand focus-within:ring-1 focus-within:ring-brand transition-all">
                                                    <label className="bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-5 py-2.5 rounded-lg cursor-pointer transition-colors border border-slate-200 shrink-0 shadow-sm">
                                                        Choose File
                                                        <input
                                                            type="file"
                                                            name="resume"
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
                                                    name="coverLetter"
                                                    rows={3}
                                                    className="w-full bg-[#F4F6FB] border border-slate-200 rounded-xl px-5 py-4 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand font-light text-slate-800 transition-all placeholder:text-slate-400 resize-none"
                                                    placeholder="A few lines about you, or a link to your portfolio..."
                                                ></textarea>
                                            </div>

                                            {/* Anything else */}
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-700">Anything else?</label>
                                                <textarea
                                                    name="additionalInfo"
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
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="submit"
                                                    disabled={status === "submitting"}
                                                    className="bg-brand text-white px-10 py-4 rounded-full text-base font-medium hover:bg-brand-dark transition-all shadow-[0_0_15px_rgba(37,140,123,0.3)] disabled:opacity-70 disabled:cursor-not-allowed w-full sm:w-auto"
                                                >
                                                    {status === "submitting" ? "Submitting..." : "Submit application"}
                                                </motion.button>

                                                <p className="text-xs text-slate-500 text-center max-w-sm font-light">
                                                    By submitting, you agree to us storing your details to process your application. We won&apos;t share them with third parties.
                                                </p>
                                            </div>

                                        </form>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
