"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
    ChevronRight, 
    Home, 
    Layers, 
    Info, 
    BookOpen, 
    MessageCircle, 
    Shield, 
    ArrowUpRight,
    Cpu,
    Users
} from "lucide-react";

export default function SitemapPage() {
    const sections = [
        {
            title: "Main Navigation",
            icon: <Home className="w-5 h-5" />,
            links: [
                { name: "Home Dashboard", href: "/", desc: "Return to the main overview and welcome page." },
                { name: "All Services", href: "/services", desc: "Explore our full suite of software solutions." },
                { name: "Launchpad Program", href: "/launchpad", desc: "Dedicated MVP development for early-stage founders." },
                { name: "About 3Dots", href: "/about", desc: "Our story, mission, and the people behind the code." },
                { name: "Careers", href: "/careers", desc: "Join our team of engineering experts and creators." },
                { name: "Insights & Blog", href: "/blog", desc: "Articles on technology, startups, and execution." },
                { name: "Contact Us", href: "/contact", desc: "Start a conversation about your next big thing." }
            ]
        },
        {
            title: "Our Services",
            icon: <Layers className="w-5 h-5" />,
            links: [
                { name: "Software Development", href: "/services/software-development", desc: "Enterprise-grade web and mobile applications." },
                { name: "Startup Launchpad", href: "/services/startup-launchpad", desc: "15-day MVP execution for fast-moving founders." },
                { name: "Workflow Automation", href: "/services/workflow-automation", desc: "Custom internal tools to automate manual processes." },
                { name: "UI/UX Design", href: "/services/ui-ux-design", desc: "Product design focused on usability and conversion." },
                { name: "Dedicated Teams", href: "/services/dedicated-teams", desc: "Extend your engineering capacity with our pros." }
            ]
        },
        {
            title: "Company & Culture",
            icon: <Info className="w-5 h-5" />,
            links: [
                { name: "Our Values", href: "/about#values", desc: "The principles that guide our daily work." },
                { name: "Our Process", href: "/about#process", desc: "How we move from idea to production in weeks." },
                { name: "Open Positions", href: "/careers#positions", desc: "View our current job listings and internships." },
                { name: "Expert Consultation", href: "/services#consultation", desc: "Book a strategic call with our tech leads." }
            ]
        },
        {
            title: "Legal & Compliance",
            icon: <Shield className="w-5 h-5" />,
            links: [
                { name: "Privacy Policy", href: "/privacy", desc: "How we handle and protect your data." },
                { name: "Terms of Service", href: "/terms", desc: "The rules and agreements of working with 3Dots." },
                { name: "Cookie Settings", href: "/cookies", desc: "Manage your tracking and browser preferences." },
                { name: "Partner Program", href: "/partners", desc: "Our collaborative framework for strategic growth." }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6 bg-white border-b border-slate-100">
                <div className="max-w-[1200px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-5xl md:text-6xl font-light text-slate-800 tracking-tight mb-6">
                            Website <span className="font-semibold text-brand">Sitemap</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-light leading-relaxed">
                            A comprehensive overview of the 3Dots digital ecosystem. Find your way through our services, insights, and structural documents.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sitemap Grid */}
            <section className="py-20 px-6">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                        {sections.map((section, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-200">
                                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
                                        {section.title}
                                    </h2>
                                </div>

                                <div className="space-y-8">
                                    {section.links.map((link, lIdx) => (
                                        <Link 
                                            key={lIdx} 
                                            href={link.href}
                                            className="group block"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-medium text-slate-700 group-hover:text-brand transition-colors flex items-center gap-2">
                                                        {link.name}
                                                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all" />
                                                    </h3>
                                                    <p className="text-sm text-slate-500 font-light mt-1 max-w-sm">
                                                        {link.desc}
                                                    </p>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-brand group-hover:text-white transition-all">
                                                    <ChevronRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
