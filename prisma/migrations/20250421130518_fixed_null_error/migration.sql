/*
  Warnings:

  - Made the column `Answer1` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Certificate` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Answer2` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Answer3` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Answer4` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Answer5` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Answer6` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Answer7` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Answer8` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Answer9` on table `Exam` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Answer10` on table `Exam` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "Answer1" SET NOT NULL,
ALTER COLUMN "Certificate" SET NOT NULL,
ALTER COLUMN "Answer2" SET NOT NULL,
ALTER COLUMN "Answer3" SET NOT NULL,
ALTER COLUMN "Answer4" SET NOT NULL,
ALTER COLUMN "Answer5" SET NOT NULL,
ALTER COLUMN "Answer6" SET NOT NULL,
ALTER COLUMN "Answer7" SET NOT NULL,
ALTER COLUMN "Answer8" SET NOT NULL,
ALTER COLUMN "Answer9" SET NOT NULL,
ALTER COLUMN "Answer10" SET NOT NULL;
