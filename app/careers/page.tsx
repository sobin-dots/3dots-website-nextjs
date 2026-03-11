import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import CultureSection from "./components/CultureSection";
import PositionsSection from "./components/PositionsSection";

export default function CareersPage() {
    return (
         <main className="min-h-screen  overflow-hidden text-slate-800 pb-0">
            <Navbar />

            <HeroSection />

            <CultureSection />

            <PositionsSection />


            <Footer />
        </main>
    );
}
