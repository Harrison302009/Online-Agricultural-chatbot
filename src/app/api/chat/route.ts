import { createOllama } from "ollama-ai-provider";
import { StreamingTextResponse, streamText, StreamData } from "ai";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1761629",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "mt1",
  useTLS: true,
});

export const POST = async (req: Request) => {
  const messageInput = await req.json();

  const session = await getServerSession();

  if (!session?.user?.id || !session?.user?.email) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 403,
      },
    );
  }

  const savedMessage = await prisma.chatMessage.create({
    data: {
      message: messageInput.message,
      ownerId: session.user.id,
      image: session.user.image || "new-user_enkjde",
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  await pusher.trigger("chat", "message", {
    ...messageInput,
    username: user?.username,
    createdAt: savedMessage.createdAt,
    owner: user,
    ownerId: session.user.id,
    image: savedMessage.image,
  });

  return NextResponse.json(savedMessage);
};

export interface GetAllChatMessagesResponse {
  messages: ({
    owner: {
      id: string;
      name: string | null;
      email: string | null;
      username: string | null;
      emailVerified: Date | null;
      image: string;
    } | null;
  } & {
    id: number;
    message: string;
    createdAt: Date;
    ownerId: string | null;
    image: string;
  })[];
}

export const GET = async (req: Request) => {
  const messages = await prisma.chatMessage.findMany({
    include: {
      owner: true,
    },
  });
  const session = await getServerSession();
  const user = session.user.name
    ? await prisma.user.findUnique({
        where: {
          username: session.user.name,
        },
      })
    : undefined;

  return NextResponse.json({
    messages,
  });
};
