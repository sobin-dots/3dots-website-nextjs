import { ArrowRight } from "lucide-react";
import BrandsSection from "./BrandsSection";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 px-6 max-w-[1400px] mx-auto relative pt-10">
            <div className="text-brand text-3xl font-light opacity-50 absolute top-10 right-10 md:right-32 font-mono">04</div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 tracking-normal leading-[1.2] md:leading-[1.2] mb-10">Who We Are</h2>
                    <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed">
                        3Dots is a technology company building world-class software and helping founders turn ideas into real products. We combine product engineering, startup expertise, and community to support innovators from concept to launch and beyond.
                    </p>
                    <button className="text-brand border border-brand/30 hover:bg-brand hover:text-white px-8 py-3 rounded-full text-[15px] transition-all flex items-center gap-2">
                        Learn More About Us <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="relative min-h-[400px]">
                    <svg className="absolute inset-0 w-full h-full text-slate-200 pointer-events-none" style={{ stroke: 'currentColor', fill: 'none', strokeWidth: 1.5 }}>
                        <path d="M 50 200 Q 200 50 400 300 T 600 100" />
                    </svg>

                    <div className="absolute top-10 left-[10%] w-24 h-24 rounded-full border-4 border-white shadow-xl overflow-hidden z-10 transition-transform hover:scale-110">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover grayscale" alt="Team" />
                    </div>
                    <div className="absolute top-[40%] left-[30%] w-32 h-32 rounded-full border-4 border-brand shadow-xl overflow-hidden z-20 transition-transform hover:scale-110">
                        <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover grayscale" alt="Person" />
                    </div>
                    <div className="absolute bottom-[10%] right-[30%] w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden z-10 transition-transform hover:scale-110">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover grayscale" alt="Person" />
                    </div>
                    <div className="absolute top-[20%] right-[10%] w-20 h-20 rounded-full border-4 border-white shadow-xl overflow-hidden z-10 transition-transform hover:scale-110">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80" className="w-full h-full object-cover grayscale" alt="Person" />
                    </div>
                </div>
            </div>

            <BrandsSection />
        </section>
    );
}
