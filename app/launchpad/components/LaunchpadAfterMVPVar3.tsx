import { ArrowUpRight } from "lucide-react";

export default function LaunchpadAfterMVPVar3() {
    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto">
            <div className="mb-16">
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight">After the MVP</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-slate-200 border border-slate-200">
                {[
                    { num: "01", title: "Product Improvements", desc: "After launch, we help refine your MVP by improving features, fixing usability issues, and incorporating real user feedback to make the product stronger and more valuable." },
                    { num: "02", title: "Scaling the Platform", desc: "As your product gains users, we help scale the platform with better architecture, performance improvements, and infrastructure that supports growth." },
                    { num: "03", title: "Building the Full Product", desc: "Once your MVP is validated, our team can help transform it into a complete product by adding advanced features, integrations, and a more robust system." },
                    { num: "04", title: "Connecting With Investors", desc: "Through our ecosystem and communities, we help founders connect with other builders, mentors, and potential investors who can support the next stage of their startup journey." }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-12 lg:p-16 hover:bg-[#F4F6FB] transition-colors duration-500 group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-20 relative z-10">
                            <span className="text-sm font-mono text-slate-400">{item.num}</span>
                            <ArrowUpRight className="w-6 h-6 text-slate-300 group-hover:text-brand transition-colors duration-500" />
                        </div>
                        <div className="relative z-10">
                            <h4 className="text-2xl font-light text-slate-800 mb-4">{item.title}</h4>
                            <p className="text-slate-500 font-light text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
