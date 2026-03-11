"use client";

import Navbar from "@/components/Navbar";
import ServicesSectionVar2 from "@/components/ServicesSectionVar2";
import LaunchpadSection from "@/components/LaunchpadSection";
import Footer from "@/components/Footer";
import ServicesHeroVar4 from "@/components/ServicesHeroVar4";
import ServicesSectionVar3 from "@/components/ServicesSectionVar3";
import ServicesListMinimal1 from "@/components/ServicesListMinimal1";
import ServicesListMinimal2 from "@/components/ServicesListMinimal2";
import ServicesListMinimal3 from "@/components/ServicesListMinimal3";
import ServicesListMinimal4 from "@/components/ServicesListMinimal4";
import ServicesListMinimal5 from "@/components/ServicesListMinimal5";

export default function ServicesPage() {
    return (
        <main className="min-h-screen  overflow-hidden text-slate-800 pb-0">
            <Navbar />
            <ServicesHeroVar4 />
            <div className="">
                <ServicesListMinimal3 />
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
