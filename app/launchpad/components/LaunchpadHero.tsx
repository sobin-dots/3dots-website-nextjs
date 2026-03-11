import { ArrowRight, Rocket } from "lucide-react";

export default function LaunchpadHero() {
    return (
        <section className="pt-40 pb-20 px-6 max-w-[1200px] mx-auto text-center relative">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium mb-8">
                <Rocket className="w-4 h-4" /> The 3Dots Signature Program
            </div>
            <h1 className="text-5xl md:text-[4.5rem] leading-[1.1] font-light text-slate-800 tracking-tight mb-8 max-w-4xl mx-auto">
                Turn Your Startup Idea Into a Working MVP in <span className="font-medium text-brand">Just 15 Days</span>
            </h1>
            <p className="text-slate-600 text-xl font-light leading-relaxed mb-10 max-w-3xl mx-auto">
                Launchpad is our rapid product development program designed for founders who want to validate their ideas, build a functional MVP fast, and move closer to investors and real users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-brand text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2">
                    Apply for Launchpad <ArrowRight className="w-4 h-4" />
                </button>
                <button className="bg-white text-slate-800 px-8 py-4 rounded-full text-[15px] font-medium hover:bg-slate-50 transition-all shadow-md border border-slate-200 flex items-center justify-center gap-2">
                    Book a Founder Call
                </button>
            </div>
        </section>
    );
}
