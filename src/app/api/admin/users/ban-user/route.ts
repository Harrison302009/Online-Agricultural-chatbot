import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { userId } = await req.json();
  const session = await getServerSession();
  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 },
    );
  }
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isBanned: true,
    },
  });
  return NextResponse.json(
    { message: "Banned user successfully" },
    { status: 200 },
  );
};
