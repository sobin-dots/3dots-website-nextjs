import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import BlogGridListing from "./components/BlogGridListing";
import BlogAbstractListing from "./components/BlogAbstractListing";

export default function BlogPage() {
    return (
         <main className="min-h-screen  overflow-hidden text-slate-800 pb-0">
            <Navbar />

            <HeroSection />

            {/* Variant 1: Clean Editorial Grid (Primary) */}
            <BlogGridListing />

            {/* Variant 2: Abstract Minimal List (Secondary) */}
            <div className="bg-white border-t border-slate-100 mt-16 pt-16 pb-24">
                <div className="max-w-[1200px] mx-auto text-center mb-8 px-6">
                    <span className="bg-pink-50 text-brand px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border border-pink-100">Alternative Layout</span>
                </div>
                <BlogAbstractListing />
            </div>

            <Footer />
        </main>
    );
}
