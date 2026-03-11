"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Workflow, Bot } from "lucide-react";

export default function ServicesListMinimal5() {
    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto min-h-screen flex items-center justify-center">
            <div className="w-full flex flex-col md:flex-row shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] overflow-hidden border border-slate-100 bg-white min-h-[600px]">
                
                {/* Visual / Title Side */}
                <div className="w-full md:w-1/3 bg-slate-900 p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden group text-white">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand/30 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 group-hover:scale-150 group-hover:bg-brand/40"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/10 mb-12">
                            <Bot className="w-6 h-6 text-brand-light" />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light tracking-tight leading-[1.1] mb-6">
                            Smart <br/>
                            <span className="font-semibold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-brand-light">Engineering.</span>
                        </h2>
                        <p className="text-slate-400 font-light text-[15px] leading-relaxed">
                            A curated suite of services designed for founders who need highly scalable, beautifully written technology.
                        </p>
                    </div>
                    
                    <div className="mt-20 relative z-10">
                        <span className="text-[11px] font-mono tracking-widest text-slate-500 uppercase">Est. 2026 // Agency</span>
                    </div>
                </div>

                {/* Services List Side */}
                <div className="w-full md:w-2/3 p-8 lg:p-16 flex flex-col justify-center bg-[#FAFAFC]">
                    <div className="flex flex-col gap-4">
                        
                        {/* Service Item 1 */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            transition={{ ease: "easeOut", duration: 0.3 }}
                            className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand/20 transition-all cursor-pointer group flex items-start gap-6"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                                <Code2 className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Build Powerful Software</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed max-w-md">Design and develop high-quality ERPs, CRMs, and custom platforms to scale.</p>
                                </div>
                                <div className="hidden sm:flex w-10 h-10 rounded-full border border-slate-200 items-center justify-center text-slate-400 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Service Item 2 */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            transition={{ ease: "easeOut", duration: 0.3 }}
                            className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md hover:border-brand/20 transition-all cursor-pointer group flex items-start gap-6"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100 group-hover:bg-brand group-hover:text-white transition-colors duration-500">
                                <Workflow className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4">
                                <div>
                                    <h3 className="text-xl font-semibold text-slate-800 mb-2">Automate & Accelerate</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed max-w-md">AI-powered automation to streamline processes and connect intelligent workflows.</p>
                                </div>
                                <div className="hidden sm:flex w-10 h-10 rounded-full border border-slate-200 items-center justify-center text-slate-400 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-all">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
                
            </div>
        </section>
    );
}
