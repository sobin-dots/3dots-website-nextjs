import { Globe2 } from "lucide-react";

export default function EcosystemSectionVar1() {
    return (
        <section className="py-32 px-6 max-w-[1200px] mx-auto relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-100 rounded-full shrink-0 -z-10 group">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-100 rounded-full shrink-0 transition-transform duration-1000 group-hover:scale-105"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-slate-100/50 rounded-full shrink-0 transition-transform duration-1000 group-hover:scale-110 bg-slate-50/30"></div>
                
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full text-slate-100 hidden md:block" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="400" y1="400" x2="200" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="400" y1="400" x2="600" y2="200" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="400" y1="400" x2="400" y2="700" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
            </div>

            <div className="text-center mb-24 max-w-2xl mx-auto relative z-10 bg-white/80 backdrop-blur-sm p-8 rounded-[3rem] border border-slate-100">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mb-6">
                    <Globe2 className="w-8 h-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-4">The Talent <span className="font-medium text-brand">Node</span></h2>
                <p className="text-slate-500 font-light text-lg">Over 3,000+ developers, founders, and creators. Constantly connecting, building, and pushing boundaries across our specialized hubs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-16 relative z-10">
                {[
                    { title: "JS Mavens", logo: "/js-mavens-logo.png", desc: "Top tier JS developers" },
                    { title: "RexHive", logo: "/rexhive-logo.png", desc: "AI & Tech researchers" },
                    { title: "3Dots", logo: "/3dots-logo.png", desc: "Founders & strategists" }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center bg-white/60 backdrop-blur-md p-8 rounded-3xl border border-white/40 shadow-xl shadow-slate-200/20 hover:-translate-y-2 transition-transform duration-500 group">
                        <div className="h-16 flex items-center justify-center mb-6">
                            <img src={item.logo} alt={item.title} className="h-full w-auto object-contain" />
                        </div>
                        <p className="text-slate-500 font-light text-sm">{item.desc}</p>
                        
                        <div className="flex -space-x-3 mt-8 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                            {[1, 2, 3].map((_, idx) => (
                                <img key={idx} src={`https://i.pravatar.cc/100?img=${i * 10 + idx + 10}`} alt="avatar" className="w-8 h-8 rounded-full border-2 border-white grayscale group-hover:grayscale-0 transition-all duration-300 shadow-sm" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
