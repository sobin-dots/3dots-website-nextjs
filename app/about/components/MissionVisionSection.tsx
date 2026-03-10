import { Target, Eye } from "lucide-react";

export default function MissionVisionSection() {
    return (
        <section className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Mission Card */}
                <div className="bg-[#F4F6FB] p-12 rounded-[3rem] hover:-translate-y-2 transition-transform duration-500 border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 text-brand relative z-10">
                        <Target className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-medium mb-6 text-slate-800 relative z-10">Our Mission</h3>
                    <p className="text-slate-600 font-light text-lg leading-relaxed relative z-10">
                        Our mission is to accelerate innovation by helping founders and businesses transform ideas into impactful software products while nurturing a community of builders and entrepreneurs.
                    </p>
                </div>

                {/* Vision Card */}
                <div className="bg-slate-800 text-white p-12 rounded-[3rem] hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>

                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 text-brand backdrop-blur-sm relative z-10">
                        <Eye className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-medium mb-6 relative z-10">Our Vision</h3>
                    <p className="text-slate-300 font-light text-lg leading-relaxed relative z-10">
                        We aim to build a world-class technology team that creates impactful software products while supporting founders and innovators in building the next generation of startups.
                    </p>
                </div>

            </div>
        </section>
    );
}
