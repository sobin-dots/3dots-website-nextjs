"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
    Cpu, 
    Trophy, 
    TrendingUp,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ITAIConsultingPage() {
    const services = [
        {
            title: "Strategy & Technology Roadmap",
            icon: <TrendingUp className="w-8 h-8" />,
            desc: "Helping businesses define comprehensive technology roadmaps. We guide organizations through cloud adoption, data architecture strategy, and deep AI transformation to accelerate innovation, efficiency, and long-term business growth."
        },
        {
            title: "Scalable Software Architecture",
            icon: <Cpu className="w-8 h-8" />,
            desc: "We design future-proof software architectures that scale with your growth. From system re-architecture and API strategy to optimizing digital infrastructure for performance, reliability, and security at every stage."
        },
        {
            title: "CTO-as-a-Service",
            icon: <Trophy className="w-8 h-8" />,
            desc: "Our IT and AI consulting provides strategic technology leadership through CTO-as-a-Service. We help organizations solve complex technical challenges, manage high-stakes engineering teams, and make data-driven infrastructure decisions."
        }
    ];

    return (
        <main className="min-h-screen bg-white text-slate-800">
            <Navbar />
            
            {/* Header / Hero Section - Matching About Style */}
            <section className="relative w-full bg-slate-50 pt-32 pb-12 border-b border-slate-200 overflow-hidden mb-16">
                <div className="absolute inset-0 z-0 bg-white">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-slate-100 to-transparent z-10"></div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-20 w-full flex items-center">
                    <div className="w-full flex justify-between items-center h-full">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-left relative z-20"
                        >
                            <div className="w-10 h-1 bg-brand mb-6 rounded-full"></div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 tracking-tight leading-[1.1]">
                                IT & AI <br />
                                <span className="font-bold text-slate-900">Consulting.</span>
                            </h1>
                            <p className="mt-8 text-lg text-slate-500 font-light max-w-xl leading-relaxed">
                                Strategic technology leadership through CTO-as-a-Service. We help you bridge the gap between business vision and technical execution.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:flex flex-col items-start bg-white/70 backdrop-blur-md border border-white p-8 rounded-4xl shadow-xl shadow-slate-200/40 relative z-20 max-w-[340px]"
                        >
                            <span className="bg-brand text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm mb-4">Leadership</span>
                            <h3 className="text-base font-semibold text-slate-800 mb-3 leading-snug">CTO-as-a-Service</h3>
                            <p className="text-sm font-light text-slate-500 mb-6">Expert technical guidance to help you navigate cloud adoption, data strategies, and AI transformation.</p>
                            <Link href="/contact" className="text-brand text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                                Request full tech audit <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Service Grid - Clean & Minimal */}
            <section className="py-24 px-6 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            className="group flex flex-col items-start"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-brand mb-8 group-hover:bg-brand group-hover:text-white transition-all duration-500 shadow-sm border-b-2">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight group-hover:text-brand transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-500 font-light leading-relaxed text-[15px]">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Standard Footer Style CTA */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-[1240px] mx-auto bg-[#0F172A] p-12 md:p-24 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/5 blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-[3s]"></div>
                    <div className="max-w-2xl relative z-10 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight tracking-tight">Ready to build your <br /><span className="font-bold">Software Product?</span></h2>
                        <p className="text-slate-400 font-light text-lg">Send us your requirements and get a detailed execution plan within 24 hours.</p>
                    </div>
                    <Link href="/contact" className="bg-brand text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-xl relative z-10 text-lg shrink-0 w-full md:w-auto text-center">
                        Start Your Project
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
