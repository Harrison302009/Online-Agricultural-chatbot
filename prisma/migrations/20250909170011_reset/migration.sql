-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_userId_fkey";

-- AlterTable
ALTER TABLE "Exam" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "Answer1" DROP NOT NULL,
ALTER COLUMN "Certificate" DROP NOT NULL,
ALTER COLUMN "Answer2" DROP NOT NULL,
ALTER COLUMN "Answer3" DROP NOT NULL,
ALTER COLUMN "Answer4" DROP NOT NULL,
ALTER COLUMN "Answer5" DROP NOT NULL,
ALTER COLUMN "Answer6" DROP NOT NULL,
ALTER COLUMN "Answer7" DROP NOT NULL,
ALTER COLUMN "Answer8" DROP NOT NULL,
ALTER COLUMN "Answer9" DROP NOT NULL,
ALTER COLUMN "Answer10" DROP NOT NULL,
ALTER COLUMN "score" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "seenNotifications" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "image" SET DEFAULT 'inc9foypm6vykbdcdqya',
ALTER COLUMN "role" SET DEFAULT 'user';

-- CreateTable
CREATE TABLE "Posts" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "authorId" TEXT,
    "name" TEXT,
    "image1" TEXT,
    "image2" TEXT,
    "image3" TEXT,
    "image4" TEXT,
    "image5" TEXT,
    "video" TEXT,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "value" TEXT,
    "avatar" TEXT,
    "name" TEXT,
    "commentid" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commentid_fkey" FOREIGN KEY ("commentid") REFERENCES "Posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
