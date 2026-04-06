"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Launchpad", href: "/launchpad" },
        { name: "Careers", href: "/careers" },
        { name: "Blog", href: "/blog" },
    ];

    return (
        <>
            <nav className={`fixed w-full top-0 z-50 border-b transition-all duration-300 ${isMenuOpen ? 'bg-[#F4F6FB] border-transparent' : 'bg-[#F4F6FB]/80 backdrop-blur-md border-slate-200'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-3xl font-light tracking-tighter text-slate-800 relative z-50">
                        <Link href="/">
                            <Image
                                src="/3dots-logo-v1.png"
                                alt="3dots Logo"
                                width={128}
                                height={40}
                                className="w-28 md:w-32 h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-12 text-sm font-light text-slate-600">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.href}
                                href={link.href} 
                                className={`${isActive(link.href) ? 'text-brand font-medium' : 'hover:text-brand'} transition-colors relative group`}
                            >
                                {link.name}
                                {isActive(link.href) && (
                                    <motion.div 
                                        layoutId="activeNav"
                                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand rounded-full"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden md:block">
                        <Link href="/contact" className="inline-block bg-brand text-white px-7 py-2.5 rounded-xl text-sm font-light hover:bg-brand-dark transition-all shadow-md">
                            Talk to Us
                        </Link>
                    </div>

                    <button
                        className="md:hidden relative z-50 p-2 text-slate-600 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden fixed inset-0 bg-brand-50 z-40 flex flex-col justify-center items-center gap-8 px-6"
                    >
                        <div className="flex flex-col items-center gap-8 text-2xl font-light text-slate-800">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link 
                                        href={link.href} 
                                        onClick={() => setIsMenuOpen(false)} 
                                        className={`${isActive(link.href) ? 'text-brand font-medium' : 'hover:text-brand'} transition-colors`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="mt-8 bg-brand text-white px-10 py-4 rounded-full text-lg font-medium shadow-xl">
                                Talk to Us
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
