"use client";

import { motion } from "framer-motion";

export default function LaunchpadWhatYouGet() {
    return (
        <section className="py-24 px-6 bg-white border-t border-slate-200">
            <div className="max-w-[1400px] mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-6">What You Get With Launchpad</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { num: "01", title: "Product Strategy Session", desc: "We work with you to understand your idea, business goals, and target users to define the right product strategy before development begins." },
                        { num: "02", title: "Feature Planning & MVP Roadmap", desc: "Together we identify the most important features for your MVP and create a clear roadmap to build and launch quickly." },
                        { num: "03", title: "UI/UX Design for Your Product", desc: "Our design team creates intuitive and user-friendly interfaces that ensure your product is simple, modern, and ready for real users." },
                        { num: "04", title: "MVP Development", desc: "Our engineers build your product using reliable technologies, turning your idea into a functional and scalable MVP." },
                        { num: "05", title: "Launch-Ready in 15 Days", desc: "Within 15 days, you receive a working MVP that you can demonstrate to users, partners, or potential investors." },
                        { num: "06", title: "Guidance on Next Steps", desc: "After your MVP is ready, we guide you on launching the product, collecting feedback, and planning the next stage of development." }
                    ].map((item, i) => (
                        <motion.div 
                            key={i} 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#F4F6FB] p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group"
                        >
                            <div className="text-6xl font-black text-slate-200/50 absolute top-4 right-4 group-hover:text-brand/10 transition-colors">{item.num}</div>
                            <div className="relative z-10">
                                <h3 className="text-xl font-semibold mb-4 text-slate-800">{item.title}</h3>
                                <p className="text-slate-600 font-light">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
