/*
  Warnings:

  - The values [PEMDING] on the enum `AppStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppStatus_new" AS ENUM ('NEUTRAL', 'PENDING', 'DECLINED', 'APPROVED');
ALTER TABLE "User" ALTER COLUMN "ApplicationStatus" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "ApplicationStatus" TYPE "AppStatus_new" USING ("ApplicationStatus"::text::"AppStatus_new");
ALTER TYPE "AppStatus" RENAME TO "AppStatus_old";
ALTER TYPE "AppStatus_new" RENAME TO "AppStatus";
DROP TYPE "AppStatus_old";
ALTER TABLE "User" ALTER COLUMN "ApplicationStatus" SET DEFAULT 'NEUTRAL';
COMMIT;
