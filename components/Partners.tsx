"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Partners() {
    return (
        <div>
             {/* White Partners Strip */}
            <div className="bg-white py-24 border-t border-slate-100">
                <div className="max-w-[1400px] mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h4 className="text-slate-400 font-bold tracking-[0.25em] uppercase text-[10px] mb-16 text-center">Our Strategic Partners</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
                            <div className="flex flex-col items-center gap-4 group">
                                <Image src="/rexcoders-logo.png" alt="RexCoders" width={160} height={40} className="h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mt-2">Educational Partner</span>
                            </div>
                            <div className="flex flex-col items-center gap-4 group">
                                <Image src="/picstol-logo.png" alt="Picstol" width={160} height={40} className="h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mt-2">Media Partner</span>
                            </div>
                            <div className="flex flex-col items-center gap-4 group">
                                <Image src="/wizi-digital-logo.png" alt="wizi Digital" width={160} height={40} className="h-8 md:h-9 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
                                <span className="text-[10px] uppercase tracking-[0.15em] font-bold text-slate-400 mt-2">Marketing Partner</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}