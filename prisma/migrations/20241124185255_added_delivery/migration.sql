-- CreateTable
CREATE TABLE "MessageSent" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" TEXT,

    CONSTRAINT "MessageSent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MessageSent" ADD CONSTRAINT "MessageSent_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
