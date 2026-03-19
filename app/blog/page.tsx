import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import BlogGridListing from "./components/BlogGridListing";

export default function BlogPage() {
    return (
         <main className="min-h-screen  overflow-hidden text-slate-800 pb-0">
            <Navbar />

            <HeroSection />

            <BlogGridListing />

          
            <Footer />
        </main>
    );
}
