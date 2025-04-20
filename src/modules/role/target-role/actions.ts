"use server";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";

export const SpecificUserRole = async (id: string, role: string) => {
  console.log("role", role);
  await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
  });
};
