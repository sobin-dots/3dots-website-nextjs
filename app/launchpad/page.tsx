"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LaunchpadHero from "./components/LaunchpadHero";
import LaunchpadIdeasAreEasy from "./components/LaunchpadIdeasAreEasy";
import LaunchpadWhatIs from "./components/LaunchpadWhatIs";
import WhoIsLaunchpadFor from "./components/WhoIsLaunchpadFor";
import LaunchpadWhatYouGet from "./components/LaunchpadWhatYouGet";
import LaunchpadFramework from "./components/LaunchpadFramework";
import LaunchpadWhyChooseUs from "./components/LaunchpadWhyChooseUs";
import LaunchpadAfterMVP from "./components/LaunchpadAfterMVP";
import LaunchpadAfterMVPVar1 from "./components/LaunchpadAfterMVPVar1";
import LaunchpadAfterMVPVar2 from "./components/LaunchpadAfterMVPVar2";
import LaunchpadAfterMVPVar3 from "./components/LaunchpadAfterMVPVar3";
import LaunchpadCTA from "./components/LaunchpadCTA";

export default function LaunchpadPage() {
    return (
        <main className="min-h-screen  overflow-hidden text-slate-800 pb-0">
            <Navbar />

            {/* Hero Section */}
            <LaunchpadHero />

            {/* Section 2: Ideas Are Easy */}
            <LaunchpadIdeasAreEasy />

            {/* Section 3: What is Launchpad? */}
            <LaunchpadWhatIs />

            {/* Section 4: Who Is Launchpad For? */}
            <WhoIsLaunchpadFor />

            {/* Section 5: What You Get With Launchpad */}
            <LaunchpadWhatYouGet />

            {/* Section 6: Why choose us */}
            <LaunchpadWhyChooseUs />

            {/* Section 7: The 15-days Framework */}
            <LaunchpadFramework />

            {/* Section 8: What Happens After Your MVP? (Original) */}
            <div className="pt-24 border-t border-slate-200 mt-24">
                <div className="text-center mb-10"><span className="bg-slate-200 text-slate-800 px-4 py-1 rounded-full text-sm font-medium">Original Variant</span></div>
                <LaunchpadAfterMVP />
            </div>

            {/* Section 8: What Happens After Your MVP? (Var 1) */}
            <div className="pt-24 border-t border-slate-200 mt-24 bg-white pb-24">
                <div className="text-center mb-10"><span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">New Variant 1: Editorial Split List</span></div>
                <LaunchpadAfterMVPVar1 />
            </div>

            {/* Section 8: What Happens After Your MVP? (Var 2) */}
            <div className="pt-24 border-t border-slate-200 mt-24 pb-24 bg-white">
                <div className="text-center mb-10"><span className="bg-emerald-100 text-emerald-800 px-4 py-1 rounded-full text-sm font-medium">New Variant 2: Clean Typographic Column Grid</span></div>
                <LaunchpadAfterMVPVar2 />
            </div>

            {/* Section 8: What Happens After Your MVP? (Var 3) */}
            <div className="pt-24 border-t border-slate-200 mt-24 mb-24 bg-[#F4F6FB]">
                <div className="text-center mb-10"><span className="bg-slate-800 text-slate-100 px-4 py-1 rounded-full text-sm font-medium">New Variant 3: Ultra Minimal Border Grid</span></div>
                <LaunchpadAfterMVPVar3 />
            </div>

            {/* Section 9: CTA */}
            <LaunchpadCTA />


            <Footer />
        </main>
    );
}
