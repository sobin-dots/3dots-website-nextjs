"use client";

import { motion } from "framer-motion";
import { Zap, Wifi, Shield, RefreshCw } from "lucide-react";

export default function InfrastructureSectionVar3() {
    return (
        <section className="py-32 px-6 max-w-[1240px] mx-auto bg-white border-y border-slate-50 flex flex-col md:flex-row items-center gap-20">
            
            <div className="w-full md:w-1/3 flex flex-col gap-8">
                <span className="text-brand font-bold uppercase tracking-[0.4em] text-[10px]">Redundancy First</span>
                <h2 className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight leading-[1.15]">
                    Engineered <br />
                    for total <br />
                    <span className="font-semibold  ">continuity.</span>
                </h2>
                <div className="flex gap-4 items-center">
                    <div className="w-12 h-px bg-brand" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Operations Never Sleep</span>
                </div>
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16">
                {[
                    { title: "Power Availability", value: "100%", desc: "Full power redundancy ensures no interruption.", icon: Zap },
                    { title: "Internet Bandwidth", value: "1GBPS", desc: "Two high-speed ISPs for guaranteed uptime.", icon: Wifi },
                    { title: "IT Infrastructure", value: "Secure", desc: "Round-the-clock CCTV and firewalled networks.", icon: Shield },
                    { title: "Business Continuity", value: "BCP", desc: "Strict protocols to always stay operational.", icon: RefreshCw }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex gap-8 group"
                    >
                        <div className="w-16 h-16 rounded-full border border-slate-100 flex items-center justify-center shrink-0 group-hover:border-brand/40 group-hover:bg-brand/5 transition-all duration-700">
                           <item.icon className="w-7 h-7 text-slate-300 group-hover:text-brand transition-colors duration-700" strokeWidth={1} />
                        </div>
                        <div className="flex flex-col gap-2 pt-2">
                            <div className="flex items-baseline gap-3">
                                <h4 className="text-2xl font-bold text-slate-800 tracking-tight">{item.value}</h4>
                                <span className="text-[10px] uppercase tracking-widest text-brand font-bold opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-700">Online</span>
                            </div>
                            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">{item.title}</p>
                            <p className="text-xs font-light text-slate-400  leading-relaxed group-hover:text-slate-600 transition-colors">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

        </section>
    );
}

