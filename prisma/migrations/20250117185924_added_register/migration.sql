-- CreateTable
CREATE TABLE "RegisteredUsers" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "RegisteredUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RegisteredUsers_email_key" ON "RegisteredUsers"("email");
