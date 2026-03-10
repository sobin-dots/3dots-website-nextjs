import { ArrowRight, Rocket } from "lucide-react";
import Link from "next/link";

export default function LaunchpadSection() {
    return (
        <section id="launchpad" className="py-24 px-6 max-w-[1400px] mx-auto">
            <div className="text-brand text-3xl font-light opacity-50 absolute right-10 md:right-32 font-mono">03</div>
            <div className="relative rounded-[3rem] overflow-hidden bg-brand shadow-2xl">
                <div className="absolute inset-0 grayscale opacity-20 mix-blend-multiply">
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=2000&q=80" alt="Background pattern" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>

                <div className="relative z-10 px-8 py-20 md:py-28 max-w-4xl mx-auto text-center flex flex-col items-center">
                    <Rocket className="w-16 h-16 text-white mb-6" strokeWidth={1.5} />
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-light text-white tracking-tight mb-8 leading-tight">
                        Do You Have an Idea <br />But Don’t Know <span className="font-semibold block mt-2">Where to Start?</span>
                    </h2>
                    <p className="text-white/90 text-xl font-light mb-12 max-w-2xl leading-relaxed">
                        Launch your startup faster. Build your MVP in 15 days with our proven Launchpad program.
                    </p>
                    <Link href="/launchpad" className="bg-white text-brand px-10 py-4 rounded-full text-lg font-medium hover:bg-slate-50 transition-all shadow-xl flex items-center gap-3">
                        Explore Launchpad <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
