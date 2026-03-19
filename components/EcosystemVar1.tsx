"use client";

import { ArrowRight, Network } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function EcosystemVar1() {
    return (
        <section className="py-32 px-6 max-w-[1400px] mx-auto relative overflow-hidden bg-white mt-10 rounded-4xl border border-slate-100 shadow-xl">
            {/* Background elements to reflect network */}
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#258c7b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 px-4 md:px-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-full text-sm font-medium mb-8">
                        <Network className="w-4 h-4 text-brand" /> Global Network
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 tracking-normal leading-[1.3] md:leading-[1.3] mb-8">
                        Beyond Software — <br />
                        <span className="font-medium text-secondary">Building an Ecosystem</span>
                    </h2>
                    <p className="text-slate-600 font-light text-lg mb-6 leading-relaxed max-w-lg">
                        3Dots is not just a software company. We are building a community-driven ecosystem that supports builders at every stage.
                    </p>
                    <p className="text-slate-600 font-light text-lg mb-10 leading-relaxed max-w-lg">
                        Through initiatives like JS Mavens, RexHive, Dots, and RexCoders, we bring together developers, founders, and learners to share knowledge, collaborate, and grow.
                    </p>

                    <Link href="/about#ecosystem" className="bg-brand text-white hover:bg-brand/90 px-8 py-4 rounded-full text-[15px] font-medium transition-all shadow-lg flex items-center justify-center gap-2 w-max">
                        Explore Communities <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="relative h-[500px] flex items-center justify-center"
                >
                    {/* Visual Network Nodes */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Middle Orbit */}
                        <div className="w-[300px] h-[300px] rounded-full border border-slate-200 animate-[spin_60s_linear_infinite] opacity-50 absolute">
                            <div className="w-2 h-2 bg-brand rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_12px_rgba(37,140,123,1)]"></div>
                            <div className="w-2 h-2 bg-brand-400 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-[0_0_10px_rgba(37,140,123,0.8)]"></div>
                        </div>
                        
                        {/* Outer Orbit */}
                        <div className="w-[450px] h-[450px] rounded-full border border-slate-100 animate-[spin_80s_linear_reverse_infinite] opacity-50 absolute">
                            <div className="w-2 h-2 bg-brand-300 rounded-full absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_rgba(37,140,123,0.6)]"></div>
                            <div className="w-2 h-2 bg-brand/60 rounded-full absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(37,140,123,0.4)]"></div>
                        </div>
                        
                        {/* Inner Orbit */}
                        <div className="w-[200px] h-[200px] rounded-full border border-brand/20 animate-[spin_40s_linear_infinite] absolute">
                            <div className="w-2 h-2 bg-brand rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-[0_0_15px_rgba(37,140,123,1)]"></div>
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(30,58,138,0.5)]"></div>
                        </div>
                    </div>

                    {/* Center Node */}
                    <div className="w-24 h-24 bg-brand text-white rounded-full flex items-center justify-center shadow-2xl relative z-20">
                        <span className="font-bold text-xl tracking-tighter">3Dots</span>
                    </div>

                    {/* Orbiting Nodes */}
                    <div className="absolute top-[0%] md:top-[5%] right-[0%] md:right-[5%] bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center gap-3 animate-pulse hover:scale-110 transition-transform z-30 cursor-pointer min-w-[140px] md:min-w-[160px]">
                        <div className="flex flex-col items-center">
                            <Image src="/js-mavens-logo.png" alt="JS Mavens" width={100} height={32} className="h-6 md:h-8 w-auto object-contain mb-1" />
                            <p className="text-[10px] md:text-xs text-slate-400 text-center font-medium">500+ Members</p>
                        </div>
                    </div>

                    <div className="absolute bottom-[20%] md:bottom-[25%] left-[0%] md:left-[5%] bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center gap-3 animate-pulse delay-75 hover:scale-110 transition-transform z-30 cursor-pointer min-w-[120px] md:min-w-[140px]">
                        <div className="flex flex-col items-center">
                            <Image src="/rexhive-logo.png" alt="RexHive" width={120} height={40} className="h-6 md:h-8 w-auto object-contain mb-1" />
                            <p className="text-[10px] md:text-xs text-slate-400 text-center font-medium">AI First</p>
                        </div>
                    </div>

                    <div className="absolute bottom-[5%] md:bottom-[10%] right-[5%] md:right-[10%] bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center gap-3 animate-pulse delay-150 hover:scale-110 transition-transform z-30 cursor-pointer min-w-[100px] md:min-w-[120px]">
                        <div className="flex flex-col items-center">
                            <h5 className="font-semibold text-lg md:text-xl text-slate-800 mb-0.5">Dots</h5>
                            <p className="text-[10px] md:text-xs text-slate-400 text-center font-medium">Startup</p>
                        </div>
                    </div>

                    <div className="absolute top-[35%] md:top-[30%] left-[-5%] md:left-[0%] bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center gap-3 animate-pulse delay-300 hover:scale-110 transition-transform z-30 cursor-pointer min-w-[140px] md:min-w-[160px]">
                        <div className="flex flex-col items-center">
                            <Image src="/rexcoders-logo.png" alt="RexCoders" width={120} height={32} className="h-6 md:h-8 w-auto object-contain mb-1" />
                            <p className="text-[10px] md:text-xs text-slate-400 text-center font-medium">Academy</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
