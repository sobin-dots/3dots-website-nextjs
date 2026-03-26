"use client";

import { useState } from "react";
import { ArrowRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import LaunchpadApplicationModal from "./LaunchpadApplicationModal";

export default function LaunchpadHero() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative w-full bg-white pt-28 pb-8 md:pt-32 md:pb-10 border-b border-slate-100 overflow-hidden">
            <div className="absolute inset-0 z-0 bg-white">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-slate-50 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-20 w-full min-h-[300px] py-10 flex items-center">
                <div className="w-full flex flex-col md:flex-row justify-between items-center h-full gap-10">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-left relative z-20 md:w-2/3"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-[10px] font-bold uppercase tracking-widest mb-6 border border-brand/20 shadow-sm">
                            <Rocket className="w-3 h-3" /> The 3Dots Signature Program
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 tracking-tight leading-[1.1] mb-6">
                            Turn Your Idea Into a Working <span className="font-bold ">  MVP in Just 15 Days.</span>
                        </h1>
                        
                        <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed mb-8 max-w-2xl">
                            Launchpad is our rapid product development program designed for founders who want to validate their ideas, build a functional MVP fast, and move closer to investors and real users.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-brand text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2"
                            >
                                Apply for Launchpad <ArrowRight className="w-4 h-4" />
                            </button>
                            <Link href="/contact" className="bg-white text-slate-800 px-8 py-3 rounded-full text-sm font-medium hover:bg-slate-50 transition-all shadow-md border border-slate-200 flex items-center justify-center gap-2">
                                Book a Founder Call
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="hidden lg:flex flex-col items-start bg-white/70 backdrop-blur-md border border-white p-6 rounded-4xl shadow-xl shadow-slate-200/40 relative z-20 w-[300px]"
                    >
                        <span className="bg-slate-800 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm mb-3">Process</span>
                        <h3 className="text-sm font-medium text-slate-800 mb-2 leading-snug">Design, Build, Launch</h3>
                        <p className="text-xs font-light text-slate-500 mb-4 line-clamp-2">Move faster with the team actively scaling major digital ecosystems.</p>
                        <button className="text-brand text-xs font-medium flex items-center gap-1 hover:gap-2 transition-all">
                            View Framework <ArrowRight className="w-3 h-3" />
                        </button>
                    </motion.div>
                </div>
            </div>

            <LaunchpadApplicationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </section>
    );
}

import Link from "next/link";
