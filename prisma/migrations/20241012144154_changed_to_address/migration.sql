/*
  Warnings:

  - You are about to drop the column `streetAddress` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "streetAddress",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT 'Unknown';
