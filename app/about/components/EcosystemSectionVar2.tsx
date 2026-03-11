import { Users } from "lucide-react";

export default function EcosystemSectionVar2() {
    // Array of mock avatar IDs or paths
    const avatars = Array.from({ length: 16 }).map((_, i) => `https://i.pravatar.cc/100?img=${i + 1}`);

    return (
        <section className="py-24 px-6 overflow-hidden bg-slate-50 border-y border-slate-100">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center">
                
                <h2 className="text-[6rem] md:text-[10rem] font-light text-slate-200 tracking-tighter leading-none select-none mb-[-3rem] md:mb-[-5rem] z-0">
                    3,000+
                </h2>
                
                <div className="bg-white px-10 py-6 rounded-full border border-slate-100 shadow-2xl shadow-slate-200/50 relative z-10 flex items-center gap-4 mb-20">
                    <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-slate-800">Global Builders</h3>
                        <p className="text-sm text-slate-500 font-light">Founders, engineers, creatives</p>
                    </div>
                </div>

                {/* Simulated Marquee / Floating Faces */}
                <div className="w-full relative h-[300px] flex justify-center items-center">
                    {avatars.map((url, i) => {
                        const randomX = Math.sin(i * 45) * 40;
                        const randomY = Math.cos(i * 90) * 40;
                        const size = i % 3 === 0 ? 'w-16 h-16' : (i % 2 === 0 ? 'w-12 h-12' : 'w-20 h-20');
                        
                        return (
                            <div 
                                key={i} 
                                className={`absolute rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-110 transition-transform duration-300 z-10`}
                                style={{
                                    transform: `translate(${randomX * 10}px, ${randomY * 4}px)`,
                                    zIndex: i % 5
                                }}
                            >
                                <img src={url} alt="Community avatar" className={`${size} object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300`} />
                            </div>
                        )
                    })}
                    
                    {/* Connecting Hubs Overlay */}
                    <div className="absolute inset-0 flex justify-between items-center px-4 md:px-20 pointer-events-none opacity-40">
                            <img src="/js-mavens-logo.png" className="w-[100px] md:w-[150px] object-contain rotate-12" alt="JS Mavens" />
                            <img src="/3dots-logo.png" className="w-[70px] md:w-[120px] object-contain -translate-y-[80px]" alt="3Dots" />
                            <img src="/rexhive-logo.png" className="w-[100px] md:w-[150px] object-contain -rotate-12" alt="RexHive" />
                    </div>
                </div>

                <p className="text-slate-500 font-light text-xl mt-10 max-w-xl text-center leading-relaxed">
                    Our ecosystem is not just software. It&apos;s the thousands of people interacting, sharing knowledge, and building the future across our core platforms.
                </p>
            </div>
        </section>
    );
}
