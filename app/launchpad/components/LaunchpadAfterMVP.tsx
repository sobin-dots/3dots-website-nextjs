import { PenTool, TrendingUp, Layers, Users } from "lucide-react";

export default function LaunchpadAfterMVP() {
    return (
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-6">What Happens After Your MVP?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <PenTool className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                        <h4 className="text-xl font-medium mb-3">Product Improvements</h4>
                        <p className="text-slate-600 font-light leading-relaxed">After launch, we help refine your MVP by improving features, fixing usability issues, and incorporating real user feedback to make the product stronger and more valuable.</p>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                        <h4 className="text-xl font-medium mb-3">Scaling the Platform</h4>
                        <p className="text-slate-600 font-light leading-relaxed">As your product gains users, we help scale the platform with better architecture, performance improvements, and infrastructure that supports growth.</p>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <Layers className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                        <h4 className="text-xl font-medium mb-3">Building the Full Product</h4>
                        <p className="text-slate-600 font-light leading-relaxed">Once your MVP is validated, our team can help transform it into a complete product by adding advanced features, integrations, and a more robust system.</p>
                    </div>
                </div>

                <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-6 hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                        <Users className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                        <h4 className="text-xl font-medium mb-3">Connecting With Investors</h4>
                        <p className="text-slate-600 font-light leading-relaxed">Through our ecosystem and communities, we help founders connect with other builders, mentors, and potential investors who can support the next stage of their startup journey.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
