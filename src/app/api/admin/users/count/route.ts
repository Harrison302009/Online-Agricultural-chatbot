import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await getServerSession();
  const count = await prisma.user.count();
  return NextResponse.json(count);
};
