"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
};

export default function BlogPostClient({ 
  post, 
  prevPost, 
  nextPost 
}: { 
  post: BlogPost, 
  prevPost: BlogPost | null, 
  nextPost: BlogPost | null 
}) {
  return (
    <main className="min-h-screen bg-white text-slate-800 pb-0">
      <Navbar />

      <article className="pt-32 pb-24 lg:pt-40 lg:pb-32">
        {/* Header */}
        <header className="max-w-[800px] mx-auto px-6 mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center items-center gap-3 mb-6">
              <div className="bg-brand/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-brand" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand">{post.category}</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-slate-900 mb-8 leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm font-medium text-slate-500">
              <span className="text-slate-600">{post.date}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-[1200px] mx-auto px-6 mb-20"
        >
          <div className="relative w-full aspect-[21/9] rounded-4xl overflow-hidden shadow-2xl shadow-slate-200/50 bg-slate-100">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Content Body */}
        <div className="max-w-[800px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-light prose-headings:text-slate-900 prose-a:text-brand hover:prose-a:underline prose-p:font-light leading-relaxed whitespace-pre-line"
          >
            {post.content}
          </motion.div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 flex items-center gap-3">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand transition-colors mb-8 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog list
              </Link>
          </div>
        </div>
      </article>

      {/* Next/Previous Post Navigation */}
      {(prevPost || nextPost) && (
        <section className="py-24 bg-[#fafafc] border-t border-slate-100">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Previous Post */}
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group flex flex-col p-8 bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 text-slate-400 font-medium text-sm tracking-wide uppercase mb-4 group-hover:text-brand transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Previous Article
                  </div>
                  <h3 className="text-2xl font-light text-slate-800 group-hover:text-brand transition-colors line-clamp-2">
                    {prevPost.title}
                  </h3>
                </Link>
              ) : <div></div> /* Empty div to keep Next Post aligned right if there's no prev */}

              {/* Next Post */}
              {nextPost && (
                <Link href={`/blog/${nextPost.slug}`} className="group flex flex-col items-end text-right p-8 bg-white rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-2 text-slate-400 font-medium text-sm tracking-wide uppercase mb-4 group-hover:text-brand transition-colors">
                    Next Article <ArrowRight className="w-4 h-4" />
                  </div>
                  <h3 className="text-2xl font-light text-slate-800 group-hover:text-brand transition-colors line-clamp-2">
                    {nextPost.title}
                  </h3>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
