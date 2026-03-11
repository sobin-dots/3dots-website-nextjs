"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Workflow, Sparkles } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Build Powerful Software Products",
        description: "From concept to scale, we design and develop high-quality software products, ERPs, CRMs, and custom platforms that help businesses streamline operations, improve efficiency, and grow faster with reliable technology.",
        highlight: "Enterprise Scale",
        icon: Code2,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
        features: ["Custom Software Development", "Web & Mobile Platforms", "SaaS Product Design", "Legacy System Revival"]
    },
    {
        id: "02",
        title: "Automate Work. Accelerate Growth.",
        description: "We implement AI-powered automation to streamline repetitive processes, improve productivity, and connect your tools into intelligent workflows that save time, reduce costs, and unlock operational efficiency.",
        highlight: "Intelligent Workflows",
        icon: Workflow,
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
        features: ["AI Integration & Chatbots", "Business Process Automation", "API Development & Webhooks", "Data Sync & Analytics"]
    }
];

export default function ServicesSectionVar2() {
    return (
        <section id="services-var-2" className="py-32 px-4 md:px-8 max-w-[1200px] mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-24 max-w-3xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/5 border border-brand/10 text-brand text-sm font-medium mb-6"
                >
                    <Sparkles className="w-4 h-4" />
                    Our Capabilities
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 tracking-tight leading-tight"
                >
                    Solutions that drive <span className="font-semibold text-brand">impact.</span>
                </motion.h2>
            </div>

            {/* Sticky Cards container */}
            <div className="flex flex-col relative" style={{ paddingBottom: '10vh' }}>
                {services.map((service, index) => {
                    return (
                        <div 
                            key={service.id} 
                            className="sticky pt-8 h-fit w-full"
                            style={{ 
                                top: `calc(${index * 2 + 5}rem)`, 
                                zIndex: index + 10 
                            }}
                        >
                            <motion.div 
                                initial={{ opacity: 0, y: 100 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, ease: "easeOut" }}
                                className="bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100/60 overflow-hidden relative group min-h-[500px] flex flex-col md:flex-row gap-8 lg:gap-16 items-center"
                            >
                                {/* Left Content */}
                                <div className="w-full md:w-1/2 flex flex-col justify-center h-full order-2 md:order-1 relative z-10 py-4">
                                    <div className="absolute top-0 right-0 md:hidden w-32 h-32 bg-brand/5 rounded-full blur-3xl -z-10"></div>
                                    
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm shrink-0 group-hover:bg-brand transition-colors duration-500">
                                            <service.icon className="w-8 h-8 text-brand group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                           
                                            <span className="text-sm font-medium text-brand uppercase tracking-wider">{service.highlight}</span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-slate-800 tracking-tight leading-[1.15] mb-6">
                                        {service.title}
                                    </h3>
                                    
                                    <p className="text-slate-600 lg:text-lg leading-relaxed mb-10 font-light max-w-lg">
                                        {service.description}
                                    </p>
                                    
                                    <div className="flex items-center gap-6 mt-auto">
                                        <button className="flex items-center gap-2 text-brand font-medium hover:text-brand-dark transition-colors group/btn">
                                            <span>Learn more about this</span>
                                            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center group-hover/btn:bg-brand group-hover/btn:text-white transition-all">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Right Image Grid/Bento */}
                                <div className="w-full md:w-1/2 min-h-[350px] md:h-full md:min-h-[550px] order-1 md:order-2 relative rounded-[2rem] overflow-hidden">
                                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700 z-10"></div>
                                    <img 
                                        src={service.image} 
                                        alt={service.title} 
                                        className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                                    />
                                    
                                    {/* Glass feature tags over image */}
                                    <div className="absolute bottom-6 left-6 right-6 z-20 flex flex-wrap gap-2">
                                        {service.features.slice(0, 3).map((feat, i) => (
                                            <div key={i} className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-semibold text-slate-800 shadow-xl shadow-black/5 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
                                                {feat}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}
            </div>
            
            {/* Fade out gradient at bottom of sticky area */}
            <div className="h-32 bg-linear-to-b from-transparent to-[#F4F6FB] -mt-16 relative z-50 pointer-events-none"></div>
        </section>
    );
}
