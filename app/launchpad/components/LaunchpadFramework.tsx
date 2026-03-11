"use client";

import { motion } from "framer-motion";

export default function LaunchpadFramework() {
    return (
        <section className="py-24 px-6  mx-auto bg-white">
            <div className="max-w-[1400px] mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-24  flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-12"
                >
                    <div>
                        <span className="text-brand font-medium tracking-widest uppercase text-sm mb-4 block">The Process</span>
                        <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight">
                            15-Days Framework
                        </h2>
                    </div>
                    <p className="text-slate-500 font-light md:max-w-md">
                        A structured, fast-paced build process designed to deliver a reliable, launch-ready MVP without the usual chaos.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                    {[
                        { label: "WEEK1", title: "Strategy & Design", desc: "We map out the core features and user flows, finalizing a clean, modern UI/UX design ready for development." },
                        { label: "WEEK2", title: "Core Development", desc: "Our engineers write the code, building out the fully functional frontend and backend architecture." },
                        { label: "DAY 15", title: "Launch Day", desc: "Your MVP goes live. Ready for real users, pitch decks, and immediate validation in the market.", highlight: true }
                    ].map((item, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            viewport={{ once: true }}
                            className="group"
                        >
                            <span className={`text-[2rem] lg:text-[2rem] leading-none font-light ${item.highlight ? 'text-brand/50' : 'text-slate-300'} mb-6 group-hover:text-brand/10 transition-colors duration-500 select-none`}>{item.label}</span>
                            <div className={`mt-5 h-px w-full ${item.highlight ? 'bg-brand/30' : 'bg-slate-200'} mb-8 group-hover:bg-brand transition-colors duration-500 relative`}>
                                {item.highlight && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand"></div>}
                            </div>
                            <h4 className={`text-2xl ${item.highlight ? 'font-medium' : 'font-light'} text-slate-800 mb-3`}>{item.title}</h4>
                            <p className="text-slate-500 font-light text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
