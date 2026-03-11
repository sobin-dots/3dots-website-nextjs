"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MissionVisionSection() {
    return (
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-200 border border-slate-200">
                {/* Mission and Vision Grid */}
                {[
                    { 
                        num: "01", 
                        title: "Our Mission", 
                        desc: "Our mission is to accelerate innovation by helping founders and businesses transform ideas into impactful software products while nurturing a community of builders and entrepreneurs." 
                    },
                    { 
                        num: "02", 
                        title: "Our Vision", 
                        desc: "We aim to build a world-class technology team that creates impactful software products while supporting founders and innovators in building the next generation of startups." 
                    }
                ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 lg:p-20 hover:bg-[#F4F6FB] transition-colors duration-500 group relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-24 relative z-10">
                            <span className="text-sm font-mono text-slate-400 font-medium">{item.num}</span>
                            <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-brand transition-colors duration-500" />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-3xl lg:text-4xl font-light text-slate-800 tracking-tight mb-6">{item.title}</h4>
                            <p className="text-slate-500 font-light text-lg leading-relaxed">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
