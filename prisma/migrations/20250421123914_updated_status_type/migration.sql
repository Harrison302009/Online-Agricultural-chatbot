/*
  Warnings:

  - The `ApplicationStatus` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM ('NEUTRAL', 'PEMDING', 'DECLINED', 'APPROVED');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ApplicationStatus",
ADD COLUMN     "ApplicationStatus" "AppStatus" NOT NULL DEFAULT 'NEUTRAL';
