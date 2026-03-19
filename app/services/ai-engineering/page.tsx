"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
    MessageSquare, 
    Zap, 
    BarChart3, 
    Mic2, 
    Target, 
    FileSearch,
    BrainCircuit,
    ArrowRight,
    Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AIEngineeringPage() {
    const services = [
        {
            title: "Workflow Automation",
            icon: <Zap className="w-8 h-8" />,
            desc: "Our AI-powered workflow automation solutions streamline business processes, reduce manual tasks, and improve operational efficiency. Using machine learning and intelligent process automation."
        },
        {
            title: "AI Chatbot & Conversational AI",
            icon: <MessageSquare className="w-8 h-8" />,
            desc: "We build intelligent AI chatbots and conversational AI solutions using advanced natural language processing (NLP). These solutions deliver personalized conversations and 24/7 support."
        },
        {
            title: "Generative AI Solutions",
            icon: <Sparkles className="w-8 h-8" />,
            desc: "Leveraging large language models to create intelligent systems that generate content, code, images, and insights. We develop AI-powered applications that enhance productivity."
        },
        {
            title: "AI Data Analytics",
            icon: <BarChart3 className="w-8 h-8" />,
            desc: "Transforming raw data into actionable business intelligence. Using predictive analytics and advanced data modeling, we help organizations uncover trends and forecast outcomes."
        },
        {
            title: "Speech & Voice AI",
            icon: <Mic2 className="w-8 h-8" />,
            desc: "Enable intelligent voice recognition, speech-to-text, and natural voice interactions. These solutions enhance accessibility and automate voice-based digital experiences."
        },
        {
            title: "AI Recommendation Systems",
            icon: <Target className="w-8 h-8" />,
            desc: "Personalized product, content, and service recommendations. Using user behavior analysis, our solutions improve customer engagement and conversion rates."
        },
        {
            title: "Document AI",
            icon: <FileSearch className="w-8 h-8" />,
            desc: "Automate document processing using ML, OCR, and NLP. We extract, classify, and analyze data from invoices, contracts, and reports with deep precision."
        }
    ];

    return (
        <main className="min-h-screen bg-[#0F172A]">
            <Navbar />
            
            {/* Dark Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/5">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[120px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>

                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-widest mb-6 border border-brand/20">
                           <BrainCircuit className="w-3 h-3" /> Future-Proofing Enterprises
                        </span>
                        <h1 className="text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.1] mb-8">
                            AI <span className="font-semibold text-brand">Engineering</span> Solutions
                        </h1>
                        <p className="text-xl text-slate-400 font-light leading-relaxed max-w-2xl">
                            Transforming businesses through intelligent automation and data-driven intelligence. We build the infrastructure for the AI era.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* AI Grid */}
            <section className="py-24 px-6 relative">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="group bg-white/5 border border-white/10 p-10 rounded-4xl hover:bg-white/10 transition-all duration-500 hover:border-brand/40"
                            >
                                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center text-brand mb-8 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 font-light leading-relaxed mb-8">
                                    {item.desc}
                                </p>
                                <div className="inline-flex items-center gap-2 text-sm font-medium text-brand">
                                    Explore AI Models <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Infographic / Capability Section */}
            <section className="py-24 px-6 bg-brand relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="grid grid-cols-12 h-full">
                        {Array.from({length: 12}).map((_, i) => (
                            <div key={i} className="border-r border-white h-full"></div>
                        ))}
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Our <span className="font-semibold">AI Stack</span></h2>
                        <p className="text-white/70 max-w-2xl mx-auto font-light text-lg">We leverage industry-leading architectures to deliver production-ready intelligence.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "LLM Operations", value: "GPT-4 / Llama 3" },
                            { label: "Vision Models", value: "Stable Diffusion" },
                            { label: "Data Pipelines", value: "Python / PyTorch" },
                            { label: "Deployment", value: "Cloud Native AI" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 text-center">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/50 font-bold mb-3">{stat.label}</p>
                                <p className="text-xl font-medium text-white">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Value Prop */}
            <section className="py-32 bg-white px-6">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                         <div className="lg:w-1/2">
                            <h2 className="text-5xl font-light text-slate-800 tracking-tight leading-tight mb-8">
                                Why <span className="font-bold text-brand">AI Engineering</span> Matters Now
                            </h2>
                            <div className="space-y-6">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h4 className="text-lg font-bold text-slate-800 mb-2">Automate Repetitive Core</h4>
                                    <p className="text-slate-500 font-light">Free up your human capital for creative problem solving by automating 80% of routine workflows.</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h4 className="text-lg font-bold text-slate-800 mb-2">Predictive Decision Making</h4>
                                    <p className="text-slate-500 font-light">Reduce risk by making calls based on mathematical forecasts rather than intuition alone.</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <h4 className="text-lg font-bold text-slate-800 mb-2">Hyper-Personalization</h4>
                                    <p className="text-slate-500 font-light">Treat every single customer like they are your only client with AI-driven personalization at scale.</p>
                                </div>
                            </div>
                         </div>
                         <div className="lg:w-1/2">
                            <div className="relative p-10 bg-slate-100 rounded-[3rem]">
                                <Image src="/ai-visual.png" alt="AI Neural Network" width={600} height={400} className="rounded-2xl shadow-lg mix-blend-multiply opacity-80" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-full shadow-2xl">
                                    <BrainCircuit className="w-12 h-12 text-brand" />
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6 bg-[#0F172A]">
                <div className="max-w-[1200px] mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-8">Let&apos;s build your <span className="font-semibold text-brand">Adaptive Intelligent</span> System</h2>
                    <p className="text-slate-400 text-xl font-light mb-12 max-w-2xl mx-auto">Join the leading 0.1% of companies leveraging deep-tech AI to dominate their markets.</p>
                    <Link href="/contact" className="inline-flex items-center gap-3 bg-brand text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-dark transition-all">
                        Consult with AI Architects <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
