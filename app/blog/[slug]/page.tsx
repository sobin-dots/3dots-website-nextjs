/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });

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
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `/blog/${slug}`,
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { 
        slug,
        status: "PUBLISHED"
    },


    include: {
      author: {
        select: { 
          name: true, 
          email: true, 
          role: true,
          image: true,
          designation: true,
          about: true,
          socials: true
        }
      },

      comments: {
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });

  if (!post) {
    notFound();
  }

  // Fetch adjacent posts for navigation
  const prevPost = await prisma.post.findFirst({
    where: { 
        date: { lt: post.date },
        status: "PUBLISHED"
    },


    orderBy: { date: "desc" }
  });

  const nextPost = await prisma.post.findFirst({
    where: { 
        date: { gt: post.date },
        status: "PUBLISHED"
    },


    orderBy: { date: "asc" }
  });

  // JSON-LD structured data for article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date.toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author?.name || "3Dots Team"
    },
    "keywords": post.tags?.join(", ") || ""
  };

  const [recentPosts, allPosts, dbCategories] = await Promise.all([
    prisma.post.findMany({
      where: { 
        NOT: { id: post.id }, 
        status: "PUBLISHED"
      },
      orderBy: { date: 'desc' },
      take: 5,
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: { category: true, tags: true }
    }),
    prisma.blogCategory.findMany({
      select: { name: true }
    })
  ]);


  const categoryMap = new Map<string, number>();
  // Initialize with database categories
  dbCategories.forEach((cat:any) => categoryMap.set(cat.name, 0));

  
  allPosts.forEach((p: { category: string, tags: string[] }) => {
    categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
  });
  const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({ name, count }));

  const tags = Array.from(new Set(allPosts.flatMap((p: { tags: string[] }) => p.tags)));

  const serializedPost = {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    readTime: post.readTime,
    image: post.image || "/images/blog/default.jpg",
    authorName: post.author?.name || "Admin",
    authorRole: post.author?.role || "Editor",
    authorDesignation: post.author?.designation,
    authorImage: post.author?.image || "/images/blog/default-author.jpg",
    authorAbout: post.author?.about,
    authorSocials: post.author?.socials,
    tags: post.tags,

    likes: post.likes,
    dislikes: post.dislikes,
    date: post.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    comments: post.comments.map((c: { id: string, author: string, content: string, createdAt: Date }) => ({
      id: c.id,
      author: c.author,
      content: c.content,
      createdAt: c.createdAt.toISOString()
    }))
  };

  const serializedRecent = recentPosts.map((p: { id: string, slug: string, title: string, image: string | null, date: Date }) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    image: p.image || "/images/blog/default.jpg",
    date: p.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  }));

  const serializedPrev = prevPost ? {
    ...prevPost,
    date: prevPost.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } : null;

  const serializedNext = nextPost ? {
    ...nextPost,
    date: nextPost.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostClient 
        post={serializedPost} 
        prevPost={serializedPrev} 
        nextPost={serializedNext} 
        recentPosts={serializedRecent}
        categories={categories}
        tags={tags as string[]}
      />
    </>
  );
}
