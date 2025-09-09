
import { authOptions } from "@/app/api/auth/[...nextauth]/constants";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./components/login-form/login-form";
export const metadata: Metadata = {
  title: "Sign In",
};

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }
  if (session?.user.isBanned) {
    redirect("/banned");
  }

  return <LoginForm />;
}
