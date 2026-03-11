"use client";

import { ArrowRight, MoveUpRight, Tag } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { blogPosts } from "../data";

export default function BlogAbstractListing() {
    const posts = blogPosts.slice(0, 4);


    return (
        <section className="py-24 px-6 max-w-[1000px] mx-auto bg-white">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="text-3xl font-light text-slate-800 tracking-tight">Recent <span className="font-medium">Articles</span></h2>
            </motion.div>
            
            <div className="flex flex-col">
                {posts.map((post, i) => (
                    <motion.div 
                        key={post.id} 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`group cursor-pointer flex flex-col md:flex-row md:items-center justify-between py-10 gap-6 border-slate-100 transition-all duration-500 ${i === 0 ? 'border-y' : 'border-b'}`}
                    >
                        <Link href={`/blog/${post.slug}`} className="md:w-3/4 flex flex-col md:flex-row md:items-center gap-6 md:gap-12 cursor-pointer">
                            <span className="font-mono text-sm text-slate-400 w-16">{post.date.split(',')[0]}</span>
                            
                            <div className="grow">
                                <div className="flex items-center gap-2 mb-2">
                                    <Tag className="w-3 h-3 text-brand" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-brand transition-colors">{post.category}</span>
                                </div>
                                <h3 className="text-2xl font-light text-slate-800 mb-2 group-hover:-translate-y-1 transition-transform duration-300">
                                    {post.title}
                                </h3>
                                <p className="text-sm font-light text-slate-500 line-clamp-2">
                                    {post.excerpt}
                                </p>
                            </div>
                        </Link>

                        <Link href={`/blog/${post.slug}`} className="hidden md:flex items-center justify-center w-14 h-14 rounded-full border border-slate-200 text-slate-300 group-hover:bg-brand group-hover:border-brand group-hover:text-white transition-all duration-500 cursor-pointer">
                            <MoveUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </Link>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-16 text-center"
            >
                 <button className="text-sm font-medium text-slate-500 hover:text-brand transition-colors flex items-center justify-center mx-auto gap-2 group">
                    View Archive 
                    <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
            </motion.div>
        </section>
    );
}
