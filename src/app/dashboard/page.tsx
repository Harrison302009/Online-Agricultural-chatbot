import { Box } from "@mui/material";
import Container from "./components/container/container";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { redirect } from "next/navigation";
import mixpanel from "mixpanel-browser";

export default async function Dashboard() {
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
