"use client";

import { ShieldCheck, Zap, Smile } from "lucide-react";
import { motion } from "framer-motion";

export default function CultureSection() {
    const values = [
        {
            title: "Take ownership",
            icon: <ShieldCheck className="w-5 h-5" strokeWidth={2} />,
            desc: "We trust you to own your work end-to-end. No micromanagement, but just clear goals and the freedom to get there your way."
        },
        {
            title: "Deliver fast",
            icon: <Zap className="w-5 h-5" strokeWidth={2} />,
            desc: "We move quickly and ship often. Learning by doing beats long planning. You will build, ship, and iterate in real time."
        },
        {
            title: "Have fun",
            icon: <Smile className="w-5 h-5" strokeWidth={2} />,
            desc: "We learn and grow through discussions, activities, and team time. Work hard, but enjoy the ride—we do."
        }
    ];

    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto bg-transparent relative z-10 border-t border-slate-100">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-20"
            >
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-4">
                    Our Work <span className="font-semibold text-brand">Culture</span>
                </h2>
                <p className="text-slate-500 font-light text-xl tracking-wide">
                    What we care about every day
                </p>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-20">
                {values.map((v, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex-1 group"
                    >
                        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-200 group-hover:border-brand transition-colors duration-500">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-800 group-hover:bg-brand group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                                {v.icon}
                            </div>
                            <h3 className="text-xl font-medium text-slate-800 tracking-tight group-hover:text-brand transition-colors duration-300">
                                {v.title}
                            </h3>
                        </div>
                        <p className="text-slate-500 font-light leading-relaxed text-[15.5px]">
                            {v.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
