"use server";

import { NextResponse } from "next/server";
import { getServerSession } from "../auth/lib/get-server-session/get-server-session";
import { prisma } from "../prisma/lib/prisma-client/prisma-client";

export const UpdateStatus = async (newstatus: string) => {
  const session = await getServerSession();
  if (!session) {
    return { status: 401 };
  }
  await prisma.user.update({
    where: { id: session.user.id },
    data: { status: newstatus },
  });
  return { status: 200 };
};
