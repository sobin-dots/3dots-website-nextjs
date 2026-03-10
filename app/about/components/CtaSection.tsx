import { ArrowRight } from "lucide-react";

export default function CtaSection() {
    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto">
            <div className="bg-slate-800 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                {/* Glow behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/30 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-6">
                        Ready to Build?
                    </h2>
                    <p className="text-slate-300 font-light text-xl leading-relaxed mb-10">
                        If you have an idea, a product vision, or a business challenge, we would love to work with you.
                    </p>
                    <button className="bg-brand text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-white hover:text-brand transition-all shadow-xl flex items-center justify-center gap-3 mx-auto">
                        Talk to Us <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
