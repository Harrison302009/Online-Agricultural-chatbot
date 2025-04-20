"use server";
import { getServerSession } from "../auth/lib/get-server-session/get-server-session";
import { prisma } from "../prisma/lib/prisma-client/prisma-client";

export const RoleHandler = async (role: string) => {
  const session = await getServerSession();
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      role,
    },
  });
  return { status: 200 };
};
