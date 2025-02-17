-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('new', 'basic', 'premium');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'new';
