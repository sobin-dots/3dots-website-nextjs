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
  console.log("Seeding database with updated RBAC roles and workflows...");

  // 1. Seed Admin & Managers
  const adminEmail = "admin@3dots.co";
  const hrEmail = "hr@3dots.co";
  const contentManagerEmail = "editor@3dots.co";
  const teamMemberEmail = "worker@3dots.co";

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
        role: "Admin",
        employeeId: "ADM-001"
    },
    create: {
      email: adminEmail,
      password: "admin_password_123",
      name: "3Dots Administrator",
      role: "Admin",
      employeeId: "ADM-001",
      designation: "Principal Architect",
      about: "Lead administrator and architect of the 3Dots master platform.",
      socials: {
        linkedin: "https://linkedin.com/company/3dots",
        twitter: "https://twitter.com/3dots_co"
      }
    },
  });

  await prisma.user.upsert({
    where: { email: hrEmail },
    update: { role: "Hr manager", employeeId: "HR-001" },
    create: {
      email: hrEmail,
      password: "hr_password_123",
      name: "Sarah Jenkins",
      role: "Hr manager",
      employeeId: "HR-001",
      designation: "Head of People",
      about: "Managing talent and culture at 3Dots.",
    },
  });

  const contentManager = await prisma.user.upsert({
    where: { email: contentManagerEmail },
    update: { role: "Content Manager", employeeId: "CM-001" },
    create: {
      email: contentManagerEmail,
      password: "editor_password_123",
      name: "Mark Thompson",
      role: "Content Manager",
      employeeId: "CM-001",
      designation: "Editorial Director",
      about: "Overseeing all content strategy and publishing.",
    },
  });

  const teamMember = await prisma.user.upsert({
    where: { email: teamMemberEmail },
    update: { role: "Content Team", employeeId: "CT-001" },
    create: {
      email: teamMemberEmail,
      password: "team_password_123",
      name: "Alex Rivera",
      role: "Content Team",
      employeeId: "CT-001",
      designation: "Junior Copywriter",
      about: "Creative writer focusing on AI trends.",
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
      description: "We are looking for a talented 3D Artist to join our creative team.",
      about: "As a 3D Artist, you'll be responsible for creating high-quality assets and environments...",
      active: true,
    },
    {
      slug: "senior-ai-engineer",
      title: "Senior AI Engineer",
      tag: "ENGINEERING • FULL-TIME",
      type: "Full-Time",
      location: "Remote",
      description: "We are looking for a Senior AI Engineer to build cutting-edge AI-driven solutions.",
      about: "Expertise in Python, PyTorch, and LLMs is required.",
      active: true,
    }
  ];

  for (const job of jobs) {
    await prisma.job.upsert({
        where: { slug: job.slug },
        update: job,
        create: job as any
    });
  }

  // 3. Seed Blog Categories
  const categories = [
    { name: "AI & Innovation", slug: "ai-innovation" },
    { name: "Technology", slug: "technology" },
    { name: "Engineering", slug: "engineering" },
    { name: "Creative", slug: "creative" },
    { name: "Company", slug: "company" },
  ];

  for (const cat of categories) {
    await prisma.blogCategory.upsert({
        where: { slug: cat.slug },
        update: cat,
        create: cat
    });
  }

  // 4. Seed Posts (Blog) with Status Workflow

  const posts = [
    {
      slug: "scaling-startups-with-ai-automation",
      title: "Scaling Startups with AI Automation",
      excerpt: "Explore how AI-powered workflows can accelerate growth.",
      content: "<p>Artificial Intelligence is the engine driving modern startup growth...</p>",
      category: "AI & Innovation",
      readTime: "5 min",
      published: true,
      status: "PUBLISHED",
      image: "/images/blog/default.jpg",
      thumbnail: "/images/blog/default.jpg",
      tags: ["AI", "Automation"],
      authorId: adminUser.id,
    },
    {
      slug: "future-of-agentic-workflows",
      title: "The Future of Agentic Workflows",
      excerpt: "Why autonomous agents are the next frontier.",
      content: "<p>Agents that can plan and execute are changing software development...</p>",
      category: "Technology",
      readTime: "10 min",
      published: false,
      status: "PENDING_REVIEW",
      image: "/images/blog/default.jpg",
      thumbnail: "/images/blog/default.jpg",
      tags: ["AI Agents", "Workflows"],
      authorId: teamMember.id,
    },
    {
        slug: "design-systems-at-scale",
        title: "Design Systems at Scale",
        excerpt: "Building consistent UIs across large organizations.",
        content: "<p>Design systems are the bridge between design and engineering...</p>",
        category: "Creative",
        readTime: "7 min",
        published: false,
        status: "DRAFT",
        image: "/images/blog/default.jpg",
        thumbnail: "/images/blog/default.jpg",
        tags: ["Design", "Systems"],
        authorId: contentManager.id,
      },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: { 
          status: post.status,
          published: post.published,
          authorId: post.authorId 
      },
      create: post as any,
    });
  }

  console.log("Seeding complete! 🚀");
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
