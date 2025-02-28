import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { redirect } from "next/navigation";
import Container from "./components/container/container";

export default async function RegistrationInformation() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.isBanned) {
    redirect("/banned");
  }
  if (session.user.name) {
    redirect("/dashboard");
  }
  return <Container />;
}
