import { getServerSession } from "@/modules/auth/lib/get-server-session/get-server-session";
import { NextRequest, NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: "1761629",
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "mt1",
  useTLS: true,
});
export const POST = async (req: NextRequest) => {
  const { name, email } = await req.json();
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const sokoh = await pusher.trigger("presence-channel", "typing", {
    name,
    email,
  });
  if (sokoh) {
    console.log(`Typist name is ${name} and his email is ${email}`);
  }
  return NextResponse.json(
    { message: "Typist Registered Successfully" },
    { status: 200 },
  );
};
