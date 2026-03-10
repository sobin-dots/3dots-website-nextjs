import { Briefcase } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="pt-40 pb-20 px-6 max-w-[1200px] mx-auto text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium mb-8">
                <Briefcase className="w-4 h-4" /> Join The Crew
            </div>
            <h1 className="text-5xl md:text-[5rem] leading-[1.1] font-light text-slate-800 tracking-tight mb-8">
                Join Our <span className="font-medium text-brand">Team</span>
            </h1>
            <p className="text-slate-600 text-xl font-light leading-relaxed mb-10 max-w-2xl mx-auto">
                We are building a place where ownership, speed, and fun go together. If that sounds like you, we would love to have you in our team.
            </p>
        </section>
    );
}
