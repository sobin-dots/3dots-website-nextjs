import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";

export default function HomeEcosystemSummary() {
    return (
        <section className="py-32 px-6 max-w-[1200px] mx-auto relative border-t border-slate-100">
            <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand/10 text-brand rounded-full text-sm font-medium mb-8">
                        <Users className="w-4 h-4" /> Community First
                    </div>
                    <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-8">
                        Beyond Software — <br />
                        <span className="font-medium text-brand">Building an Ecosystem</span>
                    </h2>
                    <p className="text-slate-600 font-light text-lg mb-6 leading-relaxed">
                        3Dots is not just a software company. We are building a community-driven ecosystem that supports builders at every stage.
                    </p>
                    <p className="text-slate-600 font-light text-lg mb-10 leading-relaxed">
                        Through initiatives like JS Mavens, RexHive, Dots, and RexCoders, we bring together developers, founders, and learners to share knowledge, collaborate, and grow.
                    </p>

                    <Link href="/about#ecosystem" className="bg-white text-slate-800 border border-slate-200 hover:border-brand hover:text-brand px-8 py-3.5 rounded-full text-[15px] font-medium transition-all shadow-sm flex items-center justify-center gap-2 w-max">
                        Explore Communities <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="relative h-[450px]">
                    <div className="absolute inset-x-0 inset-y-10 bg-slate-100 rounded-[3rem] -z-10 transform -rotate-3"></div>
                    <div className="absolute inset-0 bg-brand rounded-[3rem] shadow-2xl overflow-hidden p-10 flex flex-col justify-end">
                        <div className="absolute inset-0 mix-blend-multiply opacity-30 grayscale brightness-50">
                            <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80" alt="Community" className="w-full h-full object-cover" />
                        </div>
                        <div className="relative z-10 text-white">
                            <blockquote className="text-3xl font-light italic leading-tight mb-6">
                                "Our growing ecosystem now connects over 3,000+ builders worldwide."
                            </blockquote>
                            <p className="font-medium text-white/80 uppercase tracking-widest text-sm">— The 3Dots Network</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
