-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "course" TEXT,
ADD COLUMN     "currentCompany" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "experienceYear" TEXT,
ADD COLUMN     "isStudent" BOOLEAN DEFAULT false,
ADD COLUMN     "referredRole" TEXT,
ADD COLUMN     "yearOfStudy" TEXT;
