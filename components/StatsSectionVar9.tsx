"use client";

import { motion } from "framer-motion";
import { Users, Rocket, Globe, Clock } from "lucide-react";

const stats = [
    { 
        id: "01",
        title: "TEAM SCALE", 
        value: "30+", 
        desc: "Team Members", 
        icon: Users 
    },
    { 
        id: "02",
        title: "EXPERIENCE", 
        value: "100+", 
        desc: "Successful Deliveries", 
        icon: Rocket 
    },
    { 
        id: "03",
        title: "GLOBAL REACH", 
        value: "06", 
        desc: "Active Timezones", 
        icon: Globe 
    },
    { 
        id: "04",
        title: "AVAILABILITY", 
        value: "24/7", 
        desc: "Continuous Delivery", 
        icon: Clock 
    }
];

export default function StatsSectionVar9() {
    return (
        <section className="py-32 px-6 bg-[#f8fafb] max-w-[1240px] mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-24">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight leading-none mb-6"
                >
                    Exceptional <span className="font-semibold ">Capabilities.</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    viewport={{ once: true }}
                    className="text-slate-400 font-light text-lg   mx-auto opacity-70"
                >
                    Scaling your vision with a world-class engineering team and proven processes.
                </motion.p>
            </div>

            <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-white p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white flex flex-col items-center group relative overflow-hidden"
                    >
                        <div className="mb-10 w-16 h-16 rounded-full border border-slate-50 flex items-center justify-center text-brand/60 group-hover:bg-brand/5 group-hover:text-brand transition-all duration-700">
                            <item.icon className="w-8 h-8" strokeWidth={1} />
                        </div>
                        
                        <h4 className="text-5xl font-bold text-slate-800 mb-3 tracking-tight">{item.value}</h4>
                        
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300 mb-6   transition-colors group-hover:text-brand/50">
                            {item.desc}
                        </p>
                        
                        <p className="text-[13px] font-light text-slate-400  leading-relaxed text-center px-2">
                            {item.title}
                        </p>

                        <div className="absolute bottom-0 left-0 w-full h-1 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

