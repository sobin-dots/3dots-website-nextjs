"use client";

import { motion } from "framer-motion";

interface ServiceItem {
    title: string;
    icon: React.ReactNode;
    desc: string;
}

interface ServiceOptionsProps {
    services: ServiceItem[];
}

function ServiceOptionsVarient1({ services }: ServiceOptionsProps) {
    return (
        // VARIANT 4: THE "COMMAND HUB" (Best for showing depth of control)
        // Features: A dashboard-inspired layout with "Active Monitored Nodes".
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="bg-[#0F172A] rounded-[3.5rem] p-12 lg:p-24 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px] -mr-32 -mt-32"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-4">
                            <h2 className="text-4xl font-light text-white mb-8 tracking-tight">Technical <span className="font-semibold text-brand">Command Hub</span></h2>
                            <p className="text-slate-400 font-light leading-relaxed mb-12">We don&apos;t just write code; we build the operations centers for your entire digital estate.</p>
                            <div className="space-y-4">
                                {services.slice(4, 7).map((s, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-white group hover:bg-white/10 transition-all cursor-default">
                                        <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                                        <span className="text-sm font-medium">{s.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div className="lg:col-span-8">
                            {/* The Infographic Dashboard */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {services.map((s, i) => (
                                    <motion.div 
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm group hover:border-brand/50 transition-all"
                                    >
                                        <div className="text-slate-500 mb-6 group-hover:text-brand transition-colors">{s.icon}</div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Service Segment</h4>
                                        <p className="text-sm text-white font-medium">{s.title}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServiceOptionsVarient1;