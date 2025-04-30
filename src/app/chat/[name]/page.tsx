import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { prisma } from "@/modules/prisma/lib/prisma-client/prisma-client";
import { Box } from "@mui/joy";
import { redirect } from "next/navigation";
import Container from "../components/container/container";

export default async function ChatRoomPage({
  params,
}: {
  params: {
    ["name"]: string;
  };
}) {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.isBanned) {
    redirect("/banned");
  }

  const name = params["name"];

  let room = await prisma.chatRoom.findUnique({
    where: {
      name,
    },
  });

  if (!room) {
    room = await prisma.chatRoom.create({
      data: {
        name,
      },
    });
  }

  return (
    <Box>
      <Container chatroom={{ id: room.id, name: room.name }} />
    </Box>
  );
}
