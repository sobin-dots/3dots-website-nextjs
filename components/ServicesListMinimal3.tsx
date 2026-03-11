"use client";

import { ArrowUpRight } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Software Engineering & Products",
        description: "From concept to scale, we design and develop high-quality software products, ERPs, CRMs, and custom platforms that help businesses streamline operations, improve efficiency, and grow faster with reliable technology.",
    },
    {
        id: "02",
        title: "Intelligent Workflows & Automation",
        description: "We implement AI-powered automation to streamline repetitive processes, improve productivity, and connect your tools into seamless, automated pipelines that save time and reduce costs.",
    }
];

export default function ServicesListMinimal3() {
    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto pb-40">
            <div className="flex flex-col gap-24 md:gap-32 mt-12">
                {services.map((service) => (
                    <div key={service.id} className="relative group flex flex-col md:flex-row items-baseline gap-6 md:gap-12">
                        {/* Huge Number */}
                        <div className="text-6xl md:text-[120px] font-light text-slate-200 leading-none select-none transition-colors duration-500 group-hover:text-brand/10 shrink-0">
                            {service.id}
                        </div>
                        
                        {/* Content */}
                        <div className="flex flex-col items-start pt-4 md:pt-8 w-full">
                            <h3 className="text-3xl md:text-5xl font-light text-slate-800 tracking-tight mb-6 group-hover:text-brand transition-colors duration-500">
                                {service.title}
                            </h3>
                            <p className="text-slate-500 font-light text-lg md:text-xl leading-relaxed max-w-2xl mb-12">
                                {service.description}
                            </p>
                            
                            <button className="flex items-center justify-center w-14 h-14 rounded-full border border-slate-200 text-slate-500 group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all duration-300 shadow-sm">
                                <ArrowUpRight className="w-5 h-5 flex-shrink-0" />
                            </button>
                        </div>
                        
                        {/* Hover Divider Effect */}
                        <div className="absolute -bottom-12 md:-bottom-16 left-0 w-full h-px bg-slate-200 overflow-hidden">
                            <div className="w-full h-full bg-brand transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
