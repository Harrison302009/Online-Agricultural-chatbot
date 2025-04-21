/*
  Warnings:

  - Made the column `userId` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `score` on table `Exam` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_userId_fkey";

-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "score" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
