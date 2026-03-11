"use client";

import { Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function LaunchpadWhatIs() {
    return (
        <section className="py-24 px-6 relative overflow-hidden">
            <motion.div 
                initial={{ rotate: -2, scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="absolute inset-0 bg-slate-800 skew-y-[-2deg] origin-left"
            ></motion.div>
            <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center text-white">
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2"
                >
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                        What is <span className="font-medium text-brand">Launchpad?</span>
                    </h2>
                    <p className="text-slate-300 text-lg font-light leading-relaxed mb-8">
                        Launchpad is 3Dots’ signature startup program where we help founders transform their ideas into a functional MVP in just 15 days. Our team works with you to define the core features, design the product, develop the MVP, and prepare you to launch.
                        <br /><br />
                        Instead of spending months building, you <span className="text-white font-medium">launch in weeks.</span>
                    </p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full md:w-1/2 relative"
                >
                    <div className="bg-white/10 border border-white/20 p-10 rounded-[3rem] backdrop-blur-md shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand rounded-full mix-blend-screen opacity-50 blur-3xl"></div>
                        <Rocket className="w-16 h-16 text-brand mb-6" />
                        <h3 className="text-2xl font-medium mb-4">15 Days to Launch</h3>
                        <p className="text-white/80 font-light">A highly structured, fast-paced sprint to get your product out of your head and into the hands of real users.</p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
