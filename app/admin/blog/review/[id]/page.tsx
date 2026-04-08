"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Loader2, 
  User as UserIcon, 
  Calendar,
  MessageSquare,
  Eye
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { blogStatuses } from "@/lib/rbac";

export default function BlogReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<any>(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setLoading(false);
      });
  }, [id]);

  const handleAction = async (status: string) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          published: status === "PUBLISHED",
          reviewComment: comment
        })
      });

      if (res.ok) {
        router.push("/admin/blog");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-brand animate-spin" />
        <p className="text-slate-400 font-light tracking-wide">Retrieving article for review...</p>
      </div>
    );
  }

  const currentStatus = blogStatuses.find(s => s.value === post.status);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-brand hover:border-brand/30 transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-light text-slate-800 tracking-tight">
              Review <span className="font-medium">Article</span>
            </h1>
            <p className="text-slate-500 font-light text-sm mt-1">
              Verify content quality and editorial standards.
            </p>
          </div>
        </div>
        
        <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${currentStatus?.color}`}>
            {currentStatus?.label}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-8">
             <div className="space-y-4">
               <h2 className="text-2xl font-semibold text-slate-800 leading-tight">{post.title}</h2>
               <div className="flex items-center gap-6 text-sm text-slate-400 font-light">
                  <div className="flex items-center gap-2">
                    <UserIcon className="w-4 h-4" /> {post.authorName || "Team Member"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {new Date(post.date).toLocaleDateString()}
                  </div>
               </div>
             </div>

             {post.image && (
                <div className="aspect-video relative rounded-3xl overflow-hidden bg-slate-50">
                   <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>
             )}

             <div className="prose prose-slate max-w-none">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-600 mb-8" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
             </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                 <MessageSquare className="w-5 h-5 text-brand" />
                 <h3 className="text-lg font-medium text-slate-800">Review Actions</h3>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Review Feedback</label>
                 <textarea 
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 focus:outline-none focus:border-brand text-sm transition-all resize-none"
                    placeholder="Write feedback for the author..."
                 />
              </div>

              <div className="space-y-3">
                 <button 
                    onClick={() => handleAction("PUBLISHED")}
                    disabled={submitting}
                    className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                 >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CheckCircle2 className="w-5 h-5" />}
                    Approve & Publish
                 </button>

                 <button 
                    onClick={() => handleAction("CHANGES_REQUESTED")}
                    disabled={submitting}
                    className="w-full bg-amber-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20 disabled:opacity-50"
                 >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                    Request Changes
                 </button>

                 <button 
                    onClick={() => handleAction("REJECTED")}
                    disabled={submitting}
                    className="w-full bg-slate-100 text-slate-600 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-200 transition-all disabled:opacity-50"
                 >
                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                    Reject Article
                 </button>
              </div>
           </div>

           <Link 
              href={`/admin/blog/edit/${post.id}`}
              className="flex items-center justify-center gap-2 w-full p-4 bg-white border border-slate-100 rounded-2xl text-slate-500 hover:text-brand hover:border-brand/20 transition-all shadow-sm"
           >
              <Eye className="w-4 h-4" /> Full Editor View
           </Link>
        </div>
      </div>
    </div>
  );
}
