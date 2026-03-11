import { Network } from "lucide-react";

export default function EcosystemSectionVar4() {
    return (
        <section className="py-32 px-6 overflow-hidden bg-white max-w-[1200px] mx-auto border-t border-slate-100">
            <div className="text-center mb-24 relative z-10">
                <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-slate-50 border border-slate-100 mb-6 text-slate-400">
                    <Network className="w-5 h-5" />
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-4">
                    A Unified <span className="font-medium text-brand">Talent Network</span>
                </h2>
                <p className="text-slate-500 font-light text-lg max-w-2xl mx-auto">
                    3,000+ founders, engineers, and creators operating across our specialized communities, all connected by a central hub.
                </p>
            </div>

            <div className="relative">
                {/* Horizontal Connection Thread */}
                <div className="absolute top-1/2 left-0 w-full h-px bg-slate-200 hidden md:block -translate-y-1/2"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {[
                        { title: "JS Mavens", logo: "/js-mavens-logo.png", count: "300+", users: [1,2,3] },
                        { title: "RexHive", logo: "/rexhive-logo.png", count: "Premium", users: [4,5,6] },
                        { title: "3Dots", logo: "/3dots-logo.png", count: "Founders", users: [7,8,9] }
                    ].map((item, i) => (
                        <div key={i} className={`flex flex-col items-center text-center group ${i % 2 === 0 ? 'md:-mt-12' : 'md:mt-12'}`}>
                            <div className="w-full bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 transition-all duration-500 relative bg-white/80 backdrop-blur-sm">
                                {/* Connecting dot to the main thread */}
                                <div className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-200 group-hover:bg-brand transition-colors duration-500 ${i % 2 === 0 ? '-bottom-[3.2rem]' : '-top-[3.2rem]'} hidden md:block`}></div>
                                {/* Vertical thread line connecting card to main thread */}
                                <div className={`absolute left-1/2 -translate-x-1/2 w-px h-12 bg-slate-200 hidden md:block ${i % 2 === 0 ? '-bottom-12' : '-top-12'}`}></div>
                                
                                <div className="h-12 flex items-center justify-center mb-4">
                                    <img src={item.logo} alt={item.title} className="h-full w-auto object-contain" />
                                </div>
                                <div className="text-xs tracking-widest uppercase font-medium text-slate-400 mb-6">{item.count}</div>
                                
                                <div className="flex justify-center -space-x-2">
                                    {item.users.map(img => (
                                        <img key={img} src={`https://i.pravatar.cc/100?img=${img + 15}`} className="w-8 h-8 rounded-full border-2 border-white grayscale group-hover:grayscale-0 transition-all duration-300" alt="avatar" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
