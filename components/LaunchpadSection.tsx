"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
 
export default function LaunchpadSection() {
    return (
        <section id="launchpad" className="py-8 px-6 bg-brand text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=2000&q=80')] opacity-10 mix-blend-multiply bg-cover bg-center"></div>
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 max-w-4xl mx-auto flex flex-col items-center"
            >
                <p className="text-white/70 text-lg md:text-xl font-light mb-4">
                    Do You Have an Idea But Don’t Know Where to Start?
                </p>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-white tracking-normal leading-[1.3] md:leading-[1.3] mb-12">
                    Launch your startup faster. 
                    Build your <span className="font-semibold">MVP in 15 days.</span>
                </h2>
                <Link href="/launchpad" className="bg-white text-brand px-12 py-5 rounded-full text-lg font-medium hover:bg-slate-50 transition-all shadow-2xl inline-flex items-center gap-2">
                    Explore Launchpad <ArrowRight className="w-5 h-5" />
                </Link>
            </motion.div>
        </section>
    );
}
