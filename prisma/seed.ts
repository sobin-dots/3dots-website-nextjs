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

  // 5. Cleanup deprecated email mapping/template before reseeding
  await prisma.formEmailMapping.deleteMany({
    where: { formKey: "job_application_status_change" },
  });
  await prisma.emailTemplate.deleteMany({
    where: { name: "Careers — Status Update" },
  });

  // 5. Seed Email Templates + Form Mappings
  const emailTemplates: Array<{
    name: string;
    subject: string;
    body: string;
    description: string;
    formKey: string;
  }> = [
    {
      name: "Contact — Admin Notification",
      formKey: "contact_admin",
      description: "Sent to admin when someone submits the contact form.",
      subject: "New Contact Inquiry: {{name}}",
      body: `<h2>New Contact Inquiry</h2>
<p><strong>Name:</strong> {{name}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Submitted:</strong> {{submittedAt}}</p>
<hr>
<p>{{message}}</p>`,
    },
    {
      name: "Contact — User Confirmation",
      formKey: "contact_user",
      description: "Auto-reply to the visitor after they submit the contact form.",
      subject: "We've received your message — 3Dots",
      body: `<p>Hi {{name}},</p>
<p>Thanks for reaching out to 3Dots. Our team will review your message and get back to you soon.</p>
<p style="color:#666"><em>For your records:</em><br>{{message}}</p>
<p>— The 3Dots Team</p>`,
    },
    {
      name: "Launchpad — Admin Notification",
      formKey: "launchpad_admin",
      description: "Sent to admin when a Launchpad application is received.",
      subject: "New Launchpad Application: {{startupName}}",
      body: `<h2>New Launchpad Application</h2>
<p><strong>Founder:</strong> {{fullName}} ({{email}})</p>
<p><strong>Mobile:</strong> {{mobileNumber}}</p>
<p><strong>Startup:</strong> {{startupName}}</p>
<p><strong>Category:</strong> {{category}}</p>
<p><strong>Submitted:</strong> {{submittedAt}}</p>
<hr>
<p>{{description}}</p>`,
    },
    {
      name: "Launchpad — User Confirmation",
      formKey: "launchpad_user",
      description: "Auto-reply to the founder confirming their pitch.",
      subject: "Your Launchpad application is in — {{startupName}}",
      body: `<p>Hi {{fullName}},</p>
<p>Thanks for applying to <strong>3Dots Launchpad</strong> with <strong>{{startupName}}</strong>.</p>
<p>Our team is reviewing your pitch and will reach out with next steps shortly.</p>
<p>— 3Dots Launchpad</p>`,
    },
    {
      name: "Careers — Admin Notification",
      formKey: "job_application_admin",
      description: "Sent to HR/admin for every new job application.",
      subject: "New Job Application: {{fullName}} — {{jobTitle}}",
      body: `<h2>New Job Application</h2>
<p><strong>Name:</strong> {{fullName}}</p>
<p><strong>Email:</strong> {{email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Position:</strong> {{jobTitle}}</p>
<p><strong>Resume:</strong> <a href="{{resumeUrl}}">View Resume</a></p>
<p><strong>Submitted:</strong> {{submittedAt}}</p>
<hr>
<p><strong>Cover Letter:</strong></p>
<p>{{coverLetter}}</p>`,
    },
    {
      name: "Careers — Candidate Confirmation",
      formKey: "job_application_user",
      description: "Auto-reply confirming a candidate's application.",
      subject: "We received your application for {{jobTitle}} — 3Dots",
      body: `<p>Hi {{fullName}},</p>
<p>Thanks for applying for the <strong>{{jobTitle}}</strong> role at 3Dots. We've received your application and our team will be in touch if there's a strong fit.</p>
<p>— 3Dots Talent Team</p>`,
    },
    {
      name: "Careers — Shortlist Notification",
      formKey: "job_application_shortlist",
      description: "Sent when the admin shortlists a candidate via 'Inform Applicant'.",
      subject: "Great news! You've been shortlisted for {{jobTitle}}",
      body: `<p>Hi {{fullName}},</p>
<p>We're delighted to let you know that your application for the <strong>{{jobTitle}}</strong> role has been <strong>shortlisted</strong>.</p>
<p>One of our team members will be in touch shortly with the next steps. In the meantime, feel free to reply to this email if you have any questions.</p>
<p>— 3Dots Talent Team</p>`,
    },
    {
      name: "Careers — Rejection Notification",
      formKey: "job_application_reject",
      description: "Sent when the admin rejects a candidate via 'Inform Applicant'.",
      subject: "Update on your application for {{jobTitle}}",
      body: `<p>Hi {{fullName}},</p>
<p>Thank you for your interest in the <strong>{{jobTitle}}</strong> role at 3Dots and for taking the time to apply.</p>
<p>After careful consideration, we've decided not to move forward with your application at this time. This decision wasn't easy — we received many strong applications.</p>
<p>We genuinely appreciate the effort you put in and we wish you all the best in your career journey. We'll keep your details on file and reach out if a more suitable opportunity opens up.</p>
<p>— 3Dots Talent Team</p>`,
    },
    {
      name: "Careers — Under Review Notification",
      formKey: "job_application_reviewing",
      description: "Optional update letting the candidate know their application is under review.",
      subject: "Your application for {{jobTitle}} is under review",
      body: `<p>Hi {{fullName}},</p>
<p>Just a quick note to let you know that your application for the <strong>{{jobTitle}}</strong> role is now being reviewed by our team. We'll get back to you with an update soon.</p>
<p>— 3Dots Talent Team</p>`,
    },
    {
      name: "Careers — Interview Invitation",
      formKey: "interview_invite",
      description:
        "Sent when an admin schedules an interview via the Schedule Interview action.",
      subject: "Interview invitation — {{jobTitle}} at 3Dots",
      body: `<p>Hi {{fullName}},</p>
<p>We'd like to invite you to an interview for the <strong>{{jobTitle}}</strong> role at 3Dots. Please find the details below:</p>
<table cellpadding="8" style="border-collapse:collapse;border:1px solid #e5e7eb;font-size:14px;margin:16px 0">
  <tr><td style="background:#f9fafb"><strong>Date</strong></td><td>{{interviewDate}}</td></tr>
  <tr><td style="background:#f9fafb"><strong>Time</strong></td><td>{{interviewTime}}</td></tr>
  <tr><td style="background:#f9fafb"><strong>Mode</strong></td><td>{{interviewMode}}</td></tr>
  <tr><td style="background:#f9fafb"><strong>Location / Link</strong></td><td>{{interviewLocation}}</td></tr>
  <tr><td style="background:#f9fafb"><strong>Interviewer</strong></td><td>{{interviewerName}}</td></tr>
</table>
<p><strong>What to prepare:</strong><br>{{requirements}}</p>
<p><strong>Notes:</strong><br>{{notes}}</p>
<p>Please confirm by replying to this email. If the proposed time doesn't work, let us know and we'll find an alternative.</p>
<p>Looking forward to speaking with you.</p>
<p>— 3Dots Talent Team</p>`,
    },
    {
      name: "Newsletter — Welcome",
      formKey: "newsletter_user",
      description: "Welcome email after a successful newsletter subscription.",
      subject: "Welcome to 3Dots",
      body: `<p>Hi,</p>
<p>Thanks for subscribing to the 3Dots newsletter. You'll get our latest stories, AI insights, and product updates straight to your inbox.</p>
<p style="font-size:12px;color:#888">No longer interested? <a href="{{unsubscribeUrl}}">Unsubscribe</a>.</p>`,
    },
    {
      name: "Newsletter — Admin Notification",
      formKey: "newsletter_admin",
      description: "Sent to admin when someone subscribes.",
      subject: "New Newsletter Subscriber",
      body: `<p>{{email}} subscribed to the newsletter at {{submittedAt}}.</p>`,
    },
    {
      name: "Appointment — Client Confirmation",
      formKey: "appointment_user",
      description: "Sent to the client after they book an appointment.",
      subject: "Your appointment with {{expertName}} is confirmed",
      body: `<p>Hi {{clientName}},</p>
<p>Your appointment with <strong>{{expertName}}</strong> is confirmed for <strong>{{date}}</strong>.</p>
<p><strong>Reason:</strong> {{reason}}</p>
<p>— 3Dots</p>`,
    },
    {
      name: "Appointment — Admin Notification",
      formKey: "appointment_admin",
      description: "Sent to admin when an appointment is booked.",
      subject: "New appointment booked — {{clientName}}",
      body: `<p>{{clientName}} ({{clientEmail}}) booked an appointment with <strong>{{expertName}}</strong> on <strong>{{date}}</strong>.</p>
<p><strong>Reason:</strong> {{reason}}</p>`,
    },
  ];

  for (const t of emailTemplates) {
    const template = await prisma.emailTemplate.upsert({
      where: { name: t.name },
      update: {
        subject: t.subject,
        body: t.body,
        description: t.description,
        isActive: true,
      },
      create: {
        name: t.name,
        subject: t.subject,
        body: t.body,
        description: t.description,
        isActive: true,
      },
    });

    await prisma.formEmailMapping.upsert({
      where: { formKey: t.formKey },
      update: { templateId: template.id, enabled: true },
      create: { formKey: t.formKey, templateId: template.id, enabled: true },
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
