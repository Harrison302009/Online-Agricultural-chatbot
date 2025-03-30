"use server";

import { redirect } from "next/navigation";
import { getServerSession } from "../auth/lib/get-server-session/get-server-session";
import { prisma } from "../prisma/lib/prisma-client/prisma-client";

export const NotifHandler = async (count: number) => {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  await prisma.user.update({
    where: { id: session.user.id },
    data: { seenNotifications: count },
  });
  console.log("It is done");
  return { status: 200 };
};
