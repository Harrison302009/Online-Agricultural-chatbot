"use server";
import { prisma } from "../prisma/lib/prisma-client/prisma-client";

export const UserCounter = async () => {
  const users = await prisma.user.count();
  console.log(users);
  return users;
};
