import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unãuthorized" }, { status: 401 });
  }
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
};
