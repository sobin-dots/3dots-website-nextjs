import { Code2, Compass } from "lucide-react";

export default function StorySection() {
    return (
        <section className="py-24 px-6 relative">
            <div className="absolute inset-0 bg-white border-y border-slate-100 skew-y-[2deg] origin-right z-0"></div>

            <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative">
                    <div className="w-full h-[500px] rounded-[3rem] overflow-hidden group shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                            alt="Team discussing ideas"
                            className="w-full h-full object-cover grayscale opacity-90 group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-brand/10 mix-blend-multiply"></div>
                    </div>

                    <div className="absolute -bottom-8 -right-8 w-64 bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hidden md:block">
                        <Compass className="w-10 h-10 text-brand mb-4" />
                        <p className="text-slate-800 font-medium">Helping people turn ideas into real technology.</p>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-medium text-sm mb-6">
                        <Code2 className="w-4 h-4 text-brand" /> Our Origin
                    </div>
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8 text-slate-800">
                        How 3Dots <span className="font-medium text-brand">Started?</span>
                    </h2>

                    <div className="space-y-6 text-slate-600 font-light text-lg leading-relaxed">
                        <p>
                            3Dots was founded with a simple vision. To help people turn ideas into real technology.
                        </p>
                        <p>
                            We saw many great ideas struggle because founders lacked the right technical team or product expertise. Our goal became clear: build a company that helps startups and businesses transform ideas into scalable software products.
                        </p>
                        <p>
                            Today, 3Dots works with founders, startups, and organizations to design, build, and launch powerful digital products while contributing to a growing startup ecosystem.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
