"use client";

import React from 'react';
import { 
  BookOpen, 
  Settings, 
  Heart, 
  Globe,
  Users
} from 'lucide-react';

const perksData = [
  {
    id: 1,
    title: "Continuous learning & growth opportunities",
    description: "Access to resources, mentorship, and challenges that accelerate your professional growth.",
    icon: <BookOpen className="w-5 h-5" />,
    color: "bg-slate-100 text-slate-400"
  },
  {
    id: 2,
    title: "No micromanagement policy",
    description: "We trust you to take ownership, make decisions, and deliver outcomes without unnecessary oversight.",
    icon: <Settings className="w-5 h-5" />,
    color: "bg-blue-50 text-blue-500"
  },
  {
    id: 3,
    title: "Activities and regular team outings",
    description: "Regular events, outings, and celebrations to keep the team connected and energized.",
    icon: <Users className="w-5 h-5" />,
    color: "bg-amber-50 text-amber-500"
  },
  {
    id: 4,
    title: "Physical & mental well-being initiatives",
    description: "Programs and support focused on maintaining a healthy mind and body.",
    icon: <Heart className="w-5 h-5" />,
    color: "bg-rose-50 text-rose-500"
  },
  {
    id: 5,
    title: "CSR initiatives and community impact",
    description: "Opportunities to contribute to meaningful causes and make a positive impact beyond work.",
    icon: <Globe className="w-5 h-5" />,
    color: "bg-emerald-50 text-brand"
  }
];

export function MinimalSplitBento() {
  const featuredPerk = perksData[2]; // Activities and Outings
  const gridPerks = [perksData[0], perksData[1], perksData[3], perksData[4]];

  return (
    <div className="w-full bg-slate-50 py-32 px-6">
       <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-px bg-slate-200 border border-slate-200 rounded-[3rem] overflow-hidden shadow-2xl">
          {/* Featured Left Section */}
          <div className="lg:w-2/5 p-16 lg:p-20 bg-white flex flex-col justify-between md:border-r md:border-r-slate-100">
             <div className="space-y-8">
                <div className="space-y-4">
                    <span className="text-brand font-bold text-xs tracking-widest uppercase">The 3Dots Standard</span>
                    <h2 className="text-5xl font-bold text-slate-900 tracking-tighter leading-none">Perks & <br />Benefits.</h2>
                </div>
                <p className="text-slate-500 font-light text-lg leading-relaxed max-w-sm">Beyond a competitive salary, we offer an environment built around common human needs and creative freedom.</p>
             </div>

             {/* Moved Perk #3 here */}
             <div className="mt-16 space-y-6 group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${featuredPerk.color}`}>
                   {featuredPerk.icon}
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-medium text-slate-800 tracking-tight">{featuredPerk.title}</h3>
                   <p className="text-slate-500 text-base font-light leading-relaxed max-w-xs">{featuredPerk.description}</p>
                </div>
             </div>
          </div>

          {/* Grid Right Section (4 Items) */}
          <div className="lg:w-3/5 grid grid-cols-1 md:grid-cols-2 bg-white">
             {gridPerks.map((perk, i) => (
               <div 
                 key={perk.id} 
                 className={`p-10 lg:p-14 bg-white flex flex-col justify-between border-slate-100 hover:bg-slate-50 transition-colors 
                    ${i % 2 === 0 ? 'md:border-r' : ''} 
                    ${i < 2 ? 'md:border-b' : ''}
                    ${i > 1 ? 'border-t md:border-t-0' : 'border-b md:border-b-auto'}
                 `}
               >
                  <div className="space-y-6">
                     <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${perk.color}`}>
                        {perk.icon}
                     </div>
                     <h3 className="text-xl font-medium text-slate-900 leading-tight">{perk.title}</h3>
                     <p className="text-slate-500 text-sm font-light leading-relaxed">{perk.description}</p>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );
}

export default function PerksShowcase() {
  return (
    <MinimalSplitBento />
  );
}
