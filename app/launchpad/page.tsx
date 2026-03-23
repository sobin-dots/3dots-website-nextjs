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
import LaunchpadAfterMVPVar1 from "./components/LaunchpadAfterMVPVar1";
import LaunchpadCTA from "./components/LaunchpadCTA";

export default function LaunchpadPage() {
    return (
        <main className="min-h-screen  overflow-hidden text-slate-800 pb-0 bg-[#F4F6FB]">
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

            {/* Section 8: What Happens After Your MVP? (Var 1) */}
            <LaunchpadAfterMVPVar1 />

            {/* Section 9: CTA */}
            <LaunchpadCTA />


            <Footer />
        </main>
    );
}
