import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { registration } = await req.json();
  const session = await getServerSession();
  // For now, until the payment method is figured out, just update it on the user's status
  console.log("Your suggested plan:", registration);
  const application = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      plan: registration,
    },
  });
  const block = await prisma.user.findMany({
    where: {
      id: session.user.id,
    },
  });
  return NextResponse.json(block);
};

export const GET = async () => {
  const session = await getServerSession();
  const user = await prisma.user.findMany({
    where: {
      id: session.user.id,
    },
  });
  return NextResponse.json(user);
};
