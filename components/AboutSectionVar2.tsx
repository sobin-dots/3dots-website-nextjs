"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Users2, Rocket, Heart } from "lucide-react";
import Link from "next/link";

const highlights = [
    {
        title: "Engineering First",
        desc: "We are builders by nature, obsessing over clean code and scalable architecture.",
        icon: Code2,
        color: "bg-blue-50 text-blue-500"
    },
    {
        title: "Community Driven",
        desc: "Building a network of developers and founders to support each other's growth.",
        icon: Users2,
        color: "bg-brand/5 text-brand"
    },
    {
        title: "Startup Focused",
        desc: "We understand the speed and agility required to launch and scale MVPs.",
        icon: Rocket,
        color: "bg-orange-50 text-orange-500"
    },
    {
        title: "Mission Centric",
        desc: "Helping innovators turn their vision into a sustainable digital reality.",
        icon: Heart,
        color: "bg-rose-50 text-rose-500"
    }
];

export default function AboutSectionVar2() {
    return (
        <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
            <div className="max-w-[1240px] mx-auto">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    
                    {/* Left: Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full lg:w-1/2"
                    >
                        <div className="flex items-center gap-3 text-brand font-bold tracking-widest text-xs uppercase mb-6">
                            <span className="w-8 h-[1px] bg-brand" />
                            Who We Are
                        </div>
                        <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight mb-8">
                            We are a collective of <span className="font-bold  decoration-brand decoration-4 underline-offset-8">creators</span> building for the next generation.
                        </h2>
                        <p className="text-slate-500 font-light text-lg leading-relaxed mb-10">
                            At 3Dots, we don&apos;t just write code; we architect solutions. Our mission is to bridge the gap between complex engineering and human-centric design, empowering startups to scale with confidence.
                        </p>
                        <Link href="/about" className="group bg-brand text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 w-fit hover:bg-brand-dark transition-all shadow-xl shadow-brand/20">
                            Our Full Story <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Right: Grid of Highlights */}
                    <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
                        
                        {highlights.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/20 group hover:border-brand/30 transition-all hover:-translate-y-2"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                                <p className="text-sm font-light text-slate-400 leading-relaxed group-hover:text-slate-500 transition-colors">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
