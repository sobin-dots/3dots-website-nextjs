"use client";

import { Code2, Search, Users, Laptop, ArrowRight, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function EcosystemSection() {
    const ecosystems = [
        {
            title: "JS Mavens",
            icon: <Code2 className="w-5 h-5" />,
            desc: "A growing community of 300+ developers.",
            users: ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"],
            color: "bg-brand-50 text-brand border-brand-100",
            delay: 0.1
        },
        {
            title: "RexHive",
            icon: <Search className="w-5 h-5" />,
            desc: "Premium community for tech & AI discussions.",
            users: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"],
            color: "bg-brand-100 text-brand-600 border-brand-200",
            delay: 0.2
        },
        {
            title: "Dots",
            icon: <Users className="w-5 h-5" />,
            desc: "Founders & devs discussing startup strategy.",
            users: ["https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80", "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=100&q=80"],
            color: "bg-brand-50 text-brand-700 border-brand-300",
            delay: 0.3
        },
        {
            title: "RexCoders",
            icon: <Laptop className="w-5 h-5" />,
            desc: "Coding academy for practical software development.",
            users: ["https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80", "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80"],
            color: "bg-brand-100 text-brand-400 border-brand-200",
            delay: 0.4
        }
    ];

    return (
        <section id="ecosystem" className="py-24 px-6 bg-white relative overflow-hidden mt-10 border-t border-slate-100">

            {/* Network Background Pattern */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="network-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="#CBD5E1" />
                            <path d="M 2 2 L 60 60" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                            <path d="M 60 2 L 2 60" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#network-pattern)" />
                </svg>
            </div>

            <div className="max-w-[1400px] mx-auto relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Left Side: Header & Context */}
                    <div className="lg:col-span-5 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/5 border border-brand/20 text-brand text-sm font-medium mb-8">
                            <MessageSquare className="w-4 h-4" /> Global Community
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 tracking-normal leading-[1.2] md:leading-[1.2] mb-10">
                            A Network Built <br className="hidden lg:block" />
                            <span className="font-medium text-brand">For Builders.</span>
                        </h2>
                        <p className="text-slate-600 font-light text-lg mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                            We believe strong networks spark the best ideas. Connect with over 3,000+ developers, founders, and innovators in our curated tech communities. Learn, share, and launch together.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                            <button className="bg-brand text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 flex items-center gap-2">
                                Join our Network <ArrowRight className="w-4 h-4" />
                            </button>

                            {/* Trust cluster */}
                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"].map((img, i) => (
                                        <img key={i} src={img} alt="Member avatar" className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover grayscale" />
                                    ))}
                                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500 shadow-sm z-10">
                                        +3k
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Network Cards */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">

                            {/* Decorative SVG connection lines linking cards */}
                            <svg className="absolute inset-0 w-full h-full hidden sm:block text-slate-200 pointer-events-none -z-10" style={{ stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeDasharray: "4 4" }}>
                                <path d="M 25% 25% C 50% 25%, 50% 75%, 75% 75%" />
                                <path d="M 75% 25% C 50% 25%, 50% 75%, 25% 75%" />
                            </svg>

                            {ecosystems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: item.delay }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-[2rem] p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex flex-col group relative overflow-hidden"
                                >
                                    {/* Background flare on hover */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 -translate-y-1/2 translate-x-1/2 ${item.color.split(' ')[0]}`}></div>

                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${item.color}`}>
                                            {item.icon}
                                        </div>
                                        {/* Tiny avatar intersection for card */}
                                        <div className="flex -space-x-2">
                                            {item.users.map((img, i) => (
                                                <img key={i} src={img} className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover grayscale" alt="Member" />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="text-xl font-semibold mb-3 text-slate-800 group-hover:text-brand transition-colors">{item.title}</h3>
                                        <p className="text-slate-500 font-light text-[15px] leading-relaxed mb-6">
                                            {item.desc}
                                        </p>
                                    </div>

                                    <div className="mt-auto relative z-10">
                                        <div className="w-full h-[1px] bg-slate-100 mb-4 group-hover:bg-brand/10 transition-colors"></div>
                                        <button className="text-sm font-medium text-slate-600 group-hover:text-brand transition-colors flex items-center gap-2">
                                            View Details <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </button>
                                    </div>

                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
