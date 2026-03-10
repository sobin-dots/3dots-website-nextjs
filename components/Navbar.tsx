"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className={`fixed w-full top-0 z-50 border-b transition-all duration-300 ${isMenuOpen ? 'bg-[#F4F6FB] border-transparent' : 'bg-[#F4F6FB]/80 backdrop-blur-md border-slate-200'}`}>
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-3xl font-light tracking-tighter text-slate-800 relative z-50">
                        <Link href="/">
                            <img
                                src="/3dots-logo.png"
                                alt="3dots Logo"
                                className="w-28 md:w-32 h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex space-x-12 text-sm font-light text-slate-600">
                        <Link href="/#services" className="hover:text-brand transition-colors">Services</Link>
                        <Link href="/launchpad" className="hover:text-brand transition-colors">Launchpad</Link>
                        <Link href="/about" className="hover:text-brand transition-colors">About</Link>
                        <Link href="/#ecosystem" className="hover:text-brand transition-colors">Ecosystem</Link>
                        <Link href="/careers" className="hover:text-brand transition-colors">Careers</Link>
                    </div>
                    <div className="hidden md:block">
                        <Link href="/contact" className="inline-block bg-brand text-white px-7 py-2.5 rounded-[1.2rem] text-sm font-light hover:bg-brand-dark transition-all shadow-md">
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

            <div className={`md:hidden fixed inset-0 bg-[#F4F6FB] z-40 transition-all duration-500 ease-in-out flex flex-col justify-center items-center gap-8 ${isMenuOpen ? 'opacity-100 pointer-events-auto transform translate-y-0' : 'opacity-0 pointer-events-none transform -translate-y-4'}`}>
                <div className="flex flex-col items-center gap-8 text-2xl font-light text-slate-800">
                    <Link href="/#services" onClick={() => setIsMenuOpen(false)} className="hover:text-brand transition-colors">Services</Link>
                    <Link href="/launchpad" onClick={() => setIsMenuOpen(false)} className="hover:text-brand transition-colors">Launchpad</Link>
                    <Link href="/about" onClick={() => setIsMenuOpen(false)} className="hover:text-brand transition-colors">About</Link>
                    <Link href="/#ecosystem" onClick={() => setIsMenuOpen(false)} className="hover:text-brand transition-colors">Ecosystem</Link>
                    <Link href="/careers" onClick={() => setIsMenuOpen(false)} className="hover:text-brand transition-colors">Careers</Link>
                </div>
                <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="mt-8 bg-brand text-white px-10 py-4 rounded-full text-lg font-medium shadow-xl">
                    Talk to Us
                </Link>
            </div>
        </>
    );
}
