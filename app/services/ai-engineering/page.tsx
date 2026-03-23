"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { 
    BrainCircuit, 
    MessageSquare, 
    Sparkles, 
    BarChart3, 
    Mic2, 
    UserPlus, 
    FileText, 
    Link2, 
    Rocket,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AIEngineeringPage() {
    const services = [
        {
            title: "Workflow Automation",
            icon: <Rocket className="w-8 h-8" />,
            desc: "Our AI-powered workflow automation solutions streamline business processes, reduce manual tasks, and improve operational efficiency. Using machine learning, intelligent process automation, and AI-driven decision systems, we automate repetitive workflows across departments. Businesses benefit from faster operations, improved accuracy, reduced costs, and scalable automation that accelerates digital transformation and productivity."
        },
        {
            title: "AI Chatbot & Conversational AI",
            icon: <MessageSquare className="w-8 h-8" />,
            desc: "We build intelligent AI chatbots and conversational AI solutions using advanced natural language processing (NLP) and machine learning. Our chatbots automate customer support, sales interactions, and internal workflows across websites, mobile apps, and messaging platforms. These scalable solutions deliver personalized conversations, 24/7 support, improved engagement, and enhanced customer experience."
        },
        {
            title: "Generative AI Solutions",
            icon: <Sparkles className="w-8 h-8" />,
            desc: "Our generative AI solutions leverage advanced large language models and machine learning to create intelligent systems that generate content, code, images, and insights. We develop AI-powered applications that enhance productivity, automate content creation, and support decision-making. Businesses gain scalable generative AI capabilities for innovation, personalization, and digital transformation."
        },
        {
            title: "AI Data Analytics",
            icon: <BarChart3 className="w-8 h-8" />,
            desc: "We deliver AI-driven data analytics solutions that transform raw data into actionable business intelligence. Using machine learning, predictive analytics, and advanced data modeling, we help organizations uncover trends, forecast outcomes, and optimize operations. Our scalable analytics platforms empower data-driven decision making and unlock the full value of enterprise data."
        },
        {
            title: "Speech & Voice AI",
            icon: <Mic2 className="w-8 h-8" />,
            desc: "Our speech and voice AI solutions enable intelligent voice recognition, speech-to-text, and natural voice interactions. Using advanced AI models and NLP technologies, we build voice assistants, voice automation systems, and speech analytics platforms. These solutions enhance accessibility, automate voice-based workflows, and create seamless voice-enabled digital experiences."
        },
        {
            title: "AI Recommendation Systems",
            icon: <UserPlus className="w-8 h-8" />,
            desc: "We develop AI-powered recommendation systems that deliver personalized product, content, and service recommendations. Using machine learning algorithms, user behavior analysis, and predictive modeling, our solutions improve customer engagement and conversion rates. Businesses can enhance personalization, increase revenue, and deliver smarter digital experiences across platforms."
        },
        {
            title: "Document AI",
            icon: <FileText className="w-8 h-8" />,
            desc: "Our Document AI solutions automate document processing using machine learning, OCR, and natural language processing technologies. We extract, classify, and analyze data from invoices, contracts, forms, and reports. This intelligent automation reduces manual processing, improves accuracy, accelerates document workflows, and enables efficient data-driven business operations."
        },
        {
            title: "AI Integration Services",
            icon: <Link2 className="w-8 h-8" />,
            desc: "We provide AI integration services that seamlessly embed artificial intelligence capabilities into existing applications, platforms, and enterprise systems. Our experts integrate machine learning models, APIs, and AI services to enhance automation, analytics, and decision-making. Businesses gain scalable AI functionality without rebuilding existing infrastructure or workflows."
        },
        {
            title: "AI Product Development",
            icon: <BrainCircuit className="w-8 h-8" />,
            desc: "We design and build end-to-end AI products that transform innovative ideas into scalable intelligent applications. From AI strategy and data engineering to model development and deployment, our team delivers production-ready AI solutions. Businesses launch powerful AI-driven products that enable automation, personalization, and competitive digital innovation."
        }
    ];

    return (
        <main className="min-h-screen bg-white text-slate-800">
            <Navbar />
            
            {/* Header / Hero Section - Matching About Style */}
            <section className="relative w-full bg-linear-to-b from-slate-50 to-white pt-32 pb-12 border-b border-slate-100 overflow-hidden mb-16">
                <div className="absolute inset-0 z-0 bg-white">
                    <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-brand/5 to-transparent z-10"></div>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 relative z-20 w-full flex items-center">
                    <div className="w-full flex justify-between items-center h-full">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-left relative z-20"
                        >
                            <div className="w-10 h-1 bg-brand mb-6 rounded-full"></div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 tracking-tight leading-[1.1]">
                                AI <br />
                                <span className="font-bold text-slate-900">Engineering.</span>
                            </h1>
                            <p className="mt-8 text-lg text-slate-500 font-light max-w-xl leading-relaxed">
                                Transforming businesses through intelligent automation and data-driven intelligence. We build the architecture for the AI-first era.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:flex flex-col items-start bg-slate-50 p-8 border border-slate-100 rounded-4xl shadow-xl shadow-slate-100/50 relative z-20 max-w-[340px]"
                        >
                            <span className="bg-brand text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm mb-4">Strategic AI</span>
                            <h3 className="text-base font-semibold text-slate-800 mb-3 leading-snug">Enterprise Automation</h3>
                            <p className="text-sm font-light text-slate-500 mb-6">Implementing intelligent process automation to accelerate digital transformation & growth.</p>
                            <Link href="/contact" className="text-brand text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all">
                                Request AI Audit <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Service Grid - Clean & Minimal */}
            <section className="py-24 px-6 max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            viewport={{ once: true }}
                            className="group flex flex-col items-start"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-brand mb-8 group-hover:scale-110 transition-transform duration-500 border-b-2">
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-4 tracking-tight group-hover:text-brand transition-colors">
                                {service.title}
                            </h3>
                            <p className="text-slate-500 font-light leading-relaxed text-[15px] group-hover:text-slate-600 transition-colors">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Standard Footer Style CTA */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-[1240px] mx-auto bg-[#0F172A] p-12 md:p-24 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-brand/5 blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-[3s]"></div>
                    <div className="max-w-2xl relative z-10 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-light mb-8 leading-tight tracking-tight">Ready to build your <br /><span className="font-bold">Software Product?</span></h2>
                        <p className="text-slate-400 font-light text-lg">Send us your requirements and get a detailed execution plan within 24 hours.</p>
                    </div>
                    <Link href="/contact" className="bg-brand text-white px-10 py-5 rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-xl relative z-10 text-lg shrink-0 w-full md:w-auto text-center">
                        Start Your Project
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}
