"use client";

import { motion } from "framer-motion";

interface ServiceItem {
    title: string;
    icon: React.ReactNode;
    desc: string;
}

interface ServiceOptionsProps {
    services: ServiceItem[];
}

function ServiceOptionsVarient2({ services }: ServiceOptionsProps) {
    return (
        // VARIANT 5: THE "ISO-STRATUM" (Best for showing process depth)
        // Features: Overlapping layered cards that feel like "Strata" or tiers of technology.
        <section className="py-32 bg-slate-50">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col items-center text-center mb-20">
                    <h2 className="text-5xl font-light text-slate-800 tracking-tight">The <span className="font-semibold text-brand">Tech Stratum</span></h2>
                    <p className="text-slate-500 mt-4 max-w-xl font-light">Seven layers of engineering excellence, built one on top of the other for maximum stability.</p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {services.map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group mb-[-40px] last:mb-0"
                        >
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-xl group-hover:translate-x-4 transition-transform duration-500 flex items-center justify-between">
                                <div className="flex items-center gap-8">
                                    <div className="text-5xl font-black text-slate-50 group-hover:text-brand/10 transition-colors">L{idx + 1}</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800">{item.title}</h3>
                                        <p className="text-slate-500 text-sm font-light mt-1 hidden md:block">{item.desc}</p>
                                    </div>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand group-hover:text-white transition-all">
                                    {item.icon}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServiceOptionsVarient2;