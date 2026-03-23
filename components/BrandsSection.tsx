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
                    transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
                    className="flex w-max items-center"
                >
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-x-16 md:gap-x-24 items-center pr-16 md:pr-24">
                            {[
                                { src: "/painted-logo.png", alt: "Painted" },
                                { src: "/toyota-logo.png", alt: "Toyota" },
                                { src: "/verbal-logo.png", alt: "Verbal" },
                                { src: "/campfire-logo.png", alt: "Campfire" },
                                { src: "/bonafai-logo.png", alt: "Bonafai" },
                                { src: "/picstol-logo.png", alt: "Picstol" },
                                {src: "/gearloop-logo.svg", alt: "Gearloop"}
                            ].map((brand, idx) => (
                                <div key={idx} className="group flex items-center justify-center shrink-0 w-[120px] md:w-[160px] h-12">
                                    <img 
                                        src={brand.src} 
                                        alt={brand.alt} 
                                        className="max-w-full max-h-full object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
}
