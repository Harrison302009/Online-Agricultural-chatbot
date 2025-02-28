import React from "react";
import { Box } from "@mui/material";
import "../globalicons.css";
import { redirect } from "next/navigation";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import Container from "./components/container/container";

export default async function Chat() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.isBanned) {
    redirect("/banned");
  }

  return (
    <Box>
      <Container />
    </Box>
  );
}
