import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username, email, message } = await req.json();
  await fetch(`${process.env.DISCORD_WEBHOOK_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: `User: ${username} - ${email} \n Message: ${message}`,
    }),
  });
  return NextResponse.json({ message: "It is done son" }, { status: 200 });
};
