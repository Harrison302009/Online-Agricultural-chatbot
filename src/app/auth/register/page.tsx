import { authOptions } from "@/app/api/auth/[...nextauth]/constants";
import { type Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegistrationForm from "./components/container/container";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }

  return <RegistrationForm />;
}
