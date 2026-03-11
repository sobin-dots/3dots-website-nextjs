"use client";

import { ArrowRight } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Software Products",
        description: "From concept to scale, we design and develop high-quality software products, ERPs, CRMs, and custom platforms that help businesses streamline operations, improve efficiency, and grow faster with reliable technology.",
        features: ["Custom Software Development", "Web & Mobile Platforms", "SaaS Product Design"]
    },
    {
        id: "02",
        title: "Intelligent Workflows",
        description: "We implement AI-powered automation to streamline repetitive processes, improve productivity, and connect your tools into seamless, automated pipelines that save time and reduce costs.",
        features: ["AI Integration & Chatbots", "Business Process Automation", "API Development"]
    }
];

export default function ServicesListMinimal2() {
    return (
        <section className="py-24 px-6 max-w-[1000px] mx-auto">
            <div className="flex flex-col">
                {services.map((service, index) => (
                    <div key={service.id} className={`py-16 md:py-24 flex flex-col md:flex-row gap-8 md:gap-16 border-t ${index === 0 ? 'border-slate-200/0' : 'border-slate-200'} border-b border-slate-200/0 relative group`}>
                        <div className="md:w-1/3 shrink-0">
                            <span className="text-sm font-mono text-slate-400 mb-4 block group-hover:text-brand transition-colors duration-300">{service.id}.</span>
                            <h3 className="text-3xl font-light text-slate-800 tracking-tight">{service.title}</h3>
                        </div>
                        
                        <div className="md:w-2/3 flex flex-col">
                            <p className="text-lg text-slate-500 font-light leading-relaxed mb-10 max-w-xl">
                                {service.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10">
                                {service.features.map((feature, idx) => (
                                    <span key={idx} className="text-[13px] text-slate-800 font-medium tracking-wide uppercase">
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            <a href="#" className="inline-flex items-center gap-2 text-brand font-medium pb-1 border-b border-brand/20 hover:border-brand w-fit transition-colors group-hover:text-brand-dark">
                                View Capabilities <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
