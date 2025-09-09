import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { comment, postId } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await prisma.posts.update({
    where: { id: postId },
    data: {
      Comments: {
        create: {
          avatar: session.user.image,
          name: session.user.name,
          value: comment,
        },
      },
    },
  });
  return NextResponse.json(
    { message: "Comment Registered successfully" },
    { status: 200 },
  );
};

export const GET = async () => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const comments = await prisma.comments.findMany();
  return NextResponse.json(comments);
};
