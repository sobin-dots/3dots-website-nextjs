import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import MissionVisionSection from "./components/MissionVisionSection";
import ValuesSection from "./components/ValuesSection";
import LaunchpadSection from "@/components/LaunchpadSection";
import EcosystemSection from "./components/EcosystemSection";
import Partners from "@/components/Partners";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#F4F6FB] overflow-hidden text-slate-800 pb-0">
            <Navbar />

            <HeroSection />

            <StorySection />

            <MissionVisionSection />

            <ValuesSection />

            <EcosystemSection />

            {/* <CtaSection /> */}
            <LaunchpadSection />

            <Partners />

            <Footer />
        </main>
    );
}
