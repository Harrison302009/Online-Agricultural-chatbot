"use server";
import { getServerSession } from "../auth/lib/get-server-session/get-server-session";
import { prisma } from "../prisma/lib/prisma-client/prisma-client";

export const PostDelete = async (random: string) => {
  const session = await getServerSession();
  if (!session) {
    return { status: 401 };
  }
  console.log(random);
  await prisma.posts.deleteMany();
  return { status: 200 };
};
