"use client";

import { ArrowRight, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
    {
        id: "01",
        number: "01",
        titleLine1: "Build Powerful",
        titleLine2: "Software Products",
        description: "From concept to scale, we design and develop high-quality software products, ERPs, CRMs, and custom platforms that help businesses streamline operations, improve efficiency, and grow faster with reliable technology.",
        highlightIcon: <span className="text-brand font-semibold text-2xl tracking-normal">&lt;/&gt;</span>,
        highlightTitle: "Enterprise Scale",
        highlightDesc: "Custom platforms built for reliability and massive growth.",
        image: "/images/software-development.jpeg",
        slug:"software-products"
    },
    {
        id: "02",
        number: "02",
        titleLine1: "Automate Work.",
        titleLine2: "Accelerate Growth.",
        description: "We implement AI-powered automation to streamline repetitive processes, improve productivity, and connect your tools into intelligent workflows that save time, reduce costs, and unlock operational efficiency.",
        highlightIcon: <Workflow className="w-7 h-7 text-brand" strokeWidth={1.5} />,
        highlightTitle: "Intelligent Workflows",
        highlightDesc: "Connecting your tools into seamless, automated pipelines.",
        image: "/images/automation-service.jpg",
        slug:"intelligent-workflows"
    }
];

export default function ServicesSection() {
    return (
        <section id="services" className="py-24 px-6 max-w-[1200px] mx-auto relative z-10">
            <div className="flex flex-col gap-32">
                {services.map((service, index) => {
                    const isEven = index % 2 !== 0; // false for 0, true for 1

                    return (
                        <motion.div 
                            key={service.id} 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}
                        >
                            
                            {/* Visual Side */}
                            <div className="w-full lg:w-1/2 relative">
                                <div className="rounded-[2.5rem] overflow-hidden aspect-4/3 lg:aspect-4/3 shadow-lg relative group">
                                    <img
                                        src={service.image}
                                        alt={service.titleLine2}
                                        className="w-full h-full object-cover grayscale-80"
                                    />
                                    {/* Blue Overlay Gradient perfectly matching image */}
                                    <div className={`absolute inset-0 bg-linear-to-r ${isEven ? 'from-brand/10 to-brand/10' : 'from-brand/10 to-brand/10'} mix-blend-overlay`}></div>
                                    <div className={`absolute inset-0 bg-linear-to-r ${isEven ? 'from-transparent to-brand/10' : 'from-brand/10 to-transparent'} mix-blend-multiply opacity-80`}></div>
                                    <div className="absolute inset-0 bg-brand/5"></div>
                                </div>
                                
                                {/* Floating Card */}
                                <div className={`absolute -bottom-8 ${isEven ? '-left-4 md:-left-10' : '-right-4 md:-right-10'} bg-white p-7 md:p-8 rounded-3xl md:rounded-4xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] max-w-[260px] md:max-w-[300px] z-20`}>
                                    <div className="mb-4">
                                        {service.highlightIcon}
                                    </div>
                                    <h4 className="text-[17px] font-medium text-slate-800 mb-2">{service.highlightTitle}</h4>
                                    <p className="text-[13px] text-slate-500 font-light leading-relaxed">{service.highlightDesc}</p>
                                </div>
                            </div>

                            {/* Text Content Side */}
                            <div className="w-full lg:w-1/2 flex flex-col pt-10 lg:pt-0 relative">
                              

                                <h2 className="text-4xl md:text-[44px] font-light text-slate-800 tracking-tight leading-[1.1] mb-6 mt-6 lg:mt-0">
                                    {service.titleLine1} <br />
                                    <span className="text-secondary font-semibold">{service.titleLine2}</span>
                                </h2>
                                
                                <p className="text-slate-500 font-light text-[15px] md:text-base leading-relaxed mb-10 max-w-lg">
                                    {service.description}
                                </p>

                                <Link href={`/services/${service.slug}`} className="text-slate-700 border cursor-pointer border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 bg-white w-fit">
                                    Learn More <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
                                </Link>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
