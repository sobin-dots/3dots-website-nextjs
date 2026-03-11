import { PenTool, TrendingUp, Layers, Users } from "lucide-react";

export default function LaunchpadAfterMVPVar2() {
    return (
        <section className="py-32 px-6 max-w-[1400px] mx-auto">
            <div className="text-center mb-24 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-6">What Happens After Your MVP?</h2>
                <p className="text-slate-500 font-light text-lg">We don&apos;t just build and leave. We give you the continuous design, engineering, and strategic support necessary to scale your initial product into a mature company.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                {[
                    { icon: <PenTool className="w-8 h-8" />, title: "Product Iteration", desc: "After launch, we help refine your MVP by improving features, fixing usability issues, and incorporating real user feedback to make the product stronger and more valuable." },
                    { icon: <TrendingUp className="w-8 h-8" />, title: "Scaling Up", desc: "As your product gains users, we help scale the platform with better architecture, performance improvements, and infrastructure that supports growth." },
                    { icon: <Layers className="w-8 h-8" />, title: "Feature Expansion", desc: "Once your MVP is validated, our team can help transform it into a complete product by adding advanced features, integrations, and a more robust system." },
                    { icon: <Users className="w-8 h-8" />, title: "Founder Support", desc: "Through our ecosystem and communities, we help founders connect with other builders, mentors, and potential investors who can support the next stage of their startup journey." }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center text-center group">
                        <div className="mb-8 p-6 rounded-[2rem] bg-white border border-slate-100 text-slate-300 group-hover:text-brand group-hover:border-brand/20 group-hover:shadow-xl group-hover:shadow-brand/5 group-hover:-translate-y-2 transition-all duration-500">
                            {item.icon}
                        </div>
                        <h4 className="text-xl font-medium mb-4 text-slate-800">{item.title}</h4>
                        <p className="text-slate-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
