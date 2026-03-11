"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Workflow, CheckCircle2 } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Software Products",
        subtitle: "Build Powerful Core Systems",
        description: "From concept to scale, we design and develop high-quality software products, ERPs, CRMs, and custom platforms that help businesses streamline operations, improve efficiency, and grow faster with reliable technology.",
        highlight: "Enterprise Scale",
        icon: Code2,
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee9811?auto=format&fit=crop&w=1200&q=80",
        features: ["Custom Software Development", "Web & Mobile Platforms", "SaaS Product Design", "Legacy System Revival"],
        gradient: "from-blue-600 to-indigo-600",
        glow: "shadow-blue-500/20"
    },
    {
        id: "02",
        title: "Intelligent Automation",
        subtitle: "Automate Work. Accelerate Growth.",
        description: "We implement AI-powered automation to streamline repetitive processes, improve productivity, and connect your tools into intelligent workflows that save time, reduce costs, and unlock operational efficiency.",
        highlight: "Intelligent Workflows",
        icon: Workflow,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
        features: ["AI Integration & Chatbots", "Business Process Automation", "API Development & Webhooks", "Data Sync & Analytics"],
        gradient: "from-orange-500 to-red-600",
        glow: "shadow-orange-500/20"
    }
];

export default function ServicesSectionVar3() {
    const [activeIdx, setActiveIdx] = useState(0);

    return (
        <section id="services-var-3" className="py-32 px-4 max-w-[1400px] mx-auto">
            {/* The Dark Container */}
            <div className="bg-slate-950 rounded-[3rem] overflow-hidden relative shadow-2xl px-4 md:px-12 py-16 md:py-24 flex flex-col lg:flex-row gap-12 lg:gap-20 text-white min-h-[800px]">
                
                {/* Background ambient glows */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className={`absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[150px] bg-linear-to-r ${services[activeIdx].gradient} opacity-20 transition-all duration-1000`}></div>
                    <div className={`absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[130px] bg-linear-to-r ${services[activeIdx].gradient} opacity-10 transition-all duration-1000`}></div>
                </div>

                {/* Left Side: Navigation */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-16">
                        Our Core <span className="font-semibold block mt-2 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">Offerings.</span>
                    </h2>

                    <div className="flex flex-col gap-6">
                        {services.map((service, index) => {
                            const isActive = activeIdx === index;
                            return (
                                <button 
                                    key={service.id}
                                    onClick={() => setActiveIdx(index)}
                                    className={`group text-left p-6 md:p-8 rounded-[2rem] transition-all duration-500 relative overflow-hidden ${isActive ? 'bg-white/10 shadow-xl border border-white/10' : 'hover:bg-white/5 border border-transparent'}`}
                                >
                                    {isActive && (
                                        <motion.div 
                                            layoutId="activeGlow" 
                                            className="absolute inset-0 bg-linear-to-r from-white/5 to-transparent z-0"
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                        />
                                    )}
                                    <div className="relative z-10 flex gap-6 items-center">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500 ${isActive ? 'bg-white text-slate-900' : 'bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white'}`}>
                                            <service.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-mono text-white/40 mb-1">{service.id}</div>
                                            <h3 className={`text-2xl font-medium transition-colors duration-500 ${isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'}`}>
                                                {service.title}
                                            </h3>
                                        </div>
                                    </div>
                                    
                                    {/* Mobile/Tablet inline content (hidden on lg) */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="lg:hidden mt-6 pt-6 border-t border-white/10 block overflow-hidden"
                                            >
                                                <p className="text-white/70 font-light mb-6 leading-relaxed">
                                                    {service.description}
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {service.features.map((feat, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                                                            {feat}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right Side: Imagery and Details (Desktop Only) */}
                <div className="hidden lg:flex w-full lg:w-7/12 relative z-10 items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={activeIdx}
                            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="w-full h-full relative"
                        >
                            <div className="w-full h-full relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-slate-900 shadow-2xl flex flex-col group">
                                {/* Image Half */}
                                <div className="h-1/2 relative overflow-hidden min-h-[300px]">
                                    <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent z-10"></div>
                                    <img 
                                        src={services[activeIdx].image} 
                                        alt={services[activeIdx].title} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80 absolute inset-0"
                                    />
                                    {/* Feature badge */}
                                    <div className="absolute top-6 right-6 z-20 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full animate-pulse bg-linear-to-r ${services[activeIdx].gradient}`}></div>
                                        <span className="text-sm font-medium">{services[activeIdx].highlight}</span>
                                    </div>
                                </div>
                                
                                {/* Content Half */}
                                <div className="h-1/2 p-10 md:p-14 flex flex-col relative bg-slate-900 justify-center">
                                    {/* Glowing top border */}
                                    <div className={`absolute top-0 left-0 w-full h-[1px] bg-linear-to-r from-transparent via-white/20 to-transparent`}></div>

                                    <h4 className="text-3xl font-light mb-4">
                                        {services[activeIdx].subtitle}
                                    </h4>
                                    <p className="text-white/60 font-light leading-relaxed mb-8 flex-grow max-w-lg">
                                        {services[activeIdx].description}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        {services[activeIdx].features.map((feat, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className={`w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0`}>
                                                    <CheckCircle2 className="w-3 h-3 text-white/70" />
                                                </div>
                                                <span className="text-sm text-white/80 font-medium">{feat}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
