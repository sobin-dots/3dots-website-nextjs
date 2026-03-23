"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Code2, Workflow, Boxes } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ServicesListMinimal7() {
    const [services, setServices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("/api/services-cms")
            .then(res => res.json())
            .then(data => {
                setServices(Array.isArray(data) ? data : []);
                setIsLoading(false);
            })
            .catch(() => setIsLoading(false));
    }, []);
    return (
        <section className="py-24 px-6 max-w-[1400px] mx-auto bg-[#fafafc]">
            <div className="flex flex-col gap-16 md:gap-24">
                {services.map((service, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row items-baseline gap-12 group"
                    >
                        <div className="md:w-1/2 flex flex-col items-start pt-12">
                            <span className="text-sm font-mono text-slate-400 mb-4 block group-hover:text-brand transition-colors duration-500 uppercase tracking-widest">{String(i + 1).padStart(2, '0')}. Service</span>
                            <Link href={`/services/${service.slug}`}>
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 tracking-tight group-hover:text-brand transition-colors duration-500 selection:bg-brand selection:text-white pb-8">
                                    {service.title}
                                </h3>
                            </Link>
                            <div className="h-0.5 w-full bg-slate-200 group-hover:bg-brand transition-colors duration-700 origin-left scale-x-[0.1] group-hover:scale-x-100"></div>
                        </div>
                        
                        <div className="md:w-1/2 flex flex-col md:pt-12">
                            <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-10 max-w-xl">
                                {service.shortDescription}
                            </p>
                            
                            <div className="flex flex-wrap gap-x-8 gap-y-4 items-center">
                                {(service.tags || service.benefits || []).slice(0, 3).map((tag: any, idx: number) => (
                                    <span key={idx} className="text-xs uppercase tracking-[0.2em] text-slate-400 font-semibold group-hover:text-slate-800 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                                <div className="ml-auto">
                                    <Link href={`/services/${service.slug}`} className="flex items-center justify-center w-14 h-14 rounded-full border border-slate-200 text-slate-400 group-hover:bg-brand group-hover:border-brand group-hover:text-white group-hover:scale-110 transition-all duration-500 shadow-sm cursor-pointer">
                                        <ArrowUpRight className="w-5 h-5 flex-shrink-0" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
