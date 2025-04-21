import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { examId, userId } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await prisma.user.update({
    where: { id: userId },
    data: { ApplicationStatus: "APPROVED" },
  });
  await prisma.exam.update({
    where: { examId: examId },
    data: { score: 100 },
  });
  return NextResponse.json(
    { message: "Successfully approved" },
    { status: 200 },
  );
};
