-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ApplicationStatus" TEXT,
ADD COLUMN     "hasPendingApplications" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Exam" (
    "examId" TEXT NOT NULL,
    "userId" TEXT,
    "Answer1" TEXT,
    "Certificate" TEXT,
    "Answer2" TEXT,
    "Answer3" TEXT,
    "Answer4" TEXT,
    "Answer5" TEXT,
    "Answer6" TEXT,
    "Answer7" TEXT,
    "Answer8" TEXT,
    "Answer9" TEXT,
    "Answer10" TEXT,
    "score" DOUBLE PRECISION,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("examId")
);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
