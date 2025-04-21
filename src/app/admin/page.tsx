import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import AdminContainer from "./components/admin-component/admin-component";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }
  return <AdminContainer />;
}
