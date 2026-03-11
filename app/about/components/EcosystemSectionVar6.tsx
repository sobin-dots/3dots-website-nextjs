export default function EcosystemSectionVar6() {
    return (
        <section className="py-32 px-6 max-w-[1200px] mx-auto bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden relative">
            <div className="text-center mb-16 relative z-10">
                <span className="text-brand font-medium tracking-widest uppercase text-sm mb-4 block">Ecosystem</span>
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight flex items-center justify-center gap-4">
                    The <span className="font-medium text-brand">3,000+</span> Network
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-100 relative z-10 border-y border-slate-100">
                {[
                    { logo: "/js-mavens-logo.png", title: "JS Mavens", desc: "Dev Community" },
                    { logo: "/rexhive-logo.png", title: "RexHive", desc: "Tech Researchers" },
                    { logo: "/3dots-logo.png", title: "3Dots", desc: "Founders" }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-10 hover:bg-slate-50 transition-colors duration-500 group flex flex-col items-center text-center">
                        <img src={item.logo} alt={item.title} className="h-10 w-auto object-contain mb-6 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                        <p className="text-slate-400 font-light text-xs uppercase tracking-widest">{item.desc}</p>
                    </div>
                ))}
            </div>

            {/* Scatter avatar grid seamlessly blending into the bottom of the grid */}
            <div className="relative h-[250px] w-full mt-12 bg-white flex justify-center items-center">
                {/* Randomly scattered connecting nodes */}
                <div className="absolute inset-0 max-w-[900px] mx-auto">
                    {[
                        { id: 11, top: "15%", left: "5%", size: "50px", delay: "0s", duration: "6s" },
                        { id: 12, top: "10%", left: "30%", size: "45px", delay: "0.5s", duration: "7s" },
                        { id: 13, top: "20%", left: "55%", size: "55px", delay: "1s", duration: "5s" },
                        { id: 14, top: "15%", left: "80%", size: "48px", delay: "1.5s", duration: "8s" },
                        { id: 15, top: "45%", left: "15%", size: "60px", delay: "0.8s", duration: "7.5s" },
                        { id: 16, top: "50%", left: "45%", size: "50px", delay: "1.2s", duration: "6s" },
                        { id: 17, top: "40%", left: "70%", size: "58px", delay: "0.3s", duration: "5.5s" },
                        { id: 18, top: "45%", left: "95%", size: "45px", delay: "0.9s", duration: "8.5s" },
                        { id: 19, top: "80%", left: "10%", size: "40px", delay: "0.6s", duration: "7s" },
                        { id: 20, top: "75%", left: "35%", size: "48px", delay: "1.1s", duration: "6.2s" },
                        { id: 21, top: "85%", left: "60%", size: "52px", delay: "1.4s", duration: "5.8s" },
                        { id: 22, top: "70%", left: "85%", size: "42px", delay: "0.4s", duration: "6s" },
                        { id: 23, top: "25%", left: "90%", size: "47px", delay: "0.2s", duration: "6.5s" },
                        { id: 24, top: "35%", left: "0%", size: "44px", delay: "0.7s", duration: "7.2s" },
                        { id: 25, top: "90%", left: "25%", size: "54px", delay: "1.3s", duration: "6.8s" },
                    ].map((avatar, i) => (
                        <div 
                            key={i} 
                            className="absolute rounded-full border-2 border-white shadow-lg overflow-hidden group hover:scale-125 hover:z-50 transition-all duration-500"
                            style={{
                                top: avatar.top,
                                left: avatar.left,
                                width: avatar.size,
                                height: avatar.size,
                                animation: `float ${avatar.duration} ease-in-out ${avatar.delay} infinite`
                            }}
                        >
                            <img src={`https://i.pravatar.cc/100?img=${avatar.id}`} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" alt="avatar" />
                        </div>
                    ))}
                    {/* Abstract connecting lines between some avatars */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" stroke="currentColor" fill="none">
                        <line x1="20%" y1="30%" x2="50%" y2="50%" className="text-slate-400" />
                        <line x1="80%" y1="20%" x2="50%" y2="50%" className="text-slate-400" />
                        <line x1="30%" y1="80%" x2="50%" y2="50%" className="text-slate-400" />
                        <line x1="70%" y1="70%" x2="50%" y2="50%" className="text-slate-400" />
                    </svg>
                </div>
            </div>
            {/* Minimal inline float animation keyframes injection */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes float {
                    0% { transform: translateY(0px) }
                    50% { transform: translateY(-10px) }
                    100% { transform: translateY(0px) }
                }
            `}} />
        </section>
    );
}
