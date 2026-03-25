/*
  Warnings:

  - You are about to drop the column `budgetRange` on the `LaunchpadApplication` table. All the data in the column will be lost.
  - You are about to drop the column `projectName` on the `LaunchpadApplication` table. All the data in the column will be lost.
  - You are about to drop the column `timeline` on the `LaunchpadApplication` table. All the data in the column will be lost.
  - You are about to drop the column `authorImage` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorName` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `authorRole` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - The required column `slug` was added to the `Job` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `startupName` to the `LaunchpadApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "about" TEXT,
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Remote / Hybrid',
ADD COLUMN     "sections" JSONB,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Full-Time';

-- AlterTable
ALTER TABLE "LaunchpadApplication" DROP COLUMN "budgetRange",
DROP COLUMN "projectName",
DROP COLUMN "timeline",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "mobileNumber" TEXT,
ADD COLUMN     "startupName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorImage",
DROP COLUMN "authorName",
DROP COLUMN "authorRole",
ADD COLUMN     "authorId" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'Admin';

-- CreateIndex
CREATE UNIQUE INDEX "Job_slug_key" ON "Job"("slug");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
