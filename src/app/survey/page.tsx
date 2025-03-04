import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import SurveyContainer from "./components/container/container";
import { redirect } from "next/navigation";

export default async function Survey() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.isBanned) {
    redirect("/banned");
  }
  if (session.user.role !== "Agricultural Researcher" || "admin") {
    redirect("/dashboard");
  }
  if (
    (session.user.role === "Agricultural Researcher" &&
      session.user.ApplicationStatus === "PENDING") ||
    "DECLINED" ||
    "APPROVED"
  ) {
    redirect("/dashboard");
  }
  return <SurveyContainer />;
}
