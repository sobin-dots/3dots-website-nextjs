"use client";

import Navbar from "@/components/Navbar";
import LaunchpadSection from "@/components/LaunchpadSection";
import Footer from "@/components/Footer";
import ServicesHeroVar4 from "@/components/ServicesHeroVar4";
import ServicesListMinimal7 from "@/components/ServicesListMinimal7";

export default function ServicesPage() {
    return (
        <main className="min-h-screen  overflow-hidden text-slate-800 pb-0">
            <Navbar />
            <ServicesHeroVar4 />
            <div>
                <ServicesListMinimal7 />
            </div>
            <div className="bg-white border-t border-slate-100">
                <div>
                    <LaunchpadSection />
                </div>
            </div>

            <Footer />
        </main>
    );
}
