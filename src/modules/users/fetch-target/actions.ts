"use server";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";

export const TargetFetcher = async (id: string) => {
  const target = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });
  return target;
};
