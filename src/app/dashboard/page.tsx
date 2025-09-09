import Box from "@mui/material/Box";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { redirect, useSearchParams } from "next/navigation";
import mixpanel from "mixpanel-browser";
import { useSession } from "next-auth/react";
import LoadingSequence from "@/components/loading/sequence";
import AgriculturalDashboard from "./components/container/container";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
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
  let weather;
  if (searchParams && searchParams.weather) {
    weather = searchParams.weather;
    console.log(weather);
  } else {
    weather = 25;
  }
  return (
    <Box>
      <AgriculturalDashboard weather={`${weather}°C`} />
    </Box>
  );
}
