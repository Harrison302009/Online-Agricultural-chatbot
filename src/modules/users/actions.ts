"use server";
import { prisma } from "../prisma/lib/prisma-client/prisma-client";

export const TotalUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};
