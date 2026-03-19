"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
    Users, 
    Rocket, 
    Puzzle, 
    ChevronRight,
    Briefcase,
    ShieldCheck,
    TrendingUp,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function ConsultingPage() {
    const services = [
        {
            title: "AI Integration Services",
            icon: <Puzzle className="w-8 h-8" />,
            desc: "We provide AI integration services that seamlessly embed artificial intelligence capabilities into existing applications. Our experts integrate machine learning models, APIs, and AI services to enhance automation."
        },
        {
            title: "AI Product Development",
            icon: <Rocket className="w-8 h-8" />,
            desc: "We design and build end-to-end AI products that transform innovative ideas into scalable intelligent applications. From AI strategy and data engineering to model development and deployment."
        },
        {
            title: "CTO as a Service",
            icon: <Users className="w-8 h-8" />,
            desc: "Strategic technology leadership to help businesses define roadmaps, implement scalable architecture, and optimize digital infrastructure. We guide organizations through data strategy and AI transformation."
        }
    ];

    return (
        <main className="min-h-screen bg-[#F4F6FB]">
            <Navbar />
            
            {/* Minimal Hero Section */}
            <section className="pt-40 pb-24 px-6 relative overflow-hidden bg-white border-b border-slate-100">
                <div className="max-w-[1200px] mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                         <h1 className="text-6xl md:text-8xl font-light text-slate-800 tracking-tight leading-none mb-8">
                            Strategic <span className="font-semibold text-brand">Consulting</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
                            Providing the technological leadership and execution path for founders and enterprises ready to scale.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Strategy Grid */}
            <section className="py-32 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {services.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-700 flex flex-col items-center text-center"
                            >
                                <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 mb-10 group-hover:bg-brand group-hover:text-white transition-all duration-300">
                                    {item.icon}
                                </div>
                                <h3 className="text-3xl font-light text-slate-800 mb-6 tracking-tight">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 font-light leading-relaxed mb-10">
                                    {item.desc}
                                </p>
                                <Link href="/contact" className="mt-auto inline-flex items-center gap-2 text-brand font-semibold text-sm uppercase tracking-widest">
                                    Book Strategy Call <ChevronRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Infographic: Strategic Roadmap */}
            <section className="py-24 px-6 bg-[#0F172A] text-white">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-24">
                        <div className="lg:w-1/2">
                            <h2 className="text-5xl font-light mb-12">Your <span className="font-semibold text-brand">Transformation</span> Roadmap</h2>
                            <div className="space-y-12">
                                {[
                                    { icon: <TrendingUp />, title: "Market & Tech Audit", desc: "We analyze your current stack and market positioning." },
                                    { icon: <Briefcase />, title: "The Blue Print", desc: "A detailed 12-month technical roadmap is established." },
                                    { icon: <ShieldCheck />, title: "Infrastructure Hardening", desc: "Scaling systems for security and high availability." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-8 group">
                                        <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-brand group-hover:border-brand transition-all">
                                            {step.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-medium mb-2">{step.title}</h4>
                                            <p className="text-slate-400 font-light text-lg">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-2 gap-6">
                            {[
                                "Scalable Architecture",
                                "AI Transformation",
                                "Cloud Optimization",
                                "CTO-level Leadership",
                                "MVP Acceleration",
                                "Risk Mitigation"
                            ].map((item, i) => (
                                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm flex flex-col justify-between h-48 hover:bg-white/10 transition-colors">
                                    <CheckCircle2 className="w-8 h-8 text-brand" />
                                    <p className="text-xl font-light">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust/Consulting CTA */}
            <section className="py-32 px-6">
                <div className="max-w-[1000px] mx-auto text-center">
                    <div className="inline-block p-4 rounded-full bg-brand/10 text-brand mb-8">
                        <Users className="w-8 h-8" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-light text-slate-800 tracking-tight leading-tight mb-8">
                        Technical Leadership <span className="font-semibold">Without the Overhead.</span>
                    </h2>
                    <p className="text-xl text-slate-500 font-light mb-12 max-w-2xl mx-auto">
                        Hire us as your fractional CTO team to guide your project from vision to venture-scale production.
                    </p>
                    <Link 
                        href="/contact" 
                        className="inline-flex items-center gap-4 bg-brand text-white px-12 py-5 rounded-[2.5rem] font-bold text-lg hover:bg-brand-dark transition-all shadow-2xl shadow-brand/20"
                    >
                        Schedule a Strategy Review
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
