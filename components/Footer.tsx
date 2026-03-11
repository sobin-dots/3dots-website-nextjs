import { Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-white pt-24 border-t border-slate-200 mt-20">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="mb-24 text-center">
                    <h4 className="text-slate-400 font-medium tracking-widest uppercase text-sm mb-12">Our Strategic Partners</h4>
                    <div className="flex flex-wrap justify-center gap-x-20 gap-y-10">
                        <div className="flex flex-col items-center group">
                            <img src="/rexcoders-logo.png" alt="RexCoders" className="h-6 md:h-8 w-auto object-contain mb-1" />
                            {/* <span className="text-2xl font-semibold text-slate-800 group-hover:text-brand transition-colors">RexCoders</span> */}
                            <span className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-medium">Educational Partner</span>
                        </div>
                        <div className="flex flex-col items-center group">
                            <img src="/picstol-logo.png" alt="Picstol" className="h-8 md:h-10 w-auto object-cover mb-1" />
                            {/* <span className="text-2xl font-semibold text-slate-800 group-hover:text-brand transition-colors">Picstol Studios</span> */}
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
                         <img
                                src="/3dots-logo.png"
                                alt="3dots Logo"
                                className="w-28 md:w-32 h-auto object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                            />
                    </div>
                    <p className="text-slate-400 font-light text-sm">
                        © {new Date().getFullYear()} 3dots. Building world-class software.
                    </p>
                    <div className="flex gap-6 text-slate-400">
                        <a href="#" className="hover:text-brand transition-colors" aria-label="LinkedIn">
                            <Linkedin className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-brand transition-colors" aria-label="Twitter">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-brand transition-colors" aria-label="Instagram">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-brand transition-colors" aria-label="YouTube">
                            <Youtube className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
