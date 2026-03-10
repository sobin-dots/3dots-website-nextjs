"use client";

import { motion } from "framer-motion";

export default function BrandsSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-32 pt-16 border-t border-slate-200 relative"
        >
            <h4 className="text-center text-slate-400 font-semibold tracking-[0.2em] uppercase text-xs mb-16">Brands That Trust Us</h4>
            <div className="w-full relative overflow-hidden flex whitespace-nowrap [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
                    className="flex w-max gap-x-16 md:gap-x-28 items-center"
                >
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-x-16 md:gap-x-28 items-center *:text-slate-400 *:text-3xl *:md:text-[2rem] *:opacity-50 *:transition-all *:duration-300 hover:*:opacity-100 hover:*:text-slate-800">
                            <div className="font-serif font-bold tracking-tight">ACME Corp</div>
                            <div className="italic font-black text-[1.85rem]">Globex</div>
                            <div className="font-serif font-semibold text-[1.95rem]">Soylent</div>
                            <div className="font-light tracking-[0.15em] uppercase text-2xl">INITECH</div>
                            <div className="font-serif font-bold text-[1.9rem]">Umbrella</div>
                            <div className="font-serif font-bold tracking-tight text-[1.95rem]">Stark Tech</div>
                            <div className="italic font-bold font-serif opacity-40">Cyberdyne</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
