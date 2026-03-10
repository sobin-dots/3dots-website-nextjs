import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="pt-40 pb-20 px-6 max-w-[1200px] mx-auto text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>

            <h1 className="text-5xl md:text-[5rem] leading-[1.1] font-light text-slate-800 tracking-tight mb-8">
                We Build Products. <br />
                <span className="font-medium text-brand">We Launch Startups.</span>
            </h1>
            <p className="text-slate-600 text-xl font-light leading-relaxed mb-10 max-w-3xl mx-auto">
                3Dots is a technology company focused on building powerful software products, helping founders launch startups, and creating a thriving ecosystem for builders, developers, and innovators.
                <br /><br />
                We combine product thinking, engineering expertise, and startup experience to help businesses and founders build technology that matters.
            </p>
        </section>
    );
}
