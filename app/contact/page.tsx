import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import ContactLayout from "./components/ContactLayout";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#F4F6FB] overflow-hidden text-slate-800 pb-0 flex flex-col pt-10">
            <Navbar />

            <HeroSection />

            <ContactLayout />

            <Footer />
        </main>
    );
}
