"use client";

import { Zap, Code, Target, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function LaunchpadWhyChooseUs() {
    return (
        <section className="py-24 px-6 bg-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand rounded-full mix-blend-screen opacity-20 blur-[100px]"></div>
            <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
                        Why Should You <br /><span className="font-medium text-brand mt-2 block">Choose Us?</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {[
                            { icon: <Zap className="w-8 h-8 text-brand mb-4" />, title: "Speed", desc: "Launch in 15 days instead of 6 months." },
                            { icon: <Code className="w-8 h-8 text-brand mb-4" />, title: "Expert Product Team", desc: "Work with experienced designers and engineers." },
                            { icon: <Target className="w-8 h-8 text-brand mb-4" />, title: "Founder-Focused", desc: "We focus on what matters: building a product that can launch." },
                            { icon: <Users className="w-8 h-8 text-brand mb-4" />, title: "Startup Ecosystem", desc: "Become part of our founder and technology community." }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                {item.icon}
                                <h4 className="text-xl font-medium mb-2">{item.title}</h4>
                                <p className="text-slate-400 font-light">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="rounded-[3rem] p-10 backdrop-blur-sm h-full flex items-center justify-center"
                >
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team" className="w-full h-full object-cover rounded-[2rem] grayscale opacity-80" />
                </motion.div>
            </div>
        </section>
    );
}
