"use server";
import { getServerSession } from "../../auth/lib/get-server-session/get-server-session";
import { prisma } from "../../prisma/lib/prisma-client/prisma-client";

export const DeletePost = async (id: string) => {
  const session = await getServerSession();
  if (!session) {
    return { status: 401 };
  }
  await prisma.posts.delete({
    where: {
      id,
    },
  });
  return { status: 200 };
};
