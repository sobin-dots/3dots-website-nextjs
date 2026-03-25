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

  // 1. Seed Admin User First (Critical for Relations)
  const adminEmail = "admin@3dots.co";
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: "admin_password_123", // In a real app, hash this!
      name: "3Dots Administrator",
      role: "Admin",
    },
  });

  // 2. Seed Jobs (Career)
  const jobs = [
    {
      slug: "3d-artist",
      title: "3D Artist",
      tag: "CREATIVE • FULL-TIME",
      type: "Full-Time",
      location: "Remote / Hybrid",
      description: "We are looking for a talented 3D Artist to join our creative team. Bring creative concepts to life through detailed modeling, texturing, and lighting.",
      about: "We are looking for a talented 3D Artist to join our creative team. As a 3D Artist, you'll be responsible for creating high-quality assets and environments, bringing creative concepts to life through detailed modeling, texturing, and lighting. You'll work on diverse projects ranging from product visualization to character development, collaborating with our accomplished team of artists and designers.",
      sections: [
        {
          title: "Responsibilities",
          items: [
            "Create high-quality 3D models, environments, and assets for various projects.",
            "Develop and maintain proper UV layouts and texture maps.",
            "Set up materials and shaders for realistic rendering.",
            "Create and optimize topology for production use.",
            "Implement proper lighting setups for different scenarios.",
            "Ensure models meet technical specifications and poly-count requirements.",
            "Collaborate with art directors and other artists to maintain visual consistency.",
            "Participate in review sessions and provide constructive feedback.",
            "Document workflows and maintain organized scene files."
          ]
        },
        {
          title: "Requirements",
          items: [
            "2-4 years of professional 3D modeling and texturing experience.",
            "Strong portfolio demonstrating variety in organic and hard-surface modeling.",
            "Expert knowledge of Maya, ZBrush, or similar 3D modeling software.",
            "Proficiency in texturing tools like Substance Painter/Designer.",
            "Strong understanding of PBR materials and texturing workflows.",
            "Experience with UV unwrapping and topology optimization.",
            "Knowledge of current rendering engines (V-Ray, Arnold, or similar).",
            "Understanding of composition and color theory."
          ]
        }
      ],
      active: true,
    },
    {
      slug: "senior-ai-engineer",
      title: "Senior AI Engineer",
      tag: "ENGINEERING • FULL-TIME",
      type: "Full-Time",
      location: "Remote",
      description: "We are looking for a Senior AI Engineer to join our team in building cutting-edge AI-driven solutions.",
      about: "We are looking for a Senior AI Engineer to join our team in building cutting-edge AI-driven solutions. You will work on Large Language Models (LLMs), agentic systems, and high-scale automation pipelines. Expertise in Python, PyTorch, and cloud infrastructure is essential.",
      sections: [],
      active: true,
    },
    {
      slug: "full-stack-developer",
      title: "Full Stack Developer",
      tag: "ENGINEERING • FULL-TIME",
      type: "Full-Time",
      location: "Hybrid",
      description: "Join our core engineering team to build scalable web applications using Next.js, TypeScript, and Prisma.",
      about: "Join our core engineering team to build scalable web applications using Next.js, TypeScript, and Prisma. You will be responsible for end-to-end features, from UI/UX implementation to database architecture and deployment.",
      sections: [],
      active: true,
    },
  ];

  // Try to clean up jobs ONLY IF no applications are linked, or provide it without wiping
  // In a seed script, upserting is safer than deleting if you have relations
  for (const job of jobs) {
    await prisma.job.upsert({
        where: { slug: job.slug },
        update: job,
        create: job
    });
  }

  // 3. Seed Posts (Blog) with Relation
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
      authorId: adminUser.id,
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
      authorId: adminUser.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { authorId: adminUser.id },
      create: post,
    });
  }

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
