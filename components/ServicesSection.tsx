import { ArrowRight, Code2, Workflow } from "lucide-react";

export default function ServicesSection() {
    return (
        <section id="services" className="py-24 px-6 max-w-[1400px] mx-auto relative">
            <div className="text-brand text-3xl font-light opacity-50 absolute top-24 right-10 md:right-32 font-mono">02</div>
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 -z-10 rounded-full hidden md:block" style={{ transform: 'rotate(5deg)' }}></div>

            <div className="flex flex-col lg:flex-row gap-12 items-center mb-32">
                <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
                    <div className="rounded-[3rem] overflow-hidden h-[450px] shadow-xl relative group">
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80"
                            alt="Software Development"
                            className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand/80 to-transparent mix-blend-multiply opacity-80"></div>
                    </div>
                    <div className="absolute -bottom-10 -right-4 md:-right-10 bg-white p-8 rounded-[2rem] shadow-2xl max-w-xs z-20 border border-slate-100">
                        <Code2 className="w-10 h-10 text-brand mb-4" strokeWidth={1.5} />
                        <h4 className="text-xl font-medium mb-2">Enterprise Scale</h4>
                        <p className="text-sm text-slate-500 font-light">Custom platforms built for reliability and massive growth.</p>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:pl-10">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-6">
                        Build Powerful <span className="text-brand block mt-2 font-medium">Software Products</span>
                    </h2>
                    <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed">
                        From concept to scale, we design and develop high-quality software products, ERPs, CRMs, and custom platforms that help businesses streamline operations, improve efficiency, and grow faster with reliable technology.
                    </p>
                    <button className="text-slate-800 border border-slate-300 hover:border-brand hover:text-brand px-8 py-3 rounded-full text-[15px] transition-all flex items-center gap-2 bg-white">
                        Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="w-full lg:w-1/2 lg:pr-10">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-6">
                        Automate Work. <span className="text-brand block mt-2 font-medium">Accelerate Growth.</span>
                    </h2>
                    <p className="text-slate-600 font-light text-lg mb-8 leading-relaxed">
                        We implement AI-powered automation to streamline repetitive processes, improve productivity, and connect your tools into intelligent workflows that save time, reduce costs, and unlock operational efficiency.
                    </p>
                    <button className="text-slate-800 border border-slate-300 hover:border-brand hover:text-brand px-8 py-3 rounded-full text-[15px] transition-all flex items-center gap-2 bg-white">
                        Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="w-full lg:w-1/2 relative">
                    <div className="bg-brand rounded-[3rem] p-10 md:p-14 h-[450px] shadow-xl relative z-10 flex flex-col justify-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <Workflow className="w-16 h-16 text-white mb-8" strokeWidth={1} />
                        <h3 className="text-3xl text-white font-light tracking-tight mb-4">Intelligent Workflows</h3>
                        <p className="text-white/80 font-light text-lg leading-relaxed max-w-sm">
                            Connecting your tools into seamless, automated pipelines that work independently.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
