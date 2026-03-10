import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import MissionVisionSection from "./components/MissionVisionSection";
import ValuesSection from "./components/ValuesSection";
import CtaSection from "./components/CtaSection";
import EcosystemSection from "@/components/EcosystemSection";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#F4F6FB] overflow-hidden text-slate-800 pb-0 flex flex-col pt-10">
            <Navbar />

            <HeroSection />

            <StorySection />

            <MissionVisionSection />

            <ValuesSection />

            {/* Imported detailed Ecosystem module directly from components list since User requested placing it in About instead of home */}
            <div className="bg-white">
                <EcosystemSection />
            </div>

            <CtaSection />

            <Footer />
        </main>
    );
}
