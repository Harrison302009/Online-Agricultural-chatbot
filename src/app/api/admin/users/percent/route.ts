import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextResponse } from "next/server";

export const GET = async () => {
  const now = new Date();
  const past30Days = new Date(now.setDate(now.getDate() - 30));

  // Query for users who logged in within the last 30 days
  const activeUsers = await prisma.user.count({
    where: {
      lastLogin: {
        gte: past30Days,
      },
    },
  });
  const totalUsers = await prisma.user.count();
  const activeUsersCount = ((activeUsers / totalUsers) * 100).toFixed(1); // Convert to percentage
  console.log(activeUsersCount);
  return NextResponse.json(activeUsersCount);
};
