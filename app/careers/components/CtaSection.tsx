import { ArrowRight } from "lucide-react";

export default function CtaSection() {
    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto">
            <div className="bg-brand rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=2000&q=80')] opacity-5 mix-blend-multiply object-cover"></div>

                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-6">
                        Want to Build With Us?
                    </h2>
                    <p className="text-white/90 font-light text-xl leading-relaxed mb-10">
                        We are always excited to meet talented people who are passionate about technology.
                    </p>
                    <button className="bg-white text-brand px-10 py-5 rounded-full text-lg font-medium hover:bg-slate-50 transition-all shadow-xl flex items-center justify-center gap-3 mx-auto">
                        Schedule a Meet <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
