import { Zap, Code, Target, Users } from "lucide-react";

export default function LaunchpadWhyChooseUs() {
    return (
        <section className="py-24 px-6 bg-slate-800 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand rounded-full mix-blend-screen opacity-20 blur-[100px]"></div>
            <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
                        Why Should You <br /><span className="font-medium text-brand mt-2 block">Choose Us?</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div>
                            <Zap className="w-8 h-8 text-brand mb-4" />
                            <h4 className="text-xl font-medium mb-2">Speed</h4>
                            <p className="text-slate-400 font-light">Launch in 15 days instead of 6 months.</p>
                        </div>
                        <div>
                            <Code className="w-8 h-8 text-brand mb-4" />
                            <h4 className="text-xl font-medium mb-2">Expert Product Team</h4>
                            <p className="text-slate-400 font-light">Work with experienced designers and engineers.</p>
                        </div>
                        <div>
                            <Target className="w-8 h-8 text-brand mb-4" />
                            <h4 className="text-xl font-medium mb-2">Founder-Focused</h4>
                            <p className="text-slate-400 font-light">We focus on what matters: building a product that can launch.</p>
                        </div>
                        <div>
                            <Users className="w-8 h-8 text-brand mb-4" />
                            <h4 className="text-xl font-medium mb-2">Startup Ecosystem</h4>
                            <p className="text-slate-400 font-light">Become part of our founder and technology community.</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-[3rem] p-10 backdrop-blur-sm h-full flex items-center justify-center">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team" className="w-full h-full object-cover rounded-[2rem] grayscale opacity-80" />
                </div>
            </div>
        </section>
    );
}
