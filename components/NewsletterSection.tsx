"use client";

import { Mail, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/newsletter/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Welcome aboard! You're now subscribed.");
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setMessage("Connection failed. Please check your network.");
        }
    };

    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto relative mt-10">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-slate-800 rounded-4xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden"
            >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                </div>

                {/* Animated Grid Lines (Omitted for brevity, keeping existing in actual file) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-20">
                     {/* Horizontal Lines */}
                    <motion.div animate={{ x: ["-100%", "4000%"] }} transition={{ repeat: Infinity, duration: 6, ease: "linear" }} className="absolute top-[80px] left-0 h-[1px] w-6 bg-brand shadow-[0_0_6px_1px_#258c7b]" />
                    <motion.div animate={{ x: ["4000%", "-100%"] }} transition={{ repeat: Infinity, duration: 10, ease: "linear", repeatDelay: 1 }} className="absolute top-[160px] left-0 h-[1px] w-8 bg-brand shadow-[0_0_6px_1px_#258c7b]" />
                    {/* Vertical Lines */}
                    <motion.div animate={{ y: ["-100%", "1000%"] }} transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 0.5 }} className="absolute left-[80px] top-0 w-[1px] h-6 bg-brand shadow-[0_0_6px_1px_#258c7b]" />
                    <motion.div animate={{ y: ["1000%", "-100%"] }} transition={{ repeat: Infinity, duration: 7, ease: "linear" }} className="absolute left-[360px] top-0 w-[1px] h-8 bg-brand shadow-[0_0_6px_1px_#258c7b]" />
                </div>

                <div className="w-full md:w-1/2 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Mail className="w-6 h-6 text-brand" />
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-normal leading-[1.2] md:leading-[1.2]">Stay Ahead in Tech</h2>
                    </div>
                    <p className="text-slate-300 font-light text-[17px] leading-relaxed">
                        Join our monthly newsletter where we share insights on software development, AI, product building, and the startup ecosystem.
                    </p>
                </div>

                <div className="w-full md:w-1/2 relative z-10">
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            disabled={status === "loading" || status === "success"}
                            className="bg-white/10 border border-white/20 text-white rounded-full px-6 py-4 outline-none focus:border-brand w-full placeholder:text-white/40 font-light disabled:opacity-50 transition-all"
                        />
                        <button 
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className="bg-brand text-white px-8 py-4 rounded-full font-medium hover:bg-brand-light transition-all whitespace-nowrap shadow-lg flex items-center justify-center min-w-[140px] disabled:opacity-50"
                        >
                            {status === "loading" ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : status === "success" ? (
                                <CheckCircle2 className="w-5 h-5" />
                            ) : (
                                "Subscribe"
                            )}
                        </button>
                    </form>

                    <AnimatePresence>
                        {message && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`mt-4 flex items-center gap-2 text-sm ${
                                    status === "success" ? "text-emerald-400" : "text-rose-400"
                                }`}
                            >
                                {status === "success" ? (
                                    <CheckCircle2 className="w-4 h-4" />
                                ) : (
                                    <AlertCircle className="w-4 h-4" />
                                )}
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </section>
    );
}
