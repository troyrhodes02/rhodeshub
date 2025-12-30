-- CreateEnum
CREATE TYPE "JobApplicationStatus" AS ENUM ('APPLIED', 'INTERVIEW', 'REJECTED', 'OFFER');

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "dateApplied" TIMESTAMP(3) NOT NULL,
    "status" "JobApplicationStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);
