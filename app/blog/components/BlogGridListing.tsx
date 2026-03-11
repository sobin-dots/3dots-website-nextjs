"use client";

import { useState } from "react";
import { ArrowRight, Clock, Tag, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../data";

export default function BlogGridListing() {
    // Extended Dummy Data for Pagination
    const categories = ["All", "Engineering", "Design", "Product Strategy", "Founder Insights", "Ecosystem"];
    
    // State
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(6);
    const [isLoading, setIsLoading] = useState(false);

    // Derived Logic
    const filteredPosts = blogPosts.filter(post => activeCategory === "All" || post.category === activeCategory);
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
                                    <Link href={`/blog/${post.slug}`} className="flex flex-col h-full grow">
                                    {/* Image Wrapper */}
                                    <div className="relative w-full aspect-4/3 rounded-4xl overflow-hidden mb-6 bg-slate-100">
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
                                    </Link>
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
