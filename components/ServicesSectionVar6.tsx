"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Search, Activity, Share2, Layers2, LucideIcon, Trophy } from "lucide-react";
import Link from "next/link";

interface ServiceItem {
    title: string;
    description: string;
    icon: LucideIcon;
    slug: string;
    stack: string[];
}

const services: ServiceItem[] = [
    {
        title: "Product Engineering",
        description: "End-to-end product development for high-growth tech firms.",
        icon: Layers2,
        slug: "software-engineering",
        stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS", "GitHub", "Redis"]
    },
    {
        title: "AI Automation",
        description: "Transforming operations with custom AI-powered workflows.",
        icon: Activity,
        slug: "ai-engineering",
        stack: ["Python", "n8n", "Make", "OpenAI", "Anthropic", "FastAPI", "Pinecone", "LangChain", "Supabase"]
    },
    {
        title: "Strategic Consulting",
        description: "Technology leadership and AI transformation strategies (CTO-as-a-Service).",
        icon: Trophy,
        slug: "it-ai-consulting",
        stack: ["Roadmap", "Architecture", "Audit", "Strategy", "Cloud", "Security", "AI-Readiness"]
    }
];

export default function ServicesSectionVar6() {
    return (
        <section className="py-24 px-6 max-w-[1240px] mx-auto bg-white">
            <div className="text-center mb-20 max-w-2xl mx-auto flex flex-col items-center">
                
                <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-800 mb-6">
                    Engineering <span className="font-semibold  ">Excellence.</span>
                </h2>
                <p className="text-slate-500 font-light text-lg">
                    We combine design thinking with deep technical expertise to build future-ready solutions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-100/60 overflow-hidden rounded-4xl bg-slate-50">
                {services.map((service, index) => (
                    <Link 
                        key={index}
                        href={`/services/${service.slug}`}
                        className="group relative p-10 bg-white border-r border-b border-slate-100/60 hover:bg-slate-50 transition-all duration-500 flex flex-col min-h-[380px] cursor-pointer"
                    >
                        <div className="mb-8">
                            <service.icon className="w-8 h-8 text-brand/70 group-hover:text-brand transition-colors" strokeWidth={1.2} />
                        </div>

                        <div className="grow">
                            <h3 className="text-2xl font-medium tracking-tight text-slate-800 mb-4 flex items-center gap-3">
                                {service.title}
                                <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 -translate-y-2 group-hover:opacity-40 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                            </h3>
                            <p className="text-slate-500 font-light text-[15px] leading-relaxed mb-10 group-hover:text-slate-600 transition-colors">
                                {service.description}
                                <span className="block mt-4 text-brand text-xs font-bold uppercase tracking-widest opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">Explore Service</span>
                            </p>
                        </div>

                        {/* Tech Marquee Area */}
                        <div className="mt-auto relative">
                             <div className="text-[10px] uppercase font-bold tracking-widest text-slate-300 mb-4 flex items-center gap-2">
                                <div className="w-1 h-3 bg-brand/20 rounded-full" />
                                Our Stack
                             </div>
                             
                             <div className="w-full overflow-hidden relative h-10 mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] group-hover:scale-105 transition-transform duration-500">
                                <motion.div 
                                    className="flex items-center gap-8 w-max pr-8 h-full"
                                    animate={{ x: ["0%", "-50%"] }}
                                    transition={{ 
                                        repeat: Infinity, 
                                        ease: "linear", 
                                        duration: 15 + index * 2 
                                    }}
                                >
                                    {[...service.stack, ...service.stack].map((tech, i) => (
                                        <div key={i} className="flex items-center gap-2 shrink-0 group/tech">
                                            <div className="w-6 h-6 p-0.5 bg-white rounded shadow-sm border border-slate-50 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                                                <img 
                                                    src={`https://cdn.simpleicons.org/${tech.toLowerCase().replace(/\s+/g, '').replace(/\.js/g, 'dotjs')}`} 
                                                    alt={tech} 
                                                    className="w-full h-full object-contain"
                                                    width={24}
                                                    height={24}
                                                />
                                            </div>
                                            <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-600 transition-colors whitespace-nowrap">{tech}</span>
                                        </div>
                                    ))}
                                </motion.div>
                             </div>
                        </div>

                        {/* Decorative number background */}
                        <div className="absolute top-0 right-10 p-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity font-mono text-[180px] leading-none pointer-events-none -mr-16 -mt-10 select-none">
                            {index + 1}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
