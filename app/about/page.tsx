import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import StorySection from "./components/StorySection";
import MissionVisionSection from "./components/MissionVisionSection";
import ValuesSection from "./components/ValuesSection";
import LaunchpadSection from "@/components/LaunchpadSection";
import EcosystemSectionVar1 from "./components/EcosystemSectionVar1";
import EcosystemSectionVar2 from "./components/EcosystemSectionVar2";
import EcosystemSectionVar4 from "./components/EcosystemSectionVar4";
import EcosystemSectionVar5 from "./components/EcosystemSectionVar5";
import EcosystemSectionVar6 from "./components/EcosystemSectionVar6";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#F4F6FB] overflow-hidden text-slate-800 pb-0">
            <Navbar />

            <HeroSection />

            <StorySection />

            <MissionVisionSection />

            <ValuesSection />

            {/* Imported detailed Ecosystem module directly from components list since User requested placing it in About instead of home */}
            {/* Var 1 */}
            <div className="pt-24 mt-24">
                <div className="text-center mb-10"><span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">New Variant 1: Abstract Hub Connected Network</span></div>
                <EcosystemSectionVar1 />
            </div>

            {/* Var 2 */}
            <div className="pt-24 mt-24">
                <div className="text-center mb-10"><span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium">New Variant 2: Typography & Floating Faces Constellation</span></div>
                <EcosystemSectionVar2 />
            </div>

            {/* Var 4 */}
            <div className="pt-24 mt-24">
                <div className="text-center mb-10"><span className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-medium">New Variant 4: Horizontal Thread Network</span></div>
                <EcosystemSectionVar4 />
            </div>

            {/* Var 5 */}
            <div className="pt-24 mt-24">
                <div className="text-center mb-10"><span className="bg-pink-100 text-pink-800 px-4 py-1 rounded-full text-sm font-medium">New Variant 5: Overlapping Venn Nodes</span></div>
                <EcosystemSectionVar5 />
            </div>

            {/* Var 6 */}
            <div className="pt-24 mt-24 mb-24">
                <div className="text-center mb-10"><span className="bg-indigo-100 text-indigo-800 px-4 py-1 rounded-full text-sm font-medium">New Variant 6: Structural Border Grid with Floating Cloud</span></div>
                <EcosystemSectionVar6 />
            </div>

            {/* <CtaSection /> */}
            <LaunchpadSection />

            <Footer />
        </main>
    );
}
