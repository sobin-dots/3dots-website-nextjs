import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import LaunchpadSection from "@/components/LaunchpadSection";
import AboutSection from "@/components/AboutSection";
import EcosystemVar1 from "@/components/EcosystemVar1";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";
import GlobalGridBackground from "@/components/GlobalGridBackground";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-slate-800 pb-0 relative">
      {/* <GlobalGridBackground /> */}
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <LaunchpadSection />
      <AboutSection />

      {/* Ecosystem short summary variant designed to drive traffic over to the About Page Ecosystem directory */}
      <EcosystemVar1 />

      <NewsletterSection />
      <Footer />
    </main>
  );
}
