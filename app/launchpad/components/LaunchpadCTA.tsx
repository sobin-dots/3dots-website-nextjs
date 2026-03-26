"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import LaunchpadApplicationModal from "./LaunchpadApplicationModal";

export default function LaunchpadCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-24 px-6 bg-brand  relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=2000&q=80')] opacity-10 mix-blend-multiply object-cover"></div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-4xl mx-auto text-white text-center"
            >
                <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-light tracking-tight mb-8">Ready to Build Your Startup?</h2>
                <p className="text-white/90 text-xl font-light mb-12 max-w-4xl mx-auto">
                    If you have an idea worth building, Launchpad can turn it into a real product in just 15 days.
                </p>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsModalOpen(true)}
                    className="bg-white text-brand px-12 py-5 rounded-full text-lg font-medium hover:bg-slate-50 transition-all shadow-2xl inline-flex items-center gap-2"
                >
                    Apply Now <ArrowRight className="w-5 h-5" />
                </motion.button>
            </motion.div>

            <LaunchpadApplicationModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </section>
    );
}
