export default function Footer() {
    return (
        <footer className="bg-white pt-24 border-t border-slate-200 mt-20">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="mb-24 text-center">
                    <h4 className="text-slate-400 font-medium tracking-widest uppercase text-sm mb-12">Our Strategic Partners</h4>
                    <div className="flex flex-wrap justify-center gap-x-20 gap-y-10">
                        <div className="flex flex-col items-center group">
                            <span className="text-2xl font-semibold text-slate-800 group-hover:text-brand transition-colors">RexCoders</span>
                            <span className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-medium">Educational Partner</span>
                        </div>
                        <div className="flex flex-col items-center group">
                            <span className="text-2xl font-semibold text-slate-800 group-hover:text-brand transition-colors">Picstol Studios</span>
                            <span className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-medium">Media Partner</span>
                        </div>
                        <div className="flex flex-col items-center group">
                            <span className="text-2xl font-semibold text-slate-800 group-hover:text-brand transition-colors">Bonafai</span>
                            <span className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-medium">Branding Partner</span>
                        </div>
                    </div>
                </div>

                <div className="py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-2xl font-light tracking-tighter text-slate-800">
                        3<span className="text-brand font-medium">dots</span>
                    </div>
                    <p className="text-slate-400 font-light text-sm">
                        © {new Date().getFullYear()} 3dots. Building world-class software.
                    </p>
                    <div className="flex gap-6 text-sm font-light text-slate-500">
                        <a href="#" className="hover:text-brand transition-colors">Twitter</a>
                        <a href="#" className="hover:text-brand transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-brand transition-colors">GitHub</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
