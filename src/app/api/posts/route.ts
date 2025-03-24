import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { content, image1, image2, image3, image4, image5 } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }
  await prisma.posts.create({
    data: {
      authorId: session.user.id,
      content,
      image1,
      image2,
      image3,
      image4,
      image5,
      avatar: session.user.image,
      name: session.user.name,
    },
  });
  return NextResponse.json(
    { message: "Post saved successfully" },
    { status: 200 },
  );
};

export const GET = async () => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
  }
  const posts = await prisma.posts.findMany();
  return NextResponse.json(posts);
};
