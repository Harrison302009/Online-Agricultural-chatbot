import { Box } from "@mui/material";
import Container from "./components/container/container";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { redirect } from "next/navigation";
import mixpanel from "mixpanel-browser";
import { useSession } from "next-auth/react";
import LoadingSequence from "@/components/loading/sequence";

export default async function Dashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.isBanned) {
    redirect("/banned");
  }
  if (!session.user.name) {
    redirect("/info");
  }
  if (
    session.user.role === "Agricultural Researcher" &&
    !session.user.hasPendingApplications
  ) {
    redirect("/survey");
  }
  return (
    <Box>
      <Container />
    </Box>
  );
}
