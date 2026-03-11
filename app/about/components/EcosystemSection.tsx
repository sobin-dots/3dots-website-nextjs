"use client";

import { Users } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EcosystemSection() {
    return (
        <section className="py-24 md:py-32 bg-[#fafbfc] relative overflow-hidden flex items-center">
            
            {/* The giant merged network watermark on the right side */}
            <div className="absolute top-1/2 right-[30%] translate-x-[15%] -translate-y-[25%] text-[15vw] font-bold text-slate-100/80 select-none pointer-events-none z-0 tracking-tighter leading-none">
                500+
            </div>

            <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
                <div className="flex flex-col lg:flex-row gap-12 items-center w-full">
                    
                    {/* Left Side: Typography */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-4/12 shrink-0 z-20 md:pl-8"
                    >
                        <h2 className="text-5xl md:text-[64px] font-normal text-slate-800 tracking-tight leading-[1.1] mb-2">
                            Community.
                        </h2>
                        <h2 className="text-5xl md:text-[64px] font-bold tracking-tight text-[#0066FF] mb-8 leading-[1.1]">
                            Connected.
                        </h2>
                        <p className="text-lg text-slate-500 font-light leading-relaxed mb-12 max-w-sm">
                            Our entire infrastructure is built to cross-pollinate ideas between our specialized communities.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-4">
                                {[10, 12, 15, 20, 25].map((id, i) => (
                                    <div key={i} className="relative w-12 h-12 rounded-full border-[3px] border-[#fafbfc] overflow-hidden grayscale">
                                        <Image 
                                            src={`https://i.pravatar.cc/100?img=${id}`} 
                                            alt="Avatar" 
                                            fill
                                            className="object-cover" 
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col text-left ml-2">
                                <span className="text-[#5984cb] font-semibold text-sm leading-tight">500+</span>
                                <span className="text-[#8492a6] font-medium text-sm leading-tight">active members</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Centered Network Graph */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-8/12 relative h-[600px] md:h-[750px] flex items-center justify-center mt-12 lg:mt-0 z-10"
                    >
                        {/* SVG Connections radiating from center */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.35] z-0" stroke="#0066FF" fill="none">
                            <motion.line 
                                x1="50%" y1="48%" x2="18%" y2="20%" 
                                strokeWidth="2" 
                                strokeDasharray="4 6"
                                animate={{ strokeDashoffset: [0, -20] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                            <motion.line 
                                x1="50%" y1="48%" x2="82%" y2="20%" 
                                strokeWidth="2" 
                                strokeDasharray="4 6"
                                animate={{ strokeDashoffset: [0, -20] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                            <motion.line 
                                x1="50%" y1="48%" x2="50%" y2="82%" 
                                strokeWidth="2" 
                                strokeDasharray="4 6"
                                animate={{ strokeDashoffset: [0, -20] }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            />
                            
                            {/* Inner delicate connections */}
                            <motion.line 
                                x1="18%" y1="20%" x2="50%" y2="82%" 
                                strokeWidth="1" 
                                strokeDasharray="2 4" 
                                opacity="0.4"
                                animate={{ strokeDashoffset: [0, -12] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                            <motion.line 
                                x1="82%" y1="20%" x2="50%" y2="82%" 
                                strokeWidth="1" 
                                strokeDasharray="2 4" 
                                opacity="0.4"
                                animate={{ strokeDashoffset: [0, -12] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            />
                        </svg>

                        {/* Center point: Global Builders */}
                        <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                            <div className="bg-white rounded-full py-4 px-8 shadow-2xl shadow-[#0066FF]/10 flex items-center gap-5 border border-blue-50/50 hover:scale-105 transition-transform duration-500 cursor-default">
                                <div className="w-12 h-12 rounded-full bg-[#f0f5ff] text-[#0066FF] flex items-center justify-center shrink-0">
                                    <Users className="w-6 h-6" strokeWidth={1.5} />
                                </div>
                                <div className="text-left hidden sm:block whitespace-nowrap">
                                    <h3 className="text-lg font-semibold text-slate-800 leading-tight mb-1">Global Builders</h3>
                                    <p className="text-slate-500 text-xs font-light">Founders, engineers, creatives</p>
                                </div>
                            </div>
                        </div>

                        {/* Surrounding Cards */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="absolute top-[20%] left-[18%] -translate-x-1/2 -translate-y-1/2 z-20 w-[240px] md:w-[280px]"
                        >
                            <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-slate-200/50 border border-slate-100/50 hover:-translate-y-2 transition-transform duration-400">
                                <Image src="/js-mavens-logo.png" alt="JS Mavens" width={100} height={36} className="h-[36px] w-auto object-contain mb-8" />
                                <p className="text-slate-400 text-[10px] font-light tracking-widest mb-8 uppercase">Top tier JS developers</p>
                                <div className="flex -space-x-3">
                                    {[11, 12, 13, 14].map((id, i) => (
                                        <div key={i} className="relative w-10 h-10 rounded-full border-[3px] border-white overflow-hidden grayscale focus-within:grayscale-0 hover:z-10 hover:grayscale-0 hover:scale-110 transition-all duration-300">
                                            <Image 
                                                src={`https://i.pravatar.cc/100?img=${id}`} 
                                                alt="Avatar" 
                                                fill
                                                className="object-cover" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="absolute top-[20%] left-[82%] -translate-x-1/2 -translate-y-1/2 z-20 w-[240px] md:w-[280px]"
                        >
                            <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-slate-200/50 border border-slate-100/50 hover:-translate-y-2 transition-transform duration-400">
                                <Image src="/rexhive-logo.png" alt="REXHive" width={120} height={40} className="h-[40px] w-auto object-contain mb-8" />
                                <p className="text-slate-400 text-[10px] font-light tracking-widest mb-8 uppercase">AI & Tech researchers</p>
                                <div className="flex -space-x-3">
                                    {[24, 25, 26, 27].map((id, i) => (
                                        <div key={i} className="relative w-10 h-10 rounded-full border-[3px] border-white overflow-hidden grayscale focus-within:grayscale-0 hover:z-10 hover:grayscale-0 hover:scale-110 transition-all duration-300">
                                            <Image 
                                                src={`https://i.pravatar.cc/100?img=${id}`} 
                                                alt="Avatar" 
                                                fill
                                                className="object-cover" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                            viewport={{ once: true }}
                            className="absolute top-[82%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-20 w-[240px] md:w-[280px]"
                        >
                            <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-slate-200/50 border border-slate-100/50 hover:-translate-y-2 transition-transform duration-400">
                                <Image src="/3dots-logo.png" alt="3dots" width={100} height={32} className="h-[32px] w-auto object-contain mb-8" />
                                <p className="text-slate-400 text-[10px] font-light tracking-widest mb-8 uppercase">Founders & strategists</p>
                                <div className="flex -space-x-3">
                                    {[32, 33, 34, 35].map((id, i) => (
                                        <div key={i} className="relative w-10 h-10 rounded-full border-[3px] border-white overflow-hidden grayscale focus-within:grayscale-0 hover:z-10 hover:grayscale-0 hover:scale-110 transition-all duration-300">
                                            <Image 
                                                src={`https://i.pravatar.cc/100?img=${id}`} 
                                                alt="Avatar" 
                                                fill
                                                className="object-cover" 
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating extra constellation avatars */}
                        {[
                            { top: "10%", left: "50%", size: "48px" },
                            { top: "48%", left: "8%", size: "52px" },
                            { top: "48%", left: "92%", size: "48px" },
                            { top: "85%", left: "20%", size: "44px" },
                            { top: "85%", left: "80%", size: "56px" },
                        ].map((avatar, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 0.65 }}
                                transition={{ duration: 1, delay: 1 + (i * 0.1) }}
                                viewport={{ once: true }}
                                className="absolute rounded-full border-[3px] border-white shadow-lg overflow-hidden grayscale"
                                style={{
                                    top: avatar.top,
                                    left: avatar.left,
                                    width: avatar.size,
                                    height: avatar.size,
                                    transform: "translate(-50%, -50%)"
                                }}
                            >
                                <Image src={`https://i.pravatar.cc/100?img=${i + 40}`} alt="Community Member" fill className="object-cover" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
