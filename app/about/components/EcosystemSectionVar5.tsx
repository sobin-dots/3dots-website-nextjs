export default function EcosystemSectionVar5() {
    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/3 text-center lg:text-left z-20">
                    <h2 className="text-4xl md:text-6xl font-light text-slate-800 tracking-tight leading-tight mb-6">
                        People. <br />
                        <span className="font-medium text-brand">Connected.</span>
                    </h2>
                    <p className="text-slate-500 font-light text-xl leading-relaxed mb-10">
                        Our entire infrastructure is built to cross-pollinate ideas between our specialized communities.
                    </p>
                    
                    <div className="flex items-center gap-4 justify-center lg:justify-start">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4, 5].map(img => (
                                <img key={img} src={`https://i.pravatar.cc/100?img=${img + 40}`} className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover grayscale" alt="avatar" />
                            ))}
                        </div>
                        <div className="text-slate-400 text-sm font-medium">3,000+ <br/> active members</div>
                    </div>
                </div>

                <div className="lg:w-2/3 relative flex justify-center h-[500px]">
                    {/* Overlapping Venn-style soft floating shapes representing the communities blending */}
                    <div className="absolute top-[10%] xl:left-[10%] lg:-left-[10%] w-[250px] h-[250px] rounded-full border border-slate-100 bg-white/50 backdrop-blur-md flex flex-col items-center justify-center hover:scale-105 hover:bg-white transition-all duration-500 z-10 group shadow-2xl shadow-slate-900/5">
                        <img src="/js-mavens-logo.png" className="w-32 h-auto object-contain mb-3" alt="JS Mavens" />
                        <div className="flex -space-x-2 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+45}`} className="w-6 h-6 rounded-full border border-white grayscale group-hover:grayscale-0 transition-all" alt="user"/>)}
                        </div>
                    </div>

                    <div className="absolute top-[20%] right-[5%] xl:right-[15%] w-[280px] h-[280px] rounded-full border border-slate-100 bg-white/50 backdrop-blur-md flex flex-col items-center justify-center hover:scale-105 hover:bg-white transition-all duration-500 z-20 group shadow-2xl shadow-slate-900/5">
                        <img src="/rexhive-logo.png" className="w-32 h-auto object-contain mb-3" alt="RexHive" />
                        <div className="flex -space-x-2 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            {[1,2,3].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+50}`} className="w-6 h-6 rounded-full border border-white grayscale group-hover:grayscale-0 transition-all" alt="user"/>)}
                        </div>
                    </div>

                    <div className="absolute bottom-[5%] left-[25%] lg:left-[10%] xl:left-[30%] w-[220px] h-[220px] rounded-full border border-slate-100 bg-white/50 backdrop-blur-md flex flex-col items-center justify-center hover:scale-105 hover:bg-white transition-all duration-500 z-30 group shadow-2xl shadow-slate-900/5">
                        <img src="/3dots-logo.png" className="w-24 h-auto object-contain mb-3" alt="3Dots" />
                        <div className="flex -space-x-2 mt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                            {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+60}`} className="w-6 h-6 rounded-full border border-white grayscale group-hover:grayscale-0 transition-all" alt="user"/>)}
                        </div>
                    </div>

                    {/* Connecting Central Dot */}
                    <div className="absolute top-[48%] left-[45%] lg:left-[45%] xl:left-[48%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-brand rounded-full shadow-[0_0_20px_5px_rgba(244,63,94,0.3)] z-40 hidden md:block"></div>
                </div>
            </div>
        </section>
    );
}
