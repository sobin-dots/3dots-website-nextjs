/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "../prisma/generated-client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL }) as any;
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Global instance to prevent multiple connections in development
export const prisma = (globalForPrisma as any).prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") (globalForPrisma as any).prisma = prisma;
