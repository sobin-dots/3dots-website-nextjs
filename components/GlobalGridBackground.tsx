"use client";

import { motion } from "framer-motion";

export default function GlobalGridBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Subtle SVG Grid Background */}
            <div className="absolute inset-0 opacity-[0.35]">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="global-grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#CBD5E1" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#global-grid-pattern)" />
                </svg>
            </div>

            {/* Grid Running Glows perfectly mapped to the 60px grid intervals */}
            <div className="absolute inset-0 opacity-60">

                {/* Horizontal Laser 1 (Moving Right) */}
                <motion.div
                    animate={{ x: ["-100vw", "100vw"] }}
                    transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                    className="absolute top-[180px] left-0 h-[1px] w-12 bg-gradient-to-r from-transparent to-[#0055FF] shadow-[0_0_6px_1px_#0055FF] opacity-70"
                />

                {/* Horizontal Laser 2 (Moving Left) */}
                <motion.div
                    animate={{ x: ["100vw", "-100vw"] }}
                    transition={{ repeat: Infinity, duration: 35, ease: "linear", repeatDelay: 2 }}
                    className="absolute top-[360px] left-0 h-[1px] w-16 bg-gradient-to-r from-[#0055FF] to-transparent shadow-[0_0_6px_1px_#0055FF] opacity-60"
                />

                {/* Horizontal Laser 3 (Moving Right) */}
                <motion.div
                    animate={{ x: ["-100vw", "100vw"] }}
                    transition={{ repeat: Infinity, duration: 28, ease: "linear", repeatDelay: 5 }}
                    className="absolute top-[720px] left-0 h-[1px] w-10 bg-gradient-to-r from-transparent to-[#0055FF] shadow-[0_0_6px_1px_#0055FF] opacity-80"
                />

                {/* Vertical Laser 1 (Moving Down) */}
                <motion.div
                    animate={{ y: ["-100vh", "100vh"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear", repeatDelay: 1 }}
                    className="absolute left-[240px] top-0 w-[1px] h-12 bg-gradient-to-b from-transparent to-[#0055FF] shadow-[0_0_6px_1px_#0055FF] opacity-70"
                />

                {/* Vertical Laser 2 (Moving Up) */}
                <motion.div
                    animate={{ y: ["100vh", "-100vh"] }}
                    transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                    className="absolute left-[600px] top-0 w-[1px] h-16 bg-gradient-to-b from-[#0055FF] to-transparent shadow-[0_0_6px_1px_#0055FF] opacity-60"
                />

                {/* Vertical Laser 3 (Moving Down) */}
                <motion.div
                    animate={{ y: ["-100vh", "100vh"] }}
                    transition={{ repeat: Infinity, duration: 24, ease: "linear", repeatDelay: 3 }}
                    className="hidden md:block absolute left-[960px] top-0 w-[1px] h-10 bg-gradient-to-b from-transparent to-[#0055FF] shadow-[0_0_6px_1px_#0055FF] opacity-80"
                />

                {/* Vertical Laser 4 (Moving Up) */}
                <motion.div
                    animate={{ y: ["100vh", "-100vh"] }}
                    transition={{ repeat: Infinity, duration: 32, ease: "linear", repeatDelay: 2 }}
                    className="hidden lg:block absolute left-[1380px] top-0 w-[1px] h-20 bg-gradient-to-b from-[#0055FF] to-transparent shadow-[0_0_6px_1px_#0055FF] opacity-50"
                />

            </div>
        </div>
    );
}
