-- CreateTable
CREATE TABLE "Comments" (
    "id" TEXT NOT NULL,
    "value" TEXT,
    "avatar" TEXT,
    "name" TEXT,
    "commentid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commentid_fkey" FOREIGN KEY ("commentid") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
