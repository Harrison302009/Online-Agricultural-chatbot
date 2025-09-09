-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_commentid_fkey";

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "commentid" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commentid_fkey" FOREIGN KEY ("commentid") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
