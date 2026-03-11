import { ArrowRight, Network, Globe2, Share2, Users } from "lucide-react";
import Link from "next/link";

export default function EcosystemVar1() {
    return (
        <section className="py-32 px-6 max-w-[1400px] mx-auto relative overflow-hidden bg-white mt-10 rounded-[3rem] border border-slate-100 shadow-xl">
            {/* Background elements to reflect network */}
            <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0055FF 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 px-4 md:px-10">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-full text-sm font-medium mb-8">
                        <Network className="w-4 h-4 text-brand" /> Global Network
                    </div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-slate-800 tracking-normal leading-[1.3] md:leading-[1.3] mb-8">
                        Beyond Software — <br />
                        <span className="font-medium text-secondary">Building an Ecosystem</span>
                    </h2>
                    <p className="text-slate-600 font-light text-lg mb-6 leading-relaxed max-w-lg">
                        3Dots is not just a software company. We are building a community-driven ecosystem that supports builders at every stage.
                    </p>
                    <p className="text-slate-600 font-light text-lg mb-10 leading-relaxed max-w-lg">
                        Through initiatives like JS Mavens, RexHive, Dots, and RexCoders, we bring together developers, founders, and learners to share knowledge, collaborate, and grow.
                    </p>

                    <Link href="/about#ecosystem" className="bg-brand text-white hover:bg-brand/90 px-8 py-4 rounded-full text-[15px] font-medium transition-all shadow-lg flex items-center justify-center gap-2 w-max">
                        Explore Communities <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="relative h-[500px] flex items-center justify-center">
                    {/* Visual Network Nodes */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[300px] h-[300px] rounded-full border border-slate-200 animate-[spin_60s_linear_infinite] opacity-50 absolute"></div>
                        <div className="w-[450px] h-[450px] rounded-full border border-slate-100 animate-[spin_80s_linear_reverse_infinite] opacity-50 absolute"></div>
                        <div className="w-[200px] h-[200px] rounded-full border border-brand/20 animate-[spin_40s_linear_infinite] absolute"></div>
                    </div>

                    {/* Center Node */}
                    <div className="w-24 h-24 bg-brand text-white rounded-full flex items-center justify-center shadow-2xl relative z-20">
                        <span className="font-bold text-xl tracking-tighter">3Dots</span>
                    </div>

                    {/* Orbiting Nodes */}
                    <div className="absolute top-[0%] md:top-[5%] right-[0%] md:right-[5%] bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center gap-3 animate-pulse hover:scale-110 transition-transform z-30 cursor-pointer min-w-[140px] md:min-w-[160px]">
                        <div className="flex flex-col items-center">
                            <img src="/js-mavens-logo.png" alt="JS Mavens" className="h-6 md:h-8 w-auto object-contain mb-1" />
                            <p className="text-[10px] md:text-xs text-slate-400 text-center font-medium">500+ Members</p>
                        </div>
                    </div>

                    <div className="absolute bottom-[20%] md:bottom-[25%] left-[0%] md:left-[5%] bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center gap-3 animate-pulse delay-75 hover:scale-110 transition-transform z-30 cursor-pointer min-w-[120px] md:min-w-[140px]">
                        <div className="flex flex-col items-center">
                            <img src="/rexhive-logo.png" alt="RexHive" className="h-6 md:h-8 w-auto object-contain mb-1" />
                            <p className="text-[10px] md:text-xs text-slate-400 text-center font-medium">AI First</p>
                        </div>
                    </div>

                    <div className="absolute bottom-[5%] md:bottom-[10%] right-[5%] md:right-[10%] bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center gap-3 animate-pulse delay-150 hover:scale-110 transition-transform z-30 cursor-pointer min-w-[100px] md:min-w-[120px]">
                        <div className="flex flex-col items-center">
                            <h5 className="font-semibold text-lg md:text-xl text-slate-800 mb-0.5">Dots</h5>
                            <p className="text-[10px] md:text-xs text-slate-400 text-center font-medium">Startup</p>
                        </div>
                    </div>

                    <div className="absolute top-[35%] md:top-[30%] left-[-5%] md:left-[0%] bg-white p-4 md:p-5 rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center gap-3 animate-pulse delay-300 hover:scale-110 transition-transform z-30 cursor-pointer min-w-[140px] md:min-w-[160px]">
                        <div className="flex flex-col items-center">
                            <img src="/rexcoders-logo.png" alt="RexCoders" className="h-6 md:h-8 w-auto object-contain mb-1" />
                            <p className="text-[10px] md:text-xs text-slate-400 text-center font-medium">Academy</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
