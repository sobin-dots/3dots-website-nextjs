export default function LaunchpadFramework() {
    return (
        <section className="py-24 px-6  mx-auto bg-white">
            <div className="max-w-[1400px] mx-auto">
            <div className="mb-24  flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-12">
                <div>
                    <span className="text-brand font-medium tracking-widest uppercase text-sm mb-4 block">The Process</span>
                    <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight">
                        15-Days Framework
                    </h2>
                </div>
                <p className="text-slate-500 font-light md:max-w-md">
                    A structured, fast-paced build process designed to deliver a reliable, launch-ready MVP without the usual chaos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
                <div className="group">
                    <div className="text-[5rem] lg:text-[7rem] leading-none font-light text-slate-100 mb-6 group-hover:text-brand/10 transition-colors duration-500 select-none">W1</div>
                    <div className="h-px w-full bg-slate-200 mb-8 group-hover:bg-brand transition-colors duration-500"></div>
                    <h4 className="text-2xl font-light text-slate-800 mb-3">Strategy & Design</h4>
                    <p className="text-slate-500 font-light text-sm leading-relaxed">We map out the core features and user flows, finalizing a clean, modern UI/UX design ready for development.</p>
                </div>

                <div className="group">
                    <div className="text-[5rem] lg:text-[7rem] leading-none font-light text-slate-100 mb-6 group-hover:text-brand/10 transition-colors duration-500 select-none">W2</div>
                    <div className="h-px w-full bg-slate-200 mb-8 group-hover:bg-brand transition-colors duration-500"></div>
                    <h4 className="text-2xl font-light text-slate-800 mb-3">Core Development</h4>
                    <p className="text-slate-500 font-light text-sm leading-relaxed">Our engineers write the code, building out the fully functional frontend and backend architecture.</p>
                </div>

                <div className="group md:pt-12">
                    <div className="text-[5rem] lg:text-[7rem] leading-none font-medium text-brand/20 mb-6 group-hover:text-brand transition-colors duration-500 select-none">15</div>
                    <div className="h-px w-full bg-brand/30 mb-8 group-hover:bg-brand transition-colors duration-500 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand"></div>
                    </div>
                    <h4 className="text-2xl font-medium text-slate-800 mb-3">Launch Day</h4>
                    <p className="text-slate-600 font-light text-sm leading-relaxed">Your MVP goes live. Ready for real users, pitch decks, and immediate validation in the market.</p>
                </div>
            </div>
            </div>
        </section>
    );
}
