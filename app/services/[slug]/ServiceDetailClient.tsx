"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type ServiceData = {
  title: string;
  shortDescription: string;
  fullDescription: string;
  features: { title: string; description: string }[];
  benefits: string[];
  image: string;
};

export default function ServiceDetailClient({ data }: { data: ServiceData }) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-0">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/4"></div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full">
          <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand/5 border border-brand/10 text-brand rounded-full text-xs font-semibold uppercase tracking-widest mb-6">
                Service Details
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 mb-6 leading-[1.1]">
                {data.title}.
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-light leading-relaxed mb-10 max-w-lg">
                {data.shortDescription}
              </p>
              <Link href="/launchpad" className="bg-brand text-white hover:bg-brand/90 px-8 py-4 rounded-full text-[15px] font-medium transition-all shadow-lg shadow-brand/20 inline-flex items-center gap-2">
                Start Your Project <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative rounded-4xl overflow-hidden shadow-2xl shadow-slate-200/50 border border-white aspect-[4/3] lg:aspect-square"
            >
              <Image 
                src={data.image} 
                alt={data.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left Col: Main Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="prose prose-lg prose-slate max-w-none"
              >
                <h2 className="text-3xl font-light text-slate-800 mb-6">Overview</h2>
                <p className="text-slate-600 font-light leading-relaxed mb-12">
                  {data.fullDescription}
                </p>

                <h3 className="text-2xl font-light text-slate-800 mb-8 mt-16">Key Features</h3>
                <div className="space-y-8">
                  {data.features.map((feature, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                        <Zap className="w-5 h-5 text-brand" />
                      </div>
                      <div>
                        <h4 className="text-xl font-medium text-slate-800 mb-2">{feature.title}</h4>
                        <p className="text-slate-500 font-light">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Col: Benefits Sidebar */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-4xl p-8 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-100 sticky top-32"
              >
                <h3 className="text-2xl font-light text-slate-800 mb-8">Why chose this service?</h3>
                <ul className="space-y-6">
                  {data.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600 font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-12 pt-8 border-t border-slate-100">
                  <p className="text-sm text-slate-500 font-light mb-4">Ready to accelerate your growth?</p>
                  <Link href="/about" className="text-brand font-medium flex items-center gap-2 hover:gap-3 transition-all">
                    Talk to our team <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
