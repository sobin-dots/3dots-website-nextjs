import { notFound } from "next/navigation";
import { blogPosts } from "../data";
import BlogPostClient from "./BlogPostClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | 3Dots Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = blogPosts[postIndex];

  // Calculate Next and Previous blogs dynamically over the array
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;

  // JSON-LD structured data for article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date, // In production, this should be ISO format
    "author": {
      "@type": "Organization",
      "name": "3Dots Editorial"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient post={post} prevPost={prevPost} nextPost={nextPost} />
    </>
  );
}
