-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "interviewStatus" TEXT NOT NULL DEFAULT 'NOT_SCHEDULED',
ADD COLUMN     "statusRemark" TEXT;
