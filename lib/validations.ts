import { z } from "zod";

// Blog Validation
export const blogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  image: z.string().optional().nullable(),
  category: z.string().min(2, "Category is required"),
  readTime: z.string().min(1, "Read time is required"),
  published: z.boolean().default(false),
  date: z.string().or(z.date()).optional(),
  tags: z.array(z.string()).optional(),
});

export type BlogPostInput = z.infer<typeof blogPostSchema>;

// Blog Category Validation
export const blogCategorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
});

export type BlogCategoryInput = z.infer<typeof blogCategorySchema>;

export const commentSchema = z.object({
  postId: z.string(),
  author: z.string().min(2, "Name is required"),
  content: z.string().min(5, "Comment must be at least 5 characters"),
});

export type CommentInput = z.infer<typeof commentSchema>;

// Career Validation
export const jobSchema = z.object({
  slug: z.string().min(2, "Slug is required").optional(),
  title: z.string().min(3, "Title is required"),
  tag: z.string().min(2, "Tag is required (e.g. ENGINEERING • FULL-TIME)"),
  type: z.string().default("Full-Time"),
  location: z.string().default("Remote / Hybrid"),
  about: z.string().optional().nullable(),
  description: z.string().min(20, "Description is required"),
  sections: z.array(z.object({
    title: z.string(),
    items: z.array(z.string())
  })).optional(),
  howToApply: z.string().optional().nullable(),
  active: z.boolean().default(true),
});

export type JobInput = z.infer<typeof jobSchema>;

export const jobApplicationSchema = z.object({
  jobId: z.string().optional().nullable(),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  resumeUrl: z.string().url("Invalid resume URL"),
  coverLetter: z.string().optional().nullable(),
  additionalInfo: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
});

export type JobApplicationInput = z.infer<typeof jobApplicationSchema>;

// Lead Validation
export const contactInquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

export const launchpadApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  startupName: z.string().min(2, "Startup name is required"),
  description: z.string().min(20, "Project description is required"),
  mobileNumber: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
});

export type LaunchpadApplicationInput = z.infer<typeof launchpadApplicationSchema>;

// Services Validation
export const serviceSchema = z.object({
  title: z.string().min(3, "Title is required"),
  slug: z.string().min(2, "Slug is required"),
  shortDescription: z.string().min(10, "Short description is required"),
  fullDescription: z.string().min(50, "Full description is required"),
  image: z.string().optional().nullable(),
  features: z.array(z.object({
    title: z.string(),
    description: z.string()
  })).optional(),
  benefits: z.array(z.string()).optional(),
});

export type ServiceInput = z.infer<typeof serviceSchema>;

// Team Validation
export const teamMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  role: z.string().min(2, "Role is required"),
  image: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  socials: z.record(z.string(), z.string()).optional().nullable(),
  order: z.number().int().default(0),
});

export type TeamMemberInput = z.infer<typeof teamMemberSchema>;

// Appointment Validation
export const appointmentSchema = z.object({
  expertId: z.string(),
  clientName: z.string().min(2, "Name is required"),
  clientEmail: z.string().email("Invalid email address"),
  clientPhone: z.string().optional().nullable(),
  date: z.string().or(z.date()), // Support both string and Date objects
  reason: z.string().optional().nullable(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

// User Validation
export const userSchema = z.object({
  name: z.string().min(2, "Name is required").optional().nullable(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  password: z.string().min(6, "Password must be at least 6 characters").optional().or(z.literal("")),
  role: z.string().min(2, "Role is required"),
});

export type UserInput = z.infer<typeof userSchema>;
