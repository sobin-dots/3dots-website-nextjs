import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import CultureSection from "./components/CultureSection";
import PositionsSection from "./components/PositionsSection";

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-[#F4F6FB] overflow-hidden text-slate-800 pb-0 flex flex-col pt-10">
            <Navbar />

            <HeroSection />

            <CultureSection />

            <PositionsSection />


            <Footer />
        </main>
    );
}
