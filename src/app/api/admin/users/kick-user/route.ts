import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (req: NextRequest) => {
  const { userId } = await req.json();
  const session = await getServerSession();
  if (session.user.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized access" },
      { status: 403 },
    );
  }
  await prisma.user.delete({
    where: {
      id: userId,
    },
  });
  return NextResponse.json(
    { message: "User deleted successfully" },
    { status: 200 },
  );
};
