import "../globalicons.css";
import PlanHolder from "./components/container/container";
import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { redirect } from "next/navigation";

export default async function PlansAndPricing() {
  const session = await getServerSession();
  if (session) {
    if (session.user.role !== "admin") {
      redirect("/dashboard");
    }
  }

  return <PlanHolder />;
}
