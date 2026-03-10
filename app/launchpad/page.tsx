"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, Rocket, Target, Zap, Code, PenTool, TrendingUp, Layers, Lightbulb, Users } from "lucide-react";

export default function LaunchpadPage() {
    return (
        <main className="min-h-screen bg-[#F4F6FB] overflow-hidden text-slate-800 pb-0">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-40 pb-20 px-6 max-w-[1200px] mx-auto text-center relative">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full h-[500px] bg-brand/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium mb-8">
                    <Rocket className="w-4 h-4" /> The 3Dots Signature Program
                </div>
                <h1 className="text-5xl md:text-[4.5rem] leading-[1.1] font-light text-slate-800 tracking-tight mb-8 max-w-4xl mx-auto">
                    Turn Your Startup Idea Into a Working MVP in <span className="font-medium text-brand">Just 15 Days</span>
                </h1>
                <p className="text-slate-600 text-xl font-light leading-relaxed mb-10 max-w-3xl mx-auto">
                    Launchpad is our rapid product development program designed for founders who want to validate their ideas, build a functional MVP fast, and move closer to investors and real users.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-brand text-white px-8 py-4 rounded-full text-[15px] font-medium hover:bg-brand-dark transition-all shadow-lg flex items-center justify-center gap-2">
                        Apply for Launchpad <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="bg-white text-slate-800 px-8 py-4 rounded-full text-[15px] font-medium hover:bg-slate-50 transition-all shadow-md border border-slate-200 flex items-center justify-center gap-2">
                        Book a Founder Call
                    </button>
                </div>
            </section>

            {/* Section 2: Ideas Are Easy */}
            <section className="py-24 px-6 max-w-[1000px] mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-8">
                    Ideas Are Easy. <span className="font-medium text-brand">Building Them Is Hard.</span>
                </h2>
                <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
                    Many startup ideas never become real products. Founders struggle with hiring developers, managing technology, defining features, and launching fast enough to validate their idea.
                    <br /><br />
                    <strong className="text-slate-800 font-medium">Launchpad exists to solve exactly this.</strong>
                </p>
            </section>

            {/* Section 3: What is Launchpad? */}
            <section className="py-24 px-6 relative">
                <div className="absolute inset-0 bg-slate-800 skew-y-[-2deg] origin-left"></div>
                <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col md:flex-row gap-12 items-center text-white">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
                            What is <span className="font-medium text-brand">Launchpad?</span>
                        </h2>
                        <p className="text-slate-300 text-lg font-light leading-relaxed mb-8">
                            Launchpad is 3Dots’ signature startup program where we help founders transform their ideas into a functional MVP in just 15 days. Our team works with you to define the core features, design the product, develop the MVP, and prepare you to launch.
                            <br /><br />
                            Instead of spending months building, you <span className="text-white font-medium">launch in weeks.</span>
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 relative">
                        <div className="bg-white/10 border border-white/20 p-10 rounded-[3rem] backdrop-blur-md shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand rounded-full mix-blend-screen opacity-50 blur-3xl"></div>
                            <Rocket className="w-16 h-16 text-brand mb-6" />
                            <h3 className="text-2xl font-medium mb-4">15 Days to Launch</h3>
                            <p className="text-white/80 font-light">A highly structured, fast-paced sprint to get your product out of your head and into the hands of real users.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: Who Is Launchpad For? */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-6">Who Is <span className="font-medium text-brand">Launchpad For?</span></h2>
                    <p className="text-slate-600 text-lg font-light">Launchpad is designed for founders, entrepreneurs, and businesses who want to turn ideas into real products quickly.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { title: "Startup Founders", icon: <Target className="w-6 h-6 text-brand" />, desc: "Founders who want to validate their startup idea quickly by building a functional MVP and testing it with real users before investing heavily in full-scale development." },
                        { title: "Entrepreneurs", icon: <Lightbulb className="w-6 h-6 text-brand" />, desc: "Entrepreneurs who have a strong product idea but lack the technical expertise or development team required to design, build, and launch their software product." },
                        { title: "Early-stage Startups", icon: <TrendingUp className="w-6 h-6 text-brand" />, desc: "Startups that need to build their first version of a product, demonstrate traction, and prepare a working prototype for early users, partners, or investors." },
                        { title: "Businesses", icon: <Users className="w-6 h-6 text-brand" />, desc: "Companies looking to test a new digital product, internal platform, or customer-facing solution without committing months of time and large development budgets." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                            <div className="w-14 h-14 bg-brand/10 rounded-2xl flex items-center justify-center mb-6">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-medium mb-4 text-slate-800">{item.title}</h3>
                            <p className="text-slate-600 font-light leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 5: What You Get With Launchpad */}
            <section className="py-24 px-6 bg-white border-t border-slate-200">
                <div className="max-w-[1400px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-6">What You Get With <span className="font-medium text-brand">Launchpad</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { num: "01", title: "Product Strategy Session", desc: "We work with you to understand your idea, business goals, and target users to define the right product strategy before development begins." },
                            { num: "02", title: "Feature Planning & MVP Roadmap", desc: "Together we identify the most important features for your MVP and create a clear roadmap to build and launch quickly." },
                            { num: "03", title: "UI/UX Design for Your Product", desc: "Our design team creates intuitive and user-friendly interfaces that ensure your product is simple, modern, and ready for real users." },
                            { num: "04", title: "MVP Development", desc: "Our engineers build your product using reliable technologies, turning your idea into a functional and scalable MVP." },
                            { num: "05", title: "Launch-Ready in 15 Days", desc: "Within 15 days, you receive a working MVP that you can demonstrate to users, partners, or potential investors." },
                            { num: "06", title: "Guidance on Next Steps", desc: "After your MVP is ready, we guide you on launching the product, collecting feedback, and planning the next stage of development." }
                        ].map((item, i) => (
                            <div key={i} className="bg-[#F4F6FB] p-10 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
                                <div className="text-6xl font-black text-slate-200/50 absolute -top-4 -right-4 group-hover:text-brand/10 transition-colors">{item.num}</div>
                                <div className="relative z-10">
                                    <h3 className="text-xl font-semibold mb-4 text-slate-800">{item.title}</h3>
                                    <p className="text-slate-600 font-light">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 6: The 15-days Framework */}
            <section className="py-24 px-6 max-w-[1200px] mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-6 flex justify-center items-center flex-wrap gap-4">
                    The <span className="font-medium text-brand px-6 py-2 bg-brand/10 rounded-full">15-Days</span> Framework
                </h2>
                <p className="text-slate-600 text-lg font-light leading-relaxed max-w-3xl mx-auto mb-16">
                    A structured approach that takes your idea from concept to a working MVP in just 15 days. Once the design is finalized and approved, we move into a structured, fast-paced build process designed to deliver a reliable, launch-ready MVP without chaos.
                </p>

                <div className="relative max-w-4xl mx-auto bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1 flex flex-col items-center">
                        <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-lg shadow-brand/30 z-10">1</div>
                        <h4 className="font-semibold text-slate-800 mb-2">Weeks 1</h4>
                        <p className="text-sm text-slate-500 font-light">Strategy & Design</p>
                    </div>
                    <div className="hidden md:block flex-1 h-[2px] bg-slate-200 relative">
                        <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <div className="w-16 h-16 bg-brand text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 shadow-lg shadow-brand/30 z-10">2</div>
                        <h4 className="font-semibold text-slate-800 mb-2">Weeks 2</h4>
                        <p className="text-sm text-slate-500 font-light">Core Development</p>
                    </div>
                    <div className="hidden md:block flex-1 h-[2px] bg-slate-200 relative">
                        <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold text-sm text-center leading-tight mb-4 shadow-lg shadow-slate-800/30 z-10">Launch</div>
                        <h4 className="font-semibold text-slate-800 mb-2">Day 15</h4>
                        <p className="text-sm text-slate-500 font-light">Deployment</p>
                    </div>
                </div>
            </section>

            {/* Section 7: Why choose us */}
            <section className="py-24 px-6 bg-slate-800 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand rounded-full mix-blend-screen opacity-20 blur-[100px]"></div>
                <div className="max-w-[1400px] mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
                            Why Should You <br /><span className="font-medium text-brand mt-2 block">Choose Us?</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <Zap className="w-8 h-8 text-brand mb-4" />
                                <h4 className="text-xl font-medium mb-2">Speed</h4>
                                <p className="text-slate-400 font-light">Launch in 15 days instead of 6 months.</p>
                            </div>
                            <div>
                                <Code className="w-8 h-8 text-brand mb-4" />
                                <h4 className="text-xl font-medium mb-2">Expert Product Team</h4>
                                <p className="text-slate-400 font-light">Work with experienced designers and engineers.</p>
                            </div>
                            <div>
                                <Target className="w-8 h-8 text-brand mb-4" />
                                <h4 className="text-xl font-medium mb-2">Founder-Focused</h4>
                                <p className="text-slate-400 font-light">We focus on what matters: building a product that can launch.</p>
                            </div>
                            <div>
                                <Users className="w-8 h-8 text-brand mb-4" />
                                <h4 className="text-xl font-medium mb-2">Startup Ecosystem</h4>
                                <p className="text-slate-400 font-light">Become part of our founder and technology community.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 backdrop-blur-sm h-full flex items-center justify-center">
                        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Team" className="w-full h-full object-cover rounded-[2rem] grayscale opacity-80" />
                    </div>
                </div>
            </section>

            {/* Section 8: What Happens After Your MVP? */}
            <section className="py-24 px-6 max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-light text-slate-800 tracking-tight mb-6">What Happens <span className="font-medium text-brand">After Your MVP?</span></h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <PenTool className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-3">Product Improvements</h4>
                            <p className="text-slate-600 font-light leading-relaxed">After launch, we help refine your MVP by improving features, fixing usability issues, and incorporating real user feedback to make the product stronger and more valuable.</p>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-3">Scaling the Platform</h4>
                            <p className="text-slate-600 font-light leading-relaxed">As your product gains users, we help scale the platform with better architecture, performance improvements, and infrastructure that supports growth.</p>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Layers className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-3">Building the Full Product</h4>
                            <p className="text-slate-600 font-light leading-relaxed">Once your MVP is validated, our team can help transform it into a complete product by adding advanced features, integrations, and a more robust system.</p>
                        </div>
                    </div>

                    <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100 flex items-start gap-6 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                            <Users className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                            <h4 className="text-xl font-medium mb-3">Connecting With Investors</h4>
                            <p className="text-slate-600 font-light leading-relaxed">Through our ecosystem and communities, we help founders connect with other builders, mentors, and potential investors who can support the next stage of their startup journey.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 9: CTA */}
            <section className="py-24 px-6 bg-brand text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&w=2000&q=80')] opacity-10 mix-blend-multiply object-cover"></div>
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-light tracking-tight mb-8">Ready to Build Your Startup?</h2>
                    <p className="text-white/90 text-xl font-light mb-12 max-w-2xl mx-auto">
                        If you have an idea worth building, Launchpad can turn it into a real product in just 15 days.
                    </p>
                    <button className="bg-white text-brand px-12 py-5 rounded-full text-lg font-medium hover:bg-slate-50 transition-all shadow-2xl inline-flex items-center gap-2">
                        Apply Now <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
