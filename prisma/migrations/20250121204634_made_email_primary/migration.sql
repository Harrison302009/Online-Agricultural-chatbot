/*
  Warnings:

  - The primary key for the `RegisteredUsers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RegisteredUsers` table. All the data in the column will be lost.
  - Made the column `email` on table `RegisteredUsers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "RegisteredUsers" DROP CONSTRAINT "RegisteredUsers_pkey",
DROP COLUMN "id",
ALTER COLUMN "email" SET NOT NULL,
ADD CONSTRAINT "RegisteredUsers_pkey" PRIMARY KEY ("email");
