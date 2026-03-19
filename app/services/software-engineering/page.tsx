"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
    Code2, 
    Layers, 
    Smartphone, 
    SearchCheck, 
    CloudCog, 
    LifeBuoy, 
    RefreshCcw,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import ServiceOptionsVarient1 from "./components/ServiceOptionsVarient1";
import ServiceOptionsVarient2 from "./components/ServiceOptionsVarient2";
import ServiceOptionsVarient3 from "./components/ServiceOptions";
import ServiceOptions from "./components/ServiceOptions";

export default function SoftwareEngineeringPage() {
    const services = [
        {
            title: "UI/UX Designing",
            icon: <Layers className="w-8 h-8" />,
            desc: "We create intuitive, visually engaging UI/UX designs that enhance user experience and drive conversions. Our design process combines user research, wireframing, prototyping, and usability testing to deliver responsive, accessible, and conversion-focused interfaces."
        },
        {
            title: "Mobile App Development",
            icon: <Smartphone className="w-8 h-8" />,
            desc: "We build high-performance mobile applications for iOS and Android using modern frameworks and scalable architecture. Our mobile app development services focus on user-centric design, fast performance, secure integrations, and seamless functionality."
        },
        {
            title: "Web App Development",
            icon: <Code2 className="w-8 h-8" />,
            desc: "Our web application development services deliver scalable, secure, and high-performance digital platforms. Using modern technologies, cloud architecture, and responsive design, we build custom web applications that improve operational efficiency."
        },
        {
            title: "Software Testing & QA Automation",
            icon: <SearchCheck className="w-8 h-8" />,
            desc: "We provide comprehensive software testing and QA automation services to ensure reliability, performance, and security. Our experts implement automated testing frameworks, continuous testing pipelines, and rigorous quality assurance processes."
        },
        {
            title: "DevOps",
            icon: <CloudCog className="w-8 h-8" />,
            desc: "Our DevOps services streamline software delivery through automation, CI/CD pipelines, and cloud infrastructure management. We integrate development and operations to improve deployment speed, system reliability, and scalability."
        },
        {
            title: "Software Maintenance Support",
            icon: <LifeBuoy className="w-8 h-8" />,
            desc: "We provide proactive software maintenance and support services to ensure applications remain secure, stable, and high performing. Our team handles performance optimization, bug fixes, security updates, and system monitoring."
        },
        {
            title: "Legacy System Modernization",
            icon: <RefreshCcw className="w-8 h-8" />,
            desc: "We help businesses modernize legacy systems by transforming outdated applications into scalable, cloud-ready, and high-performance platforms. Our modernization services include code refactoring, system re-architecture, and cloud migration."
        }
    ];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-30 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/5 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-brand/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-brand/5 text-brand text-xs font-bold uppercase tracking-widest mb-6">
                            Domain Expertise
                        </span>
                        <h1 className="text-6xl md:text-7xl font-light text-slate-800 tracking-tight leading-[1.1] mb-8">
                            Software <span className="font-semibold text-brand">Engineering</span> Solutions
                        </h1>
                        <p className="text-xl text-slate-500 font-light leading-relaxed max-w-2xl">
                            End-to-end development expertise to build, scale, and maintain world-class digital products. We combine technical rigor with creative execution.
                        </p>
                    </motion.div>
                </div>
            </section> 


<ServiceOptions services={services} />


            {/* Process/Infographic Detail */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-1/2">
                            <h2 className="text-4xl font-light text-slate-800 mb-10">Our <span className="font-semibold">Development Lifecycle</span></h2>
                            <div className="space-y-8">
                                {[
                                    { step: "01", title: "Strategic Discovery", desc: "Understanding business goals and user needs." },
                                    { step: "02", title: "Architectural Planning", desc: "Defining scalable, future-proof tech stacks." },
                                    { step: "03", title: "Agile Execution", desc: "Iterative building with continuous feedback." },
                                    { step: "04", title: "Quality Assurance", desc: "Rigorous testing across all environments." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <span className="text-brand font-bold text-lg">{step.step}</span>
                                        <div>
                                            <h4 className="text-lg font-semibold text-slate-800 mb-1">{step.title}</h4>
                                            <p className="text-slate-500 font-light">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:w-1/2 relative">
                             {/* Decorative code block visual */}
                            <div className="bg-[#0F172A] p-8 rounded-4xl shadow-2xl relative z-10">
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                </div>
                                <div className="space-y-3 font-mono text-sm">
                                    <p className="text-brand">async function deployApplication(config) &#123;</p>
                                    <p className="text-slate-400 pl-4">{"// Preparing infrastructure..."}</p>
                                    <p className="text-slate-300 pl-4">await <span className="text-amber-400">setupEnvironment</span>(config);</p>
                                    <p className="text-slate-300 pl-4">await <span className="text-amber-400">runSecurityCheck</span>();</p>
                                    <p className="text-slate-300 pl-4">await <span className="text-amber-400">optimizeAssets</span>();</p>
                                    <p className="text-slate-400 pl-4">{"// Scaling to edge..."}</p>
                                    <p className="text-slate-300 pl-4">return <span className="text-emerald-400">&quot;Production Live!&quot;</span>;</p>
                                    <p className="text-brand">&#125;</p>
                                </div>
                             </div>
                             {/* Floating elements */}
                             <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-20 hidden md:block"
                             >
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="text-brand w-5 h-5" />
                                    <span className="text-sm font-medium text-slate-700">99.9% System Uptime</span>
                                </div>
                             </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-brand p-12 md:p-20 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-light mb-6 leading-tight">Ready to build your <span className="font-semibold">Software Ecosystem?</span></h2>
                            <p className="text-white/80 font-light text-lg">Send us your requirements and get a technical estimate within 24 hours.</p>
                        </div>
                        <Link href="/contact" className="bg-white text-brand px-10 py-5 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-xl shadow-black/10">
                            Start Your Project
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
