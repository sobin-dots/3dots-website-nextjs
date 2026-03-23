"use client";

import { Twitter, Linkedin, Instagram, Youtube, Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerSections = [
        {
            title: "Services",
            links: [
                { name: "Software Engineering", href: "/services/software-engineering" },
                { name: "AI Engineering", href: "/services/ai-engineering" },
                { name: "IT & AI Consulting", href: "/services/it-ai-consulting" },
            ]
        },
        {
            title: "Quick Links",
            links: [
                { name: "Startup Launchpad", href: "/launchpad" },
                { name: "Download Our Profile", href: "/3dots-profile.pdf" },
                { name: "Careers", href: "/careers" },
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About 3Dots", href: "/about" },
                { name: "Insights & Blog", href: "/blog" },
                { name: "Contact Us", href: "/contact" },
            ]
        }
    ];

    return (
        <div className="mt-20">
            {/* White Partners Strip */}
            <div className="bg-white py-24 border-t border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-slate-400 font-bold tracking-[0.25em] uppercase text-[10px] mb-16 text-center">Our Strategic Partners</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center gap-4 group">
                                <Image src="/rexcoders-logo.png" alt="RexCoders" width={160} height={40} className="h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mt-2">Educational Partner</span>
                            </div>
                            <div className="flex flex-col items-center gap-4 group">
                                <Image src="/picstol-logo.png" alt="Picstol" width={180} height={50} className="h-10 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mt-2">Media Partner</span>
                            </div>
                            <div className="flex flex-col items-center gap-4 group">
                                <Image src="/bonafai-logo.png" alt="Bonafai" width={160} height={40} className="h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mt-2">Branding Partner</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Dark Main Footer */}
            <footer className="bg-[#0F172A] text-slate-300 pt-24 pb-12 relative overflow-hidden">
                {/* Subtle Gradient Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                
                <div className="max-w-[1400px] mx-auto px-6">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
                        <div className="lg:col-span-2 space-y-8">
                            <Link href="/" className="inline-block">
                                <Image
                                    src="/3dots-logo.png"
                                    alt="3dots Logo"
                                    width={140}
                                    height={44}
                                    className="w-32 md:w-36 h-auto brightness-0 invert opacity-90"
                                />
                            </Link>
                            <p className="text-slate-400 font-light leading-relaxed max-w-sm text-[15px]">
                                We handle all the software development domain of any company. From Startup Launch Pad to enterprise Workflow Automation, we are your strategic technology partner.
                            </p>
                            <div className="flex gap-4">
                                {[Linkedin, Twitter, Instagram, Youtube].map((Icon, i) => (
                                    <Link 
                                        key={i} 
                                        href="#" 
                                        className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-brand hover:border-brand hover:text-white transition-all duration-300"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {footerSections.map((section, idx) => (
                            <div key={idx} className="space-y-6">
                                <h4 className="text-white font-semibold tracking-tight text-lg">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <Link 
                                                href={link.href} 
                                                className="text-slate-400 hover:text-brand transition-colors text-sm font-light inline-flex items-center group"
                                            >
                                                {link.name}
                                                <ArrowRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Lower Contact Info Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-t border-slate-800/50 mb-10">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-slate-800/50 flex items-center justify-center shrink-0">
                                <Mail className="w-4 h-4 text-brand" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email Us</p>
                                <a href="mailto:hello@3dots.co" className="text-white hover:text-brand transition-colors">hello@3dots.co</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-slate-800/50 flex items-center justify-center shrink-0">
                                <Phone className="w-4 h-4 text-brand" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Call Us</p>
                                <a href="tel:+919952282868" className="text-white hover:text-brand transition-colors">+91 995 228 2868</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-slate-800/50 flex items-center justify-center shrink-0">
                                <MapPin className="w-4 h-4 text-brand" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Find Us</p>
                                <p className="text-white">Nagercoil, Tamil Nadu 629003</p>
                            </div>
                        </div>
                    </div>

                    {/* Copyright Bar */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6"
                    >
                        <p className="text-slate-500 font-light text-xs tracking-wide">
                            © {currentYear} 3dots. All rights reserved. Handcrafted by 3dots Engineering Team.
                        </p>
                        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                            <Link href="/sitemap" className="hover:text-brand transition-colors">Sitemap</Link>
                        </div>
                    </motion.div>
                </div>
            </footer>
        </div>
    );
}
