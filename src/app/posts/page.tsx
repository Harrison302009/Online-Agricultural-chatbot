import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { redirect } from "next/navigation";
import PostContainer from "./components/container/container";

export default async function Posts() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/login");
  }
  if (session.user.isBanned) {
    redirect("/banned");
  }
  return <PostContainer />;
}
