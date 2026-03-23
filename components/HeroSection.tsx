"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
    const codeLines = [
        { num: '01', content: <><span className="text-brand-300">class</span> <span className="text-white">StartupBuilder</span> <span className="text-slate-400">{"{"}</span></> },
        { num: '02', content: <><span className="pl-4 text-purple-400">async</span> <span className="text-brand-300">launchMVP</span><span className="text-slate-400">() {"{"}</span></> },
        { num: '03', content: <><span className="pl-8 text-slate-400">await 3Dots.</span><span className="text-brand-200">engineer</span><span className="text-white">({ "{" }</span></> },
        { num: '04', content: <><span className="pl-12 text-slate-400">quality:</span> <span className="text-orange-300">&apos;Production-Ready&apos;</span><span className="text-slate-400">,</span></> },
        { num: '05', content: <><span className="pl-12 text-slate-400">speed:</span> <span className="text-orange-300">&apos;Excellence&apos;</span></> },
        { num: '06', content: <><span className="pl-8 text-slate-400">{"}"});</span></> },
        { num: '07', content: <><span className="pl-4 text-slate-400">{"}"}</span></> },
        { num: '08', content: <><span className="text-slate-400">{"}"}</span></> },
    ];

    return (
        <section className="pt-36 pb-20 px-6 max-w-[1400px] mx-auto min-h-[90vh] flex flex-col justify-center relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="z-10 text-center lg:text-left"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-800 tracking-normal leading-[1.2] md:leading-[1.2] mb-10">
                        We build technology that powers <span className="font-medium ">startups, growing businesses, and enterprises.</span>
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl mx-auto lg:ml-0">
                        3Dots is a product engineering company helping startups and businesses build scalable software, launch MVPs fast, automate workflows with AI, and grow through technology, community, and strategic execution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link href="/contact" className="bg-brand text-white px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2">
                            Talk to Us <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/launchpad" className="bg-white text-slate-800 px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-slate-50 transition-all shadow-md border border-slate-200 flex items-center justify-center gap-2">
                            Have an Idea?
                        </Link>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2.5rem] overflow-hidden"
                >
                    {/* Terminal Window */}
                    <div className="bg-[#0F172A] p-1 border border-slate-800 rounded-3xl shadow-2xl relative group overflow-hidden">
                        {/* Glass Header */}
                        <div className="bg-slate-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
                            </div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></div>
                                engineering.process
                            </div>
                        </div>

                        {/* Code Area */}
                        <div className="p-8 md:p-12 font-mono text-[13px] md:text-sm leading-relaxed overflow-hidden min-h-[320px]">
                            <div className="space-y-4">
                                {codeLines.map((line, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ 
                                            duration: 0.5, 
                                            delay: idx * 0.4,
                                            ease: "easeOut"
                                        }}
                                        className="flex gap-4"
                                    >
                                        <span className="text-slate-600 select-none w-4">{line.num}</span>
                                        <div className="flex-1 whitespace-pre">
                                            {line.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* Blinking Cursor */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [1, 0] }}
                                transition={{ 
                                    repeat: Infinity, 
                                    duration: 0.8,
                                    delay: codeLines.length * 0.4
                                }}
                                className="inline-block w-2.5 h-5 bg-brand ml-8 mt-4 shadow-[0_0_15px_#258c7b]"
                            />
                        </div>

                        {/* Background subtle glow */}
                        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-brand/20 transition-all duration-1000"></div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-40 bg-linear-to-b from-brand/20 to-transparent blur-2xl"></div>
                </motion.div>
            </div>
        </section>
    );
}
