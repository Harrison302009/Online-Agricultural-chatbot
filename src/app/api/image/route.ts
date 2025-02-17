import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { image } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json(
      { error: "Unable to get user information" },
      { status: 403 },
    );
  }
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      image,
    },
  });
  return NextResponse.json(
    { message: "Image updated successfully" },
    { status: 200 },
  );
};
