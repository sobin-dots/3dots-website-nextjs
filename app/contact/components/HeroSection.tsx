import { MessageSquare } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="pt-40 pb-16 px-6 max-w-[1200px] mx-auto text-center relative border-b border-slate-100 mb-16">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium mb-8">
                <MessageSquare className="w-4 h-4" /> Get in touch
            </div>
            <h1 className="text-5xl md:text-[5rem] leading-[1.1] font-light text-slate-800 tracking-tight mb-8">
                Let's build <span className="font-semibold text-brand">together</span>
            </h1>
            <p className="text-slate-500 text-xl font-light leading-relaxed mb-6 max-w-2xl mx-auto">
                Have an idea, a product vision, or a technical challenge? Drop us a message and our team will get back to you within 24 hours.
            </p>
        </section>
    );
}
