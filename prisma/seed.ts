/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "./generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool as any);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Seed Jobs (Career)
  const jobs = [
    {
      title: "Senior AI Engineer",
      tag: "Engineering",
      description: "We are looking for a Senior AI Engineer to join our team in building cutting-edge AI-driven solutions. You will work on Large Language Models (LLMs), agentic systems, and high-scale automation pipelines. Expertise in Python, PyTorch, and cloud infrastructure is essential.",
      active: true,
    },
    {
      title: "Full Stack Developer",
      tag: "Engineering",
      description: "Join our core engineering team to build scalable web applications using Next.js, TypeScript, and Prisma. You will be responsible for end-to-end features, from UI/UX implementation to database architecture and deployment.",
      active: true,
    },
    {
      title: "Product Designer",
      tag: "Design",
      description: "We need a visionary Product Designer to craft seamless, user-centric experiences for the startups we build. You should have a strong portfolio in SaaS design, design systems, and cinematic web aesthetics.",
      active: true,
    },
  ];

  for (const job of jobs) {
    await prisma.job.create({
      data: job,
    });
  }

  // Seed Posts (Blog)
  const posts = [
    {
      slug: "scaling-startups-with-ai-automation",
      title: "Scaling Startups with AI Automation",
      excerpt: "Explore how AI-powered workflows can accelerate growth and reduce operational costs for early-stage startups.",
      content: "<p>Artificial Intelligence is no longer just a buzzword; it's the engine driving modern startup growth. From automated customer support to intelligent lead qualification, AI is enabling small teams to achieve massive scale.</p><h2>Why Automation Matters</h2><p>For high-growth tech firms, speed is everything. By automating repetitive tasks, founders can focus on strategic innovation instead of manual maintenance.</p>",
      category: "AI & Innovation",
      readTime: "5 min",
      published: true,
      tags: ["AI", "Automation", "Startups", "Growth"],
      authorName: "Anas Ahmed",
      authorRole: "Founder & CTO",
    },
    {
      slug: "modern-product-engineering-excellence",
      title: "The Pillars of Modern Product Engineering",
      excerpt: "Technical rigor combined with creative execution is the secret to building world-class digital products.",
      content: "<p>Engineering excellence is not just about writing clean code; it's about building scalable architecture that lasts. In this post, we dive deep into the 3Dots engineering philosophy.</p><h2>Clean Code vs. Fast Delivery</h2><p>We believe you can have both. By using robust frameworks like Next.js and Prisma, we maintain speed without sacrificing quality.</p>",
      category: "Engineering",
      readTime: "8 min",
      published: true,
      tags: ["Architecture", "Next.js", "Scalability"],
      authorName: "Sarah Chen",
      authorRole: "Senior Engineer",
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  // Seed Admin User
  const adminEmail = "admin@3dots.co";
  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: "admin_password_123", // In a real app, hash this!
      name: "3Dots Administrator",
      role: "Admin",
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
    await prisma.$disconnect();
  });
