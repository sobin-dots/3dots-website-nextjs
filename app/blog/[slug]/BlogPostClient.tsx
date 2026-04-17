/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Tag, ArrowRight, Share2, ThumbsUp, ThumbsDown, MessageSquare, Linkedin, Twitter, Facebook, Instagram, Globe } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
  authorName: string;
  authorRole: string;
  authorDesignation?: string;
  authorImage?: string;
  authorAbout?: string;
  authorSocials?: any;
  tags: string[];

  likes: number;
  dislikes: number;
  comments?: Comment[];
};

type Comment = {
  id: string;
  author: string;
  content: string;
  createdAt: string;
};

type RecentPost = {
  id: string;
  slug: string;
  title: string;
  image: string;
  date: string;
};

type CategoryInfo = {
  name: string;
  count: number;
};

export default function BlogPostClient({ 
  post, 
  prevPost, 
  nextPost,
  recentPosts = [],
  categories = [],
  tags = []
}: { 
  post: BlogPost, 
  prevPost: BlogPost | null, 
  nextPost: BlogPost | null,
  recentPosts?: RecentPost[],
  categories?: CategoryInfo[],
  tags?: string[]
}) {
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  // Comment state
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [commentForm, setCommentForm] = useState({ author: "", email: "", content: "" });
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, userAns: "" });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    setCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1,
      userAns: ""
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (parseInt(captcha.userAns) !== captcha.num1 + captcha.num2) {
      setMsg({ type: "error", text: "Incorrect CAPTCHA answer. Please try again." });
      generateCaptcha();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/blog/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentForm),
      });

      if (res.ok) {
        const newComment = await res.json();
        setComments([newComment, ...comments]);
        setCommentForm({ author: "", email: "", content: "" });
        setMsg({ type: "success", text: "Comment posted successfully!" });
        generateCaptcha();
      } else {
        const data = await res.json();
        setMsg({ type: "error", text: data.error || "Failed to post comment" });
      }
    } catch {
      setMsg({ type: "error", text: "An error occurred while posting your comment." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async () => {
    if (hasLiked) return;
    setLikes(prev => prev + 1);
    setHasLiked(true);
    if (hasDisliked) {
      setDislikes(prev => prev - 1);
      setHasDisliked(false);
    }
    try {
      await fetch(`/api/blog/${post.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'LIKE' }),
      });
    } catch (e) { console.error(e); }
  };

  const handleDislike = async () => {
    if (hasDisliked) return;
    setDislikes(prev => prev + 1);
    setHasDisliked(true);
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
    try {
      await fetch(`/api/blog/${post.id}/react`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'DISLIKE' }),
      });
    } catch (e) { console.error(e); }
  };

  const [shareUrl, setShareUrl] = useState("");
  useEffect(() => {
    // Avoid synchronous state update to prevent cascading renders warning
    const currentUrl = window.location.href;
    const timer = setTimeout(() => setShareUrl(currentUrl), 0);
    return () => clearTimeout(timer);
  }, []);

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, color: 'hover:text-[#0077b5]' },
    { name: 'Twitter', icon: Twitter, url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`, color: 'hover:text-[#1DA1F2]' },
    { name: 'Facebook', icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, color: 'hover:text-[#4267B2]' },
  ];

  const authorSocials = post.authorSocials || {};
  const authorSocialLinks = [
    { name: 'LinkedIn', icon: Linkedin, url: authorSocials.linkedin, color: 'hover:text-[#0077b5]' },
    { name: 'Instagram', icon: Instagram, url: authorSocials.instagram, color: 'hover:text-[#E4405F]' },
    { name: 'Twitter', icon: Twitter, url: authorSocials.twitter, color: 'hover:text-[#1DA1F2]' },
    { name: 'Facebook', icon: Facebook, url: authorSocials.facebook, color: 'hover:text-[#4267B2]' },
    { name: 'Website', icon: Globe, url: authorSocials.website, color: 'hover:text-brand' },
  ].filter(link => link.url);

  return (

    <main className="min-h-screen bg-white text-slate-800 pb-0">
      <Navbar />

      <article className="pt-32 pb-24 lg:pt-40 lg:pb-32 relative">
        {/* Floating Share Side */}
        <div className="hidden xl:flex flex-col gap-4 fixed left-12 top-1/2 -translate-y-1/2 p-4 bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/50 z-40">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 rotate-180 [writing-mode:vertical-lr] mb-2">Share Story</p>
          {socialLinks.map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" title={`Share on ${link.name}`} className={`p-3 rounded-2xl bg-slate-50 text-slate-400 transition-all ${link.color} hover:bg-white hover:scale-110 active:scale-95`}>
              <link.icon className="w-5 h-5" />
            </a>
          ))}
          <button onClick={() => {
            navigator.clipboard.writeText(shareUrl);
            alert("Link copied to clipboard!");
          }} className="p-3 rounded-2xl bg-slate-50 text-slate-400 transition-all hover:text-brand hover:bg-white hover:scale-110">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Header */}
        <header className="max-w-[1200px] mx-auto px-6 mb-16 text-center">
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

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-light tracking-tight text-slate-900 mb-10 leading-[1.05]">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  {post.authorImage ? (
                    <Image src={post.authorImage} alt={post.authorName || "Author"} width={40} height={40} className="object-cover"  unoptimized={true} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand font-medium">
                      {post.authorName?.charAt(0) || "A"}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 leading-tight">{post.authorName || "3Dots Team"}</p>
                  <p className="text-[11px] text-slate-400 font-light">{post.authorDesignation || post.authorRole || "Editorial"}</p>
                </div>

              </div>
              <div className="h-8 w-px bg-slate-100"></div>
              <div className="flex flex-col text-left">
                <p className="text-sm font-medium text-slate-900 leading-tight">{post.date}</p>
                <p className="text-[11px] text-slate-400 font-light flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</p>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-[1200px] mx-auto px-6 mb-24"
        >
          <div className="relative w-full aspect-21/9 rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 bg-slate-100 group">
            <Image 
              src={post.image} 
              alt={post.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
              unoptimized={true}
            />
          </div>
        </motion.div>

        {/* Content Body & Sidebar Container */}
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg md:prose-xl prose-slate max-w-none prose-headings:font-light prose-headings:text-slate-900 prose-a:text-brand hover:prose-a:underline prose-p:font-light leading-relaxed mb-16"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Tags & Reactions */}
            <div className="mt-20 pt-12 border-t border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map(tag => (
                    <Link 
                      key={tag} 
                      href={`/blog?tag=${tag}`}
                      className="px-4 py-2 bg-slate-50 text-slate-500 rounded-2xl text-xs font-medium hover:bg-slate-100 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleLike}
                    disabled={hasLiked}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl border transition-all ${
                      hasLiked ? 'bg-brand text-white border-brand scale-105 shadow-lg shadow-brand/20' : 'border-slate-200 text-slate-500 hover:border-brand hover:text-brand'
                    }`}
                  >
                    <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-white' : ''}`} />
                    <span className="text-sm font-semibold">{likes}</span>
                  </button>
                  <button 
                    onClick={handleDislike}
                    disabled={hasDisliked}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl border transition-all ${
                      hasDisliked ? 'bg-slate-800 text-white border-slate-800 scale-105 shadow-lg shadow-slate-800/20' : 'border-slate-200 text-slate-500 hover:border-slate-800 hover:text-slate-800'
                    }`}
                  >
                    <ThumbsDown className={`w-4 h-4 ${hasDisliked ? 'fill-white' : ''}`} />
                    <span className="text-sm font-semibold">{dislikes}</span>
                  </button>
                </div>
              </div>

              {/* Author Card Footer */}
              <div className="p-8 md:p-12 bg-[#fafafc] rounded-[40px] border border-slate-100 mb-20 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left transition-all hover:shadow-xl hover:shadow-slate-200/50">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-xl shrink-0">
                    {post.authorImage ? (
                      <Image src={post.authorImage} alt={post.authorName || "Author"} width={96} height={96} className="object-cover"  unoptimized={true} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-brand/10 text-brand text-2xl font-medium">
                        {post.authorName?.charAt(0) || "A"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand mb-2">{post.authorDesignation || "Editorial Member"}</p>
                    <h4 className="text-2xl font-light text-slate-900 mb-2">{post.authorName || "3Dots Team"}</h4>
                    <p className="text-slate-500 font-light leading-relaxed mb-6">
                      {post.authorAbout || `Passionate about ${post.category.toLowerCase()} and building the future of technology with 3Dots. Sharing insights from years of experience in product development.`}
                    </p>
                    <div className="flex items-center justify-center md:justify-start gap-4">
                       {authorSocialLinks.map(link => (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={`text-slate-400 transition-colors ${link.color}`}>
                          <link.icon className="w-5 h-5" />
                        </a>
                      ))}
                    </div>
                  </div>

              </div>

              {/* Comment Section */}
              <div className="space-y-10">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-brand" />
                  <h3 className="text-2xl font-light text-slate-900">Discussion <span className="text-slate-300 ml-1">({comments.length})</span></h3>
                </div>
                
                <form onSubmit={handleCommentSubmit} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20">
                  {msg.text && (
                    <div className={`mb-6 p-4 rounded-2xl text-sm font-medium ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {msg.text}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input 
                      type="text" 
                      required
                      placeholder="Your Name" 
                      value={commentForm.author}
                      onChange={(e) => setCommentForm({ ...commentForm, author: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand transition-all text-sm" 
                    />
                    <input 
                      type="email" 
                      required
                      placeholder="Email Address" 
                      value={commentForm.email}
                      onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand transition-all text-sm" 
                    />
                  </div>
                  <textarea 
                    rows={4} 
                    required
                    placeholder="Your thoughts..." 
                    value={commentForm.content}
                    onChange={(e) => setCommentForm({ ...commentForm, content: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 focus:outline-none focus:border-brand transition-all text-sm mb-4 resize-none"
                  ></textarea>

                  <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                    <div className="flex items-center gap-3 bg-slate-100 px-4 py-3 rounded-2xl border border-slate-200">
                      <span className="text-sm font-medium text-slate-700">Solve this:</span>
                      <span className="text-lg font-bold text-brand">{captcha.num1} + {captcha.num2} = </span>
                    </div>
                    <input 
                      type="number" 
                      required
                      placeholder="?" 
                      value={captcha.userAns}
                      onChange={(e) => setCaptcha({ ...captcha, userAns: e.target.value })}
                      className="w-24 bg-white border border-slate-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-brand transition-all text-center font-bold"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={submitting}
                    className="bg-brand text-white px-10 py-4 rounded-2xl font-medium hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 disabled:opacity-50"
                  >
                    {submitting ? "Posting..." : "Post Comment"}
                  </button>
                </form>

                {comments.length > 0 ? (
                  <div className="space-y-6 mt-12 mb-20">
                    {comments.map((comment, i) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={comment.id} 
                        className="bg-[#fafafc] p-8 rounded-[32px] border border-slate-100"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-sm">
                              {comment.author.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900">{comment.author}</p>
                              <p className="text-[11px] text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 font-light leading-relaxed text-sm">
                          {comment.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-slate-400 font-light italic">Be the first to share your thoughts!</p>
                  </div>
                )}
              </div>

              <div className="mt-20 pt-12 border-t border-slate-100">
                  <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand transition-colors mb-8 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog list
                  </Link>
              </div>
            </div>
          </div>

          {/* Sidebar (Right) */}
          <aside className="lg:col-span-4 space-y-12">
            <div className="sticky top-32 space-y-12">
              {/* Recent Articles */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand" /> Recent Articles
                </h3>
                <div className="space-y-6">
                  {recentPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                        <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized={true} />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug group-hover:text-brand transition-colors mb-1">
                          {post.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 font-light">{post.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Categories */}
              <section className="p-8 bg-[#fafafc] rounded-[32px] border border-slate-100">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                  <Tag className="w-4 h-4 text-brand" /> Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((cat) => (
                    <Link 
                      key={cat.name} 
                      href={`/blog?category=${encodeURIComponent(cat.name)}`}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm text-slate-600 group-hover:text-brand transition-colors font-light">{cat.name}</span>
                      <span className="text-[10px] font-bold bg-white px-2 py-1 rounded-lg border border-slate-100 text-slate-400 group-hover:text-brand group-hover:border-brand/20 transition-all">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* Tags Cloud */}
              <section>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-brand" /> Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Link 
                      key={tag} 
                      href={`/blog?tag=${tag}`}
                      className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-light text-slate-500 hover:border-brand hover:text-brand hover:shadow-lg hover:shadow-brand/10 transition-all"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </article>

      {/* Next/Previous Post Navigation */}
      {(prevPost || nextPost) && (
        <section className="py-32 bg-[#fafafc] border-t border-slate-100">
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
