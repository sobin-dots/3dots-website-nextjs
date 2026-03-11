"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Workflow, Database, Cloud } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Software Products",
        description: "From concept to scale, we design and develop high-quality software products, ERPs, CRMs, and custom platforms.",
        icon: Code2,
        color: "bg-blue-500",
        bgLight: "bg-blue-50",
        border: "border-blue-100",
        textColor: "text-blue-600",
    },
    {
        id: "02",
        title: "Intelligent Workflows",
        description: "We implement AI-powered automation to streamline repetitive processes and improve overall team productivity.",
        icon: Workflow,
        color: "bg-brand",
        bgLight: "bg-indigo-50",
        border: "border-indigo-100",
        textColor: "text-brand",
    },
    {
        id: "03",
        title: "Cloud Infrastructure",
        description: "Scalable, secure, and reliable cloud solutions designed to support your growing business needs seamlessly.",
        icon: Cloud,
        color: "bg-cyan-500",
        bgLight: "bg-cyan-50",
        border: "border-cyan-100",
        textColor: "text-cyan-600",
    },
    {
        id: "04",
        title: "Data Analytics",
        description: "Transform your raw data into actionable insights with our advanced dashboarding and analytics reporting tools.",
        icon: Database,
        color: "bg-purple-500",
        bgLight: "bg-purple-50",
        border: "border-purple-100",
        textColor: "text-purple-600",
    }
];

export default function ServicesListMinimal4() {
    return (
        <section className="py-32 px-6 max-w-[1200px] mx-auto bg-white rounded-[3rem] shadow-sm border border-slate-100 my-12">
            
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight">
                    Capabilities designed for <br className="hidden md:block"/><span className="font-semibold text-brand">modern enterprises.</span>
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-12">
                {services.map((service, index) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
                        key={service.id} 
                        className={`p-6 md:p-8 rounded-[2rem] border ${service.border} ${service.bgLight} group hover:-translate-y-2 transition-transform duration-500 flex flex-col h-full`}
                    >
                        <div className={`w-14 h-14 rounded-2xl ${service.color} text-white flex items-center justify-center mb-8 shadow-lg shadow-black/5`}>
                            <service.icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                        
                        <h3 className="text-xl font-semibold text-slate-800 mb-3">{service.title}</h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-grow">
                            {service.description}
                        </p>
                        
                        <div className="mt-auto pt-6 border-t border-slate-200/50">
                            <button className={`w-10 h-10 rounded-full border ${service.border} flex items-center justify-center bg-white group-hover:${service.color} group-hover:text-white transition-all duration-300 ${service.textColor}`}>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
