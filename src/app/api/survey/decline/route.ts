import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { userId, examId } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.exam.update({
    where: { examId: examId },
    data: { score: 0 },
  });
  await prisma.user.update({
    where: { id: userId },
    data: { ApplicationStatus: "DECLINED" },
  });
  return NextResponse.json(
    { message: "Successfully returned" },
    { status: 200 },
  );
};
