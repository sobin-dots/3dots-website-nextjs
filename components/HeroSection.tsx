import { ArrowRight } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="pt-36 pb-20 px-6 max-w-[1400px] mx-auto min-h-[90vh] flex flex-col justify-center relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="z-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-800 tracking-normal leading-[1.2] md:leading-[1.2] mb-10">
                        We build technology that powers <span className="font-medium text-secondary">startups, growing businesses, and enterprises.</span>
                    </h1>
                    <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-xl">
                        3Dots is a product engineering company helping startups and businesses build scalable software, launch MVPs fast, automate workflows with AI, and grow through technology, community, and strategic execution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-brand text-white px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2">
                            Talk to Us <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="bg-white text-slate-800 px-8 py-3.5 rounded-full text-[15px] font-medium hover:bg-slate-50 transition-all shadow-md border border-slate-200 flex items-center justify-center gap-2">
                            Have an Idea?
                        </button>
                    </div>
                </div>

                <div className="relative h-[300px] lg:h-[450px] rounded-[3rem] overflow-hidden group">
                    <div className="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors duration-500 z-10 rounded-[3rem]"></div>
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                        alt="Team collaborating"
                        className="w-full h-full object-cover grayscale opacity-90 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-10 -left-10 w-40 h-40 bg-brand rounded-full mix-blend-multiply opacity-80 blur-2xl"></div>
                    <div className="absolute top-10 -right-10 w-60 h-60 bg-blue-300 rounded-full mix-blend-multiply opacity-60 blur-3xl"></div>
                </div>
            </div>
        </section>
    );
}
