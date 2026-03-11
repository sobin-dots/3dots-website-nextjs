"use client";

import { ArrowRight, Code2, Workflow } from "lucide-react";

const services = [
    {
        id: "01",
        title: "Software Products",
        description: "From concept to scale, we design and develop high-quality software products, ERPs, CRMs, and custom platforms that help businesses streamline operations, improve efficiency, and grow faster with reliable technology.",
        features: ["Custom Software Development", "Web & Mobile Platforms", "SaaS Product Design", "Legacy System Revival"],
        icon: Code2,
    },
    {
        id: "02",
        title: "Intelligent Workflows",
        description: "We implement AI-powered automation to streamline repetitive processes, improve productivity, and connect your tools into seamless, automated pipelines that save time and reduce costs.",
        features: ["AI Integration & Chatbots", "Business Process Automation", "API Development & Webhooks", "Data Sync & Analytics"],
        icon: Workflow,
    }
];

export default function ServicesListMinimal1() {
    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                    <div key={service.id} className="border border-slate-200 p-10 md:p-12 hover:border-brand/30 transition-colors bg-white group flex flex-col h-full rounded-2xl md:rounded-3xl shadow-xs hover:shadow-lg hover:shadow-brand/5">
                        <div className="mb-8">
                            <service.icon className="w-8 h-8 text-brand mb-6" strokeWidth={1.5} />
                            <h3 className="text-2xl font-medium text-slate-800 mb-4 tracking-tight">{service.title}</h3>
                            <p className="text-slate-500 font-light leading-relaxed">{service.description}</p>
                        </div>
                        
                        <div className="mt-auto pt-8 border-t border-slate-100">
                            <ul className="space-y-3 mb-8">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-sm text-slate-600 font-light">
                                        <span className="w-1.5 h-1.5 bg-brand/20 group-hover:bg-brand transition-colors duration-300 rounded-full mr-3 shrink-0"></span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button className="text-sm font-medium text-brand flex items-center gap-2 group-hover:gap-3 transition-all">
                                Learn More <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
