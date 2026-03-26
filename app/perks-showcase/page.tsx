import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PerksShowcase from "@/components/PerksShowcase";

export default function PerksShowcasePage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-32 bg-slate-50 border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 pb-20 text-center">
                    <h1 className="text-6xl font-light text-slate-900 tracking-tighter mb-4">
                        Perks <span className="font-medium text-brand">Variants</span>
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Three distinct architectural approaches for the &quot;Perks&quot; section. Each designed with accessibility, premium aesthetics, and high-quality interactions in mind.
                    </p>
                </div>
            </div>
            
            <PerksShowcase />

            <Footer />
        </main>
    );
}
