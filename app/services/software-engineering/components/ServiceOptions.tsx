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

function ServiceOptions({ services }: ServiceOptionsProps) {
    return (
        // VARIANT 6: THE "NEURAL DATA PATH" (Best for showing logic flow)
        // Features: A central vertical path with branches for each service.
        <section className="py-24 bg-white relative">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="relative">
                    {/* Central Logic Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden lg:block" />
                    
                    <div className="space-y-12">
                        {services.map((item, idx) => (
                            <div key={idx} className={`flex items-center gap-12 ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                <div className="flex-1 hidden lg:block" />
                                
                                {/* Central Node */}
                                <div className="relative z-10 w-12 h-12 rounded-full bg-white border-4 border-slate-50 flex items-center justify-center shrink-0 shadow-lg group">
                                    <div className="w-2 h-2 rounded-full bg-brand group-hover:scale-150 transition-transform" />
                                </div>

                                <motion.div 
                                    whileHover={{ scale: 1.02 }}
                                    className="flex-1 bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                                >
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <div className="w-14 h-14 rounded-2xl bg-brand/5 flex items-center justify-center text-brand">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                                            <p className="text-slate-500 font-light leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ServiceOptions;