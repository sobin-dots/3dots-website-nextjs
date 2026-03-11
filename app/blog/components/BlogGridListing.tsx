"use client";

import { useState } from "react";
import { ArrowRight, Clock, Tag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function BlogGridListing() {
    // Extended Dummy Data for Pagination
    const allPosts = [
        {
            id: 1,
            title: "Scaling Next.js Architecture for Global Audiences",
            excerpt: "Advanced caching strategies and routing patterns to handle millions of requests with minimal latency.",
            category: "Engineering",
            readTime: "8 min read",
            date: "Oct 12, 2026",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            title: "The Death of the 6-Month MVP",
            excerpt: "Why spending half a year building your first version is the fastest way to kill your startup.",
            category: "Product Strategy",
            readTime: "5 min read",
            date: "Oct 09, 2026",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            title: "Dark Mode By Default: Analyzing Modern Design Trends",
            excerpt: "A deep dive into why enterprise tools and developer platforms are abandoning light mode entirely.",
            category: "Design",
            readTime: "6 min read",
            date: "Oct 05, 2026",
            image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            title: "Building Community Through Discord and Slack",
            excerpt: "Analyzing the infrastructure behind our 3,000+ member developer ecosystem.",
            category: "Ecosystem",
            readTime: "7 min read",
            date: "Sep 28, 2026",
            image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 5,
            title: "Serverless vs Edge: Where to deploy in 2026",
            excerpt: "Breaking down the cost, performance, and developer experience between major cloud deployment architectures.",
            category: "Engineering",
            readTime: "12 min read",
            date: "Sep 22, 2026",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 6,
            title: "Hiring Your First Founding Engineer",
            excerpt: "What non-technical founders need to prioritize when making their most critical early technical hire.",
            category: "Founder Insights",
            readTime: "9 min read",
            date: "Sep 15, 2026",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 7,
            title: "Why We Switched to Tailwind CSS (And Never Looked Back)",
            excerpt: "A look into our design system refactor and the benefits of utility-first styling for large teams.",
            category: "Engineering",
            readTime: "6 min read",
            date: "Sep 05, 2026",
            image: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 8,
            title: "User Onboarding: Friction vs Education",
            excerpt: "Balancing the need to educate your users with the urgency to get them inside your product.",
            category: "Product Strategy",
            readTime: "7 min read",
            date: "Aug 29, 2026",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 9,
            title: "Designing for AI: The Next Frontier",
            excerpt: "How conversational interfaces and predictive UI are changing the way we design software.",
            category: "Design",
            readTime: "10 min read",
            date: "Aug 21, 2026",
            image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
        }
    ];

    const categories = ["All", "Engineering", "Design", "Product Strategy", "Founder Insights", "Ecosystem"];
    
    // State
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);
    const [isLoading, setIsLoading] = useState(false);

    // Derived Logic
    const filteredPosts = allPosts.filter(post => activeCategory === "All" || post.category === activeCategory);
    const displayedPosts = filteredPosts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPosts.length;

    // Handlers
    const handleCategoryChange = (cat: string) => {
        setIsLoading(true);
        setActiveCategory(cat);
        setVisibleCount(6);
        setTimeout(() => setIsLoading(false), 300); // Simulate network/layout shift delay
    };

    const handleLoadMore = () => {
        setIsLoading(true);
        setTimeout(() => {
            setVisibleCount(prev => prev + 3);
            setIsLoading(false);
        }, 500); // Simulated API latency
    };

    return (
        <section className="py-24 px-6 max-w-[1200px] mx-auto min-h-[800px]">
            
            {/* Minimal Filter Tabs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 sticky top-20 z-30 bg-[#F4F6FB]/90 backdrop-blur-xl py-4 -mx-6 px-6 border-b border-slate-200">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-light text-slate-800 tracking-tight">Latest <span className="font-medium">Writing</span></h2>
                </motion.div>
                
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-2"
                >
                    {categories.map((cat, i) => {
                        const isActive = activeCategory === cat;
                        return (
                            <button 
                                key={i} 
                                onClick={() => handleCategoryChange(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive ? 'bg-slate-800 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-800'}`}
                            >
                                {cat}
                            </button>
                        );
                    })}
                </motion.div>
            </div>

            {/* Editorial Grid Layout */}
            <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                <AnimatePresence mode="wait">
                    {displayedPosts.length > 0 ? (
                        <motion.div 
                            key={activeCategory}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                        >
                            {displayedPosts.map((post, i) => (
                                <motion.div 
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group cursor-pointer flex flex-col h-full"
                                >
                                    {/* Image Wrapper */}
                                    <div className="relative w-full aspect-[4/3] rounded-4xl overflow-hidden mb-6 bg-slate-100">
                                        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                            <Tag className="w-3 h-3 text-brand" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800">{post.category}</span>
                                        </div>
                                        
                                        <Image
                                            src={post.image} 
                                            alt={post.title} 
                                            fill
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        
                                        <div className="absolute inset-0 bg-linear-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col grow">
                                        <div className="flex items-center gap-4 text-xs font-medium text-slate-400 mb-3">
                                            <span>{post.date}</span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                        </div>

                                        <h3 className="text-xl font-medium text-slate-800 mb-3 leading-snug group-hover:text-brand transition-colors duration-300 line-clamp-2">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-slate-500 font-light text-sm line-clamp-3 mb-6">
                                            {post.excerpt}
                                        </p>

                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center text-sm font-medium text-slate-400 group-hover:text-brand transition-colors">
                                            Read Full Article <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 text-slate-400 font-light"
                        >
                            <p>No articles found for &quot;{activeCategory}&quot;.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Pagination / Load More */}
            {hasMore && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-20 text-center"
                >
                    <button 
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="bg-white border border-slate-200 text-slate-600 px-8 py-4 rounded-full text-sm font-medium hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm flex items-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-slate-500" />}
                        {isLoading ? 'Loading...' : 'Load More Articles'}
                    </button>
                </motion.div>
            )}
        </section>
    );
}
