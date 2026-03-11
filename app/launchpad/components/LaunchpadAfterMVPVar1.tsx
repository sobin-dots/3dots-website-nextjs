import { PenTool, TrendingUp, Layers, Users } from "lucide-react";

export default function LaunchpadAfterMVPVar1() {
    return (
        <section className="py-32 px-6 max-w-[1200px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
                <div className="lg:w-1/3">
                    <div className="sticky top-32">
                        <span className="text-brand font-medium tracking-widest uppercase text-sm mb-4 block">Next Steps</span>
                        <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight leading-tight mb-6">
                            What Happens After Your MVP?
                        </h2>
                        <p className="text-slate-500 font-light leading-relaxed">
                            A launch is just the beginning. We provide continuous support to help you iterate, scale, and grow your product based on real market feedback.
                        </p>
                    </div>
                </div>

                <div className="lg:w-2/3 flex flex-col pt-4">
                    {[
                        { icon: <PenTool className="w-5 h-5" />, title: "Product Improvements", desc: "After launch, we help refine your MVP by improving features, fixing usability issues, and incorporating real user feedback to make the product stronger and more valuable." },
                        { icon: <TrendingUp className="w-5 h-5" />, title: "Scaling the Platform", desc: "As your product gains users, we help scale the platform with better architecture, performance improvements, and infrastructure that supports growth." },
                        { icon: <Layers className="w-5 h-5" />, title: "Building the Full Product", desc: "Once your MVP is validated, our team can help transform it into a complete product by adding advanced features, integrations, and a more robust system." },
                        { icon: <Users className="w-5 h-5" />, title: "Connecting With Investors", desc: "Through our ecosystem and communities, we help founders connect with other builders, mentors, and potential investors who can support the next stage of their startup journey." }
                    ].map((item, i) => (
                        <div key={i} className="group flex flex-col sm:flex-row gap-6 sm:gap-10 py-10 border-b border-slate-200 last:border-0 hover:-translate-y-1 transition-transform duration-500">
                            <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-400 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors duration-500">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="text-2xl font-light mb-3 text-slate-800 group-hover:text-brand transition-colors duration-500">{item.title}</h4>
                                <p className="text-slate-500 font-light leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
