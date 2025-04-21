import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { redirect } from "next/navigation";
import UsersContainer from "../components/users-container/users-container";

export default async function Users() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }
  return <UsersContainer />;
}
