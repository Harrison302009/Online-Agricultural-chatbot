import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextResponse } from "next/server";

export const POST = async () => {};
export const GET = async () => {
  const list = await prisma.registeredUsers.findMany();
  return NextResponse.json(list);
};
