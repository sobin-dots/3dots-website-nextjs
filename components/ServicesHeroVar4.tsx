export default function ServicesHeroVar4() {
    return (
        <section className="relative w-full bg-white pt-28 pb-8 md:pt-32 md:pb-10 border-b border-slate-200 overflow-hidden">
            
            {/* Background Layer */}
            <div className="absolute inset-0 z-0 bg-slate-100">
                {/* Gray shade image background spanning the full width */}
                <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80" 
                    alt="Tech Infrastructure" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60"
                />
                
                {/* Gray/White fade just on the left edge to ensure text pops perfectly */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-100/95 via-slate-100/70 to-transparent z-10 w-full md:w-1/2"></div>
                
                {/* Right side mind image with blue overlays */}
                <div className="absolute inset-0 w-full md:w-3/4 ml-auto left-auto z-10">
                    <img 
                        src="https://images.unsplash.com/photo-1555949963-aa79dcee57d5?auto=format&fit=crop&w=1500&q=80" 
                        alt="Digital Mind" 
                        className="w-full h-full object-cover object-[80%_center] grayscale"
                    />
                    
                    {/* Blue Shade Overlays applied to the mind image */}
                    <div className="absolute inset-0 bg-[#0055FF]/20 mix-blend-color"></div>
                    <div className="absolute inset-0 bg-blue-300/40 mix-blend-multiply"></div>
                    
                    {/* The fade from Left to Right (Hiding the mind image's left edge smoothly) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-transparent to-transparent"></div>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-6 relative z-20 w-full h-[200px] flex items-center">
                <div className="w-full flex justify-between items-center h-full">
                    {/* Text side on solid white background created by the fade */}
                    <div className="text-left relative z-20">
                        <div className="w-10 h-1 bg-brand mb-4 rounded-full"></div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-slate-800 tracking-tight leading-[1.1]">
                            Digital <br />
                            <span className="font-bold text-slate-900">Services.</span>
                        </h1>
                        
                        {/* Subtle decorative dot */}
                        <div className="absolute -left-8 top-16 w-2.5 h-2.5 bg-brand/30 rounded-full"></div>
                        <div className="absolute left-32 -bottom-6 w-1.5 h-1.5 bg-blue-400/50 rounded-full"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
