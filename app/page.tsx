import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ServicesSectionVar6 from "@/components/ServicesSectionVar6";
import StatsSectionVar9 from "@/components/StatsSectionVar9";

import InfrastructureSectionVar3 from "@/components/InfrastructureSectionVar3";
import LaunchpadSection from "@/components/LaunchpadSection";
import AboutSection from "@/components/AboutSection";
import EcosystemVar1 from "@/components/EcosystemVar1";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-slate-800 pb-0 relative">
      <Navbar />
      <HeroSection />
      <section className=" mx-auto bg-white">
        <ServicesSectionVar6 />
      </section>

      {/* Services Section Variants for Preview */}
      <ServicesSection />
  <section className=" mx-auto bg-white">
      <InfrastructureSectionVar3 />
  </section>
      <StatsSectionVar9 />


      

      <div className="mt-32">
        <LaunchpadSection />
      </div>
      
      <AboutSection />

      {/* Ecosystem short summary variant designed to drive traffic over to the About Page Ecosystem directory */}
      <EcosystemVar1 />

      <NewsletterSection />
 

      <Footer />
    </main>
  );
}
