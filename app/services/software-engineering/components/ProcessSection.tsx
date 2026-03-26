"use client";

import { motion } from "framer-motion";

const steps = [
    {
        num: "01",
        title: "Product Backlog",
        desc: "Stakeholders and project managers collaborate to define and prioritize a comprehensive list of features, including both high and low priority development items."
    },
    {
        num: "02",
        title: "Planning",
        desc: "Based on priorities, the team selects features, defines scope, breaks tasks into subtasks, and clarifies questions before starting the sprint."
    },
    {
        num: "03",
        title: "Sprint Backlog",
        desc: "Tasks planned for the sprint are selected based on feasibility within two weeks and tracked daily as part of the current milestone."
    },
    {
        num: "04",
        title: "Sprint",
        desc: "We follow a two-week sprint cycle with daily standups to track progress, address blockers, and ensure timely delivery of planned features."
    },
    {
        num: "05",
        title: "Demo",
        desc: "At the end of each sprint, completed features are demonstrated to stakeholders, showcasing progress and gathering feedback for continuous improvement."
    }
];

export default function ProcessSection() {
    return (
        <section className="py-40 px-6 bg-white overflow-visible">
            <div className="max-w-[1300px] mx-auto relative">
                {/* Header */}
                <div className="text-center mb-32">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-light text-slate-800 tracking-tighter"
                    >
                        The <span className="font-bold text-slate-900">Process.</span>
                    </motion.h2>
                </div>

                {/* Horizontal Timeline */}
                <div className="relative pt-24 pb-24">
                    {/* The Rail */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-slate-100 -translate-y-1/2 hidden lg:block" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-y-24 lg:gap-0 lg:flex lg:justify-between items-center relative z-10 w-full px-4">
                        {steps.map((step, idx) => {
                            const isTop = idx % 2 === 0; // Above or below for alternate items
                            return (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: isTop ? -40 : 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col items-center relative lg:w-[20%]"
                                >
                                    {/* Content (Desktop: Alternating Above/Below) */}
                                    <div className={`
                                        lg:absolute flex flex-col items-center lg:items-start text-center lg:text-left w-full
                                        ${isTop ? 'lg:top-[-160px]' : 'lg:bottom-[-160px]'}
                                    `}>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-black text-brand tracking-widest uppercase opacity-40">{step.num}</span>
                                            <h3 className="text-sm font-bold text-slate-800 tracking-tight whitespace-nowrap">{step.title}</h3>
                                        </div>
                                        <p className="text-slate-500 font-light text-[13px] leading-relaxed max-w-[180px]">
                                            {step.desc}
                                        </p>
                                    </div>

                                    {/* Milestone Node */}
                                    <div className="relative flex items-center justify-center p-8 group">
                                        {/* Background Pulse */}
                                        <motion.div 
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                            className="absolute w-12 h-12 rounded-full bg-brand/5 group-hover:bg-brand/10 transition-colors"
                                        />
                                        {/* Main Node */}
                                        <div className="w-4 h-4 rounded-full bg-white border-2 border-brand shadow-lg relative z-20 group-hover:scale-125 group-hover:bg-brand transition-all duration-500" />
                                        
                                        {/* Vertical connector line (Desktop only) */}
                                        <div className={`
                                            hidden lg:block absolute w-px bg-brand/20 h-24 pointer-events-none
                                            ${isTop ? 'bottom-16' : 'top-16'}
                                        `} />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend Hint */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-40 flex justify-center"
                >
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.3em] flex items-center gap-4">
                        <div className="w-6 h-px bg-slate-200" />
                        Continuous Improvement Cycle
                        <div className="w-6 h-px bg-slate-200" />
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
