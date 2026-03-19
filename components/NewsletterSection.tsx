"use client";

import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function NewsletterSection() {
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
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                </div>

                {/* Grid Running Lasers */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen">
                    {/* Horizontal Line 1 (Moving Right) */}
                    <motion.div
                        animate={{ x: ["-100%", "4000%"] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                        className="absolute top-[80px] left-0 h-[1px] w-6 bg-linear-to-r from-transparent to-[#258c7b] shadow-[0_0_6px_1px_#258c7b]"
                    />
                    {/* Horizontal Line 2 (Moving Left) */}
                    <motion.div
                        animate={{ x: ["4000%", "-100%"] }}
                        transition={{ repeat: Infinity, duration: 10, ease: "linear", repeatDelay: 1 }}
                        className="absolute top-[160px] left-0 h-[1px] w-8 bg-linear-to-r from-[#258c7b] to-transparent shadow-[0_0_6px_1px_#258c7b]"
                    />
                    {/* Horizontal Line 3 (Moving Right) */}
                    <motion.div
                        animate={{ x: ["-100%", "4000%"] }}
                        transition={{ repeat: Infinity, duration: 7, ease: "linear", repeatDelay: 2 }}
                        className="absolute top-[240px] left-0 h-[1px] w-6 bg-linear-to-r from-transparent to-[#258c7b] shadow-[0_0_6px_1px_#258c7b]"
                    />

                    {/* Vertical Line 1 (Moving Down) */}
                    <motion.div
                        animate={{ y: ["-100%", "1000%"] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear", repeatDelay: 0.5 }}
                        className="absolute left-[80px] top-0 w-[1px] h-6 bg-linear-to-b from-transparent to-[#258c7b] shadow-[0_0_6px_1px_#258c7b]"
                    />
                    {/* Vertical Line 2 (Moving Up) */}
                    <motion.div
                        animate={{ y: ["1000%", "-100%"] }}
                        transition={{ repeat: Infinity, duration: 7, ease: "linear" }}
                        className="absolute left-[360px] top-0 w-[1px] h-8 bg-linear-to-b from-[#258c7b] to-transparent shadow-[0_0_6px_1px_#258c7b]"
                    />
                    {/* Vertical Line 3 (Moving Down) */}
                    <motion.div
                        animate={{ y: ["-100%", "1000%"] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "linear", repeatDelay: 1.5 }}
                        className="hidden md:block absolute left-[600px] top-0 w-[1px] h-6 bg-linear-to-b from-transparent to-[#258c7b] shadow-[0_0_6px_1px_#258c7b]"
                    />
                    {/* Vertical Line 4 (Moving Up) */}
                    <motion.div
                        animate={{ y: ["1000%", "-100%"] }}
                        transition={{ repeat: Infinity, duration: 8, ease: "linear", repeatDelay: 0.5 }}
                        className="hidden lg:block absolute left-[880px] top-0 w-[1px] h-8 bg-linear-to-b from-[#258c7b] to-transparent shadow-[0_0_6px_1px_#258c7b]"
                    />
                </div>

                <div className="w-full md:w-1/2 relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <Mail className="w-6 h-6 text-brand" />
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-normal leading-[1.2] md:leading-[1.2]">Stay Ahead in Tech</h2>
                    </div>
                    <p className="text-slate-300 font-light text-[17px] leading-relaxed">
                        Join our weekly newsletter where we share insights on software development, AI, product building, and the startup ecosystem. Practical ideas, real lessons, and valuable resources for builders and founders.
                    </p>
                </div>

                <div className="w-full md:w-1/2 relative z-10 flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="bg-white/10 border border-white/20 text-white rounded-full px-6 py-4 outline-none focus:border-brand w-full placeholder:text-white/40 font-light"
                    />
                    <button className="bg-brand text-white px-8 py-4 rounded-full font-medium hover:bg-brand-light transition-all whitespace-nowrap shadow-lg">
                        Subscribe
                    </button>
                </div>
            </motion.div>
        </section>
    );
}
