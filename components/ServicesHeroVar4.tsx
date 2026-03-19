"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesHeroVar4() {
    return (
        <section className="relative w-full bg-slate-50 pt-24 pb-6 border-b border-slate-200 overflow-hidden mb-16">
            <div className="absolute inset-0 z-0 bg-white">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-slate-100 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
            </div>


            <div className="max-w-[1200px] mx-auto px-6 relative z-20 w-full min-h-[120px] flex items-center">
                <div className="w-full flex justify-between items-center h-full">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-left relative z-20"
                    >
                        <div className="w-10 h-1 bg-brand mb-4 rounded-full"></div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 tracking-tight leading-[1.1]">
                            Digital <span className="font-bold text-slate-900">Services.</span>
                        </h1>
                        <div className="absolute -left-8 top-16 w-2.5 h-2.5 bg-brand/30 rounded-full"></div>
                        <div className="absolute left-40 -bottom-6 w-1.5 h-1.5 bg-brand-400/50 rounded-full"></div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="hidden md:flex flex-col items-start bg-white/70 backdrop-blur-md border border-white p-6 rounded-4xl shadow-xl shadow-slate-200/40 relative z-20 max-w-[300px]"
                    >
                        <span className="bg-brand text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm mb-3">Capabilities</span>
                        <h3 className="text-sm font-medium text-slate-800 mb-2 leading-snug">Engineering & Design</h3>
                        <p className="text-xs font-light text-slate-500 mb-4 line-clamp-2">Full-stack development, creative direction, and scalable tech infrastructure.</p>
                        <button className="text-brand text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
                            View All <ArrowRight className="w-3 h-3" />
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
