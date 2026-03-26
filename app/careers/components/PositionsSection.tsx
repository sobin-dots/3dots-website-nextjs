/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PositionsSection() {
    const [positions, setPositions] = useState<any[]>([]);
    const [isLoadingPositions, setIsLoadingPositions] = useState(true);

    useEffect(() => {
        fetch("/api/careers")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    // Only display active jobs
                    setPositions(data.filter(job => job.active));
                } else {
                    setPositions([]);
                }
                setIsLoadingPositions(false);
            })
            .catch(() => setIsLoadingPositions(false));
    }, []);

    return (
        <section className="py-32 px-6 bg-[#F4F6FB] relative overflow-hidden" id="career-positions">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1000px] mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-semibold text-slate-800 tracking-tight mb-4">
                        Open Positions
                    </h2>
                    <p className="text-slate-600 font-light text-[17px]">
                        Find a role that fits. Don&apos;t see one? Apply anyway and tell us what you&apos;d love to do.
                    </p>
                    {isLoadingPositions && <p className="mt-4 text-brand animate-pulse">Loading opportunities...</p>}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {positions.map((pos) => (
                        <motion.div
                            key={pos.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white border border-slate-200 rounded-4xl p-10 flex flex-col justify-between hover:shadow-xl hover:border-brand/30 transition-all duration-300 group"
                        >
                            <div>
                                <h3 className="text-2xl font-semibold text-slate-800 mb-2 tracking-tight">{pos.title}</h3>
                                <div className="text-brand text-xs font-semibold tracking-widest uppercase mb-4">
                                    {pos.tag}
                                </div>
                                <div className="flex gap-2 text-[11px] font-semibold text-slate-500 mb-6 uppercase tracking-widest">
                                    <span>{pos.type || "Full-Time"}</span>
                                    <span>•</span>
                                    <span>{pos.location || "Remote / Hybrid"}</span>
                                </div>
                                <div className="text-slate-600 font-light leading-relaxed mb-10 text-[15px] line-clamp-3">
                                    {pos.description}
                                </div>
                            </div>
                            <div className="flex pt-4">
                                <Link href={`/careers/${pos.slug}`} className="block">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-brand text-center text-white px-8 py-2.5 rounded-full text-sm font-medium hover:bg-brand-dark transition-all shadow-[0_0_15px_rgba(37,140,123,0.3)] group-hover:shadow-[0_0_20px_rgba(37,140,123,0.4)] cursor-pointer"
                                    >
                                        View Details
                                    </motion.div>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                    {!isLoadingPositions && positions.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-white rounded-4xl border border-slate-100">
                            <p className="text-slate-400">No active positions at the moment. Check back soon!</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
