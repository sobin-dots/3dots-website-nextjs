"use client";

import { Target, Lightbulb, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function WhoIsLaunchpadFor() {
    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-200 rounded-[3rem] overflow-hidden">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 p-10 lg:p-12 border-b border-r  border-slate-200 flex flex-col justify-center bg-slate-50/50"
                >
                    <h2 className="text-4xl font-light text-slate-800 tracking-tight mb-4">Who Is Launchpad For?</h2>
                    <p className="text-slate-500 font-light text-lg">Launchpad is designed for founders, entrepreneurs, and businesses who want to turn ideas into real products quickly.</p>
                </motion.div>
                {[
                    { title: "Startup Founders", icon: <Target className="w-8 h-8" />, desc: "Founders who want to validate their startup idea quickly by building a functional MVP and testing it with real users before investing heavily in full-scale development." },
                    { title: "Entrepreneurs", icon: <Lightbulb className="w-8 h-8" />, desc: "Entrepreneurs who have a strong product idea but lack the technical expertise or development team required to design, build, and launch their software product." },
                    { title: "Early-stage Startups", icon: <TrendingUp className="w-8 h-8" />, desc: "Startups that need to build their first version of a product, demonstrate traction, and prepare a working prototype for early users, partners, or investors." },
                    { title: "Businesses", icon: <Users className="w-8 h-8" />, desc: "Companies looking to test a new digital product, internal platform, or customer-facing solution without committing months of time and large development budgets." }
                ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="p-10 lg:p-12 border-b border-r border-slate-200 bg-white hover:bg-[#F4F6FB] transition-colors group"
                    >
                        <div className="mb-8 text-slate-300 group-hover:text-brand transition-colors">
                            {item.icon}
                        </div>
                        <h3 className="text-xl font-medium mb-3 text-slate-800">{item.title}</h3>
                        <p className="text-slate-500 font-light text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
