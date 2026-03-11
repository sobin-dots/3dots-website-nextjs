"use client";

import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-white pt-24 border-t border-slate-200 mt-20">
            <div className="max-w-[1400px] mx-auto px-6">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-24 text-center"
                >
                    <h4 className="text-slate-400 font-medium tracking-widest uppercase text-sm mb-12">Our Strategic Partners</h4>
                    <div className="flex flex-wrap justify-center gap-x-20 gap-y-10">
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center group"
                        >
                            <Image 
                                src="/rexcoders-logo.png" 
                                alt="RexCoders" 
                                width={128}
                                height={32}
                                className="h-6 md:h-8 w-auto object-contain mb-1" 
                            />
                            <span className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-medium">Educational Partner</span>
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center group"
                        >
                            <Image 
                                src="/picstol-logo.png" 
                                alt="Picstol" 
                                width={160}
                                height={40}
                                className="h-8 md:h-10 w-auto object-cover mb-1" 
                            />
                            <span className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-medium">Media Partner</span>
                        </motion.div>
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center group"
                        >
                            <Image
                                src="/bonafai-logo.png"
                                alt="Bonafai Logo"
                                width={128}
                                height={32}
                                className="w-28 md:w-32 h-auto object-cover opacity-90 transition-transform duration-700"
                            />
                            <span className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-medium">Branding Partner</span>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <div className="text-2xl font-light tracking-tighter text-slate-800">
                         <Image
                                src="/3dots-logo.png"
                                alt="3dots Logo"
                                width={128}
                                height={40}
                                className="w-28 md:w-32 h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                            />
                    </div>
                    <p className="text-slate-400 font-light text-sm">
                        © {new Date().getFullYear()} 3dots. Building world-class software.
                    </p>
                    <div className="flex gap-6 text-slate-400">
                        <a href="#" className="hover:text-brand transition-colors transform hover:scale-110" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-brand transition-colors transform hover:scale-110" aria-label="Twitter">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-brand transition-colors transform hover:scale-110" aria-label="Instagram">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-brand transition-colors transform hover:scale-110" aria-label="YouTube">
                            <Youtube className="w-5 h-5" />
                        </a>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
