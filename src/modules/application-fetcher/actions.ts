"use server";
import { prisma } from "../prisma/lib/prisma-client/prisma-client";

export const ApplicationFetcher = async (id: string) => {
  const response = await prisma.exam.findFirst({
    where: { userId: id },
  });
  return response;
};
